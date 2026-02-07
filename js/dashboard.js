/**
 * Dashboard Logic
 * Handles data fetching, KPI calculation, and Chart rendering.
 */

document.addEventListener("DOMContentLoaded", async () => {
    // === CONFIG ===
    // === CONFIG ===
    const CSV_PATH = "data/2025-2026/Database/ÉLÈVES.csv";

    // Initial Color Setup
    let COLORS = getThemeColors();

    function getThemeColors() {
        const isDark =
            document.body.classList.contains("dark-mode") || (!document.body.classList.contains("light-mode") && window.matchMedia("(prefers-color-scheme: dark)").matches);

        return {
            brand: "#c8b070",
            brandDark: "#6e613d",
            brandLight: isDark ? "#374151" : "#f4f1e6",
            text: isDark ? "#f9fafb" : "#4b5563",
            grid: isDark ? "#374151" : "#f3f4f6",
            blue: "#3b82f6",
            pink: "#ec4899",
        };
    }

    // === STATE ===
    const State = {
        data: [],
        charts: {}, // Store chart instances to update them
        kpis: {
            total: 0,
            classes: 0,
            boys: 0,
            girls: 0,
            adherents: 0,
        },
    };

    // Listen for Theme Changes from common.js
    window.addEventListener("themeChanged", () => {
        COLORS = getThemeColors();
        updateChartsTheme();
    });

    function updateChartsTheme() {
        if (State.charts.classes) {
            State.charts.classes.options.scales.x.ticks.color = COLORS.text;
            State.charts.classes.options.scales.y.ticks.color = COLORS.text;
            State.charts.classes.options.scales.y.grid.color = COLORS.grid;
            State.charts.classes.update();
        }
        // Doughnut doesn't use scales, but if legend color needs update:
        if (State.charts.gender) {
            // State.charts.gender.options.plugins.legend.labels.color = COLORS.text; // if needed
            State.charts.gender.update();
        }
    }

    // === INIT ===
    async function init() {
        try {
            const rawData = await fetchData(CSV_PATH);
            processData(rawData);
            renderKPIs();
            renderCharts();
            console.log("Dashboard initialized successfully.");
        } catch (error) {
            console.error("Dashboard init error:", error);
            alert("Erreur de chargement des données. Veuillez vérifier la console.");
        }
    }

    // === DATA FETCHING ===
    function fetchData(url) {
        return new Promise((resolve, reject) => {
            Papa.parse(url, {
                download: true,
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    if (results.errors.length) {
                        console.warn("CSV Errors:", results.errors);
                    }
                    resolve(results.data);
                },
                error: (err) => reject(err),
            });
        });
    }

    // === DATA PROCESSING ===
    function processData(data) {
        // Updated filter
        State.data = data.filter((student) => student["Nom"]); // Minimal validation

        let boyCount = 0;
        let girlCount = 0;
        let adherentCount = 0;
        let nonAdherentCount = 0;

        // Track per-class gender stats
        // { "M06": { M: 10, F: 5 }, ... }
        const classStats = {};

        State.data.forEach((student) => {
            const cl = (student["Classe"] || "Inconnu").trim();
            if (!classStats[cl]) classStats[cl] = { M: 0, F: 0 };

            // Count Gender
            const genre = (student["Genre"] || "").toUpperCase();
            let isBoy = false;

            if (["M", "H", "GARÇON"].includes(genre)) {
                boyCount++;
                classStats[cl].M++;
                isBoy = true;
            } else if (["F", "FILLE"].includes(genre)) {
                girlCount++;
                classStats[cl].F++;
            } else {
                // Unknown gender, maybe default to something or ignore?
                // Let's assume F for unknown or just don't count in breakdown if strict
                // But usually we want total to match sum.
                // For now, let's treat non-M as F or just ignore from gender stats but keep in total?
                // The prompt asks for G/F breakdown.
            }

            // Count Adherents
            const adherentVal = (student["Adhérent AMI ?"] || "").toUpperCase();
            if (["TRUE", "VRAI", "OUI", "YES"].includes(adherentVal)) {
                adherentCount++;
            } else {
                nonAdherentCount++;
            }
        });

        // Computed totals
        State.kpis = {
            total: State.data.length,
            classes: Object.keys(classStats).length,
            boys: boyCount,
            girls: girlCount,
            adherents: adherentCount,
            nonAdherents: nonAdherentCount,
            classStats: classStats,
        };
    }

    // === RENDERING ===
    function renderKPIs() {
        const kpis = State.kpis;

        // Helper
        const setVal = (id, html) => {
            const el = document.getElementById(id);
            if (el) el.innerHTML = html;
        };

        setVal("kpi-total", `${kpis.total}`);
        setVal("kpi-classes", `${kpis.classes}`);

        // Ratio: "X Garçons | Y Filles"
        setVal(
            "kpi-ratio",
            `
            <span style="color:${COLORS.blue}">${kpis.boys} 👦</span> / 
            <span style="color:${COLORS.pink}">${kpis.girls} 👧</span>
        `,
        );

        // Adherents: "X Adh | Y Non"
        setVal(
            "kpi-adherents",
            `
            <span class="success">${kpis.adherents} ✅</span> / 
            <span class="warning">${kpis.nonAdherents} ❌</span>
        `,
        );
    }

    function renderCharts() {
        const stats = State.kpis.classStats;
        const labels = Object.keys(stats).sort();

        const boysData = labels.map((cl) => stats[cl].M);
        const girlsData = labels.map((cl) => stats[cl].F);

        // --- 1. Classes Stacked Bar Chart ---
        const ctxClasses = document.getElementById("classesChart").getContext("2d");

        // Destroy existing if any (logic usually needed but simplified here as we init once)
        if (State.charts.classes && typeof State.charts.classes.destroy === "function") {
            State.charts.classes.destroy();
        }

        State.charts.classes = new Chart(ctxClasses, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Garçons",
                        data: boysData,
                        backgroundColor: COLORS.blue,
                        borderRadius: 2,
                        stack: "gender",
                    },
                    {
                        label: "Filles",
                        data: girlsData,
                        backgroundColor: COLORS.pink,
                        borderRadius: 2,
                        stack: "gender",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: "top",
                        labels: { color: COLORS.text }, // Ensure legend text adapts
                    },
                    tooltip: {
                        mode: "index",
                        intersect: false,
                    },
                },
                scales: {
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        grid: { color: COLORS.grid },
                        ticks: { color: COLORS.text },
                    },
                    x: {
                        stacked: true,
                        grid: { display: false },
                        ticks: { color: COLORS.text },
                    },
                },
            },
        });

        // --- 2. Gender Doughnut Chart ---
        const ctxGender = document.getElementById("genderChart").getContext("2d");

        if (State.charts.gender && typeof State.charts.gender.destroy === "function") {
            State.charts.gender.destroy();
        }

        State.charts.gender = new Chart(ctxGender, {
            type: "doughnut",
            data: {
                labels: ["Garçons", "Filles"],
                datasets: [
                    {
                        data: [State.kpis.boys, State.kpis.girls],
                        backgroundColor: [COLORS.blue, COLORS.pink],
                        borderWidth: 0,
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: "60%",
                plugins: {
                    legend: {
                        position: "bottom",
                        labels: { usePointStyle: true, padding: 20, color: COLORS.text },
                    },
                },
            },
        });
    }

    // Run
    init();
});

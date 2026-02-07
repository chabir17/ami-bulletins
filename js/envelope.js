document.addEventListener("DOMContentLoaded", () => {
    const STATUS_EL = document.getElementById("status");
    const CONTAINER_EL = document.getElementById("container");
    const CSV_PATH = "data/2025-2026/Database/ÉLÈVES.csv";

    function getURLParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            classFilter: params.get("class"),
        };
    }

    async function init() {
        console.log("Initializing Envelope Generator...");
        const { classFilter } = getURLParams();

        // Ensure header is loaded
        if (typeof getAMIHeader === "function" && !getAMIHeader()) {
            // If preloadHeader is exposed globally via common.js (it is)
            if (typeof preloadHeader === "function") {
                await preloadHeader();
            }
        }

        if (typeof Papa === "undefined") {
            STATUS_EL.textContent = "Erreur : PapaParse non chargé.";
            return;
        }

        Papa.parse(CSV_PATH, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                if (results.errors.length) {
                    console.error("Errors:", results.errors);
                    STATUS_EL.textContent = "Erreur lors de la lecture du CSV (voir console).";
                    return;
                }
                console.log("CSV Loaded:", results.data.length, "rows");
                generateEnvelopes(results.data, classFilter);
            },
            error: (err) => {
                console.error("Fetch error:", err);
                STATUS_EL.textContent = "Impossible de charger le fichier CSV.";
            },
        });
    }

    function generateEnvelopes(data, classFilter) {
        const template = document.getElementById("envelope-template");
        if (!template) {
            console.error("Template not found");
            return;
        }

        CONTAINER_EL.innerHTML = "";

        // 1. Filter
        let filteredData = data.filter((s) => s.Nom); // Basic validity check
        if (classFilter) {
            filteredData = filteredData.filter((s) => s.Classe === classFilter);
        }

        // 2. Sort (Classe -> Nom -> Prénom)
        filteredData.sort((a, b) => {
            const classA = (a.Classe || "").toUpperCase();
            const classB = (b.Classe || "").toUpperCase();
            if (classA < classB) return -1;
            if (classA > classB) return 1;

            const nomA = (a.Nom || "").toUpperCase();
            const nomB = (b.Nom || "").toUpperCase();
            if (nomA < nomB) return -1;
            if (nomA > nomB) return 1;

            const prenomA = (a["Prénom"] || "").toUpperCase();
            const prenomB = (b["Prénom"] || "").toUpperCase();
            if (prenomA < prenomB) return -1;
            if (prenomA > prenomB) return 1;

            return 0;
        });

        let count = 0;
        filteredData.forEach((student) => {
            // Check required fields (Nom usually present)
            if (!student.Nom) return;

            const clone = template.content.cloneNode(true);

            // Inject Header using common.js
            const headerContainer = clone.getElementById("header-container");
            if (headerContainer && typeof getAMIHeader === "function") {
                headerContainer.innerHTML = getAMIHeader();
            }

            // Fill details
            // "Nom" and "Prénom" match the CSV headers seen in file view
            // Some names might be undefined, handle gracefully
            const nom = student.Nom || "";
            const prenom = student["Prénom"] || "";
            const classe = student.Classe || "";
            // Check Adhérent status (Column "Adhérent AMI ?")
            // Can be TRUE/FALSE or OUI/NON depending on CSV export
            const adherentVal = student["Adhérent AMI ?"] || "";
            const isAdherent = adherentVal.toUpperCase() === "TRUE" || adherentVal.toUpperCase() === "OUI" || adherentVal.toUpperCase() === "VRAI";

            clone.querySelector(".js-nom").textContent = nom.toUpperCase();
            clone.querySelector(".js-prenom").textContent = prenom;
            clone.querySelector(".js-classe").textContent = classe;

            // Check A if Adherent, B otherwise
            if (isAdherent) {
                clone.querySelector(".js-cat-a").textContent = "✓";
            } else {
                clone.querySelector(".js-cat-b").textContent = "✓";
            }

            CONTAINER_EL.appendChild(clone);
            count++;
        });

        STATUS_EL.textContent = `${count} enveloppes générées. Prêt à imprimer.`;
    }

    init();
});

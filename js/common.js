/**
 * Common Utilities & Shared Logic
 * Namespace: App
 */

const App = {
    headerCache: "",

    async preloadHeader() {
        try {
            const response = await fetch("header.html");
            this.headerCache = await response.text();
        } catch (e) {
            console.error("Could not load header.html", e);
            this.headerCache = "<!-- Error loading header -->";
        }
    },

    getHeader() {
        return this.headerCache;
    },

    getURLParams() {
        const params = new URLSearchParams(window.location.search);
        const entries = {};
        for (const [key, value] of params.entries()) {
            entries[key] = value;
        }
        return entries;
    },

    formatNum(num, dec = 2) {
        if (num === undefined || num === null || (typeof num === "number" && isNaN(num))) return "-";
        const val = parseFloat(num);
        if (isNaN(val)) return "-";
        return parseFloat(val.toFixed(dec)).toString().replace(".", ",");
    },
};

// Initial fetch
App.preloadHeader();

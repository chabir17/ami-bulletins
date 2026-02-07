/**
 * Common Header Generator
 * Centralizes the HTML structure for the AMI Header across Bulletins and Envelopes.
 */

let headerCache = "";

async function preloadHeader() {
    try {
        const response = await fetch("header.html");
        headerCache = await response.text();
    } catch (e) {
        console.error("Could not load header.html", e);
        headerCache = "<!-- Error loading header -->";
    }
}

function getAMIHeader() {
    return headerCache;
}

// Initial fetch when script loads
preloadHeader();

// If running in node (for tests), export. Otherwise, global function.
if (typeof module !== "undefined" && module.exports) {
    module.exports = { getAMIHeader };
}

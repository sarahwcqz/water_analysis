// Colors associated with each molecule.
const MOLECULE_COLORS = {
    "Mg2+": [0, 0, 255],     // blue
    "Ca2+": [0, 128, 0],     // green
    "SO42-": [255, 0, 0],     // roed
    "Cl-": [255, 255, 0],   // yellow
    "F-": [138, 43, 226],  // purple
    "KNO3-": [255, 165, 0],   // orange
    "K+": [0, 0, 0]        // black
};

// Leaflet map instance centered on the Dunkerque–Rouen–Reims triangle.
const map = L.map('map').setView([49.8, 2.3], 8);

// OpenStreetMap tile layer added to the map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Leaflet MarkerClusterGroup instance to handle overlapping markers.
let markersGroup = L.markerClusterGroup();
map.addLayer(markersGroup);

// Cached JSON data fetched from the server, to avoid multiple network requests.
let cachedData = null;


//============================================ FUNCTIONS ========================================== //

// Fetch data from the server once and store it in the cache.
function fetchDataOnce() {
    return fetch('/data')
        .then(res => res.json())
        .then(data => {
            cachedData = data;
            return data;
        });
}

// Get the list of currently selected molecules from the checkboxes.
function getSelectedMolecules() {
    return Array.from(
        document.querySelectorAll('#menu input[type=checkbox]:checked')
    ).map(cb => cb.value);
}

// Compute the fill color of a marker based on concentration and molecule type.
// -> Low concentration → pale color, high concentration → vivid color.
function getColor(concentration, molecule) {
    const max = 100;
    const ratio = Math.min(concentration / max, 1);

    const baseColor = MOLECULE_COLORS[molecule] || [150, 150, 150];

    const r = Math.round(255 - (255 - baseColor[0]) * ratio);
    const g = Math.round(255 - (255 - baseColor[1]) * ratio);
    const b = Math.round(255 - (255 - baseColor[2]) * ratio);

    return `rgb(${r}, ${g}, ${b})`;
}

// Load markers on the map based on selected molecules
function loadData(selectedMolecules) {
    if (!cachedData) return;

    // Clears existing markers
    markersGroup.clearLayers();

    Object.entries(cachedData).forEach(([city, info]) => {
        const [lat, lon] = info.coords;

        Object.entries(info.points).forEach(([molecule, concentration]) => {

            if (
                selectedMolecules.length > 0 &&
                !selectedMolecules.includes(molecule)
            ) {
                return;
            }

            const color = getColor(concentration, molecule);

            const marker = L.circleMarker([lat, lon], {
                radius: 8,
                fillColor: color,
                color: '#000000',
                weight: 1,
                fillOpacity: 0.7
            }).bindPopup(
                `<strong>${city}</strong><br>${molecule}: ${concentration}`
            );

            markersGroup.addLayer(marker);
        });
    });
}



// ====================================== EXECUTION ======================================//

// Initial fetch and rendering of markers on page load.
fetchDataOnce().then(() => {
    loadData(getSelectedMolecules());
});

// Event listeners to checkboxes to update the map when selection changes.
document.querySelectorAll('#menu input[type=checkbox]')
    .forEach(cb => {
        cb.addEventListener('change', () => {
            loadData(getSelectedMolecules());
        });
    });


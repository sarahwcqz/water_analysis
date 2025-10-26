// Carte centrée sur le centre du triangle Dunkerque–Rouen–Reims
var map = L.map('map').setView([49.8, 2.3], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

let markers = [];

// Fonction pour charger les données et afficher les points
function loadData(selectedMolecules) {
    let url = '/data';
    if (selectedMolecules.length > 0) {
        const params = selectedMolecules.map(m => 'molecule=' + encodeURIComponent(m));
        url += '?' + params.join('&');
    }

    fetch(url)
        .then(res => res.json())
        .then(data => {
            // efface anciens points
            markers.forEach(m => map.removeLayer(m));
            markers = [];

            // parcourir chaque ville
            Object.values(data).forEach(cityPoints => {
                cityPoints.forEach(p => {
                    const color =
                        p.molecule === "Calcium" ? 'blue' :
                            p.molecule === "Magnesium" ? 'green' :
                                'red';

                    const marker = L.circleMarker([p.lat, p.lon], {
                        radius: 8,
                        fillColor: color,
                        color: color,
                        fillOpacity: 0.7
                    })
                        .bindPopup(`${p.molecule}: ${p.concentration}`)
                        .addTo(map);

                    markers.push(marker);
                });
            });
        });
}


// Au chargement : tout afficher
loadData([]);

// Update map
document.getElementById('update').addEventListener('click', () => {
    const checked = Array.from(document.querySelectorAll('#menu input[type=checkbox]:checked'))
        .map(cb => cb.value);
    loadData(checked);
});

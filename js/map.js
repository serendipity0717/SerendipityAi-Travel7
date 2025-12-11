document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([41.9028, 12.4964], 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Placeholder for adding markers
    const locations = [
        { name: 'Colosseum', coords: [41.8902, 12.4922] },
        { name: 'Trevi Fountain', coords: [41.9009, 12.4833] }
    ];

    locations.forEach(location => {
        L.marker(location.coords).addTo(map)
            .bindPopup(location.name);
    });

    // Panel toggle for mobile
    const toggleButton = document.getElementById('togglePanel');
    const panel = document.querySelector('.map-panel');
    if(toggleButton && panel){
        toggleButton.addEventListener('click', () => {
            panel.classList.toggle('open');
        });
    }
});

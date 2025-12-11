document.addEventListener('DOMContentLoaded', () => {
    const itineraryContainer = document.getElementById('itinerary-container');
    const modal = document.getElementById('itinerary-modal');
    const addDayBtn = document.getElementById('add-day-btn');
    const form = document.getElementById('itinerary-form');
    const overlay = document.querySelector('.overlay');

    let days = JSON.parse(localStorage.getItem('itineraryDays')) || [];

    const openModal = (dayId, item = null) => {
        form.reset();
        document.getElementById('day-id').value = dayId;
        if (item) {
            document.getElementById('itinerary-modal-title').textContent = 'Edit Itinerary Item';
            document.getElementById('item-id').value = item.id;
            document.getElementById('item-title').value = item.title;
            document.getElementById('item-time').value = item.time;
            document.getElementById('item-description').value = item.description;
        } else {
            document.getElementById('itinerary-modal-title').textContent = 'New Itinerary Item';
            document.getElementById('item-id').value = '';
        }
        modal.style.display = 'block';
        overlay.style.display = 'block';
    };

    const closeModal = () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    };

    const saveDays = () => {
        localStorage.setItem('itineraryDays', JSON.stringify(days));
    };

    const renderItinerary = () => {
        itineraryContainer.innerHTML = '';
        days.forEach(day => {
            const dayCard = document.createElement('div');
            dayCard.className = 'card collapsible';
            dayCard.innerHTML = `
                <div class="collapsible-header">
                    <h2>Day ${day.dayNumber}</h2>
                    <button class="btn-add-item" data-day-id="${day.id}">+</button>
                </div>
                <div class="collapsible-content">
                    ${day.items.map(item => `
                        <div class="itinerary-item" data-item-id="${item.id}">
                            <strong>${item.time} - ${item.title}</strong>
                            <p>${item.description}</p>
                            <button class="btn-edit-item">Edit</button>
                            <button class="btn-delete-item">Delete</button>
                        </div>
                    `).join('')}
                </div>
            `;
            itineraryContainer.appendChild(dayCard);
        });
    };

    addDayBtn.addEventListener('click', () => {
        days.push({ id: Date.now().toString(), dayNumber: days.length + 1, items: [] });
        saveDays();
        renderItinerary();
    });

    modal.querySelector('.close-button').addEventListener('click', closeModal);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const dayId = document.getElementById('day-id').value;
        const itemId = document.getElementById('item-id').value;
        const day = days.find(d => d.id === dayId);

        if (day) {
            const newItem = {
                id: itemId || Date.now().toString(),
                title: document.getElementById('item-title').value,
                time: document.getElementById('item-time').value,
                description: document.getElementById('item-description').value,
            };
            if (itemId) {
                day.items = day.items.map(item => item.id === itemId ? newItem : item);
            } else {
                day.items.push(newItem);
            }
            saveDays();
            renderItinerary();
            closeModal();
        }
    });

    itineraryContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('collapsible-header')) {
            e.target.parentElement.classList.toggle('active');
        }
        if (e.target.classList.contains('btn-add-item')) {
            openModal(e.target.dataset.dayId);
        }
        if (e.target.classList.contains('btn-edit-item')) {
            const itemElement = e.target.closest('.itinerary-item');
            const dayElement = e.target.closest('.card');
            const day = days[Array.from(itineraryContainer.children).indexOf(dayElement)];
            const item = day.items.find(i => i.id === itemElement.dataset.itemId);
            openModal(day.id, item);
        }
        if (e.target.classList.contains('btn-delete-item')) {
            const itemElement = e.target.closest('.itinerary-item');
            const dayElement = e.target.closest('.card');
            const day = days[Array.from(itineraryContainer.children).indexOf(dayElement)];
            day.items = day.items.filter(i => i.id !== itemElement.dataset.itemId);
            saveDays();
            renderItinerary();
        }
    });

    renderItinerary();
});

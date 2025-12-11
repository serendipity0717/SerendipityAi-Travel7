document.addEventListener('DOMContentLoaded', () => {
    const journalGrid = document.getElementById('journal-grid');
    const modal = document.getElementById('journal-modal');
    const addEntryBtn = document.getElementById('add-entry-btn');
    const form = document.getElementById('journal-form');
    const modalTitle = document.getElementById('modal-title');
    const overlay = document.querySelector('.overlay');

    let entries = JSON.parse(localStorage.getItem('journalEntries')) || [];

    const openModal = (entry = null) => {
        form.reset();
        if (entry) {
            modalTitle.textContent = 'Edit Journal Entry';
            document.getElementById('entry-id').value = entry.id;
            document.getElementById('entry-title').value = entry.title;
            document.getElementById('entry-date').value = entry.date;
            document.getElementById('entry-content').value = entry.content;
        } else {
            modalTitle.textContent = 'New Journal Entry';
            document.getElementById('entry-id').value = '';
        }
        modal.style.display = 'block';
        overlay.style.display = 'block';
    };

    const closeModal = () => {
        modal.style.display = 'none';
        overlay.style.display = 'none';
    };

    const saveEntries = () => {
        localStorage.setItem('journalEntries', JSON.stringify(entries));
    };

    const renderEntries = () => {
        journalGrid.innerHTML = '';
        entries.forEach(entry => {
            const entryCard = document.createElement('div');
            entryCard.className = 'card';
            entryCard.innerHTML = `
                <h3>${entry.title}</h3>
                <p><em>${entry.date}</em></p>
                <p>${entry.content.substring(0, 100)}...</p>
                <button class="btn-edit" data-id="${entry.id}">Edit</button>
                <button class="btn-delete" data-id="${entry.id}">Delete</button>
            `;
            journalGrid.appendChild(entryCard);
        });
    };

    addEntryBtn.addEventListener('click', () => openModal());
    modal.querySelector('.close-button').addEventListener('click', closeModal);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('entry-id').value;
        const newEntry = {
            id: id || Date.now().toString(),
            title: document.getElementById('entry-title').value,
            date: document.getElementById('entry-date').value,
            content: document.getElementById('entry-content').value,
        };

        if (id) {
            entries = entries.map(entry => entry.id === id ? newEntry : entry);
        } else {
            entries.push(newEntry);
        }

        saveEntries();
        renderEntries();
        closeModal();
    });

    journalGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-edit')) {
            const entry = entries.find(entry => entry.id === e.target.dataset.id);
            openModal(entry);
        }
        if (e.target.classList.contains('btn-delete')) {
            entries = entries.filter(entry => entry.id !== e.target.dataset.id);
            saveEntries();
            renderEntries();
        }
    });

    renderEntries();
});

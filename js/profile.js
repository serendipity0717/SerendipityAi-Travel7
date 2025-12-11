document.addEventListener('DOMContentLoaded', () => {
    const profileName = document.getElementById('profileName');
    const profileBio = document.getElementById('profileBio');
    const saveButton = document.getElementById('saveProfile');

    const loadProfile = () => {
        const name = localStorage.getItem('profileName');
        const bio = localStorage.getItem('profileBio');
        if (name) profileName.value = name;
        if (bio) profileBio.value = bio;
    };

    const saveProfile = () => {
        localStorage.setItem('profileName', profileName.value);
        localStorage.setItem('profileBio', profileBio.value);
        // Could add a success message here
    };

    if (saveButton) {
        saveButton.addEventListener('click', saveProfile);
    }

    loadProfile();
});

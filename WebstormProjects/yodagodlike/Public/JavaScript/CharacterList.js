document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters();
    setUpEventListeners();
    createCharacter();
});

function fetchCharacters() {
    fetch('/characters')
        .then(response => response.json())
        .then(characters => {
            const characterList = document.getElementById('characters');
            characterList.innerHTML = '';

            characters.forEach(character => {
                const li = document.createElement('li');
                const informationButton = document.createElement('button');
                informationButton.textContent = 'Information';

                informationButton.addEventListener('click', () => {
                    openCharacterModal(character);
                });

                const menuButton = document.createElement('button');
                menuButton.innerHTML = '...';
                menuButton.classList.add('menu-button');

                const dropdownMenu = document.createElement('div');
                dropdownMenu.classList.add('dropdown-content');
                dropdownMenu.innerHTML = `
                    <button class="dropdown-item update-button" data-id="${character.id}">Update</button>
                    <button class="dropdown-item delete-button" data-id="${character.id}">Delete</button>
                `;

                menuButton.addEventListener('click', (event) => {
                    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
                    event.stopPropagation();
                });

                dropdownMenu.addEventListener('click', (event) => {
                    if (event.target.classList.contains('update-button')) {
                        openUpdateModal(character); // Open update modal
                    } else if (event.target.classList.contains('delete-button')) {
                        const characterId = event.target.getAttribute('data-id');
                        deleteCharacter(characterId); // Call delete function
                    }
                    dropdownMenu.style.display = 'none'; // Hide the dropdown after selection
                });

                window.addEventListener('click', () => {
                    dropdownMenu.style.display = 'none';
                });

                li.textContent = character.name;
                li.appendChild(informationButton);
                li.appendChild(menuButton);
                li.appendChild(dropdownMenu);
                characterList.appendChild(li);
            });
        });
}

function setUpEventListeners() {
    document.getElementById('swForm').addEventListener('submit', function(event) {
        event.preventDefault();
        openAddModal();
    });
    document.getElementById('close-add').addEventListener('click', closeAddModal);
    document.getElementById('close-info').addEventListener('click', closeInfoModal);
    document.getElementById('close-update').addEventListener('click', closeUpdateModal);

    document.getElementById('submit-update-character').addEventListener('click', function(event) {
        event.preventDefault();
        const name = document.getElementById('update-character-name').value;
        const role = document.getElementById('update-character-role').value;
        const planet = document.getElementById('update-character-planet').value;
        const characterId = this.dataset.characterId; // Get character ID from button

        if (!name || !role || !planet) {
            alert('Please fill out all fields.');
            return;
        }

        const updatedData = {
            name: name,
            role: role,
            planet: planet
        };

        updateCharacter(characterId, updatedData);
        closeUpdateModal();
    });
}

function createCharacter(){
    document.getElementById('submit-creation').addEventListener('click', function(event) {
        event.preventDefault();
        const name = document.getElementById('character-name').value;
        const role = document.getElementById('character-role').value;
        const planet = document.getElementById('character-planet').value;

        if(!name || !role || !planet) {
            alert('Please fill out all fields.');
            return;
        }

        const character = {
            name: name,
            role: role,
            planet: planet
        };
        addCharacter(character);
        closeAddModal();
        document.getElementById('character-name').value = '';
        document.getElementById('character-role').value = '';
        document.getElementById('character-').value = '';
    });
}

function openCharacterModal(character) {
    const modal = document.getElementById('modal-info');
    document.getElementById('char-name').textContent = character.name;
    document.getElementById('char-role').textContent = character.role;
    document.getElementById('char-planet').textContent = character.planet;

    modal.style.display = 'block';
}

function closeInfoModal() {
    const modal = document.getElementById('modal-info');
    modal.style.display = 'none';
}

function openAddModal() {
    const modal = document.getElementById('modal-add');
    modal.style.display = 'block';
}

function closeAddModal() {
    const modal = document.getElementById('modal-add');
    modal.style.display = 'none';
}

function openUpdateModal(character) {
    const modal = document.getElementById('modal-update');
    document.getElementById('update-character-name').value = character.name;
    document.getElementById('update-character-role').value = character.role;
    document.getElementById('update-character-planet').value = character.planet;
    document.getElementById('submit-update-character').dataset.characterId = character.id;
    modal.style.display = 'block';
}

function closeUpdateModal() {
    const modal = document.getElementById('modal-update');
    modal.style.display = 'none';
}

function deleteCharacter(characterId) {
    fetch(`/characters`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: characterId })
    })
        .then(() => {
            fetchCharacters();
        })
        .catch(error => {
            console.error('Error deleting character:', error);
        });
}

function updateCharacter(characterId, updatedData) {
    fetch(`/characters/${characterId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
        .then(response => {
            if (response.ok) {
                fetchCharacters();
            } else {
                throw new Error('Failed to update character.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function addCharacter(characterData) {
    fetch('/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(characterData)
    })
        .then(() => {
            fetchCharacters();
        })
        .catch(error => {
            console.error('Error creating character:', error);
        });
}
document.addEventListener('DOMContentLoaded', () => {
    fetchCharacters();
    setUpEventListeners();
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

                li.textContent = character.name;
                li.appendChild(informationButton);
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

document.getElementById('submit-creation').addEventListener('click', function(event) {
    event.preventDefault();
    const name = document.getElementById('character-name').value;
    const role = document.getElementById('character-role').value;
    const planet = document.getElementById('character-planet').value;

    if (!name || !role || !planet) {
        alert('Please fill out all fields.');
        return;
    }
    const newCharacter = {
        name: name,
        role: role,
        planet: planet
    };
    fetch('/characters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCharacter)
    })
        .then(response => {
            if (response.status === 201) {
                return response.json();
            } else {
                throw new Error('Failed to add character.');
            }
        })
        .then(addedCharacter => {
            closeAddModal();
            fetchCharacters();
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

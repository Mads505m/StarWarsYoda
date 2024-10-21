document.addEventListener('DOMContentLoaded', fetchCharacters);

function fetchCharacters() {
    fetch('/characters')
        .then(response => response.json())
        .then(characters => {
            const characterList = document.getElementById('character-list');
            characterList.innerHTML = '';
            characters.forEach(character => {
                const li = document.createElement('li');

                const informationButton = document.createElement('button');
                informationButton.id = 'information';
                informationButton.textContent = 'Information';
                informationButton.addEventListener('click', () => {
                });

                li.textContent = character.name;
                li.appendChild(informationButton);
                characterList.appendChild(li);
            });
        });
}

function openModal(character) {
    const modal = document.getElementById('modal');

    modal.style.display = 'block';
}

function closeModal(){
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

document.getElementById('swForm').addEventListener('submit', function(event) {
    event.preventDefault();
    openModal();
});

document.getElementById('close').addEventListener('click', closeModal);
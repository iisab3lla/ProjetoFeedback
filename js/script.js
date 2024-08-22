document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    setupFileInput();
    setupFormSubmission();
    setupCardCreation();  
    checkInitialCardState(); 
    setupCardFlip(); 
});

let currentIndex = 0; 

function setupFileInput() {
    const fileInput = document.getElementById('fileInput');
    const button = document.getElementById('button-addon1');
    const textInput = document.getElementById('form-file');

    button.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'Coloque aqui a sua foto';
        textInput.value = fileName;
    });
}

function setupFormSubmission() {
    const form = document.getElementById('form-modal');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        updateCardContent(); 
        closeModal(); 
        form.reset(); 
    });

    form.addEventListener('reset', () => {
        resetFileInput();
    });
}

function setupNavigation() {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    updateCardVisibility();

    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--; 
            updateCardVisibility();
        }
    });

    rightArrow.addEventListener('click', () => {
        const cards = document.querySelectorAll('.card-painel');
        if (currentIndex < cards.length - 1) {
            currentIndex++; 
            updateCardVisibility();
        }
    });
}

function updateCardVisibility() {
    const cards = document.querySelectorAll('.card-painel');
    cards.forEach((card, index) => {
        card.style.display = (index === currentIndex) ? 'block' : 'none';
    });
}

function createNewCard() {
    const cardHTML = `
        <div class="card-painel">
            <div class="card-face card-front d-flex flex-column justify-content-start">
                <div class="foto-pessoa rounded-4"></div>
                <div class="d-flex flex-column mt-2">
                    <span class="info-card nomePessoa" id="nomePessoa">Nome da Pessoa</span> 
                    <span class="info-card idadePessoa" id="idadePessoa">Idade</span> 
                    <button type="button" class="btn btn-dark info-card my-2" data-bs-toggle="modal"
                        data-bs-target="#modalForm">Responda o formulário</button>
                </div>
            </div>
            <div class="card-face card-back">
                <input type="text" class="form-control form-control-md titulo-form" id="tituloForm" placeholder="Título"
                    aria-label="Disabled input example" disabled> <!-- ID exclusivo -->
                <textarea class="form-control descricao-form" id="descricaoForm" placeholder="Descrição" disabled></textarea> <!-- ID exclusivo -->
            </div>
        </div>
    `;

    const cardContainer = document.querySelector('.card-container');
    
    cardContainer.insertAdjacentHTML('beforeend', cardHTML);
    
    currentIndex = document.querySelectorAll('.card-painel').length - 1;
    
    updateCardVisibility();
}

function updateCardContent() {
    const nome = document.getElementById('form-nome').value;
    const idade = document.getElementById('form-idade').value;
    const titulo = document.getElementById('form-titulo').value;
    const descricao = document.getElementById('form-descricao').value;
    const fileInput = document.getElementById('fileInput');

    if (fileInput.files.length === 0) {
        alert("Por favor, selecione uma imagem.");
        return;
    }

    const foto = URL.createObjectURL(fileInput.files[0]);

    const lastCard = document.querySelector('.card-container .card-painel:last-child');
    lastCard.querySelector(`#nomePessoa`).textContent = nome;
    lastCard.querySelector(`#idadePessoa`).textContent = `${idade} anos`;
    lastCard.querySelector(`#tituloForm`).value = titulo;
    lastCard.querySelector(`#descricaoForm`).value = descricao;

    const fotoPessoa = lastCard.querySelector('.foto-pessoa');
    fotoPessoa.style.backgroundImage = `url(${foto})`;
    fotoPessoa.style.backgroundSize = 'cover';
    fotoPessoa.style.backgroundPosition = 'center';
    fotoPessoa.style.backgroundRepeat = 'no-repeat';
}

function closeModal() {
    const modalElement = document.getElementById('modalForm');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
}

function resetFileInput() {
    document.getElementById('form-file').value = 'Coloque aqui a sua foto';
}

function setupCardCreation() {
    const sphereContainer = document.getElementById('sphere-container');
    sphereContainer.addEventListener('click', (event) => {
        event.preventDefault();
        hideMessage();
        createNewCard();
        updateCardVisibility();
    });
}

function hideMessage() {
    const messageElement = document.getElementById('no-cards-message');
    if (messageElement) {
        messageElement.style.display = 'none';
    }
}

function checkInitialCardState() {
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer.children.length === 0) {
        document.getElementById('no-cards-message').style.display = 'block';
    } else {
        document.getElementById('no-cards-message').style.display = 'none';
    }
}

function setupCardFlip() {
    document.addEventListener('click', (event) => {
        const card = event.target.closest('.card-painel');
        if (card) {
            card.classList.toggle('flip');
        }
    });
}

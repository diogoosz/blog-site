// Função para carregar as postagens do arquivo JSON
fetch('posts.json')
    .then(response => response.json())
    .then(data => {
        const postContainer = document.getElementById('post-container');
        const header = document.querySelector('header');
        const body = document.body;

        data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            const postTitle = document.createElement('h2');
            postTitle.textContent = post.title;
            postElement.appendChild(postTitle);

            const postContent = document.createElement('p');
            const summary = post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content;
            postContent.innerHTML = summary;
            postElement.appendChild(postContent);

            const postDate = document.createElement('p');
            postDate.classList.add('date');
            postDate.textContent = `Publicado em: ${post.date}`;
            postElement.appendChild(postDate);

            postElement.addEventListener('click', () => {
                // Esconde o cabeçalho e a lista de posts
                header.style.display = 'none';
                postContainer.style.display = 'none';

                // Cria a nova seção para mostrar o conteúdo completo
                const postSection = document.createElement('div');
                postSection.classList.add('post-content-section');

                const postTitleFull = document.createElement('h2');
                postTitleFull.textContent = post.title;
                postSection.appendChild(postTitleFull);

                const fullContent = document.createElement('div');
                fullContent.innerHTML = post.content;
                postSection.appendChild(fullContent);

                const postDateFull = document.createElement('p');
                postDateFull.classList.add('date');
                postDateFull.textContent = `Publicado em: ${post.date}`;
                postSection.appendChild(postDateFull);

                // Botão de seta para voltar
                const backButton = document.createElement('button');
                backButton.classList.add('back-button');
                backButton.innerHTML = '&#8592;';
                backButton.addEventListener('click', () => {
                    // Mostra o cabeçalho e a lista de posts novamente
                    header.style.display = 'block';
                    postContainer.style.display = 'grid';

                    // Remove a seção de post completo
                    postSection.remove();
                });

                // Adiciona a seta no topo da seção do post
                postSection.appendChild(backButton);

                // Adiciona a nova seção ao corpo da página
                body.appendChild(postSection);

                // Fixando a posição da seta
                const backButtonElement = document.querySelector('.back-button');
                backButtonElement.style.position = 'fixed';
                backButtonElement.style.top = '20px';
                backButtonElement.style.left = '20px';
                backButtonElement.style.zIndex = '9999';
            });

            // Adiciona o post ao container de postagens
            postContainer.appendChild(postElement);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar as postagens:', error);
    });

// Modal de "Sobre"
const modal = document.getElementById('modal-sobre');
const btnSobre = document.getElementById('sobre-btn');
const spanClose = document.querySelector('.close');

// Abrir o modal
btnSobre.onclick = function() {
    modal.style.display = "block";
}

// Fechar o modal
spanClose.onclick = function() {
    modal.style.display = "none";
}

// Fechar o modal ao clicar fora dele
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

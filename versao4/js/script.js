//Selecionar todos os cards
let cards = document.querySelectorAll(".card-destino");

/*Percorrer todos os cards selecionados e para cada um (separadamente) pegar os botões (botão curiosidade e o botão favoritos) */

cards.forEach(function (card) {
    let botaoCuriosidade = card.querySelector('.botao-curiosidade');
    let botaoFavorito = card.querySelector('.botao-favorito');
    let curiosidade = card.querySelector('.curiosidade');

    botaoCuriosidade.addEventListener("click", function () {
        if (curiosidade.hidden) {
            curiosidade.hidden = false;
            botaoCuriosidade.setAttribute("aria-expanded", "true");
            botaoCuriosidade.textContent = "Ocultar curiosidade";
        } else {
            curiosidade.hidden = true;
            botaoCuriosidade.setAttribute("aria-expanded", "false");
            botaoCuriosidade.textContent = "Ver curiosidade";
        }
    });/*fechamento do código do botaoCuriosidade*/
    botaoFavorito.addEventListener("click", function () {
        //Aplicar/remover a classe 'favoritado'
        let favoritado = card.classList.toggle('favoritado');

        //Atualizar o estado do botão(aria-pressed)
        botaoFavorito.setAttribute("aria-pressed", favoritado);

        //Atualizar o texto do botão(☆ Favorito ou ★ Favoritado)
        if (favoritado) {
            botaoFavorito.textContent = "★ Favoritado";
        } else {
            botaoFavorito.textContent = "☆ Favorito";
        } 

        atualizarContadorFavoritos();


    });
});


/*V2: programação para o recurso de filtragem de destinos */

//procurar e selecionar os botões de filtro
const botoesFiltro = document.querySelectorAll("[data-filtro]");
botoesFiltro.forEach(function (botaoFiltro) {

    //descobrir qual filtro foi escolhido
    botaoFiltro.addEventListener("click", function () {

        // ... acessamos e guardamos o filtro escolhido
        const filtro = botaoFiltro.dataset.filtro;

        // percorrendo cada card..
        cards.forEach(function (card) {
            //.. e guardando a categoria de cada um
            const categoria = card.dataset.categoria;

            // mostrar todos os cards ou todos os cards da categoria
            if (filtro === "todos" || categoria === filtro) {

                // então mostrar os cards
                card.hidden = false;
            } else {
                // senão, escondemos o card
                card.hidden = true;
            }

        }) // fechamento do forEach dos cards


        botoesFiltro.forEach(function (botaoFiltro) {
            if (botaoFiltro.dataset.filtro === filtro) {
                botaoFiltro.classList.add("filtro-ativo");

            } else {
                //senão retiramos a classe dele
                botaoFiltro.classList.remove("filtro-ativo")
            }
        })
    }); // fechamento event listner
});

/* versao 3: script para o menu responsivo */

// Selecionando os elementos que serao manipulados 

// botão menu
const botaoMenu = document.querySelector(".botao-menu")

// Navegação principal
const navegacaoPrincipal = document.querySelector("#navegacao-principal")

// dectar o acionamento do botão
botaoMenu.addEventListener("click", function () {
    // aplicar a classe menu-aberto
    const menuAberto = navegacaoPrincipal.classList.toggle("menu-aberto")

    // atualizar o estado do botão usando aria-expanded
    botaoMenu.setAttribute("aria-expanded", menuAberto)

    // exercicio 
    /* se o menu estiver aberto, mostre no botão ✖ Fechar */
    /* se o menu estiver fechado, mostre no botão  ☰ Menu */

    if (menuAberto) {
        botaoMenu.textContent = "✖ Fechar"
    }
    else {
        botaoMenu.textContent = "☰ Menu"
    }


});

/* versão 4 : script para a contagem de favoritos */

// selecionando o elemento que apresenta a quantidade de favoritos
const quantidadeFavoritos = document.querySelector("#quantidade-favoritos")

// função para atualização dos favoritos 
function atualizarContadorFavoritos() {
    // guardar em memória a contagem, começando em zero
    let quantidade = 0;

    // percorrer todos os cards, inclusive os ocultos pelos filtros 
    cards.forEach(function(card){
        // verificar se o card possui classe "favoritado"
        if(card.classList.contains("favoritado")){
            // se possuir, incrementos (++) a variável quantidade
            // incrementar significa adicionar 1
            quantidade++;
        }
        
    });
    //após a contagem utiliza o numero exibido no span HTML 
    quantidadeFavoritos.textContent = quantidade;

}

    

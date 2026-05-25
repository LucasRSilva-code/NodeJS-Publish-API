// Função respónsavel por buscar todos os pedidos na API e exibir na tela
function listarPedidos() {
    // busca o elemento HTML (lista), onde a listagem de pedidos será exeibida
    const lista = document.getElementById("lista");
    // conexão suave entre a interface e a conexão da API
    lista.innerHTML = "Carregando pedidos...";
    //  faz uma requisição GET para a API com a url publicada
    fetch("https://nodejs-publish-api-fsww.onrender.com/pedidos")
    // convertendo a resposta da API para JSON
    .then(res => res.json())
    // trabalhando o resultado da API
    .then(resultado => {
        // limpando a lista para preencher com os pedidos
        lista.innerHTML = "";
        // percorrendo o array de pedidos recebidos da API
        resultado.dados.forEach(pedido => {
            // Cria um item de linha para cada pedido
            const item = document.createElement("li");
            // define como o texto será exibido na tela
            item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status}`;
            // Adiciona o item dentro da lista
            lista.appendChild(item);
        });
    })
    // caso o front não consiga acessar a API para trazer os dados
    .catch(() => {
        lista.innerHTML = "Erro ao carregar os pedidos"
    })
}

// função respónsavel pela criação de novos pedidos
function cadastrarPedido() {
    // pega os valores digitados ns inputs do html e depois limpar
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;

    fetch("https://nodejs-publish-api-fsww.onrender.com/pedidos", {
        method: "POST",
        headers: {'Content-Type': 'application/JSON'},
        // convertendo os dados em JSON, para entregar para o body
        body: JSON.stringify({
            id: Date.now(),
            cliente: cliente,
            produto: produto,
            status: 'pendente'
        })
    })
    // Convertendo a resposta da API para JSON
    .then(res => res.json())
    .then(res => {
        // limpar os inputs após o envio de cadastro
        document.getElementById("cliente").value = "";
        document.getElementById("produto").value = "";
        // atualizar a lista de pedidos
        listarPedidos();
    })
    // alerta para caso não seja possível realizar o cadastro do pedido
    .catch(() => {
        alert("erro ao cadastrar pedido")
    });
}

// chama a função assim que a pagína carregar
listarPedidos()
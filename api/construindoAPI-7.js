// 7º passo: ajuste pra publicação e consumo

const http = require('http');
const url = require('url');

let pedidos = [
    {
        id: 1,
        cliente: 'Lucas',
        produto: 'Tempo',
        status: 'Falta'
    }
]

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/JSON');

    const urlCompleta = url.parse(req.url, true);

    const rota = urlCompleta.pathname;
    const metodo = req.method;

    // liberação do CORS
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET POST, PUT, DELETE, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

    // Metodo OPITIONS
    if(metodo === "OPTIONS") {
        res.statusCode = 204
        res.end()
        return

    }

    // Método GET
    if(rota === '/pedidos' && metodo === 'GET') {
        res.end(JSON.stringify ({
            mensagem: 'Lista de pedidos',
            dados: pedidos
        }));
        return;
    }

    // Método POST
    if (rota === '/pedidos' && metodo === 'POST') {
        let body = '';

        req.on('data', parte => {
            body += parte
        });

        req.on('end', () => {
            const novoPedido = JSON.parse(body);
            pedidos.push(novoPedido);

            res.statusCode = 201;

            res.end(JSON.stringify ({
                mensagem: 'Pedido cadastrado com sucesso',
                pedido: novoPedido
            }));
        });
        return;
    }
    // Método PUT
    if(rota === "/pedidos" && metodo === "PUT") {
        let body = ''
        req.on('data', parte => {
            body+=parte
        })
        req.on('end', () => {
            const dados = JSON.parse(body)
            let encontrado = false

            pedidos = pedidos.map(pedido => {
                if(pedido.id === dados.id) {
                    encontrado = true
                    return{
                        ...pedido,
                        status: dados.status
                    }
                }
                return pedido
            })
            if(!encontrado) {
                res.statusCode = 404
                res.end(JSON.stringify({mensagem: "Pedido não encontrado"}))
                return
            }
            res.end(JSON.stringify({
                mensagem: "Pedido atualizado com sucesso",
                dados: pedidos
            }))
        })
        return
    }

    //metodo delete
    if(rota === "/pedidos" && metodo === "/DELETE"){
        let body = ''
        req.on('data', parte => {
            body += parte
        })
        req.on('end', () => {
            const dados = JSON.parse(body)
            const tamanhoAntes = pedidos.length
            pedidos = pedidos.filter(pedido => pedido.id !== dados.id)
            if(pedidos.length === tamanhoAntes) {
                res.statusCode = 404
                res.end(JSON.stringify({mensagem: "Pedido não encontrado"}))
                return
            }
            res.end(JSON.stringify({
                mensagem: "Pedido removido",
                dados: pedidos
            }))
        })
        return

    }
    res.statusCode = 404;
    res.end(JSON.stringify ({
        mensagem: 'Rota não encontrada'
    }));

});
const PORT = process.env.PORT || 3000
server.listen(3000, () => {
    console.log(`Server running in ${PORT}`);
});
// 2º passo: exibição da rota e do método
const http = require('http')
const url = require('url')

let pedidos = [
    {
        id: 1,
        cliente: "Lucas",
        produto: "Tempo",
        status: "Falta"
    },
]

const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/JSON')

    const urlCompleta = url.parse(req.url, true)

    const rota = urlCompleta.pathname
    const metodo = req.method

    if(rota === '/pedidos' && metodo === 'GET') {
        res.end(JSON.stringify({
            mensagem: "Lista de pedidos",
            dados: pedidos
        }))
        return;
    }
    res.statusCode = 404
    res.end(JSON.stringify({
        mensagem: "rota não encontrada"
    }))
})

server.listen(3000, () => {
    console.log('Servidor running in http://localhost:3000')
})
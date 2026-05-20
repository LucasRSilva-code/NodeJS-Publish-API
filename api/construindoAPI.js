// 1º passo: Criando e teste do servidor
const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Content-type', 'application/JSON')
    res.end(JSON.stringify({
        mensagem: 'servidor funcionando'
    }))
})
server.listen(3000, () => {
    console.log('Servidor running in http://localhost:3000')
})
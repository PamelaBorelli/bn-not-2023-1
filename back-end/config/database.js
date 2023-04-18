const mongoose = require('mongoose');

/**
 * Usa dese struturação para obter as variáveis de ambiente necessárias para realziar a conexão ao banco de dados
 * 
 */

const {
    MONGODB_USER,
    MONGODB_PASS,
    MONGODB_SERVER,
    MONGODB_DATABASE
} = process.env

module.exports = function(){
    console.log(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_SERVER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`)
    // Conecta ao banco de dados
    mongoose.connect(`mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_SERVER}/${MONGODB_DATABASE}?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

mongoose.connection.on('connected', () =>
    console.log('=> MONGOOSE! conectado com sucesso ao servidor')
)
mongoose.connection.on('disconnected', ()=>
console.log(('MONGOOSE! desconectado com sucesso ao servidor'))     
)
mongoose.connection.on('error', error =>
console.log('*** MONGOOSE! ERRO erro ao se conectar com o servido' + error)
)

//quando for detectado o comando de interrução Ctrl+c

process.on('SIGINT', () =>{
    mongoose.connection.on.close(()=>{
        console.log('=> MONGOOSE! desconectando...');
        //encerra a aplicação sem erros
        process.exit(0)
    })
})

}

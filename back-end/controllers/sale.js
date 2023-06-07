const Sale = require('../models/Sale')
const qpm = require('query-params-mongo');

var processQuery = qpm();

const controller = {} // Objeto vazio

controller.create = async (req, res) => {
    try {
        //Manda as informações que vieram em req body
        //para serem gravdas no banco de dados
        await Sale.create(req.body)

        //HTTP 201: Created
        res.status(201).end()
    }
    catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)

    }
}

controller.retriveAll = async (req, res) => {
    try {

        let filter = {}

        if(Object.keys(req.query).length >0){
        //retorna todos os documentos da coleção
        const query = processQuery(req.query, {}, false)
        filter = query.filter
        }

        //Retorna todos os documentos do console
        const result = await Sale.find(filter)
        .populate('customer')
        .populate('items.product')
        //HTTP 200: OK(implicito)
        res.send(result)
    }
    catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)

    }
}

controller.retriveOne = async (req, res) => {
    try {
        //Retorna todos os documentos do console
        const result = await Sale.findById(req.params.id)
        .populate('customer')
        .populate('items.product')

        if (result) {
            //Encontrou o documento => HTTP 200: OK (implicito)
            res.send(result)
        }
        else {
            //Não encontrou o documento => HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {

        const sale = await Sale.findById(req.params.id)
        //itens foi passado em req.body

        if(req.body.items){
            // Percorre cada item de req.body, verificando se já existe 
            //ou não  em sales.item
            for (let item of req.body.items){
                // se o item tem _id, é porque já existe -> É O CASO DE ATUALIZAÇÃO
                if (item._id){

                if(item['$ delete'] === true ){
                    sale.item,id(item._id).deleteOne()
                } 
                else{
                                    //procura cada propriedade no item de req.body e
                for (prop in item){
                    sale.items.id(item._id) [prop]= item[prop]
                        }
                    }
                }
                //item nçao existe -> É o caso de inserção
                else{
                    sale.items.push(item) //cria um novo item
                }
            }
            //indica que o item foi modificado e deve ser regravado
            sale.markModified('items')
        }
        // verifica as demais proprriedades do pai(sale)por alterações
        for(let prop in req.body){
            if(prop !== 'items'){ //items já foi processado acima
                console.log({prop})
                sale[prop] =req.body[prop]
                sale.markModified(prop)
            }
        }

        const result = await sale.save()

        if (result) {
            //Encontrou e atualizou => HTTP 204: No content
            res.send(204).end()
        }
        else {
            //Não encontrou para atualizar => HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {

        const result = await Sale.findByIdAndDelete(req.params.id)

        if (result) {
            //Encontrou e excluiu => HTTP 204: No content
            res.send(204).end()
        }
        else {
            //Não encontrou para excluir => HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch (error) {
        console.error(error)
        //HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller
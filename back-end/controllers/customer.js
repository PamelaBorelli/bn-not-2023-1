//importação do model
const Customer = require('../models/Customer')

const controller = {} //Objeto vazio

controller.create = async(req,res) =>{
    try{
        //manda as informações que vierem em req body
        //para serem gravadas no banco de dados
        await Customer.create(req.body)
        //HTTP 201: created
        res.status(201).end()
    }
    catch(error){
        console.error(error)
        //HTTP 500: internal server error
        res.status(500).send(error)
    }
}

controller.retrieveAll = async (req, res) =>{
    try{
        //retorna todos os documentos da coleção
        const result = await Customer.find()
        //HTTP 200: OK (implicito)
        res.send(result)
    }
    catch(error){
        console.error(error)
        //HTTP 500: Internal server error
        res.status(500).send(error)
    }
}

controller.retrieveOne = async(req, res) =>{
    try{
        const result = await Customer.findById(req.params.id)

        if(result){
            //HTTP encontrou o doc => HTTP 200: oh (implicit0)
            res.send(result)
        }else{
            //Não encontrou o doc => HTTP 404: Not Found
            res.status(404).end()
        }
    }
    catch (error){
        console.error(error)
        //HTTP 500: Internet Server Error
        res.status(500).send(error)
    }
}

controller.update = async (req, res) => {
    try {
        const result = await Customer.findByIdAndUpdate(req.params.id, req.body)

        if(result) {
            // Encontrou e atualizou ~> HTTP 204: No content
            res.status(204).end()
        }
        else {
            // Não encontrou para atualizar ~> HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

controller.delete = async (req, res) => {
    try {
        const result = await Customer.findByIdAndDelete(req.params.id)

        if(result) {
            // Encontrou e excluiu ~> HTTP 204: No content
            res.status(204).end()
        }
        else {
            // Não encontrou para excluir ~> HTTP 404: Not found
            res.status(404).end()
        }
    }
    catch(error) {
        console.error(error)
        // HTTP 500: Internal Server Error
        res.status(500).send(error)
    }
}

module.exports = controller;
const mongoose = require('mongoose')

const schema = mongoose.Schema({
    datetime: {
        type: Date,
        required: true,
        default: Date.now() //Data/hora da gravação
    },
    number: {
        type: Number,
        required: true
    },
    customer: {
        type: mongoose.ObjectId, //Tipo para chave estrangeira
        ref: 'Customer',
        required: true
    },
    items: [{
        order: {
            type: Number,
            required: true,
            min: 1
        },
        quantity: {
            type: Number,
            required: true,
            min: 0.01
        },
        product: {
            type: mongoose.ObjectId,
            ref: 'product',
            required: true
        }
    }]
})

/*
Parametros de mongoose model:
1º nome do model para uso interno (convenção : primeira letra maiuscula e singular)
2º relação de camposa do esquema(constante schema)
3º nome da collection no banco de dados (convenção: mesmo nome do model, mas com letra miniscula e no plural)
*/

module.export = mongoose.model('Sale', schema, 'sales') 
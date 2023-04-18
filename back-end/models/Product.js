const mongoose = require('mongoose')

const schema = mongoose.Schema({
    description:{
        type: String,
        required: true
    },

    unit: {
        type: String,
        enum: ['un', 'kg', 'l'],
        required: true
    },

    price: {
        type: Number,
        min: 0.01,
        required: true
    },

    supplier: {
        type: mongoose.ObjectId,
        ref: 'Supplier', //nome do model relacionado
        required: true,
    }


})

/*

parametros de mongoose.model:
1º nome da label, para uso interno(convenção: primeira letra maiúscula e singular)
2º relação de campos do esquema (contante schema)
3º nome da collection no banco de dados (convenção: mesmo nome do model, mas com letra maiúscula e no plural)

*/

module.export= mongoose.model('Product', schema, 'products')
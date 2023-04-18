const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    phone: {
    type: String,
    required: true
    },

    country: {
    type: String,
    required: true
    },

    email: {
    type: String,
    required: true
    },

//subdocumento incorporado
address: {
    street: {
        type: String,
        required: true
    },
number: {
    type: String,
    required: true
    },
complement: {
    type: String,
    required: false
    },
district: {
    type: String,
    required: true
},
city: {
    type: String,
    required: true
},
state: {
    type: String,
    required: true
},
zip_code: {
    type: String,
    required: false
}

}


})

/*

parametros de mongoose.model:
1º nome da label, para uso interno(convenção: primeira letra maiúscula e singular)
2º relação de campos do esquema (contante schema)
3º nome da collection no banco de dados (convenção: mesmo nome do model, mas com letra maiúscula e no plural)

*/

module.export= mongoose.model('Supplier', schema, 'suppliers')
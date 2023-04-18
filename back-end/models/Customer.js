const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true //campo obrigatório
    },

    phone:{
        type: String,
        required: false
    },
    id_documento:{
        type: String,
        required: false
    },
    email:{
        type: String,
        required: false
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

module.export= mongoose.model('Customer', schema, 'customers')
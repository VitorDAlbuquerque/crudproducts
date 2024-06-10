const db = require("./banco")

const Pessoa = db.sequelize.define("pessoa", {
    nome:{
        type: db.Sequelize.STRING
    },
    email:{
        type: db.Sequelize.STRING
    },
    senha:{
        type: db.Sequelize.STRING
    }
})


Pessoa.sync({force: true})

module.exports = Pessoa
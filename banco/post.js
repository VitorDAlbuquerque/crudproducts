const db = require("./banco")

const Produtos = db.sequelize.define("produtos",{
    nome:{
        type: db.Sequelize.STRING
    },
    preco:{
        type: db.Sequelize.DOUBLE
    },
    qtd:{
        type: db.Sequelize.INTEGER
    },
    data_vencimento:{
        type: db.Sequelize.DATE
    },
    URLimg:{
        type: db.Sequelize.STRING
    }
})


Produtos.sync({force: true})

module.exports = Produtos
const express = require("express")
const app = express()
const handlebars = require("express-handlebars").engine
const bodyParser = require("body-parser")
const post = require("./banco/post")
const pessoa = require("./banco/pessoa")
const { where } = require("sequelize")

app.engine("handlebars", handlebars({defaultLayout: "main"}))
app.set("view engine", "handlebars")

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/", function(req,res){
  res.render("pagina_inicial.handlebars")
})

app.get("/pagina_contatos", function(req,res){
  res.render("pagina_contatos.handlebars")

})

app.post("/cadastrarPessoa", function(req,res){

  pessoa.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha
  }).then(function(){
    res.redirect("/fzrlogin")
  }).catch(function(erro){
    res.send("falha ao conectar: "+erro)
  })
})
 
app.get("/pagina_cadastrar", function(req,res){
  res.render("cadastro")
})



app.get("/pagina_produtos", function(req,res){
  post.findAll().then(function(post){
      res.render("pagina_produtos", {post: post})
  })
})

app.post("/cadastrar", function(req,res){
  post.create({
      nome: req.body.nome,
      preco: req.body.preco,
      qtd: req.body.qtd,
      data_vencimento: req.body.data_vencimento,
      URLimg: req.body.URLimg
  }).then(function(){
      res.redirect("/pagina_produtos")
  }).catch(function(erro){
      res.send("Falha ao conectar: " +erro)
  })

})


app.get("/atualizar/:id", function (req, res) {
  post.findAll({ where: { id: req.params.id } }).then(function (posts) {
    res.render("editar", { post: posts });
  });
});

app.post("/editar", function (req, res) {
  post.update(
      {
        nome: req.body.nome,
        preco: req.body.preco,
        qtd: req.body.qtd,
        data_vencimento: req.body.data_vencimento,
        URLimg: req.body.URLimg
      },
      { where: { id: req.body.id } }
    )
    .then(function () {
      res.redirect("/pagina_produtos");
    })
    .catch(function (erro) {
      res.send("Falha ao cadastrar os dados: " + erro);
    });
});





  app.get("/deletar/:id", function (req, res) {
    post.destroy({ where: { id: req.params.id } }).then(function () {
      res.redirect("/pagina_produtos");
    });
  });



 
  app.get("/fzrlogin" ,function(req,res){
    res.render("login")
  })

  app.post("/login", function (req, res) {
   
    pessoa.findOne({ where: { email: req.body.email, senha: req.body.senha} });
    if (pessoa === null) {
      console.log("incorreto")
    } else {
      res.redirect("/")
    }
  }
  )
  



 app.listen("8080")
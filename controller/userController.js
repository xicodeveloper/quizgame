const User=require("../model/userDB");

const userGet = function (req, res) {
   res.render("sign");
  };
  const userPost = async function (req, res) {
   const { mail, password, username } = req.body; // add username here
   const user = new User({ mail, username, password }); // add username here
   await User.register(user, password);
   res.redirect("/login");
 };
 const userLGet = function (req, res) {
   res.render("login");
  };


  const logout = function (req, res, next) {
   req.logout(function (err) {
   if (err) {
   return next(err);
   }
   res.redirect("/login");
   });
  };
//----------------------------------------------
const atualizaUser= async function (req, res) {
  const {id} = req.params; //Vamos buscar o ID que existe no URL
  const bio = req.body.bio;//Vamos buscar a informação atualizado do formulário
  const user = req.body.username;//Vamos buscar a informação atualizado do formulário
  const imagem = req.body.imagem;//Vamos buscar a informação atualizado do formulário


  try {
  const user2 = await User.findById(id).exec(); //Vamos buscar um documento existente em mongoDB
  if (user2) {
    user2.bio = bio; //Fazemos a atualização do documento mongoDB
    user2.username = user; //Fazemos a atualização do documento mongoDB
    user2.imagem = imagem; 
  await user2.save();//Gravamos a informação nova na BD
  res.redirect("/home");
  } else {
  console.log("Livro não encontrado");
  }
  } catch (error) {
  console.error(error);
  }
 };

   //Exportamos o indexCont para depois serem usados nas rotas
   module.exports ={userGet, userPost, userLGet, logout, atualizaUser};
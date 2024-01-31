//let bookModel = require("../model/livros");
const Question = require("../model/questionDB");//Vamos aceder ao nosso modelo criado
const Users = require("../model/userDB");//Vamos aceder ao nosso modelo criado
//INDEX => VAI POPULAR TODOS OS LIVROS NO INDEX

const mostraUsuario= async function (req, res) {
    const user = await Users.findById(req.user._id);
    console.log("User data from session:", req.user);
    res.render("home", { info: user }); //Mostra todos os livros encontrados em MongoDB
}
const mostraUsuario2= async function (req, res) {
  const user = await Users.findById(req.user._id);
 
  res.render("end", { info: user }); //Mostra todos os livros encontrados em MongoDB
}
const mostraUsuario3= async function (req, res) {
  const user = await Users.findById(req.user._id);
 
  res.render("anch", { user: user }); //Mostra todos os livros encontrados em MongoDB
}
const mostraUsuario4= async function (req, res) {
  const user = await Users.find({});
 
  res.render("rank", { user: user }); //Mostra todos os livros encontrados em MongoDB
}
const mostraAmigos2= async function (req, res) {
  const user = await Users.findById(req.user._id);
  const userF = user.friend
  const cat = req.params.cat;
  res.render('test', { user: user, amigo:userF, cat:cat});
}


const mostraUsuarioProfile= async function (req, res) {
  const id = req.params.id;
    const user = await Users.findById(id);
    res.render("profile", { user2: user }); //Mostra todos os livros encontrados em MongoDB
}
const mostraIUsuarioProfile= async function (req, res) {
  const id = req.params.id;
    const user = await Users.findById(id);
    res.render("insideProfile", { user2: user }); //Mostra todos os livros encontrados em MongoDB
}
const mostraAmigos= async function (req, res) {
  const user = await Users.findById(req.user._id).populate('friend');

//-------------------------------------------------
  res.render('friends', { amigo: user.friend, user:user});
}

const message= async function (req, res) {
  const user = await Users.findById(req.user._id);
  const { username, room } = req.query;
  res.render("message", { info: user, username:username,room }); //Mostra todos os livros encontrados em MongoDB
}
const adicionaamigos = async (req, res) => {
  const { username, email } = req.body;
  try {
    // Find the friend user by their email and username
    const friend = await Users.findOne({ username: username, mail: email });

    if (!friend) {
      return res.status(404).json({ error: "Friend not found" });
    }

    // Find the current user and add the friend to their friends list
    const currentUser = await Users.findById(req.user._id).populate("friend");

    // Check if friend is the same as the user
    if (friend._id.toString() === currentUser._id.toString()) {
      const errorMessage = "Cannot add yourself as a friend";
      return res.status(400).json({ error: errorMessage });
    }
    
    // Check if friend is already present in the friends list
    if (currentUser.friend.some((f) => f._id.toString() === friend._id.toString())) {
      const errorMessage = "You already have him as a friend";
      return res.status(400).json({ error: errorMessage });
    }

    currentUser.friend.push(friend._id);
    await currentUser.save();
    
    res.redirect("/friends");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

///////////////////////////////////

//Exportamos o indexCont para depois serem usados nas rotas
module.exports = { mostraUsuario4,mostraUsuario3, mostraUsuario2,message,mostraUsuario, mostraIUsuarioProfile,mostraUsuarioProfile, mostraAmigos, adicionaamigos, mostraAmigos2};

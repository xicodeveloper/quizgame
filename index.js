
const express=require("express");
const session = require('express-session');
const passport = require("passport");
const localStrategy = require('passport-local');
 const http = require("http");
const { Server } = require("socket.io");
//--------------------------
const user = require("./model/userDB"); // esquema da bd com os dados do utilizador
const Question = require("./model/questionDB"); // esquema da bd com os dados do utilizador

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const multer = require('multer');
const bootName="josh";
const formatMessage = require("./public/js/utils/messages");
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    sortUsersByCount,
} = require("./public/js/utils/users");
//---------------------------------
const app=express();
const PORT=3000;
const server = http.createServer(app);
const io = new Server(server);
//---------------------------
app.set("view engine", "ejs"); 
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
//--------------------------------
const loginRoute=require("./routes/loginRoute");
const homeRoute=require("./routes/homeRoute");
const roomsRoute=require("./routes/roomsRoute");
const CRoute=require("./routes/CreateRoomRoute");
const chatRoute=require("./routes/chatRoute");
const messageRoute=require("./routes/messageRoute");
const profileRoute=require("./routes/profileRoute");
const rankRoute=require("./routes/rankRoute");
const anchRoute=require("./routes/anchRoute");
const questionRoute=require("./routes/questionRoute");
const signRoute=require("./routes/signRoute");
const friendsRoute=require("./routes/friendsRoute");
const addRoute=require("./routes/addRoute");
const insideProfile=require("./routes/insideProfile");
const endRoute=require("./routes/endRoute");
const testRoute=require("./routes/testeRoute");
const testRoute2=require("./routes/logintesteRoute");


app.use(
    session({
    secret: "your-secret-key", //é usado para encriptar dados da sessão
    resave: false,
    saveUninitialized: false,
    })
   );
   //PASSPORT CONFIG//////

   app.use(passport.initialize()); //inicializa passport
   app.use(passport.session()); //Irá aceder a sessão do cliente guardado no “session-express”. É Éusado para restaurar uma sessão
  // de utilizador. Isso permitirá que o website mantenha a autenticação do utilizador em todas as solicitações usando dados de
   //sessão
   passport.use(new localStrategy(user.authenticate())); //Authenticate é adicionado automaticamente pelo plugin
   passport.serializeUser(user.serializeUser()); //guarda um utilizador na sessão
   passport.deserializeUser(user.deserializeUser()); //retira um utilizador na sessão
   //app.use('/image', express.static('image'));
//app.use(express.static("image"));

//Aqui chamamaos a nossa função anonima que contem o nosso socket.io

app.use(testRoute2)
app.use(testRoute)
app.use(homeRoute);
app.use(loginRoute);
app.use(roomsRoute);
app.use(CRoute);
app.use(chatRoute);
app.use(messageRoute);
app.use(profileRoute);
app.use(rankRoute);
app.use(anchRoute);
app.use(questionRoute);
app.use(signRoute);
app.use(friendsRoute);
app.use(addRoute);
app.use(insideProfile);
app.use(endRoute);



//Função que é responsavel por chamar e executar o socket io.

server.listen(PORT, function(error){
if(error){
    console.log(error);
}else{
console.log("Listening at Port", PORT)

}
})
//--------------------------
let count=0;
let perguntas_vistas=0;
let botName="BOT"


//--------------------------------------------------Chat----------------------------



// Run when client connects
io.on("connection", (socket) => {

    socket.on("joinRoom", ({ username, room, cat }) => {
      try {
        var user = {};
            user = userJoin(socket.id, username, room, count, cat, perguntas_vistas);
            console.log(user);
            socket.join(user.room);
            socket.emit("message", formatMessage(botName, "Bem Vindo ao Chat!"));
            socket.on("QuestionMessage", (msg) => {
              const user = getCurrentUser(socket.id);
              io.to(user.room).emit("message", formatMessage(user.username, msg));
            });
          } catch (error) {
            socket.emit("message", formatMessage(botName, error.message));
            setTimeout(() => {
              socket.emit("redirect", "/home"); // Emit the custom event to perform the redirection
              socket.disconnect();
            }, 5000);
           
          }
        //socket.on("categorySelected", async (selectedCategory) => {
          //const questions = await Question.find({ category: selectedCategory });
        //  socket.emit("questionsLoaded", questions);
      //  });
        // Welcome current user
        // Broadcast when a user connects
        socket.broadcast
            .to(user.room)
            .emit(
                "message",
                formatMessage(botName, `${user.username} has joined the chat`)
            );

        // Send users and room info
        io.to(user.room).emit("roomUsers", {
            room: user.room,
            users: getRoomUsers(user.room),
        });
    });

    // Listen for chatMessage
    socket.on("chatMessage", (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });
    async function getRandomQuestion() {
      const user = getCurrentUser(socket.id);
      if(user.cat!='Mix'){
      const count = await Question.countDocuments({ category: user.cat });
      const rand = Math.floor(Math.random() * count);
      const question = await Question.aggregate([
        { $match: { category: user.cat } },
        { $skip: rand },
        { $limit: 1 }
      ]);
      return question[0];
    }else{
      const count = await Question.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const question = await Question.aggregate([
        { $skip: rand },
        { $limit: 1 }
      ]);
      return question[0];
    }
    }
    socket.on("submitAnswer", ({ userId, count ,perguntas_vistas}) => {
      const user = getCurrentUser(userId);
      const userR = getRoomUsers(user.room)
      user.count =user.count+count;
      user.perguntas_vistas=user.perguntas_vistas+perguntas_vistas;
      console.log(user.count)
      io.to(user.room).emit("message", formatMessage(user.username, `I have ${user.count} points!`));
      io.to(user.room).emit("message2", {
        message: `Updated count for ${user.username}`,
        users: userR,
      });
      io.to(user.room).emit("userCountUpdate", {
        userId: user.id,
        count: user.count,
        perguntas_vistas:perguntas_vistas,
    });      
     // if (user.count === 200) {
        // User has reached max points, end the game
       // socket.emit("maxPointsReached", { userId });
        //return;
      //}
      console.log(user)
      getRandomQuestion().then(question => {
        io.to(user.room).emit("newQuestion", question);
      });
    });
   
    // Runs when client disconnects
    socket.on("disconnect", async() => {
      const user = await userLeave(socket.id);
        if (user) {
            io.to(user.room).emit(
                "message",
                formatMessage(botName, `${user.username} has left the chat`)
            );

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            });
        }
    });
    

});


















//---------------




/*
const Question = require("./model/questionDB");
const questions = [  {
    category: "Art",
    type: "multiple",
    difficulty: "easy",
    question: "Who painted the Mona Lisa?",
    correct_answer: "Leonardo da Vinci",
    incorrect_answers: ["Pablo Picasso", "Claude Monet", "Vincent van Gogh"]
  },
  {
    category: "Art",
    type: "multiple",
    difficulty: "hard",
    question: "Painter Piet Mondrian (1872 - 1944) was a part of what movement?",
    correct_answer: "Neoplasticism",
    incorrect_answers: ["Precisionism", "Cubism", "Impressionism"]
  },
  {
    category: "Art",
    type: "multiple",
    difficulty: "medium",
    question: "What nationality was the surrealist painter Salvador Dali?",
    correct_answer: "Spanish",
    incorrect_answers: ["Italian", "French", "Portuguese"]
  },
  {
    category: "Art",
    type: "multiple",
    difficulty: "hard",
    question: "Albrecht D&uuml;rer&#039;s birthplace and place of death were in...",
    correct_answer: "N&uuml;rnberg",
    incorrect_answers: ["Augsburg", "Bamberg", "Berlin"]
  },
  {
    category: "Art",
    type: "multiple",
    difficulty: "hard",
    question: "What year did Albrecht D&uuml;rer create the painting &quot;The Young Hare&quot;?",
    correct_answer: "1502",
    incorrect_answers: ["1702", "1402", "1602"]
  },
  {
    category: "Art",
    type: "multiple",
    difficulty: "medium",
    question: "Which of these are the name of a famous marker brand?",
    correct_answer: "Copic",
    incorrect_answers: ["Dopix", "Cofix", "Marx"]
  },
  {
    category: "Art",
    type: "multiple",
    difficulty: "medium",
    question: "Which artist&#039;s style was to use small different colored dots to create a picture?",
    correct_answer: "Georges Seurat",
    incorrect_answers: ["Paul C&eacute;zanne", "Vincent Van Gogh", "Henri Rousseau"]
  },
  {
    category: "Art",
    type: "multiple",
    difficulty: "hard",
    question: "Which of these is not an additional variation of the color purple?",
    correct_answer: "Kobicha",
    incorrect_answers: ["Byzantium", "Pomp and Power", "Palatinate"]
  }]
Question.insertMany(questions)
.then(docs => {
  console.log('Documents successfully inserted:', docs.length);
})
.catch(err => {
  console.error('Error inserting documents:', err);
});
*/
mongoose
 .connect(
 "mongodb+srv://mongo:HhmYaggphk1Dl8ie@cluster.ihpu8s5.mongodb.net/?retryWrites=true&w=majority",
 { useUnifiedTopology: true, useNewUrlParser: true }
 )
 .then(() => {
 console.log("Connected");
 })
 .catch((err) => {
    console.log(err);
 });

 //-------------------------------------



const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room");
const userList = document.getElementById("users");

// Get username and room and category from URL
const { username, room, cat } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room, cat});

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
    outputRoomName(room);
   outputUsers2(users) ;
    outputUsers(users);

});

socket.on("messageCat", (message) => {
  console.log(message);
  erro(message);

});
// Listen for the "redirect"
socket.on("redirect", (url) => {
  window.location.href = url; 
});

// Message from server
socket.on("message", (message) => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
let clicked=false;
let questionVistas=0;
let perguntas_corretas=0;
registerAnswerButtonClickHandlers();
socket.on("newQuestion", question => {
  // Display the new question
  questionVistas++;
  if(questionVistas==10){
    window.location.href = "/end";
  }
  const randomNum = Math.floor(Math.random() * (4 - 1 + 1)) + 1
  const newQuestionElement = document.createElement("div");
  if(randomNum==1){ 
  newQuestionElement.innerHTML = `
    <div id="question-text">
      <h5>${question.category}</h5>
      <h6>${question.question}</h6>
      <div class="insideperguntaSection">
          <button class="circular" value="certo">${question.correct_answer}</button>
          <button class="circular">${question.incorrect_answers[0]}</button>
          <button class="circular">${question.incorrect_answers[1]}</button>
          <button class="circular">${question.incorrect_answers[2]}</button>
      </div>
    </div>
  `
  }else if(randomNum==2){
    newQuestionElement.innerHTML = `
    <div id="question-text">
      <h5>${question.category}</h5>
      <h6>${question.question}</h6>
      <div class="insideperguntaSection">
          
          <button class="circular">${question.incorrect_answers[0]}</button>
          <button class="circular" value="certo">${question.correct_answer}</button>
          <button class="circular">${question.incorrect_answers[1]}</button>
          <button class="circular">${question.incorrect_answers[2]}</button>
      </div>
    </div>
  `

  }else if(randomNum==3){
    newQuestionElement.innerHTML = `
    <div id="question-text">
      <h5>${question.category}</h5>
      <h6>${question.question}</h6>
      <div class="insideperguntaSection">
          
          <button class="circular">${question.incorrect_answers[0]}</button>
          <button class="circular">${question.incorrect_answers[1]}</button>
          <button class="circular" value="certo">${question.correct_answer}</button>
          <button class="circular">${question.incorrect_answers[2]}</button>
      </div>
    </div>
  `

  }else if(randomNum==4){
    newQuestionElement.innerHTML = `
    <div id="question-text">
      <h5>${question.category}</h5>
      <h6>${question.question}</h6>
      <div class="insideperguntaSection">
          <button class="circular">${question.incorrect_answers[0]}</button>
          <button class="circular">${question.incorrect_answers[1]}</button>
          <button class="circular">${question.incorrect_answers[2]}</button>
          <button class="circular" value="certo">${question.correct_answer}</button>
      </div>
    </div>
  `
  };

  // Reset clicked variable
  const oldQuestionElement = document.getElementById("question-text");
  oldQuestionElement.parentNode.replaceChild(newQuestionElement, oldQuestionElement);
  clicked = false;
  
  registerAnswerButtonClickHandlers();
});

function registerAnswerButtonClickHandlers() {
const pointsList = document.getElementById("points-list");
const answerButtons = document.querySelectorAll('.circular');
answerButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const rightAnswer = event.target.value;
    if ('certo' === rightAnswer && clicked==false) {
      // Increment points by 1 and emit the updated points to the server
      userId=socket.id;
      console.log(userId);
      let count = 20;
      clicked = true;
      let perguntas_vistas=1;
      socket.emit("QuestionMessage", "Respondi corretamente a pergunta :)");
      socket.emit("submitAnswer", { userId, count,perguntas_vistas});
      button.style.backgroundColor = "green";
      console.log("correct");
      
    } else if(clicked==false && 'certo' != rightAnswer) {
      let perguntas_vistas=1;
      clicked=true;
      userId=socket.id;
      let count = 0;
      button.style.backgroundColor = "red";
      socket.emit("submitAnswer", { userId, count, perguntas_vistas });
      socket.emit("QuestionMessage", "Respondi incorretamente a pergunta :(");
      console.log("incorrect");
    }
  });
});
}
// Message submit
chatForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get message text
    let msg = e.target.elements.msg.value;

    msg = msg.trim();

    if (!msg) {
        return false;
    }

    // Emit message to server
    socket.emit("chatMessage", msg);

    // Clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement("div");
    div.classList.add("message");
    const p = document.createElement("p");
    p.classList.add("meta");
    p.innerText = message.username;
    p.innerHTML += `<span>${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement("p");
    para.classList.add("text");
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector(".chat-messages").appendChild(div);
}


// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}
// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
      const li = document.createElement("li");
      li.innerText = user.username;
      userList.appendChild(li);
  });


}
function outputUsers2(users) {
  const playerList = document.getElementById("player-list");

  // Clear the player list
  playerList.innerHTML = "";

  // Sort the users array based on count in descending order
  const sortedUsers = users.sort((a, b) => b.count - a.count);

  // Iterate over the sorted users array and create list items for each user
  sortedUsers.forEach((user, index) => {
    // Calculate total points based on count
    const li = document.createElement("li");
    li.innerText = `${index + 1}. ${user.username} - ${user.count} points`;
    playerList.appendChild(li);
  });
}
socket.on("message2", ({ message, users }) => {
  console.log(message);
  outputUsers2(users);
});


//Prompt the user before leave chat room
document.getElementById("leave-btn").addEventListener("click", () => {

    const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
    if (leaveRoom ) {
        window.location = "/end";
      
    }
  })
  
// Get DOM elements
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Function to display a message
function displayMessage(message) {
  const p = document.createElement('p');
  p.innerText = message;
  messageContainer.appendChild(p);
}

// Event listener for form submission
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message !== '') {
    // Send the message to the server
    sendMessage(roomId, message);
    // Clear the input field
    messageInput.value = '';
  }
});
``

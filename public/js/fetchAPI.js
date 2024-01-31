"use strict";
console.log("conectado");

let hr = document.getElementById("myHR");
let block = document.getElementById("block");
const urlHistoria="https://opentdb.com/api.php?amount=50&category=23&type=multiple";
//Adicionamos à tag <select> um addEbentListener que é executado quando há uma mudança ("change") na opção de <select>
block.addEventListener("change", function () {
  getDadosSW(); 
});

function getDadosSW() {
  fetch(urlHistoria) //Vai buscar o recurso de SWAPI
    .then(mostraErro) //chama a função mostraErro(res) caso a resposta do servidor for "negativo". É depois apanhado no ".catch"
    .then((res) => res.json()) //Caso não haja nenhum erro, transforma o JSON num objecto JS
    .then((json) => getPesronData(json)) //A função getPersonData() recebe como parametro o objecto Json
    .catch((err) => {
      console.log(err)//mostra o erro ao utilizador caos o recurso, por exemplo, não está disponivel. O erro é mostrado em  <p id="error"></p>. Se querem testar, selecionam o valor 100 de <select>
    });
}

function getPesronData(json) {
  console.log(json); //imprimi o objecto na consola do browser.
  //Vamos criar uma estrutura HTML onde inserimos os dados provenientes do JSON. A função é chamada em "getDadosSW()";
  let html = `
  <div class="perguntaSection">
        <h5 type="">${json.question[1]}</h5>
    <div class="insideperguntaSection">
        <button>${json.correct_answer[1]}</button>
        <button>${json.incorrect_answer[1]}</button>
        <button>${json.correct_answer[1]}</button> 
    </div>
  <div>`;
  hr.insertAdjacentHTML("afterend", html);
}

//Criamos uma função onde definimos os erro que queremos mostrar ao cliente CASO a resposta do servidor não é ok (!res.ok). Se for de incusesso,mostramos ao utilizador o status e o url. Esta função é chamada depois na outra função => "getDadosSw()"";
function mostraErro(res) {
  if (!res.ok) 
  throw Error(res.status + "-" + res.url); //chamamos o construtor "Error" e definimos a mensagem que queremos mostrar

  return res;
}


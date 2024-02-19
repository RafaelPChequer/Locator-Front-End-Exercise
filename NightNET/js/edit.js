
let userLogado = JSON.parse(localStorage.getItem("userLogado"));
let listaUser = JSON.parse(localStorage.getItem("listaUser"));
function loadProfile() {
    var nome = userLogado.nome;
    var idade = userLogado.idade;

    document.getElementById('nome').textContent = nome;
    document.getElementById('idade').textContent = idade;
}

// Função para editar um campo e atualizar o Local Storage
function editField(fieldId) {
    var fieldValue = document.getElementById(fieldId).textContent;
    var newFieldValue = prompt("Digite a nova informação:", fieldValue);

    if (newFieldValue !== null) {
        document.getElementById(fieldId).textContent = newFieldValue;
        userLogado[fieldId] = newFieldValue;

        localStorage.setItem("userLogado", JSON.stringify(userLogado));

    }
}

function salvar() {
    userLogado.nomeCad = userLogado.nome;
    userLogado.idadeCad = userLogado.idade;
    localStorage.setItem('userLogado', JSON.stringify(userLogado));
    listaUser[userLogado.id] = userLogado;
    localStorage.setItem('listaUser', JSON.stringify(listaUser));
}
function voltar(){
    window.location.href = '../html/home.html';
}

function senha() {
    let senhaAtualInput = document.getElementById('senhaAtual').value;
    let senhaNovaInput = document.getElementById('senhaNova').value;

    if (senhaAtualInput === userLogado.senha) {
        userLogado.senha = senhaNovaInput;
        localStorage.setItem("userLogado", JSON.stringify(userLogado));
        listaUser[userLogado.id].senhaCad=userLogado.senha;
        alert("Senha alterada com sucesso!");
    } else {
        alert("A senha atual não corresponde à senha armazenada.");
    }
}


// Chama a função para carregar o perfil quando a página é carregada
window.onload = loadProfile;

function toggle() {
    let links = document.getElementById ("links") ;
    let blob = document.getElementById("blob");
    blob.classList.toggle("open");
    if (links.style.display == "block"){
       links.style.display = "none";
    } else {
       links.style.display = "block";
    }
  }
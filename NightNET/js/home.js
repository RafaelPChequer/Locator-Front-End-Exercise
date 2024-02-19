let userLogado = JSON.parse(localStorage.getItem('userLogado'));
let listaUser = JSON.parse(localStorage.getItem('listaUser'));

function atualizarNomePerfil() {
    let perfilElement = document.querySelector("#MeuPerfil");
    perfilElement.textContent = userLogado.nome;

}

function atualizarIdade() {
    let perfilIdade = document.querySelector("#Idade");
    perfilIdade.textContent = userLogado.idade + " anos";
}

function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-theme-d1";
    } else {
        x.className = x.className.replace("w3-show", "");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace(" w3-theme-d1", "");
    }
}


function openNav() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__image");
const pictureImageTxt = "Choose an image";
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function (e) {
const inputTarget = e.target;
const file = inputTarget.files[0];
if (file) {
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
    const readerTarget = e.target;

    const img = document.createElement("img");
    img.src = readerTarget.result;
    img.classList.add("picture__img");

    pictureImage.innerHTML = "";
    pictureImage.appendChild(img);
    });

    reader.readAsDataURL(file);
} else {
    pictureImage.innerHTML = pictureImageTxt;
}
});

function novabio(){
    const nova_bio = elementoBiografia.value;
    elementoBiografia.value = "";
    bio.textContent = nova_bio;
    bio.style.fontFamily =  ("Copperplate", "Courier New", 'Fantasy');
    bio.style.color = "#281317";
}
const bio = document.getElementById("bio");
const elementoBiografia = document.getElementById('biografia');
const botao_novaBio = document.getElementById("botao");
botao_novaBio.addEventListener("click",novabio);

document.addEventListener("DOMContentLoaded", function() {
    atualizarNomePerfil();
    atualizarIdade();
});
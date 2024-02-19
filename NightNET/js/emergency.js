// Função para obter os números armazenados no Local Storage
function getNumerosArmazenados() {
    const numerosArmazenados = localStorage.getItem("numeros");
    return numerosArmazenados ? JSON.parse(numerosArmazenados) : [];
}

// Função para salvar os números no Local Storage
function salvarNumerosArmazenados(numeros) {
    localStorage.setItem("numeros", JSON.stringify(numeros));
}

// Função para atualizar a lista de números exibida
function atualizarListaNumeros() {
    const numerosArmazenados = getNumerosArmazenados();
    const listaNumeros = document.querySelector("#listaNumeros");
    listaNumeros.innerHTML = "";

    for (let i = 0; i < numerosArmazenados.length; i++) {
        const novoItem = document.createElement("li");
        novoItem.textContent = numerosArmazenados[i];
        listaNumeros.appendChild(novoItem);

        const novoOption = document.createElement("option");
        novoOption.value = i + 1;
        novoOption.textContent = numerosArmazenados[i];
        document.querySelector("#numero").appendChild(novoOption);
    }

    const numeroSelecionado = localStorage.getItem("numeroSelecionado");
    document.querySelector("#numero").value = numeroSelecionado;
}

// Função para adicionar um novo número
function adicionarNumero() {
    const numeroSelecionado = document.querySelector("#numero").value;
    const inputNumero = document.querySelector("#inputNumero").value;
    const inputIndice = document.querySelector("#inputIndice").value;

    if (inputNumero && inputIndice) {
        const novoNumero = inputIndice + " - " + inputNumero;
        const numerosArmazenados = getNumerosArmazenados();
        numerosArmazenados.push(novoNumero);
        salvarNumerosArmazenados(numerosArmazenados);

        const novoOption = document.createElement("option");
        novoOption.value = numerosArmazenados.length.toString();
        novoOption.textContent = novoNumero;
        document.querySelector("#numero").appendChild(novoOption);

        document.querySelector("#inputNumero").value = "";
        document.querySelector("#inputIndice").value = "";
        atualizarListaNumeros();

        localStorage.setItem("numeroSelecionado", numeroSelecionado);

        location.reload(); // Recarrega a página
    }
}

// Função para realizar a chamada de emergência
function realizarChamada() {
    const numeroSelecionado = document.querySelector("#numero").value;
    const numerosArmazenados = getNumerosArmazenados();

    if (numeroSelecionado !== "0" && numerosArmazenados.length > 0) {
        const numeroWhatsapp = numerosArmazenados[numeroSelecionado - 1].split(" - ")[1];
        const mensagem = document.querySelector("#inputMensagem").value || "Estou em perigo";
        const url = "https://wa.me/" + numeroWhatsapp + "?text=" + encodeURIComponent(mensagem);

        window.open(url);
    } else {
        alert("Selecione um número válido e adicione pelo menos um número antes de enviar a mensagem de emergência.");
    }
}

// Evento disparado quando a página é carregada
window.addEventListener("DOMContentLoaded", atualizarListaNumeros);
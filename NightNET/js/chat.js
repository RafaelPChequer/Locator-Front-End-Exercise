document.addEventListener('DOMContentLoaded', function () {
    const friendList = document.getElementById('friendList');
    const messages = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const deleteChatButton = document.getElementById('deleteChatButton');
    const imageInput = document.getElementById('imageInput');
    const sendImageButton = document.getElementById('sendImageButton');

    let selectedFriend = null;
    let userLogado = null;

    function loadUserLogado() {
        // Obter o usuário logado do localStorage
        userLogado = JSON.parse(localStorage.getItem('userLogado'));
    }

    function loadFriendList() {
        const friends = userLogado.amigos;

        friends.forEach((friend) => {
            const friendItem = document.createElement('li');
            friendItem.classList.add('friendListItem');
            friendItem.textContent = friend;

            friendItem.addEventListener('click', () => {
                selectFriend(friendItem);
            });

            friendList.appendChild(friendItem);
        });
    }

    function loadMessages(friend) {
        const friendName = friend.textContent;
        selectedFriend = friend;

        messages.innerHTML = '';

        const messageHistory = JSON.parse(localStorage.getItem('messageHistory')) || [];

        const messagesWithFriend = messageHistory.filter((message) => {
            return (
                (message.sender === userLogado.nome && message.receiver === friendName) ||
                (message.sender === friendName && message.receiver === userLogado.nome)
            );
        });

        messagesWithFriend.forEach((message) => {
            const messageItem = document.createElement('div');
            messageItem.classList.add('message');
            if (message.type === 'image') {
                messageItem.innerHTML = `<span class="sender">${message.sender}:</span> <img src="${message.content}" class="image-message">`;
            } else {
                messageItem.innerHTML = `<span class="sender">${message.sender}:</span> ${message.content}`;
            }
            messages.appendChild(messageItem);
        });

        scrollToBottom();
    }

    function selectFriend(friendItem) {
        const selectedFriendItem = document.querySelector('.friendListItem.selected');

        if (selectedFriendItem) {
            selectedFriendItem.classList.remove('selected');
        }

        friendItem.classList.add('selected');
        loadMessages(friendItem);
    }

    function sendMessage() {
        const messageContent = messageInput.value;

        if (messageContent.trim() === '') {
            return;
        }

        const friendName = selectedFriend.textContent;

        const message = {
            sender: userLogado.nome,
            receiver: friendName,
            content: messageContent.trim(),
            type: 'text',
        };

        const messageItem = document.createElement('div');
        messageItem.classList.add('message');
        messageItem.innerHTML = `<span class="sender">${message.sender}:</span> ${message.content}`;
        messages.appendChild(messageItem);

        scrollToBottom();

        const messageHistory = JSON.parse(localStorage.getItem('messageHistory')) || [];
        messageHistory.push(message);
        localStorage.setItem('messageHistory', JSON.stringify(messageHistory));

        // Salvar a mensagem no localStorage do amigo também
        const friend = JSON.parse(localStorage.getItem(friendName));
        const friendMessageHistory = JSON.parse(localStorage.getItem(`${friendName}-messageHistory`)) || [];
        friendMessageHistory.push(message);
        localStorage.setItem(`${friendName}-messageHistory`, JSON.stringify(friendMessageHistory));

        messageInput.value = '';
    }

    function sendImage() {
        const friendName = selectedFriend.textContent;
        const file = imageInput.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = function (e) {
            const imageContent = e.target.result;

            const message = {
                sender: userLogado.nome,
                receiver: friendName,
                content: imageContent,
                type: 'image',
            };

            const messageItem = document.createElement('div');
            messageItem.classList.add('message');
            messageItem.innerHTML = `<span class="sender">${message.sender}:</span> <img src="${message.content}" class="image-message">`;
            messages.appendChild(messageItem);

            scrollToBottom();

            const messageHistory = JSON.parse(localStorage.getItem('messageHistory')) || [];
            messageHistory.push(message);
            localStorage.setItem('messageHistory', JSON.stringify(messageHistory));

            // Salvar a mensagem no localStorage do amigo também
            const friend = JSON.parse(localStorage.getItem(friendName));
            const friendMessageHistory = JSON.parse(localStorage.getItem(`${friendName}-messageHistory`)) || [];
            friendMessageHistory.push(message);
            localStorage.setItem(`${friendName}-messageHistory`, JSON.stringify(friendMessageHistory));

            imageInput.value = null;
        };

        reader.readAsDataURL(file);
    }

    function deleteChat() {
        const friendName = selectedFriend.textContent;

        // Excluir as mensagens do chat do usuário logado
        const messageHistory = JSON.parse(localStorage.getItem('messageHistory')) || [];
        const updatedMessageHistory = messageHistory.filter((message) => {
            return (
                (message.sender !== userLogado.nome || message.receiver !== friendName) &&
                (message.sender !== friendName || message.receiver !== userLogado.nome)
            );
        });
        localStorage.setItem('messageHistory', JSON.stringify(updatedMessageHistory));

        // Excluir as mensagens do chat do amigo
        const friendMessageHistory = JSON.parse(localStorage.getItem(`${friendName}-messageHistory`)) || [];
        const updatedFriendMessageHistory = friendMessageHistory.filter((message) => {
            return (
                (message.sender !== userLogado.nome || message.receiver !== friendName) &&
                (message.sender !== friendName || message.receiver !== userLogado.nome)
            );
        });
        localStorage.setItem(`${friendName}-messageHistory`, JSON.stringify(updatedFriendMessageHistory));

        // Limpar as mensagens exibidas na tela
        messages.innerHTML = '';
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    loadUserLogado();
    loadFriendList();

    sendButton.addEventListener('click', sendMessage);

    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    sendImageButton.addEventListener('click', sendImage);

    deleteChatButton.addEventListener('click', deleteChat);
});

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
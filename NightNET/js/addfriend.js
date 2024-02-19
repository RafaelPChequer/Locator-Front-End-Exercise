function loadSearchData() {
    const listaUser = JSON.parse(localStorage.getItem('listaUser'));
    const names = listaUser.map(user => user.nomeCad);
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
  
    activateUser(userLogado);
  
    const list = document.getElementById('list');
    const friendList = document.getElementById('friendList');
  
    function addFriend(user) {
      if (!userLogado.amigos.includes(user)) {
        userLogado.amigos.push(user);
        
   
    
        console.log(`Adicionar ${user} como amigo`);
        console.log(`Lista de amigos: ${userLogado.amigos}`);
        localStorage.setItem('userLogado', JSON.stringify(userLogado));
        const foundUser = listaUser.find(u => u.userCad === user);
        if (foundUser) {
          foundUser.amigosCad.push(userLogado.userCad);
          localStorage.setItem('listaUser', JSON.stringify(listaUser));
        }
        const friendItem = createFriendItem(user);
        friendList.appendChild(friendItem);
      }
    }
  
    function removeFriend(user, friendItem) {
      userLogado.amigos = userLogado.amigos.filter(friend => friend !== user);
      localStorage.setItem('userLogado', JSON.stringify(userLogado));
      console.log(`Remover ${user} como amigo`);
      console.log(`Lista de amigos: ${userLogado.amigos}`);
      const foundUser = listaUser.find(u => u.userCad === user);
      if (foundUser) {
        foundUser.amigosCad = foundUser.amigosCad.filter(friend => friend !== userLogado.userCad);
        localStorage.setItem('listaUser', JSON.stringify(listaUser));
      }
      friendList.removeChild(friendItem);
    }
  
    function createFriendItem(user) {
      const friendItem = document.createElement('li');
      friendItem.classList.add('friendListItem');
  
      const friendName = document.createElement('span');
      friendName.classList.add('friendListItemName');
      friendName.innerText = user;
  
      const removeButton = document.createElement('button');
      removeButton.id = 'removeButton';
      removeButton.classList.add('friendListItemButton');
      removeButton.innerText = 'Remover Amigo';
  
      removeButton.addEventListener('click', () => {
        const friendItem = removeButton.parentNode;
        const user = friendName.innerText;
        removeFriend(user, friendItem);
      });
  
      friendItem.appendChild(friendName);
      friendItem.appendChild(removeButton);
      return friendItem;
    }
  
    function createListItem(user) {
      const listItem = document.createElement('li');
      listItem.classList.add('listItem');
  
      const name = document.createElement('span');
      name.classList.add('listItemName');
      name.innerText = user;
  
      const addButton = document.createElement('button');
      addButton.classList.add('listItemButton');
      addButton.innerText = 'Adicionar Amigo';
  
      addButton.addEventListener('click', () => {
        addFriend(user);
      });
  
      listItem.appendChild(name);
      listItem.appendChild(addButton);
      return listItem;
    }
  
    names.forEach((user) => {
      const listItem = createListItem(user);
      list.appendChild(listItem);
    });
  
    userLogado.amigos.forEach((friend) => {
      const friendItem = createFriendItem(friend);
      friendList.appendChild(friendItem);
    });
  }
  
  function search() {
    const listContainer = document.getElementById('list');
    const listItems = document.getElementsByClassName('listItem');
    const searchTerm = document.getElementById('searchbar').value.toLowerCase();
  
    let noResults = true;
    for (let i = 0; i < listItems.length; i++) {
      const listItemText = listItems[i].getElementsByTagName('span')[0].innerText.toLowerCase();
      if (!listItemText.includes(searchTerm) || searchTerm === "") {
        listItems[i].style.display = "none";
      } else {
        listItems[i].style.display = "flex";
        noResults = false;
      }
    }
    listContainer.style.display = noResults ? "none" : "block";
  }
  
  function changeColor(btn) {
    const buttons = document.getElementsByClassName("userButton");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    btn.classList.add("active");
  }
  
  function getFriendsList() {
    const selectedButtonId = localStorage.getItem('selectedButtonId');
    let friendsList = localStorage.getItem(`friendsList_${selectedButtonId}`);
  
    if (!friendsList) {
      friendsList = [];
    } else {
      friendsList = JSON.parse(friendsList);
    }
  
    return friendsList;
  }
  
  function activateUser(user) {
    const activeUser = user;
    console.log("Active user: ", activeUser);
    localStorage.setItem("activeUser", activeUser);
  
    const listaUser = JSON.parse(localStorage.getItem('listaUser'));
    const foundUser = listaUser.find(u => u.userCad === user.userCad);
    if (foundUser) {
      foundUser.amigosCad = user.amigos;
      localStorage.setItem('listaUser', JSON.stringify(listaUser));
    }
  }

function addFriend(user) {
  if (!userLogado.amigos.includes(user)) {
    userLogado.amigos.push(user);
    console.log(`Adicionar ${user} como amigo`);
    console.log(`Lista de amigos: ${userLogado.amigos}`);
    localStorage.setItem('userLogado', JSON.stringify(userLogado));
    const foundUser = listaUser.find(u => u.userCad === user);
    if (foundUser) {
      foundUser.amigosCad.push(userLogado.userCad);
      localStorage.setItem('listaUser', JSON.stringify(listaUser));
    }
    const friendItem = createFriendItem(user);
    friendList.appendChild(friendItem);
  }
}

function createFriendItem(user) {
  const friendItem = document.createElement('li');
  friendItem.classList.add('friendListItem');

  const friendName = document.createElement('span');
  friendName.classList.add('friendListItemName');
  friendName.innerText = user;

  const removeButton = document.createElement('button');
  removeButton.id = 'removeButton';
  removeButton.classList.add('friendListItemButton');
  removeButton.innerText = 'Remover Amigo';

  removeButton.addEventListener('click', () => {
    const friendItem = removeButton.parentNode;
    const user = friendName.innerText;
    removeFriend(user, friendItem);
  });

  friendItem.appendChild(friendName);
  friendItem.appendChild(removeButton);
  return friendItem;
}

function removeFriend(user, friendItem) {
  userLogado.amigos = userLogado.amigos.filter(friend => friend !== user);
  localStorage.setItem('userLogado', JSON.stringify(userLogado));
  console.log(`Remover ${user} como amigo`);
  console.log(`Lista de amigos: ${userLogado.amigos}`);
  const foundUser = listaUser.find(u => u.userCad === user);
  if (foundUser) {
    foundUser.amigosCad = foundUser.amigosCad.filter(friend => friend !== userLogado.userCad);
    localStorage.setItem('listaUser', JSON.stringify(listaUser));
  }
  friendList.removeChild(friendItem);
}

function loadFriendList() {
  const userLogado = JSON.parse(localStorage.getItem("userLogado"));
  const friends = userLogado.amigosCad;

  friends.forEach(function(friend) {
    const friendItem = createFriendItem(friend);
    friendList.appendChild(friendItem);
  });
}


  
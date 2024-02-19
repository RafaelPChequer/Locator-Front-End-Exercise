/* Blob do menu */
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

 /*procurar evento*/
 const searchBar = document.getElementById('search-bar');
 const searchWrapper = document.querySelector('.search-container')
 const searchResults = document.getElementById('search-results');
 const inputBox = searchWrapper.querySelector('#search-bar');
 const data = [
   'Night Market',
   'Clube Chalezinho',
   'Major',
   'CIA 2023',
   'Expo Agro',
   'Halterados',
 ];
 
 searchBar.addEventListener('input', () => {
   const input = searchBar.value.toLowerCase();
   let filteredData = [];
 
   if (input.length) {
     filteredData = data.filter(item => item.toLowerCase().includes(input));
   }
 
   renderResults(filteredData);
 });
 
 function renderResults(filteredData) {
   searchResults.innerHTML = '';
 
   if (filteredData.length) {
     filteredData.forEach(item => {
       const li = document.createElement('li');
       li.textContent = item;
       searchResults.appendChild(li);
 
       li.addEventListener('click', () => {
         searchBar.value = item;
         searchResults.innerHTML = '';
       });
     });  
   }
 }
 
 inputBox.addEventListener('keyup', (e) => {
   let userData = e.target.value;
 
   if (e.key === 'Enter') {
     if (userData) {
       window.open(`https://www.google.com/search?q=${userData}`, '_blank');
     }
   }
 });

 /*NOTIFICAÇÃO*/

setTimeout(function(){
  document.querySelector('.notify-alert-box').style.top = '0'
},1000);
 
document.querySelector('#notify-button').onclick = async()=>{
  localStorage.setItem('notify', 'true');
  notifyTrue();
  notifyOption();
}

function notifyTrue(){
  if(localStorage.getItem('notify', 'true')){
    document.querySelector('.notify-alert-box').style.display = 'none'
  }
}

notifyTrue();

document.querySelector('#notify-cancel-button').onclick = async()=>{
  localStorage.setItem('notify', 'false');
  notifyFalse();
}

function notifyFalse(){
  if(localStorage.getItem('notify', 'false')){
    document.querySelector('.notify-alert-box').style.display = 'none'
  }
}

notifyFalse();

function showNotification(){
  var notificationBody = new Notification('Novo Evento do Night Market/Mahal', {
    body:'Equipe NightNET'
  })
}

function showNotification2(){
  var notificationBody = new Notification('Evento Só Track Boa', {
    body:'Equipe NightNET'
  })
}

function notifyOption(){
  if(localStorage.notify == 'true')
    if(Notification.permission == 'granted'){
      //showNotification();
      if(localStorage.notifyMessage === undefined){
        localStorage.setItem('notifyMessage', 'true');
        showNotification();
      }
      if(localStorage.notifyMessage2 === undefined){
        localStorage.setItem('notifyMessage2', 'true');
        showNotification2();
      }
    }else if(Notification.permission != 'danied'){
      Notification.requestPermission().then(permission =>{
        if(permission == 'granted'){
          showNotification();
        }
      })
    }
}

notifyOption();

 /*CALNEDÁRIO*/

 const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// const eventsArr = [
//   {
//     day: 13,
//     month: 11,
//     year: 2022,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

const eventsArr = [];
getEvents();
console.log(eventsArr);

//função para adicionar dias em dias com dia de aula e data anterior próxima data no mês anterior e dias do próximo mês e ativo hoje
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //verifique se o evento está presente naquele dia
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//função para adicionar mês e ano no botão anterior e seguinte
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//função para adicionar ativo no dia
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remover ativo
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //se clicar em data anterior ou próxima data, mude para esse mês
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //adicionar ativo ao dia clicado após mês é alteração
        setTimeout(() => {
          //adicionar ativo onde não há data anterior ou próxima data
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //adicionar ativo ao dia clicado após o mês ser alterado
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Data Invalida");
}

function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}


function updateEvents(date) {
  let events = "";
  eventsArr.forEach((event) => {
    if (
      date === event.day &&
      month + 1 === event.month &&
      year === event.year
    ) {
      event.events.forEach((event) => {
        events += `<div class="event">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
      });
    }
  });
  if (events === "") {
    events = `<div class="no-event">
            <h3>Sem Eventos</h3>
        </div>`;
  }
  eventsContainer.innerHTML = events;
  saveEvents();
}

addEventBtn.addEventListener("click", () => {
  addEventWrapper.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventWrapper.classList.remove("active");
});

document.addEventListener("click", (e) => {
  if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
    addEventWrapper.classList.remove("active");
  }
});

addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 60);
});



addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//função para adicionar evento a eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Por favor preencha todos os campos");
    return;
  }

  //verifique o formato de hora correto 24 horas
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Formato de Hora invalido");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  //verifique se o evento já foi adicionado
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Evento já adicionado");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  //selecione o dia ativo e adicione a classe do evento, se não for adicionado
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

//função para excluir evento quando clicado no evento
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("event")) {
    if (confirm("Tem certeza que deseja remover o evento?")) {
      const eventTitle = e.target.children[0].children[1].innerHTML;
      eventsArr.forEach((event) => {
        if (
          event.day === activeDay &&
          event.month === month + 1 &&
          event.year === year
        ) {
          event.events.forEach((item, index) => {
            if (item.title === eventTitle) {
              event.events.splice(index, 1);
            }
          });
          //se nenhum evento for deixado em um dia, remova esse dia de eventsArr
          if (event.events.length === 0) {
            eventsArr.splice(eventsArr.indexOf(event), 1);
            //remover classe de evento do dia
            const activeDayEl = document.querySelector(".day.active");
            if (activeDayEl.classList.contains("event")) {
              activeDayEl.classList.remove("event");
            }
          }
        }
      });
      updateEvents(activeDay);
    }
  }
});

//função para salvar eventos no armazenamento local
function saveEvents() {
  localStorage.setItem("events", JSON.stringify(eventsArr));
}

//função para obter eventos do armazenamento local
function getEvents() {
  //verifique se os eventos já estão salvos no armazenamento local e retorne o evento senão nada
  if (localStorage.getItem("events") === null) {
    return;
  }
  eventsArr.push(...JSON.parse(localStorage.getItem("events")));
}

function convertTime(time) {
  //coverter para 24hrs
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;
  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}


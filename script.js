$(document).ready(function () {
  //when page loads, do something
  var m = moment();
  var DateAtTop = m.format("dddd, MMMM Do");
  $("#currentDay").html(DateAtTop);

  var hoursArray = [
    "05AM",
    "08AM",
    "10AM",
    "11AM",
    "12PM",
    "13PM",
    "14PM",
    "15PM",
    "16PM",
    "17PM",
    "18PM",
    "19PM",
    "20PM",
    "21PM",
    "22PM",
    "23PM",
  ];

  var output = "";

  $.each(hoursArray, function (index, hour) {
    var currentHour = m.set("hour", hour.slice(0, 2)).format("kk");
    currentHour = Number(currentHour);
    var date = new Date();
    var hours = date.getHours();

    output += `
        <div data-time=${hour} class="time-block-wrapper ">
            <div class="time">${hour}</div>
            <form onsubmit="insertEvent(event)">
            <input type="text" name="schedule" class="${
              hours == currentHour
                ? "input present "
                : "input"
                ? hours > currentHour && "input past "
                : "input"
                ? currentHour > hours && "input future "
                : "input"
            }input" data-time=${hour} type="text" />
            <button ><i class="fa fa-lock"></i></button>
            </form>
        </div>
        `;
    $(".container").html(output);
  });
  var events = JSON.parse(localStorage.getItem("events")); //grab saved events from localstorage
  var inputs = document.querySelectorAll("input");
  $.each(events, function (index, event) {
    console.log(events);
    $.each(inputs, function (index, input) {
      if (Object.keys(event) == input.dataset.time) {
        console.log(input);
        input.value = event[input.dataset.time];
      }
    });
  });
});

function insertEvent(event) {
  event.preventDefault();
  var inputValue = event.target.firstElementChild.value; // get the values from input field
  var dataAttribute = event.target.firstElementChild.dataset.time;

  saveEvent(inputValue, dataAttribute);
}

function saveEvent(value, key) {
  var eventObject = new Object(); // create a new objetc
  eventObject[key] = value; // assign key and value pair to the created object
  var eventArray = [];

  if (localStorage.getItem("events") === null) {
    eventArray = [];
  } else {
    eventArray = JSON.parse(localStorage.getItem("events"));
  }
  eventArray.push(eventObject);
  localStorage.setItem("events", JSON.stringify(eventArray));
  console.log(eventArray);
}

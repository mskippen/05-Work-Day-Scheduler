$(document).ready(function () {
    //when page loads, do something
    var m = moment()
    var DateAtTop = m.format("dddd, MMMM Do");
    $("#currentDay").html(DateAtTop)

    var hoursArray = [
        "05AM",
        "08AM",
        "10AM",
        "11AM",
        "12PM",
        "1PM",
        "2PM",
        "3PM",
        "4PM",
        "5PM",
        "6PM",
        "7PM",
    ];

    var output = "";

    $.each(hoursArray, function (index, hour) {
        console.log(hour)

        output += `
        <div data-time=${hour} class="time-block-wrapper ">
            <div class="time">${hour}</div>
            <form onsubmit="insertEvent(event)">
            <input type="text" name="schedule" class="input" data-time=${hour}/>
            <button ><i class="fa fa-lock"></i></button>
            </form>
        </div>
        `
    $('.container').html(output)

    })

    // hoursArray.forEach(function(item, index){
    //     console.log(item)
    // })
})





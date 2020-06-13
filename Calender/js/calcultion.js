currentDay = new Date();
months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];
days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


function renderDate() {
    currentDay.setDate(1);
    var day = currentDay.getDay(); //1 june 2020 =Monday
    var today = new Date();

    //to get the end date of current month
    var endDate = new Date(currentDay.getFullYear(), currentDay.getMonth() + 1, 0).getDate();

    //to get the end date previous month
    var prevDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), 0).getDate();


    //showing of months and year in header
    document.getElementById("month").innerHTML = months[currentDay.getMonth()];
    document.getElementById("year").innerHTML = currentDay.getFullYear();

    //for showing of string date
    var cells = "";

    //for previous days on same months
    for (var x = day; x > 0; x--) {
        cells += "<div class='prevDate'>" + (prevDate - x + 1) + "</div>";
    };

    //to show the months dates 
    for (var i = 1; i <= endDate; i++) {
        if (i == today.getDate() && currentDay.getMonth() == today.getMonth())
            cells += "<div class='today'>" + i + "</div>";
        else
            cells += "<div>" + i + "</div>"; //+= to store even the previous numbers in cell
    }
    document.getElementsByClassName("days")[0].innerHTML = cells;

}

//function to move previous and next button and show months
function moveDate(direction) {
    if (direction == "prev") {
        currentDay.setMonth(currentDay.getMonth() - 1);
    } else if (direction == 'next') {
        currentDay.setMonth(currentDay.getMonth() + 1);
    }
    renderDate();
}

//for rendering regarding selected months
function selectmonth(monthsRend) {
    var month = months.indexOf(monthsRend.options[monthsRend.selectedIndex].text)
    currentDay.setMonth(month);
    renderDate();

}

//for rendering regarding selected years
function selectYear(yearRendering) {
    currentDay.setFullYear(yearRendering.options[yearRendering.selectedIndex].text);
    renderDate();

}


$(document).ready(function() {
    //function to show date and time in footer part 
    var date = currentDay.getFullYear() + '-' + months[(currentDay.getMonth() + 1)] + currentDay.getDate() + '- ' + days[currentDay.getDay()];
    var time = currentDay.getHours() + ":" + currentDay.getMinutes() + ":" + currentDay.getSeconds();
    var dateTime = date + ' ' + "&nbsp" + time;
    $("#date").html(dateTime);


    //function to show days of week
    var length = days.length;
    var text = "";
    for (var i = 0; i <= length - 1; i++) {
        text += days[i] + "&nbsp&nbsp";
    }
    $("#getDays").html(text);

    //function to Months dropdown
    for (var m = 0; m <= 11; m++) { //for for accessing and showing the arraylist
        var optn = document.createElement("OPTION");
        optn.text = months[m];
        document.getElementById('monthsRend').options.add(optn);
    }

    //function to year dropdown
    var $select = $(".year");
    for (i = 1950; i <= 2050; i++) {
        $select.append($('<option></option>').val(i).html(i))
    }


});
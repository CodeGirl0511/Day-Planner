// Get the text saved in local storage or create the base array of objects to be used to store events
var scheduled = JSON.parse(window.localStorage.getItem("scheduled")) ||
[
{ timeblockId : "9AM", eventInfo : "" },
{ timeblockId : "10AM", eventInfo : "" },
{ timeblockId : "11AM", eventInfo : "" },
{ timeblockId : "12PM", eventInfo : "" },
{ timeblockId : "1PM", eventInfo : "" },
{ timeblockId : "2PM", eventInfo : "" },
{ timeblockId : "3PM", eventInfo : "" },
{ timeblockId : "4PM", eventInfo : "" },
{ timeblockId : "5PM", eventInfo : "" },
];


//  date beneath header
var currentDayP = $("#currentDay");
currentDayP.text(moment().format("dddd, MMMM Do"));

// current time
var currentTime = moment().format("k");

// Saved scheduled events load 
function loadEvents(){

    scheduled.forEach(eventText);

    function eventText(text){
        $("#" + text.timeblockTextId).text(text.eventInfo);
    }
}

loadEvents();

// Determine if the timeblock is in past/present/future and style the element 
function addBackgroundColors(){
    var possibleTimes = [
        { textarea : $("#9AM"), militaryVal : 9},
        { textarea : $("#10AM"), militaryVal : 10},
        { textarea : $("#11AM"), militaryVal : 11},
        { textarea : $("#12PM"), militaryVal : 12},
        { textarea : $("#1PM"), militaryVal : 13},
        { textarea : $("#2PM"), militaryVal : 14,},
        { textarea : $("#3PM"), militaryVal : 15},
        { textarea: $("#4PM"), militaryVal : 16},
        { textarea: $("#5PM"), militaryVal : 17}
    ]
    
    // Loop through array of objects of times and set the background color based on time 
    for (var i = 0; i < possibleTimes.length; i++){
       
        if (currentTime == possibleTimes[i].militaryVal){
            possibleTimes[i].textarea.addClass("present");
        }
        else if (currentTime > possibleTimes[i].militaryVal){
            possibleTimes[i].textarea.addClass("past");
        }
        else{
            possibleTimes[i].textarea.addClass("future");
        }
    }
}

addBackgroundColors();

// Event listener for save button
$(".saveBtn").click(function (){

    var selectedTimeblockVal = $(this).attr("data-hour");

    var allTextFields = $("#").get();

    for(var i = 0; i < allTextFields.length ; i++){

        var textblockHourVal = allTextFields[i].dataset.hour;

        if(selectedTimeblockVal == textblockHourVal){
            var textFieldId = allTextFields[i].attributes[0].nodeValue;
        }
    }
    scheduled.forEach(eventText);
    function eventText(text){
        if(text.timeblockTextId == textFieldId){
            text.eventInfo = $("#" + textFieldId).val();
        }
    }

    //  local storage changes
    window.localStorage.setItem("scheduled", JSON.stringify(scheduled));

});
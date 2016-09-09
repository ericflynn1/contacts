let _ = require('lodash');

function peopleAppender(object) {
    // console.log(object.firstName + " " + object.lastName);
    let peopleSection = document.createElement("section");
    peopleSection.classList.add("peopleSection");
    peopleSection.innerHTML = '<p>' + object.firstName + ' ' + object.lastName + '</p>';
    $('#scrollBox').append(peopleSection);
    $('.peopleSection').draggable({ revert: true});
}



window.addEventListener('load', function() {
    let peopleRequest = new XMLHttpRequest();
    peopleRequest.open('GET', 'https://boiling-plateau-18106.herokuapp.com/people');
    peopleRequest.addEventListener('load', function() {
        let response = JSON.parse(peopleRequest.responseText);
        response.forEach(peopleAppender);
    });
    peopleRequest.send();

    let groupRequest = new XMLHttpRequest();
    groupRequest.open('GET', 'https://boiling-plateau-18106.herokuapp.com/group');
    groupRequest.addEventListener('load', function() {
        let response = JSON.parse(groupRequest.responseText);
        console.log(response[0].name);
        // response.forEach()
    });
    groupRequest.send();
});
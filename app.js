let _ = require('lodash');

function peopleAppender(object) {
    let peopleSection = document.createElement("section");
    peopleSection.classList.add("peopleSection");
    peopleSection.innerHTML = '<p>' + object.firstName + ' ' + object.lastName + '</p>';
    $('#scrollBox').append(peopleSection);
    $('.peopleSection').draggable({ revert: true});
}

function groupAppender(object, i) {
    let groupSection = document.createElement("section");
    groupSection.classList.add("groups");
    groupSection.setAttribute("id", "list" + i);
    groupSection.innerHTML = '<h2>' + object.name + '</h2> <ol></ol>';
    $('#groupHangout').append(groupSection);
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
        response.forEach(groupAppender);
    });
    groupRequest.send();
});
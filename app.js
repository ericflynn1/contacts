let _ = require('lodash');


function peopleAppender(object) {
    let peopleSection = document.createElement("section");
    peopleSection.classList.add("peopleSection");
    peopleSection.innerHTML = '<p>' + object.id + " : " + object.firstName + ' ' + object.lastName + '</p>';
    $('#scrollBox').append(peopleSection);
    $('.peopleSection').draggable({
        revert: true,
        containment: $('#scrollbox'),
        helper: 'clone'
    });
}

function groupAppender(object, i) {
    let groupSection = document.createElement("section");
    groupSection.classList.add("groups");
    groupSection.setAttribute("id", "list" + i);
    groupSection.innerHTML = '<h2>' + object.name + '</h2> <ol></ol>';
    $('#groupHangout').append(groupSection);
    $( '.groups' ).droppable({
        drop: function(event, ui) {
            let content = ui.draggable.text().split(':');
            console.log(content);
            $ ( this )
                .find("ol")
                .append('<li>' + content[1] + "</li>");
            let zeeNumber = content[0];
            console.log(zeeNumber);
            // updateGroup(zeeNumber, )
        }
    });
}

// function updateGroup (user, group) {
//     let updateRequest = new XMLHttpRequest();
//     updateRequest.open('PUT', 'https://boiling-plateau-18106.herokuapp.com/group/' + group);
//     updateRequest.send(JSON.stringify(
//         {
//             id: user,
//             firstName: "",
//             lastName: "",
//             userName: "",
//             groups: group
//         }
//         ));
// }

// function searching (name, array) {

//     for (let i = 0; i < people.length; i++) {

//         if (people[i].name === name)
//             return people[i]; 

//     } 

//     return null;
// }


window.addEventListener('load', function() {
    let peopleRequest = new XMLHttpRequest();
    peopleRequest.open('GET', 'https://boiling-plateau-18106.herokuapp.com/people');
    peopleRequest.addEventListener('load', function() {
        let response = JSON.parse(peopleRequest.responseText);
        response.forEach(peopleAppender);
        peoples = response;
    });
    peopleRequest.send();

    let groupRequest = new XMLHttpRequest();
    groupRequest.open('GET', 'https://boiling-plateau-18106.herokuapp.com/group');
    groupRequest.addEventListener('load', function() {
        let response = JSON.parse(groupRequest.responseText);
        // console.log(response[0].name);
        response.forEach(groupAppender);
    });
    groupRequest.send();
});
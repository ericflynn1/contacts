let _ = require('lodash');

function peopleAppender(object) {
    let peopleSection = document.createElement("section");
    peopleSection.classList.add("peopleSection");
    // object.groups doesn't seem to properly add the groups to the person
    peopleSection.innerHTML = '<p>' + object.id + " : " + object.firstName + ' ' + object.lastName + " " + '<ul></ul>' + '</p>';
    $('#scrollBox').append(peopleSection);
    for (let i = 0; i < object.groups.length; i++) {
        let groupElement = document.createElement('li');
        groupElement.textContent = object.groups[i].name;
        peopleSection.querySelector('ul').appendChild(groupElement);
    }

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
    $( '#list' + i ).droppable({
        drop: function(event, ui) {
            let content = ui.draggable.text().split(':');
            console.log(content);
            $ ( this )
                .find("ol")
                .append('<li>' + content[1] + "</li>");
            let zeeNumber = parseInt(content[0].trim());
            console.log(zeeNumber);
            updateGroup(zeeNumber, object.id);
        }
    });
}



function updateGroup (user, group) {
    let updateRequest = new XMLHttpRequest();
    updateRequest.open('PUT', 'https://boiling-plateau-18106.herokuapp.com/group/' + group);
    updateRequest.setRequestHeader('Content-type', 'application/json');

    updateRequest.send(JSON.stringify(
        {
            id: user,
        }
        ));
}

// function searching (name, array) {

//     for (let i = 0; i < peopleSection.length; i++) {

//         if (peopleSection[i].name === name)
//             return peopleSection[i]; 
//     } 

//     return null;
// }

// let person = people.filter(function(user) { 
//   return people.name === 'M'; 
// });

// console.log('working');


// let olli = people.filter(function(user) {
//   return user.name === 'olli';
// });

window.addEventListener('load', function() {
    let peopleRequest = new XMLHttpRequest();
    peopleRequest.open('GET', 'https://boiling-plateau-18106.herokuapp.com/people');
    peopleRequest.addEventListener('load', function() {
        let response = JSON.parse(peopleRequest.responseText);
        response.forEach(peopleAppender);
        peoples = response;
        console.log(response);
    });
    peopleRequest.send();

    let groupRequest = new XMLHttpRequest();
    groupRequest.open('GET', 'https://boiling-plateau-18106.herokuapp.com/group');
    groupRequest.addEventListener('load', function() {
        let response = JSON.parse(groupRequest.responseText);
        response.forEach(groupAppender);
    });
    groupRequest.send();

    $('#searchBtn').on('click', function () {
        let input = $('input').val();
        let cullingQuery = new XMLHttpRequest();
        cullingQuery.open('GET', 'https://boiling-plateau-18106.herokuapp.com/people/?search=' + input);
        cullingQuery.addEventListener('load', function() {
            let response = JSON.parse(cullingQuery.responseText);

            $('#scrollBox').empty();
            response.forEach(peopleAppender);
        });
        cullingQuery.send();
    });

});



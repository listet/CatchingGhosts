'use strict';

window.addEventListener('load', () => {
    initPage()
});

function initPage() {
    let startBtn = document.querySelector('#spela');
    startBtn.addEventListener('click', (event) => {
        event.preventDefault();
        validateLogin()
    });

    console.log('spela')
}


function validateLogin(event) {
    //Utföra formulärvalidering för att logga in.
    try {
        let username = document.querySelector('#username');
        let password = document.querySelector('#password');
        let errorMsg = document.querySelector('#msg');
        let checkbox = document.querySelector('#question')
        if (!users.some(user => user.username === username.value && user.password === password.value)) {
            throw {
                'msg': 'Fel användarnamn eller lösenord!'
            };
        } else if (!checkbox.checked) {
            throw {
                'msg': 'Checkboxen är inte ibockad.'
            };
        } else {
            console.log('success!')
            errorMsg.innerHTML = 'heeej';
            initContent()
        }
    } catch (error) {
        console.log(error);
        document.querySelector('#msg').textContent = error.msg;
    }
}



function initContent() {
    console.log('initContent')
    document.querySelector('#formDiv').classList.add('d-none');

    ghost.style.left = ${oGameData.left()}px;
    ghost.style.top = ${oGameData.top()}px;

}





function gameStart(){

}

function numberOfGhost(){
let ghostImage = new Image();
ghostImage.src = 'ghost.png'; // lägger in bilden på spöket

let ghostDiv = document.createElement('div');
ghostDiv.classList.add('img'); // Lägg till CSS-klassen 'img' för stilar

/*
// Slumpar positioner mellan 10-15
let randomLeft = Math.floor(Math.random() * (8 - 5) + 10) + 'px'; // Slumpa vågrätt position i pixel
let randomTop = Math.floor(Math.random() * (7 - 5) + 10) + 'px'; // Slumpa lodrätt position i pixel

// Ställ in positionen med hjälp av style-egenskaper
ghostDiv.style.position = 'absolute';
ghostDiv.style.left = randomLeft;
ghostDiv.style.top = randomTop;
*/

// Lägg till bilden till body-elementet
document.body.appendChild(ghostDiv);
ghostDiv.appendChild(ghostImage);
}



function hoverOverGhost(){

}

function winGame(){

}
 



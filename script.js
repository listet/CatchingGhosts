'use strict';

window.addEventListener('load', () => {
    //Här kickar ni igång ert program
    initPage();
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

    /*const ghost = document.createElement("img");
    ghost.src = "./resources/ghost.png";
    ghost.className = "ghost";
    document.body.appendChild(ghost);*/

    //variable hämtat från functionen.
    placeGhostPictures(10, 15);

}

//genererar ett antal spöken mellan 10 och 15. PLacerar ut de på random plats och byter till net vid mouseover.
function placeGhostPictures(min, max) {

    //räknar antal spöken att placera ut. Min max är 10 till 15.
    const numGhosts = Math.floor(Math.random() * (max - min + 1)) + min;

    //loop som placerar ut varje spökbild.
    for (let i = 0; i < numGhosts; i++) {

        //genererar en ny img element.
        const ghost = document.createElement('img');

        //Bestämmer initialsource och klass for ghostbilden.
        ghost.src = './resources/ghost.png';
        ghost.className = 'ghost';

        //bestämmer positionen av ghostbilden.
        ghost.style.position = 'absolute';
        ghost.style.left = `${oGameData.left()}px`; //px refererar till returnerad px från oGameData
        ghost.style.top = `${oGameData.top()}px`;

        //Kopplar ghostbilden till html bodyn.
        document.body.appendChild(ghost);

        //Fäster en eventlistener till hovereffekten
        ghost.addEventListener('mouseover', () => {

            //kollar om den nuvarande src inkluderar ghost.
            if (ghost.src.includes('ghost')) {

                //om nuvarnde bild är ghost, byt till netbilden.
                ghost.src = './resources/net.png';
            } else {

                //om nuvarande bilen är net så byts den till ghost.
                ghost.src = './resources/ghost.png';
            }
            checkForWin();
        });
    }
}

//niklas
/*function initContent() {
    console.log('success!');
    document.querySelector('#formDiv').classList.add('d-none');

    // For loop för att generera 10 stycker spöken.
    for (let i = 0; i < 10; i++) {
        const ghost = document.createElement("img");
        ghost.src = "./resources/ghost.png";
        ghost.className = "ghost";
        ghost.style.position = "absolute";
        ghost.style.left = ${Math.random() * window.innerWidth}px;
        ghost.style.top = ${Math.random() * window.innerHeight}px;
        document.body.appendChild(ghost);

        ghost.addEventListener('mouseover', (event) => {
            toggleState(event.target);
        });
    }
}


function toggleState(target) {
    if (target.classList.contains('ghost')) {
        target.src = './resources/ghost.png';
        target.classList.add('net');
        target.classList.remove('ghost');
    } else if (target.classList.contains('net')) {
        target.src = './resources/net.png';
        target.classList.remove('net');
        target.classList.add('ghost');
    }
}*/


/*function startGame (){
console.log('startGame()');


//tar bort inloggningssidan.

//Vad behövs här?
}*/




function checkForWin() {
    console.log('winGame()');
    const ghostImagesREf = document.querySelectorAll('.ghost');
    let allNetsRef = true;

    ghostImagesREf.forEach((ghost) => {
        if (!ghost.src.includes('net')) {
            allNetsRef = false;
        }
    });

    if (allNetsRef) {
        console.log('Du har vunnit!');
    }
}
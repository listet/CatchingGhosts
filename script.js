'use strict';

window.addEventListener('load', () => {
    //Här kickar ni igång ert program
    initPage();
    playSoundOnClick();
});

//------------ljud och video--------------------------

//function innehållande kod för att aktivera en backgrundsvideo och diverse ljud.
function backgroundAudio(action) {
    let audio = document.querySelector('.backgroundAudio');
    audio.play();
    audio.volume = 0.5;
}

//koden här gör att bakgrundsljudet spelas då det krävs att användaren gör något för att ljudet ska spelas. Detta beror på att de flesta webbläsare försöker hindra störande backgrundsljud som användaren inte valt att spela själv. Koden här aktiveras på mouseover i bodyn. Alltså ljudet börjar spelas när användaren rör på pekaren på skärmen.
document.addEventListener('DOMContentLoaded', function () {
    const backgroundAudio = document.getElementById('backgroundAudio');
    const bodyContent = document.getElementById('bodyContent');


    //function som gör att backgrundsljudet spelas. volume 0.5 är 50%.
    function playBackgroundAudio() {
        backgroundAudio.volume = 0.5;
        backgroundAudio.play();
    }

    //kopplar en eventlistener för att vid mouseover dra igång bakgrundsljudet.
    bodyContent.addEventListener('mouseover', playBackgroundAudio);
});

//----------------------------------------------------------------------------------------------------

//Här startar sidan.
function initPage() {
    let startBtn = document.querySelector('#spela');
    startBtn.addEventListener('click', (event) => {
        event.preventDefault();
        validateLogin()
    });

    playSoundOnClick();
}



// Function som lyssnar efter en button click för att spela uppett ljud.
function playSoundOnClick() {

    //väljer buttonelementet med id spela.
    const playButton = document.querySelector('#spela');

    //väljer audioelementet med id buttonScream.
    const audio = document.querySelector('#buttonScream');

    //eventlistener som lyssnar efter en click.
    playButton.addEventListener('click', () => {

        //När knappen är 'clicked' triggas denna function för att spela upp ett ljud.
        audio.play();
    });
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



function checkForWin() {
    console.log('winGame()');

    const ghostImagesRef = document.querySelectorAll('.ghost');
    let allNetsRef = true;

    ghostImagesRef.forEach((ghost) => {
        if (!ghost.src.includes('net')) {
            allNetsRef = false;
        }
    });

    if (allNetsRef) {
        console.log('Du har vunnit!');
        showWinMessage();
        clearGameBoard();
    }
}



function clearGameBoard() {
    const ghostImagesRef = document.querySelectorAll('.ghost');
    ghostImagesRef.forEach((ghost) => {
        ghost.remove(); // Ta bort varje spöke från DOM
    });
}



function showWinMessage() {
    const winMessage = document.createElement("div");
    winMessage.textContent = "Grattis, du har fångat alla spöken!";
    const restartButton = document.createElement("button");
    restartButton.textContent = "Starta om";
    restartButton.addEventListener('click', restartGame);

    winMessage.appendChild(restartButton);
    document.body.appendChild(winMessage);

    // Dölj inloggningsformuläret
    document.querySelector('#formDiv').classList.add('d-none');
}



function restartGame() {
    // Ladda om sidan för att starta om spelet
    location.reload();
}

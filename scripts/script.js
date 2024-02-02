
'use strict';

window.addEventListener('load', () => {
    //Här kickar ni igång ert program
    initPage();
});


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
        backgroundAudio.volume = 0.2;
        backgroundAudio.play();
    }

    //kopplar en eventlistener för att vid mouseover dra igång bakgrundsljudet.
    bodyContent.addEventListener('mouseover', playBackgroundAudio);
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
        let checkbox = document.querySelector('#question')
        if (!users.some(user => user.username === username.value && user.password === password.value)) {
            throw {
                'msg': 'Fel användarnamn eller lösenord'
            };
        } else if (!checkbox.checked) {
            throw {
                'msg': 'Checkboxen är inte ibockad'
            };
        } else {
            initContent()
        }
    } catch (error) {
        if (error === undefined) {
            console.log('Ett oförutsett fel har inträffat!');
        } else {
            console.log(error);
            document.querySelector('#msg').textContent = error.msg;
        }
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
    let numGhosts = Math.floor(Math.random() * (max - min + 1)) + min;

    for (let i = 0; i < numGhosts; i++) {
        let ghost = document.createElement('img');
        ghost.src = './resources/ghost.png';
        ghost.className = 'ghost';

        // Placera spökena slumpmässigt på sidan
        let leftPosition = Math.random() * (window.innerWidth - ghost.width);
        let topPosition = Math.random() * (window.innerHeight - ghost.height);

        ghost.style.position = 'absolute';
        ghost.style.left = `${leftPosition}px`;
        ghost.style.top = `${topPosition}px`;

        document.body.appendChild(ghost);

        ghost.addEventListener('mouseover', () => {
            if (ghost.src.includes('ghost')) {
                ghost.src = './resources/net.png';
            } else {
                ghost.src = './resources/ghost.png';
            }
            checkForWin();
        });

        // Anropa funktionen för att få spökena att röra sig kontinuerligt
        moveGhost(ghost);
    }
}

// Funktion för att få spökena att röra sig slumpmässigt på sidan
function moveGhost(ghost) {
    let leftPosition = Math.random() * (window.innerWidth - ghost.width);
    let topPosition = Math.random() * (window.innerHeight - ghost.height);

    ghost.style.transition = 'all 4s ease-in-out';
    ghost.style.left = `${leftPosition}px`;
    ghost.style.top = `${topPosition}px`;
    setInterval(() => {
        leftPosition = Math.random() * (window.innerWidth - ghost.width);
        topPosition = Math.random() * (window.innerHeight - ghost.height);

        ghost.style.transition = 'all 4s ease-in-out';
        ghost.style.left = `${leftPosition}px`;
        ghost.style.top = `${topPosition}px`;
    }, 3000); // Uppdatera spökena var tredje sekund
}



// Funktionen checkForWin() kontrollerar om spelaren har vunnit genom att fånga alla spöken.
function checkForWin() {
    console.log('winGame()'); // Skriver ut meddelandet "winGame()" i konsolen.

    // Hämta referenser till alla bilder av spöken på spelbrädet.
    let ghostImagesRef = document.querySelectorAll('.ghost');

    // Variabeln som kontrollerar om alla spöken är i nätet.
    let allNetsRef = true;

    // Loopa genom varje bild av spöke.
    ghostImagesRef.forEach((ghost) => {
        // Om bilden inte innehåller 'net' i sin källa, ändra allNetsRef till false.
        if (!ghost.src.includes('net')) {
            allNetsRef = false;
        }
    });

    // Om alla spöken är i nätet, visa vinnarmeddelandet och rensa spelbrädet.
    if (allNetsRef) {
        console.log('Du har vunnit!'); // Skriver ut "Du har vunnit!" i konsolen.
        showWinMessage(); // Anropa funktionen för att visa vinnarmeddelandet.
        clearGameBoard(); // Anropa funktionen för att rensa spelbrädet.
    }
}

// Funktionen clearGameBoard() tar bort alla spöken från spelbrädet.
function clearGameBoard() {
    // Hämta referenser till alla bilder av spöken på spelbrädet.
    let ghostImagesRef = document.querySelectorAll('.ghost');

    // Loopa igenom varje bild av spöke och ta bort den från DOM.
    ghostImagesRef.forEach((ghost) => {
        ghost.remove(); // Ta bort varje spöke från DOM.
    });
}

// Funktionen showWinMessage() skapar och visar ett meddelande när spelaren vinner.
function showWinMessage() {
    const winMessage = document.createElement("div");
    winMessage.classList.add('winnerContainer');
    winMessage.textContent = "Grattis, du har fångat alla fladdermöss!";
    const restartButton = document.createElement("button");
    restartButton.classList.add('winnerButton');
    restartButton.textContent = "Starta om";
    restartButton.addEventListener('click', restartGame);

    winMessage.appendChild(restartButton);
    document.body.appendChild(winMessage);

    // Dölj inloggningsformuläret
    document.querySelector('#formDiv').classList.add('d-none');
}

// Funktionen restartGame() laddar om sidan för att starta om spelet när användaren klickar på starta-om-knappen.
function restartGame() {
    // Ladda om sidan för att starta om spelet.
    location.reload();
}

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

        /*const numGhosts = Math.floor(Math.random() * (max - min + 1)) + min;
    
        for (let i = 0; i < numGhosts; i++) {
            const ghost = document.createElement('img');
            ghost.src = './resources/ghost.png';
            ghost.className = 'ghost';
    
            let leftPosition = Math.random() * (window.innerWidth - oGameData.ghost.width);
            let topPosition = Math.random() * (window.innerHeight - oGameData.ghost.height);
    
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
    
            moveGhost(ghost); // Pass the ghost element to moveGhost function
        }
    }*/

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

//---------animering----------------------
const animationDuration = Math.floor(Math.random() * 5 + 1); // Random duration between 1 and 5 seconds
const animationDirectionX = Math.random() < 0.5 ? -1 : 1; // Randomly choose -1 (left) or 1 (right) direction
const animationDirectionY = Math.random() < 0.5 ? -1 : 1; // Randomly choose -1 (up) or 1 (down) direction

const keyframes = `
    @keyframes moveGhost${i} {
        0% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(${animationDirectionX * 50}px, ${animationDirectionY * 50}px);
        }
        50% {
            transform: translate(0, 0);
        }
        75% {
            transform: translate(${animationDirectionX * 50}px, ${animationDirectionY * 50}px);
        }
        100% {
            transform: translate(0, 0);
        }
    }
`;

const style = document.createElement('style');
style.innerHTML = keyframes;
document.head.appendChild(style);

// Apply the dynamically generated animation to the ghost
ghost.style.animation = `moveGhost${i} ${animationDuration}s ease-in-out infinite alternate`;
//---------------------------------


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


/*function moveGhost(ghost) {
    setInterval(() => {
        let leftPosition = Math.random() * (window.innerWidth - oGameData.ghost.width);
        let topPosition = Math.random() * (window.innerHeight - oGameData.ghost.height);

        ghost.style.transition = 'all 1s ease-in-out';
        ghost.style.left = `${leftPosition}px`;
        ghost.style.top = `${topPosition}px`;
    }, 1000);
}
}*/

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
    winMessage.textContent = "Grattis, du har fångat alla spöken!";
    const restartButton = document.createElement("button");
    restartButton.classList.add('winnerButton');
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
// Funktionen restartGame() laddar om sidan för att starta om spelet när användaren klickar på starta-om-knappen.
function restartGame() {
    // Ladda om sidan för att starta om spelet.
    location.reload();
}

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
            initContent()
        }
    } catch (error) {
        //   console.log(error);
        document.querySelector('#msg').textContent = error.msg;
    }
}

function initContent() {
    console.log('success!')
    document.querySelector('#formDiv').classList.add('d-none');
    // Skapa spöken vid spelstart
    const numberOfGhosts = Math.floor(Math.random() * 6) + 10;
    for (let i = 0; i = numberOfGhosts; i++) {
        const ghost = document.createElement("img");
        ghost.src = "./resources/ghost.png";
        ghost.className = "ghost";
        ghost.style.position = "absolute";
        document.body.appendChild(ghost);
        // ghost.style.left = `${oGameData.left()}px`;
        // ghost.style.top = `${oGameData.top()}px`;
        ghost.addEventListener("mouseover", captureGhost);
    }

    function captureGhost() {
        console.log('net')
        this.removeEventListener("mouseover", captureGhost);
        this.src = "./resources/net.png";
        this.className = "net";
        this.addEventListener("mouseover", releaseGhost);
        oGameData.capturedGhosts++;

        // if (oGameData.capturedGhosts === numberOfGhosts) {
        //     showWinMessage();
        // }
    }

    function releaseGhost() {
        this.removeEventListener("mouseover", releaseGhost);
        this.src = "./resources/ghost.png";
        this.className = "ghost";
        this.addEventListener("mouseover", captureGhost);
        oGameData.capturedGhosts--;
    }
}
// function showWinMessage() {
//     const winMessage = document.getElementById("win-message");
//     winMessage.style.display = "block";
// }


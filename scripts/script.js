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
    console.log('success!');
    document.querySelector('#formDiv').classList.add('d-none');

    // Slumpa antalet spöken mellan 10 och 15
    let numGhosts = Math.floor(Math.random() * 6) + 10;

    // For loop för att generera ett slumpmässigt antal spöken mellan 10-15.
    for (let i = 0; i < numGhosts; i++) {
        const ghost = document.createElement("img");
        ghost.src = "./resources/ghost.png";
        ghost.className = "ghost";
        ghost.style.position = "absolute";
        ghost.style.left = `${Math.random() * window.innerWidth}px`;
        ghost.style.top = `${Math.random() * window.innerHeight}px`;
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
}
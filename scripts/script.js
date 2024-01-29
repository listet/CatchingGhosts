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

}
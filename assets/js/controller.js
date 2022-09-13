window.onload = () => {
    checkStorage();
    nav();
    startLoop();
    setInterval(() => {
        if (panel === 'game') {
            game.game = new Game();
            game.game.start();
            panel = 'game process';
        }
    }, 500)
}

let random = (min, max) =>{
    min - Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

// let act_btn = document.getElementById('startGame');
// const nameE = document.querySelectorAll('#nameInput')[0];
// let start = document.getElementById('start');
// const main = document.querySelectorAll('main');
// let player_div = document.createElement('div');
// const gameE = document.querySelectorAll('#game')[0];

//
//
// if (name.value === "") {
//     act_btn.setAttribute('disabled', true);
// }
// name.addEventListener("input",function (){
//     if(name.value){
//         act_btn.removeAttribute('disabled',false);
//
//     }else{
//         act_btn.setAttribute('disabled', true);
//     }
// })
// act_btn.addEventListener('click',function (){
//     start.remove();
//     gameE.classList.remove("d-none");
//     gameE.style.display="flex";
//     let games = new Game()
//     games.start();
//     }
// )


let name = '';
let game = {
    game: []
}

let panel = 'start';

let checkStorage = () => {
    if(localStorage.getItem('userName') != null) {
        $(`#nameInput`).val(localStorage.getItem('userName'));
    }
}

let checkName = () => {
    name = $(`#nameInput`).val().trim();
    if (name !== "") {
        localStorage.setItem('userName', name);
        $(`#startGame`).attr('disabled', false);
    }else {
        $(`#startGame`).attr('disabled', true);
    }
}

let nav = () => {
    document.onclick = (event) => {
        event.preventDefault();
        let path = event.path || (event.composedPath && event.composedPath());
        switch (path[0].id) {
            case 'startGame':
                go('game', 'd-block');
                break
            case 'restart':
                go('game', 'd-block');
                $('.elements').remove();
                $("#game").append(`<div class="elements"></div>`);
                break;
        }
    }
}

let go = (page, attribute) => {
    let pages = ['start', 'game', 'end'];

    panel = page;

    $(`#${page}`).attr('class', attribute);

    pages.forEach(element => {
        if (page !== element) {
            $(`#${element}`).attr('class', 'd-none');
        }
    })
}

let startLoop = () => {
    let inter = setInterval(() => {
        if (panel !== 'start') {
            clearInterval(inter)
        }
        checkName();
    }, 100)
}


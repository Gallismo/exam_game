let act_btn = document.getElementById('startGame');
const name = document.querySelectorAll('#nameInput')[0];
let start = document.getElementById('start');
const main = document.querySelectorAll('main');
let player_div = document.createElement('div');
const game = document.querySelectorAll('#game')[0];
let random = (min, max) =>{
    min - Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}


if (name.value === "") {
    act_btn.setAttribute('disabled', true);
}
name.addEventListener("input",function (){
    if(name.value){
        act_btn.removeAttribute('disabled',false);

    }else{
        act_btn.setAttribute('disabled', true);
    }
})
act_btn.addEventListener('click',function (){
    start.remove();
    game.classList.remove("d-none");
    game.style.display="flex";
    let games = new Game()
    games.start();
    }
)
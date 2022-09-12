let act_btn = document.getElementById('startGame');
const name = document.querySelectorAll('#nameInput')[0];
let start = document.getElementById('start');
const main = document.querySelectorAll('main');
let player_div = document.createElement('div');
const game = document.querySelectorAll('#game')[0];


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
    new Game().start()
    }
)
class Drowable {
    constructor(game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.h = 0;
        this.w = 0;
        this.offsets = {
            x:0,
            y:0
        }
    }
    createElement(){
        this.$element = $(`<div class="element ${this.constructor.name.toLowerCase()}></div>"`)
        this.game.$zone.append(this.$element);
    }
}
class Game {
    constructor() {
        this.name = name.value;
        this.$zone = $('.elements');
    }
    start() {
        this.loop();
    }
    loop () {
        requestAnimationFrame(()=>{
            this.setParams();
            this.loop()
        })
    }
    setParams(){
        let params = ['name'];
        let value = [this.name];

        params.forEach((element_id,value_id)=>{
            $(`#${element_id}`).html(value[value_id]);
        })
    }
}
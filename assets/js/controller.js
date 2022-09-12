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
    let games = new Game()
    games.start();
    }
)
class Drawable {
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
        this.$element = $(`<div class="element ${this.constructor.name.toLowerCase()}"></div>`)
        this.game.$zone.append(this.$element);
    }
    update() {
        this.x += this.offsets.x;
        this.y += this.offsets.y;
    }
    draw() {
        this.$element.css({
            left: this.x + "px",
            top: this.y + "px",
            width: this.w + "px",
            height: this.h + "px"
        })
    }
}
class Game {
    constructor() {
        this.name = name.value;
        this.$zone = $('.elements');
        this.elements = [];
        this.player = this.generate(Player)
    }
    start() {
        this.loop();
    }
    loop () {
        requestAnimationFrame(()=>{
            this.updateElements();
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
    updateElements() {
        this.elements.forEach(element => {
            element.update();
            element.draw();
        })
    }
    generate(className) {
        let element = new className(this)
        this.elements.push(element)
        return element
    }
}

class Player extends Drawable {
    constructor(game) {
        super(game);
        this.w = 244;
        this.h = 109;
        this.x = this.game.$zone.width() / 2 - this.w / 2;
        this.y = this.game.$zone.height() - this.h;
        this.speedPerFrame = 20;
        this.keys = {
            ArrowLeft: false,
            ArrowRight: false
        }
        this.createElement();
        this.bindKeyEvents();
    }
    bindKeyEvents() {
        document.addEventListener('keydown', event => this.changeKeyStatus(event.code, true));
        document.addEventListener('keyup', event => this.changeKeyStatus(event.code, false));
    }
    changeKeyStatus(code, value) {
        if (code in this.keys) {
            this.keys[code] = value;
        }
    }
    update() {
        if (this.keys.ArrowLeft && this.x > 0) {
            this.offsets.x = -this.speedPerFrame;
        } else if (this.keys.ArrowRight && this.x < this.game.$zone.width() - this.w) {
            this.offsets.x = this.speedPerFrame;
        } else {
            this.offsets.x = 0;
        }
        super.update();
    }
}
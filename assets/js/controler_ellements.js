
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
    removeElement(){
        this.$element.remove();
    }
    isCollision(element){
        let a = {
            x1: this.x,
            x2: this.x + this.w,
            y1: this.y,
            y2: this.y + this.h
        }
        let b = {
            x1: element.x,
            x2: element.x + element.w,
            y1: element.y,
            y2: element.y + element.h
        }
        return a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;
    }
    createElement(){
        this.$element = $(`<div class="element ${this.constructor.name.toLowerCase()}"f></div>`)
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
        this.name = name;
        this.$zone = $('.elements');
        this.elements = [];
        this.player = this.generate(Player);
        this.fruits = [Apple, Banana, Orange];
        this.counterForTimer = 0;
        this.points = 0;
        this.hp = 3;
        this.time={
            m1:0,
            m2:0,
            s1:0,
            s2:0
        }
        this.ended = false;
        this.pause = false;
        this.keyEvents();
    }
    keyEvents(){
        addEventListener('keydown',(event) =>{
            if(event.key === "Escape") {
                this.pause = !this.pause;
            }

        })
    }
    randomFruitGenerate(){
        let ranFruit = random(0,2);
        this.generate(this.fruits[ranFruit]);
    }
    start() {
        this.loop();
    }
    loop () {
        requestAnimationFrame(()=>{
            if (!this.pause) {
                this.counterForTimer++;

                if (this.counterForTimer % 60 === 0) {
                    this.timer();
                    this.randomFruitGenerate();
                }
                if (this.hp <= 0) {
                    this.end();
                }

                $('.pause').css('display', 'none').hide().fadeOut();
                this.updateElements();
                this.setParams();
                }else if (this.pause) {
                    $('.pause').css('display','flex').show().fadeIn();
                }
            if (!this.ended){
                this.loop()
            }
        })
    }
    end(){
        this.ended = true;
        let time = this.time;
        if (time.s1 >=1 || time.m2>=1 || time.m1 >= 1) {
            $('#playerName').html(`Поздравляем, ${this.name}!`);
            $('#endTime').html(`Ваше время: ${time.m1}${time.m2}:${time.s1}${time.s2}`);
            $('#collectedFruits').html(`Вы собрали фруктов: ${this.points}`);
            $('#congratulation').html(`YOU WIN`);
        }else{
            $('#playerName').html(`Жаль, ${this.name}!`);
            $('#endTime').html(`Время чмошника: ${time.m1}${time.m2}:${time.s1}${time.s2}`);
            $('#collectedFruits').html(`ЛОх собрал: ${this.points}`);
            $('#congratulation').html(`YOU LOSER`);
        }
        go('end', 'panel d-flex justify-content-center align-items-center');
    }
    timer(){
        let time = this.time;
        time.s2++;
        if (time.s2 >=10 ){
            time.s2 = 0;
            time.s1++
        }
        if (time.s1 >= 6){
            time.s1 = 0;
            time.m2++
        }
        if (time.m2>=10) {
            time.m2 = 0;
            time.m1++
        }
        let str = `${time.m1}${time.m2}:${time.s1}${time.s2}`;
        $("#timer").html(str);

    }
    setParams(){
        let params = ['name','points','hp'];
        let value = [this.name,this.points,this.hp];

        params.forEach((element_id,value_id)=>{
            $(`#${element_id}`).html(value[value_id]);
        })
    }
    remove(el){
        let idx = this.elements.indexOf(el);
        if (idx !== -1) {
            this.elements.splice(idx, 1)
            return true;
        }
        return false;
    }
    updateElements() {
        this.elements.forEach(element => {
            element.update();
            element.draw();
        })
    }
    generate(className) {
        let element = new className(this);
        this.elements.push(element);
        return element;
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
class Fruits extends Drawable {
    constructor(game) {
        super(game);
        this.w = 70;
        this.h = 70;
        this.x = random(0,this.game.$zone.width() - this.w);
        this.y = 60;
        this.offsets.y = 3;
        this.createElement();
    }
    takeDamage(){
        if (this.game.remove(this)){
            this.removeElement();
            this.game.hp--;
            console.log("damage",this.game.hp)
        }
    }
    update(){
        if (this.isCollision(this.game.player) && this.offsets.y > 0){
            this.takePoint(this.game.element);
        }
        if (this.y > this.game.$zone.height()){
            this.takeDamage(this.game.element);
        }
        super.update();
    }
    takePoint(){
        if (this.game.remove(this)) {
            this.removeElement();
            this.game.points++;
            console.log("points",this.game.points)
        }
    }
}
class Apple extends Fruits {
    constructor (game){
        super(game)
        this.offsets.y = 5;
    }
}
class Banana extends Fruits {
    constructor (game){
        super(game)
    }
}
class Orange extends Fruits {
    constructor (game){
        super(game)
        this.offsets.y = 7;
    }
}
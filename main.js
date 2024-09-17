const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

const audio = new Audio("./audio/oggy.mp3");
document.onclick = () => {
    audio.play();
    audio.addEventListener("ended", () => {
        audio.currentTime = 0;
        audio.play();
    }, false)
};

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

class Pong{
    constructor(imgSrc){
        this.x = random(100, width - 100);
        this.y = random(100, height - 100);

        this.base_image = new Image();
        this.base_image.src = imgSrc;
        this.base_image.onload = () => {
            this.draw();
        }

        this.velX = random(1, 2.5);
        this.velY = random(1, 2.5);
    }

    draw(){
        ctx.drawImage(this.base_image, this.x, this.y, 100, 100);
    }

    update(){
        this.x += this.velX;
        this.y += this.velY;
    }

    checkCollisionWithWall(){
        if (this.x + 100 > width) this.velX = -Math.abs(this.velX);
        if (this.x < 0) this.velX = Math.abs(this.velX);
        if (this.y + 100 > height) this.velY = -Math.abs(this.velY);
        if (this.y < 0) this.velY = Math.abs(this.velY);
    }
}

let imgPaths = [
    "./img/penguin_spy.png",
    "./img/penguin_queen.png",
    "./img/penguin_groomed.png",
    "./img/penguin_fun.png",
    "./img/penguin_shiny.png",
    "./img/penguin_smirk.png",
    "./img/penguin_sob.png"
]
let emojiArr = [
    
];

for (let i = 0; i < 10; i++){
    emojiArr.push(new Pong(imgPaths[random(0, imgPaths.length-1)]))
}


const mainLoop = () => {
    ctx.clearRect(0, 0, width, height)

    for (const pongElement of emojiArr){
        pongElement.draw();
        pongElement.update();
        pongElement.checkCollisionWithWall();
    }

    requestAnimationFrame(mainLoop);
}

mainLoop();
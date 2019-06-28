var cvs = document.getElementById('canvas');
//Вид игры0
var cntx = cvs.getContext('2d');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = 'kartinki/flappy_bird_bird.png';
bg.src = 'kartinki/flappy_bird_bg.png';
fg.src = 'kartinki/flappy_bird_fg.png';
pipeUp.src = 'kartinki/flappy_bird_pipeUp.png';
pipeBottom.src = 'kartinki/flappy_bird_pipeBottom.png';

var gap = 90;

//При нажатии на кнопку
document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos -= 25;
    fly.play();
}

//Создание блоков
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
};
//Счет
var score = 0;

//Позиция птички

var xPos = 10;
var yPos = 150;
var grav = 1.5;

//Звуковые файлы
var fly = new Audio();
var score_audio = new Audio();

fly.src = 'audio/fly.mp3';
score_audio.src = 'audio/score.mp3';

function draw() {
    cntx.drawImage(bg, 0, 0);

    //Отслеживание прикосновений

    for (var i = 0; i < pipe.length; i++) {
        cntx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        cntx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 100) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if (xPos + bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
                || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); //Перезагрузка страницы
        }

        if (pipe[i].x === 5) {
            score++;
            score_audio.play();
        }
    }

    cntx.drawImage(fg, 0, cvs.height - fg.height);
    cntx.drawImage(bird, xPos, yPos);

    yPos += grav;

    cntx.fillStyle = '#000';
    cntx.font = '20px Verdana';
    cntx.fillText('Счет:' + score, 10, cvs.height - 20)

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;
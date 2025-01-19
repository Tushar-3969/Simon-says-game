let gameSeq = [];
let userSeq = [];

let btn = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;
let highScore=0;


let h3 = document.querySelector("h3");
let highestscoreElement=document.querySelector("#highest-score")

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
        scoreHigh();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h3.innerHTML = `Level: ${level}`;
   
    let random = Math.floor(Math.random() * 4);
    let randColor = btn[random];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
    scoreHigh();

}

function checkBtn(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h3.innerHTML = `Game Over! Your score was <b>${level}</b><br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
        scoreHigh();
    
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkBtn(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (newBtn of allBtns) {
    newBtn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}
function scoreHigh(){
    if(level>highScore){
        highScore=level;
    }
    highestscoreElement.innerHTML=`Highest Score: ${highScore}`;
}

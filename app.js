let body = document.querySelector('body');
let gameStatus = document.querySelector('.game-status');
let divs = document.querySelector('.game');
const buttons = ['red', 'green', 'yellow', 'blue'];
let gameSequence = [];
let userSequence = [];
let levelCount = 0;
let gameStarted = false;
let score=document.querySelector('.score');
let description=document.querySelector('.description');
let close=document.getElementById('close');
let open=document.getElementById('open');

document.addEventListener("keypress", () => {
    if (!gameStarted) {
        console.log("game has started");
        gameStarted = true;
        levelUp();
    }
});


function levelUp(){
    userSequence=[];
    levelCount++;
    gameStatus.innerText=`level-${levelCount}`;
    //random buttonm choose and flash
    let randColor=buttons[Math.floor(Math.random()*4)];
    let btn=document.querySelector(`.${randColor}`);
    gameFlash(btn);
    gameSequence.push(randColor);
    console.log(gameSequence);
}
function seqCheck(idx){
    if(userSequence[idx]===gameSequence[idx]){
        if (userSequence.length==gameSequence.length) {
            setTimeout(levelUp,1000);
        }
        
    }else{
        body.classList.add("danger");
        setTimeout(() => {
            body.classList.remove("danger");
        }, 500);
        gameStatus.innerHTML=`Your score : ${levelCount}<br>Game over!<br>Press any key to start`;
        reset();
    }
}
function reset(){
    gameStarted=false;
    score.innerText=`${max(levelCount,score.innerText)}`;   
    gameSequence=[];
    userSequence=[];
    levelCount=0;
}
function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(()=>btn.classList.remove("flash"),300);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(()=>btn.classList.remove("userflash"),200);
    
}
function btnPress(){
    if (!gameStarted) {
        return;
    }
    let btn=this;
    userFlash(btn);
    let userColor=btn.getAttribute("id");
    userSequence.push(userColor);
    seqCheck(userSequence.length-1);
}
function max(a,b){
    return a>b?a:b;
}
let allBtns=document.querySelectorAll('.btn');
for(let btn of allBtns){
    btn.addEventListener('click',btnPress);
}
close.addEventListener('click',()=>{
            description.classList.add('hide');
            this.classList.add('hide');
})
open.addEventListener('click',()=>{
            description.classList.remove('hide');
            close.classList.remove('hide');
            this.classList.add('hide');
})
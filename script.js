let xScore = localStorage.getItem("xScore") ? Number(localStorage.getItem("xScore")) : 0;
let oScore = localStorage.getItem("oScore") ? Number(localStorage.getItem("oScore")) : 0;

let xHigh = localStorage.getItem("xHigh") ? Number(localStorage.getItem("xHigh")) : 0;
let oHigh = localStorage.getItem("oHigh") ? Number(localStorage.getItem("oHigh")) : 0;

const xScoreEl = document.getElementById("xscore");
const oScoreEl = document.getElementById("oscore");
const xHighEl = document.getElementById("Xhigh");
const oHighEl = document.getElementById("ohigh");
function highlightLeader() {
    xScoreEl.classList.remove("leader");
    oScoreEl.classList.remove("leader");

    if (xScore > oScore) {
        xScoreEl.classList.add("leader");
    } else if (oScore > xScore) {
        oScoreEl.classList.add("leader");
    }
}

updateScoreUI();
function updateScoreUI() {
    xScoreEl.textContent = `Score X: ${xScore}`;
    oScoreEl.textContent = `Score O: ${oScore}`;
    xHighEl.textContent = `Player X highest score: ${xHigh}`;
    oHighEl.textContent = `Player O highest score: ${oHigh}`;
    highlightLeader() ;
}
const boxes = document.querySelectorAll(".box");
const reset= document.querySelector("#reset");
const resetScoresBtn = document.querySelector("#resetScores");
let winpattern=[[0,1,2],[3,4,5],[6,7,8] ,
                 [0,3,6],[1,4,7],[2,5,8] ,
                [0,4,8],[2,4,6] ];


let msg=document.querySelector(".winmsg");
let winner="";

let check = "x";
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.textContent) {
            box.textContent = check;
            checkWinner();
            
            if(winner){
                showwinner(winner);
                boxes.forEach((box) => {
                    box.disabled = true;
                    
            
                });
                return;
            }
            else{
            if (check === "x") check = "o";
            else check = "x";
            }

        }
        
    });
    
});

function showwinner(winner){
    if(winner=="tie") msg.textContent="-:MATCH TIE:- \n Restart The Game.."
    else {
        msg.textContent=`Congratulation player ${winner} win the match`;
        if (winner === "x") {
            xScore++;
            if (xScore > xHigh) xHigh = xScore;
        } else if (winner === "o") {
            oScore++;
            if (oScore > oHigh) oHigh = oScore;
        }

        localStorage.setItem("xScore", xScore);
        localStorage.setItem("oScore", oScore);
        localStorage.setItem("xHigh", xHigh);
        localStorage.setItem("oHigh", oHigh);

        updateScoreUI();
    }
}
reset.addEventListener("click", () =>{
    boxes.forEach((box) =>{
        if(box.textContent){
            box.textContent="";           
        }       
    });
    msg.textContent="";
    
    check="x";
    winner="";
    boxes.forEach((box) => {
        box.disabled = false;            
    });  
    
});

function resetScores() {
    xScore = 0;
    oScore = 0;
    localStorage.setItem("xScore", 0);
    localStorage.setItem("oScore", 0);
    updateScoreUI();
    reset.dispatchEvent(new Event("click"));

}
resetScoresBtn.addEventListener("click", resetScores);



function checkWinner(){
    for(let i of winpattern){       
        let a=i[0];
        let b=i[1];
        let c=i[2];
        if(boxes[a].textContent !="" && boxes[b].textContent !="" && boxes[c].textContent !="" ){
            if(boxes[a].textContent==boxes[b].textContent && boxes[b].textContent==boxes[c].textContent && boxes[c].textContent==boxes[a].textContent ){
                winner=boxes[a].textContent; 
                return;              
            }
            
        }

    }
    const isBoardFull = Array.from(boxes).every(box => box.textContent !== "");
    if(isBoardFull && winner==""){
        winner="tie";
    }
}
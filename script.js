const boxes = document.querySelectorAll(".box");
const reset= document.querySelector("#reset");
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
    else msg.textContent=`Congratulation player ${winner} win the match`;
}
reset.addEventListener("click", () =>{
    boxes.forEach((box) =>{
        if(box.textContent){
            box.textContent="";           
        }       
    });
    msg.textContent="";
    tie=0;
    check="x";
    winner="";
    boxes.forEach((box) => {
        box.disabled = false;            
    });    
});

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

    



        
    

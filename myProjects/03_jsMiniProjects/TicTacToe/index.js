const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameInfo");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

let round = 1;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// let's create a function to initialize the game
function initGame() {
    currentPlayer = "X";
    // for logic
    gameGrid = ["", "", "", "", "", "", "", "", ""];


    // for ui

    boxes.forEach((box, index) => {
        boxes[index].innerText = "";
      
        boxes[index].style.pointerEvents = "all";
        // one more thing is missing, initialize box with css properties again
        box.classList = `box box${index+1}`
    })


    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`


}
// console.log(boxes);


initGame();


function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
        gameInfo.innerText = `Current Player - ${currentPlayer}`
    }
    else {
        currentPlayer = "X"
        gameInfo.innerText = `Current Player - ${currentPlayer}`
    }
}


function checkGameOver() {
    // newGameBtn.classList.add("active")
    let answer = "";

    winningPositions.forEach((position) => {
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] == gameGrid[position[2]])) {
           

            // check if winner is X
            if(gameGrid[position[0]] === 'X'){
                answer = 'X'
            }
            else {
                answer = 'O'
            }

            // disable pointer events
            boxes.forEach((box) =>{
                box.style.pointerEvents = "none";
            })

            // now we know X/O is a winner

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }

    })

    // it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    // let's check whether there is tie

    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    })


    if(fillCount === 9){
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");

    }
}

function handleClick(index) {
    if (gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";

        swapTurn();
        checkGameOver();
    }




}




boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        console.log("going to handle click");

        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);


const homePage = document.querySelector(".home");
const wrapper = document.querySelector(".wrapper")
function startGame(){
    homePage.classList.add("removeHome");
    wrapper.classList.add("playGame");
}







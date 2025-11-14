let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameButton = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let external = document.querySelector(".hide1");
let msg = document.querySelector("#msg");

let turno = true; // O starts
let user= prompt("Hi, Sangeeta, Enter any Emoji or text you like just bellow this text:");
//external.classList.remove("hide1");
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () => {
    turno = true;
    enableBtns();
    boxes.forEach(b => b.innerText = "");
    msgContainer.classList.add("hide");
    document.getElementById("game-area").classList.remove("hide1");
    document.querySelector("#celebration").classList.add("hide");
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {

        // Player move (O)
        if (turno && box.innerText === "") {
            box.innerText = user;
            box.disabled = true;
            turno = false;
        }

        // Auto move (X) - pick first empty box
        setTimeout(() => {
            if (!turno) {
                for (let b of boxes) {
                    if (b.innerText === "") {
                        b.innerText = "\uD83C\uDF82";   // <-- FIXED
                        b.disabled = true;
                        turno = true;
                        break;
                    }
                }
            }
            checkWinner();
        }, 500);

        checkWinner();
    });
});

const enableBtns = () => {
    boxes.forEach(b => b.disabled = false);
};

const disableBtns = () => {
    boxes.forEach(b => b.disabled = true);
};

const showWinner = (winner) => {
    if(winner == user){
    msg.innerText = `Congratulations! 🎉
        You got the cake, now it's time to celebrate!
        Happy Birthday to Sangeeta ❤️`;
    msgContainer.classList.remove("hide");
    //msgContainer.classList.add("hide1");
    document.getElementById("game-area").classList.add("hide1");
    document.querySelector("#celebration").classList.remove("hide");
    disableBtns();
    }
    else{
        msg.innerText = `Try Again, You can win!`;
        msgContainer.classList.remove("hide");
       // msgContainer.classList.add("hide1");
    disableBtns();
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
            }
        }
    }
};

resetBtn.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameButton = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turno = true; // O starts
let userName = prompt("Enter your name:");

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
};

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {

        // Player move (O)
        if (turno && box.innerText === "") {
            box.innerText = userName;
            box.disabled = true;
            turno = false;
        }

        // Auto move (X) - pick first empty box
        setTimeout(() => {
            if (!turno) {
                for (let b of boxes) {
                    if (b.innerText === "") {
                        b.innerText = "Bristy";   // <-- FIXED
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
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtns();
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

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameButton = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let gameArea = document.getElementById("game-area");
let celebration = document.getElementById("celebration");

let turno = true; // Player starts
let user = "";

// Show custom emoji prompt
document.getElementById("customPrompt").classList.remove("hide");

document.getElementById("promptOk").addEventListener("click", () => {
    user = document.getElementById("promptInput").value || "🙂";
    document.getElementById("customPrompt").classList.add("hide");
    startGame(user);
});

function startGame(user) {
    console.log("User entered:", user);
    // optional: play background music
    let audio = new Audio("JS/hbirthday.mp3"); // Add your birthday mp3 in JS folder
    audio.loop = true;
    audio.volume = 0.1;
    audio.play();
}

// Winning patterns
const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],  // rows
    [0,3,6],[1,4,7],[2,5,8],  // columns
    [0,4,8],[2,4,6]           // diagonals
];

// Reset Game
const resetGame = () => {
    turno = true;
    enableBtns();
    boxes.forEach(b => b.innerText = "");
    msgContainer.classList.add("hide");
    gameArea.classList.remove("hide1");
    celebration.classList.add("hide");
    removeConfetti();
};

// Game box click events
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turno && box.innerText === "") {
            box.innerText = user;
            box.disabled = true;
            turno = false;
        }

        setTimeout(() => {
            if (!turno) {
                for (let b of boxes) {
                    if (b.innerText === "") {
                        b.innerText = "\uD83C\uDF82"; // Cake emoji for AI
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

// Enable / Disable buttons
const enableBtns = () => boxes.forEach(b => b.disabled = false);
const disableBtns = () => boxes.forEach(b => b.disabled = true);

// Show Winner
const showWinner = (winner) => {
    if(winner == user){
        msg.innerHTML = `🎉 Congratulations ${user}! 🎉<br>
        You got the cake! <br>
        Happy Birthday to Sangeeta!<br>
        Heal, Become and Grow ❤️`;
        msgContainer.classList.remove("hide");
        gameArea.classList.add("hide1");
        celebration.classList.remove("hide");
        startConfetti();
        disableBtns();
    } else {
        msg.innerHTML = `🎈 Try Again! You can win the cake! 🎈`;
        msgContainer.classList.remove("hide");
        disableBtns();
    }
};

// Check Winner Logic
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a,b,c] = pattern.map(i => boxes[i].innerText);
        if (a && a === b && b === c) {
            showWinner(a);
        }
    }
};

// Event Listeners
resetBtn.addEventListener("click", resetGame);
newGameButton.addEventListener("click", resetGame);

// 🎊 Confetti Animation (for birthday celebration)
function startConfetti() {
    let confettiContainer = document.createElement("div");
    confettiContainer.classList.add("confetti-container");
    document.body.appendChild(confettiContainer);

    for(let i = 0; i < 100; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.animationDuration = (Math.random() * 3 + 2) + "s";
        confetti.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
}

function removeConfetti() {
    let confettiContainer = document.querySelector(".confetti-container");
    if(confettiContainer) confettiContainer.remove();
}

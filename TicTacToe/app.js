let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg");
let msg = document.querySelector("#content");

let turn0 = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    msgContainer.classList.add("hide");
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congo, Winner is Player ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
};

const resetGame = () => {
  turn0 = true;
  enableBoxes();
  count = 0;
  msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const gameDraw = () => {
  msg.innerText = `Draw`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

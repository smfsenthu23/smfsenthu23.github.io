const cards = document.querySelectorAll(".m-card");
let flippedCard = false;
let pauseClick = false;
let first, second;
let clickCnt = 0;
const bestScore = "bestScore";
const localScore = localStorage.getItem(bestScore);
const bestDiv = document.querySelector("#bestScore");
const yourScore = document.querySelector("#yourScore");

function flipCard() {
  yourScore.innerText = ++clickCnt;
  bestDiv.innerText=(localScore == null?'':localScore);
  if (pauseClick) return;
  if (this === first) return;
  this.classList.add("flip");
  if (!flippedCard) {
    flippedCard = true;
    first = this;
    return;
  }
  second = this;

  matching();
}

function matching() {
  first.dataset.img === second.dataset.img ? disableCards() : unflipCards();
}

function disableCards() {
  first.removeEventListener("click", flipCard);
  second.removeEventListener("click", flipCard);
  let flipCnt = 0;
  for (let card of cards) {
    //alert(card.classList.contains('flip'))
    if (card.classList.contains("flip")) {
      ++flipCnt;
    }
  }
  if (flipCnt === 12) {
    //second.style.transform = "rotateY(180deg)";
    setTimeout(() => alert("GAME OVER!!"), 500);
    if (localScore === null || clickCnt < localScore) {
      localStorage.setItem(bestScore, clickCnt);
      bestDiv.innerText = clickCnt;
    }
  }
  resetBoard();
}

function unflipCards() {
  pauseClick = true;
  setTimeout(() => {
    first.classList.remove("flip");
    second.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [flippedCard, pauseClick] = [false, false];
  [first, second] = [null, null];
}

function startOver() {
    for(let card of cards){
        if(card.classList.contains('flip')){
            card.classList.remove('flip');
            card.addEventListener("click", flipCard);
        }
    }
    resetBoard();
    yourScore.innerText = 0;
}

let shuffleFunc = function () {
    console.log(pauseClick);
    console.log(flippedCard);
  cards.forEach((card) => {
    let rdPosition = Math.floor(Math.random() * 12);
    card.style.order = rdPosition;
  });
}
shuffleFunc();
cards.forEach((card) => card.addEventListener("click", flipCard));
document.querySelector("#start").addEventListener('click', startOver);

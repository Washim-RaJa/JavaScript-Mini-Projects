const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockboard = false;
let moves = 0;
let matchedCount = 0;
let score = 0
let startTime,elapsedTime = 0, timerInterval;


fetch('./assets/cards.json')
    .then(res => res.json())
    .then(data => {
        cards = [...data, ...data];
        shuffleCards();
        generateCards();
        startTimer();
    })

function shuffleCards() {    
    let currentIndex = cards.length;
    let randomIndex, temporaryValue;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex]
        cards[randomIndex] = temporaryValue
    }
}

function generateCards(){
    for(let card of cards){
        const cardElement = document.createElement('div');
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", card.name);
        cardElement.innerHTML = `
            <div classs="frontside">
                <img class="front-image" src=${card.image} alt=${card.name}/>
            </div>
            <div class="backside"></div>
        `
        gridContainer.append(cardElement);
        cardElement.addEventListener('click', flipcard);
    }
}
function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(()=>{
        elapsedTime = Date.now() - startTime;
        updateDisplay(elapsedTime)
    }, 10)
}
function updateDisplay(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');
    milliseconds = milliseconds.toString().padStart(2, '0');
  
    document.querySelector('.duration').textContent = `${minutes}:${seconds}:${milliseconds}`;
  }
function stopTimer() {
    clearInterval(timerInterval)
}
function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(elapsedTime)
}
function flipcard() {
    if(lockboard) return;       // when true it won't allow any card to be flipped

    // If current card element is already selected it won't allow the function execute further
    if (this === firstCard) return;

    this.classList.add("flipped");

    // If firstcard is undefined = falsy = not yet selected
    if (!firstCard) {
        // then assign current cliced element's reference to firstcard
        firstCard = this
        return;
    }
    
    secondCard = this
    moves++;
    document.querySelector(".moves").textContent = moves;
    lockboard = true;
    checkForMatch()
}
function checkForMatch() {
    const isMatched = firstCard.dataset.name === secondCard.dataset.name
    isMatched ? disableCards() : unflipCards();
}
function disableCards() {
    firstCard.removeEventListener('click', flipcard)
    secondCard.removeEventListener('click', flipcard)
    matchedCount++
    document.querySelector(".matchedCount").textContent = matchedCount;
    resetBoard()
    checkForAllMatch()
}
function unflipCards() {
    setTimeout(()=> {
        firstCard.classList.remove("flipped")
        secondCard.classList.remove("flipped")
        resetBoard()
    }, 400)
}
function checkForAllMatch() {
    if (matchedCount == 8) {
        const matchPercentage = ((matchedCount/moves) * 100).toFixed(2)
        score = Math.floor(10 * (matchPercentage/100))
        document.querySelector(".score").textContent = score;
        stopTimer()
    }
}
function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockboard = false
}

function restartGame() {
    resetBoard();
    shuffleCards()
    moves = 0;
    document.querySelector(".moves").textContent = moves;
    matchedCount = 0;
    document.querySelector(".matchedCount").textContent = matchedCount;
    score = 0;
    document.querySelector(".score").textContent = score
    gridContainer.innerHTML = "";
    generateCards()
    resetTimer();
    setTimeout(()=> startTimer(), 1000)
}


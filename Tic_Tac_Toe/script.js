let currentPlayer = 'X';
let combinations = Array(9).fill(null);

function checkWinner(){
    if(
        (combinations[0] !== null && combinations[0] == combinations[1] && combinations[1] == combinations[2]) ||
        (combinations[3] !== null && combinations[3] == combinations[4] && combinations[4] == combinations[5]) ||
        (combinations[6] !== null && combinations[6] == combinations[7] && combinations[7] == combinations[8]) ||
        (combinations[0] !== null && combinations[0] == combinations[3] && combinations[3] == combinations[6]) ||
        (combinations[1] !== null && combinations[1] == combinations[4] && combinations[4] == combinations[7]) ||
        (combinations[2] !== null && combinations[2] == combinations[5] && combinations[5] == combinations[8]) ||
        (combinations[0] !== null && combinations[0] == combinations[4] && combinations[4] == combinations[8]) ||
        (combinations[2] !== null && combinations[2] == combinations[4] && combinations[4] == combinations[6])
    ){
        gameOver()
        return true
    }
}

function checkDraw() {
    if(!combinations.some(el => el === null) && !checkWinner()){
        document.querySelector('.player').style.color = "rgba(0, 0, 0, 0.8)"
        document.querySelector('.player').innerText = `Game is draw`
        document.querySelector('.resetBtn').style.display = "inline"  
    }
}

function handleClick(element) {
    if (combinations[element.id] !== null) return;
    combinations[element.id] = currentPlayer
    element.textContent = currentPlayer;
    element.style.color = element.textContent ==='X' ? "crimson" : "slateblue";
    checkWinner()
    if(!checkWinner()){
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
        document.querySelector('.player').innerText = `${currentPlayer}'s turn`
        document.querySelector('.player').style.color = currentPlayer ==='X' ? "crimson" : "slateblue";
    }
    checkDraw()
}

function gameOver(){
    for(let div of document.querySelectorAll('.col')){
        div.removeAttribute('onclick')
    }
    document.querySelector('.player').style.color = currentPlayer ==='X' ? "crimson" : "slateblue";
    document.querySelector('.player').innerText = `${currentPlayer} is winner`;
    document.querySelector('.resetBtn').style.display = "inline";
}

function resetGame() {
    combinations = Array(9).fill(null);
    currentPlayer = 'X';
    for(let div of document.querySelectorAll('.col')){
        div.textContent = ""
        div.setAttribute('onclick', "handleClick(this)")
    }
    document.querySelector('.player').style.color = "rgba(0, 0, 0, 0.8)";
    document.querySelector('.player').innerText = `Let's start`;
    document.querySelector('.resetBtn').style.display = "none";
}
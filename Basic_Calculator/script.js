const operationInput = document.querySelector(".inputOp");
const resultInput = document.querySelector(".result");
const themeIcon = document.getElementById("theme-icon")

function evaluation() {
  try {
    const inputLength = operationInput.value.toString().length
    const lastIndex = inputLength - 1
    const lastCharacter = operationInput.value.toString().charAt(lastIndex);

    if (lastCharacter === "%" && inputLength > 1) {
      const str = operationInput.value.toString().slice(0, -1);
      return resultInput.value = eval(str / 100)
    }
    if (operationInput.value.toString().includes("%")) {
        return resultInput.value = `Remainder ${eval(operationInput.value)}`
    }
    else {
        resultInput.value = eval(operationInput.value)
    }
  } catch (error) {
    resultInput.value = "Syntax Error";
  }
}
function clearAll(){
    operationInput.value = "";
    resultInput.value = "";
}

function toggleTheme(){
    if (themeIcon.classList.value.includes("fa-moon")) {
        themeIcon.classList.remove("fa-moon")
        themeIcon.classList.add("fa-sun")
        document.body.style.backgroundColor = "#081828";
        document.querySelector(".container").style.backgroundColor = "";
        document.querySelector(".preview-container").style.borderColor = "slategray";
        operationInput.style.backgroundColor = "transparent";
        operationInput.style.color = "cyan";
        resultInput.style.backgroundColor = "transparent";
        resultInput.style.color = "cyan";
        
        for(let btn of document.getElementsByTagName("button")){
            btn.className = "dark"
        }
    }
    else{
        themeIcon.classList.add("fa-moon")
        themeIcon.classList.remove("fa-sun")
        document.body.style.backgroundColor = ""
        document.querySelector(".container").style.backgroundColor = "rgba(230, 230, 230, 0.685)";
        document.querySelector(".preview-container").style.borderColor = "#ccc";
        operationInput.style.backgroundColor = "";
        operationInput.style.color = "black";

        resultInput.style.backgroundColor = "";
        resultInput.style.color = "black";

        for(let btn of document.getElementsByTagName("button")){
            btn.className = ""
        }
    }    
}



document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "Escape") {
    clearAll()
  }
  if (key === "Enter") {
    evaluation();
  }

  if (key === "Backspace")
    operationInput.value = operationInput.value.toString().slice(0, -1);

  if (key === "%") operationInput.value += "%";

  if (key === "/") operationInput.value += "/";
  if (key === "*") operationInput.value += "*";
  if (key === "+") operationInput.value += "+";
  if (key === "-") operationInput.value += "-";

  if (key === "0") operationInput.value += "0";
  if (key === "1") operationInput.value += "1";
  if (key === "2") operationInput.value += "2";
  if (key === "3") operationInput.value += "3";
  if (key === "4") operationInput.value += "4";
  if (key === "5") operationInput.value += "5";
  if (key === "6") operationInput.value += "6";
  if (key === "7") operationInput.value += "7";
  if (key === "8") operationInput.value += "8";
  if (key === "9") operationInput.value += "9";

  if (key === ".") operationInput.value += key;
});

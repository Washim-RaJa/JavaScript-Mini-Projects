window.onload = () => {
    document.querySelector(".calculate-btn").onclick = main;
    document.querySelector(".reset-btn").onclick = reset;
}
let interval;

function main() {
    const dateInput = document.querySelector("#date").value;
    const timeInput = document.querySelector("#time").value;
    const stopBtn = document.querySelector(".stop-btn");

    if (!dateInput || !timeInput) {
        return alert("Please enter Date & Time");
        
    }
    
    const deadline = new Date(dateInput + " " + timeInput)

    interval = setInterval(() => {
        calculateTime(deadline)
    }, 1000);

    stopBtn.addEventListener("click", ()=> {
        
        if (stopBtn.innerText === "Stop") {
            stopBtn.innerText = "Resume"
            clearInterval(interval)
        } else {
            stopBtn.innerText = "Stop"
            interval = setInterval(() => {
                calculateTime(deadline)
            }, 1000);
        }
    })

}

function calculateTime(deadline) {
    const currentTime = new Date();
    const days = document.querySelector(".days div");
    const hours = document.querySelector(".hours div");
    const minutes = document.querySelector(".minutes div");
    const seconds = document.querySelector(".seconds div");

    if (deadline > currentTime) {
        const remainingTime = (deadline - currentTime) / 1000
        
        days.innerHTML = Math.floor(remainingTime/ (24 * 60 * 60))
        hours.innerHTML = Math.floor((remainingTime/ (60 * 60)) % 24)
        minutes.innerHTML = Math.floor((remainingTime/ 60) % 60)
        seconds.innerHTML = Math.floor((remainingTime % 60))
    }
}

function reset(){
    clearInterval(interval)
    document.querySelector(".days div").innerHTML = 0
    document.querySelector(".hours div").innerHTML = 0
    document.querySelector(".minutes div").innerHTML = 0
    document.querySelector(".seconds div").innerHTML = 0
    window.location.reload()
}
const quizContents = [
    {
        q: 'Which one is our home galaxy?',
        a: 'Andromeda Galaxy.',
        b: 'Virgo A',
        c: 'Centaurus A',
        d: 'Milky Way Galaxy',
        correctAns: 'd'
    },
    {
        q: 'How many planets are there in our solar system?',
        a: 13,
        b: 10,
        c: 8,
        d: 9,
        correctAns: 'c'
    },
    {
        q: 'How many continents are there in the world?',
        a: 5,
        b: 6,
        c: 7,
        d: 8,
        correctAns: 'c'
    },
    {
        q: 'How many occeans are there in the world?',
        a: 4,
        b: 5,
        c: 6,
        d: 7,
        correctAns: 'b'
    },
    {
        q: 'Which one is the nearest star to earth after sun?',
        a: 'Sirius',
        b: 'Evening star',
        c: 'Vega',
        d: 'Proxima Centauri',
        correctAns: 'd'
    },
    {
        q: 'How many states and union territories are there in india?',
        a: '29 states and 7 union territories.',
        b: '29 states and 8 union territories.',
        c: '28 states and 8 union territories.',
        d: '27 states and 9 union territories.',
        correctAns: 'c'
    },
    {
        q: 'What does HTML stand for?',
        a: 'Hypertext Markup Language.',
        b: 'Hypertext Machine Language.',
        c: 'Hypertext Modern Language.',
        d: 'All of the above.',
        correctAns: 'a'
    },
    {
        q: 'What does CSS stand for?',
        a: 'Computer Style Sheets.',
        b: 'Custom Style Sheets.',
        c: 'Cascading Style Sheets.',
        d: 'All of the above.',
        correctAns: 'c'
    },
    {
        q: 'Who invented computer?',
        a: 'Charles Babbage.',
        b: 'Nikola Tesla',
        c: 'Sir Issac Newton',
        d: 'Albert Einstein',
        correctAns: 'a'
    },
    {
        q: 'Javascript is also known as?',
        a: 'TypeScript.',
        b: 'ECMAScript.',
        c: 'Scripting Language',
        d: 'All of the above',
        correctAns: 'b'
    },
]


// Selecting the Elements
const container = document.querySelector('.container');
const startQuiz = document.querySelector('.start-btn');
const quizHeader = document.querySelector('.header');
const quizContainer = document.querySelector('.quiz-contents');
const previewQuestion = document.getElementById('preview-question');
const optionButtons = document.querySelectorAll('.option-btn');
const button = document.getElementById('btn');
const restartQuiz = document.querySelector('.restart-btn');
const resultContainer = document.querySelector('.result-container');

// 1st Step:
startQuiz.addEventListener('click',()=>{
    startQuiz.classList.add('hide');
    quizHeader.classList.remove('hide');
    quizContainer.classList.remove('hide');
    setQuestions();
})

// 2nd Step:
let index = 0;
const total = quizContents.length
let score = 0;
function setQuestions(){
    document.getElementById('question-number').innerText = `Question: ${index+1}/${total}`;
    previewQuestion.innerText = quizContents[index]?.q;
    document.getElementById('option-1').innerText = quizContents[index]?.a;
    document.getElementById('option-2').innerText = quizContents[index]?.b;
    document.getElementById('option-3').innerText = quizContents[index]?.c;
    document.getElementById('option-4').innerText = quizContents[index]?.d;
}

// 3rd Step:
function checkAnswer(element){
    if (element.value === quizContents[index].correctAns) {
        score += 1;
        element.classList.replace('option-btn','right');
        document.getElementById('score').innerText = `Score : ${score}`;
        
        optionButtons.forEach((eachElement)=>{
            if (eachElement.value !== quizContents[index].correctAns) {
                eachElement.setAttribute('disabled','disabled');
            } 
        })
        button.removeAttribute("disabled")
        button.style.opacity = 1
        button.style.cursor = "pointer"
    } 
    else{

        optionButtons.forEach((eachElement)=>{
        if (eachElement.value === quizContents[index].correctAns) {
            eachElement.classList.replace('option-btn','right');
            eachElement.setAttribute('disabled','disabled');
            button.removeAttribute("disabled")
            button.style.opacity = 1
            button.style.cursor = "pointer"
            
        } else {
            eachElement.classList.replace('option-btn','wrong');
            button.removeAttribute("disabled")
            button.style.opacity = 1
            button.style.cursor = "pointer"
        }
        })
    }
}

// 4th Step:
button.addEventListener('click',()=>{
    button.setAttribute("disabled", "disabled")
    button.style.opacity = "50%"
    button.style.cursor = "not-allowed"

    index++
    index == 9 ? button.innerText = 'Submit' : '';  
    if(index == 10){
        quizHeader.classList.add('hide');
        quizContainer.classList.add('hide');
        resultContainer.classList.toggle("hide")
        resultContainer.innerHTML = 
        `<h1>Quiz has ended</h1>
        <h2>
            You got <span>${score}/10</span>
        </h2>
        <h2>
            Thank you for playing !
        </h2>`;
        restartQuiz.classList.remove('hide');
        restartQuiz.addEventListener('click', () => {
            window.location.reload();
        })
    }
    setQuestions();
    reset();
})

// 5th Step:
function reset(){
    optionButtons.forEach((eachElement)=>{
        eachElement.classList.replace('right','option-btn');
        eachElement.classList.replace('wrong','option-btn');
        eachElement.removeAttribute('disabled','disabled');
    })
}

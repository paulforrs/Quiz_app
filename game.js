const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll(".choice-text"));
const scoreText = document.querySelector('#scoreCounter');
const hudPrefix = document.querySelector('.hud-prefix');
const progressBar = document.querySelector(".progressBarProgress");
const progressBarWidth =document.querySelector(".progressBar");
const loader = document.querySelector('#loader');
const game = document.querySelector('#game');

const progBar = progressBarWidth.getBoundingClientRect(),
progBarBox = progressBar.getBoundingClientRect();

let currentQuestion = {},
acceptingQuestion = true,
availableQuestion = [],
score = 0,
questionCounter = 0;


let questions =[];


fetch("https://the-trivia-api.com/api/questions?categories=history&limit=20&difficulty=easy")
.then(res =>{
    return res.json();
})
.then(loadedQuestions =>{

    console.log(loadedQuestions);

    fetchedQuestions = loadedQuestions.map( loadedQuestion =>{
        const formattedQuestion = {
            question: loadedQuestion.question
        };
        const answerChoices = [...loadedQuestion.incorrectAnswers];
        formattedQuestion.answer = Math.floor(Math.random()*3)+1;

        answerChoices.splice(formattedQuestion.answer-1, 0, loadedQuestion.correctAnswer);

        answerChoices.forEach((choice, index) =>{
            formattedQuestion['choice'+(index +1)] = choice;
        });


        return formattedQuestion;
    });
    questions = [...fetchedQuestions];
    console.log(questions.length);
    startGame();
})
.catch( error =>{
    console.error(error);
});



//   CONSTANTS



const correctBonus = 1;
const MaxQuestion = 50;

startGame = () =>{
    availableQuestion = [...questions];
    console.log(availableQuestion);
    questionCounter = 0;
    score = 0;
    getQuestion();
    loader.classList.add('hidden');
    game.classList.remove('hidden');
}

getQuestion =() =>{
    if (availableQuestion.length === 0 || questionCounter >= MaxQuestion){
        localStorage.setItem('recentScore', score);
        return window.location.assign('end.html');
            
    }
    questionCounter++;
// HUD
    scoreText.innerText = `${score}`;
    hudPrefix.innerText = `Question ${questionCounter}/${MaxQuestion}`;

// QUESTION
    questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerHTML = currentQuestion.question;
    choices.forEach( choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" +number];
    
    });
    console.log(currentQuestion);

// Progress Bar update
    updateBar();

// Question length update
    availableQuestion.splice(questionIndex, 1);
    acceptingQuestion = true;
}

const updateScore = num =>{
    score += num;
    scoreText.innerText = score;
}


const updateBar = ()=>{
    const barWidth = progressBarWidth.clientWidth;
    // console.log(barWidth);
    const progressInRem = (questionCounter/MaxQuestion)*(barWidth/10)+.3; //barWidth in px  1rem = 10px;
    progressBar.style.width = `${progressInRem}`+'rem';
}

choices.forEach( choice =>{
    choice.addEventListener("click",e=>{
        if(!acceptingQuestion) return;
        acceptingQuestion = false;

        const selectedChoice = e.target.dataset['number'];
        const answerFeedback = selectedChoice == currentQuestion.answer ? "correct": "incorrect";
        if(answerFeedback == 'correct'){
            updateScore(correctBonus);
        }


        const correctAnswer = document.querySelector(`[data-number="${currentQuestion.answer}"]`);
        correctAnswer.parentElement.classList.add('correct')
        
        choice.parentElement.classList.add(answerFeedback);
        setTimeout(()=>{
            choice.parentElement.classList.remove(answerFeedback);
            correctAnswer.parentElement.classList.remove('correct')
            getQuestion();
        }, 2000)
    })
})


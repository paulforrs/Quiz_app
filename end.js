const saveScoreBtn = document.querySelector("#saveHighScoreBtn");
const username = document.querySelector("#username");
const recentScore = localStorage.getItem('recentScore');
const mostRecentScoreText = document.querySelector(".MostRecentScore");

const highScore = JSON.parse(localStorage.getItem("highscore")) || [];

const maxHighScore = 5;

mostRecentScoreText.innerText = recentScore;

console.log(recentScore);

const saveBtn = ()=>{
    saveScoreBtn.disabled = !username.value;
}

username.addEventListener("keyup",saveBtn);

saveHighScore = (e) =>{
    e.preventDefault();

    saveScoreBtn.disabled = true;
    username.removeEventListener('keyup', saveBtn);
    username.disabled = true;

    const score = {
        score: Math.floor(Math.random()*100),
        name: username.value
    }
    
    highScore.push(score);
    highScore.sort((a,b) => b.score -a.score);
    highScore.splice(maxHighScore);
    localStorage.setItem('highscore',JSON.stringify(highScore));
    console.log(highScore);
    setTimeout(()=>{
        window.location.assign('index.html');
    }, 1000);
   
}


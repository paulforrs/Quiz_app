const highScoreDisplay = document.querySelector("#highScoreDisplay");
const highscore = 
    JSON.parse(localStorage.getItem('highscore')) || [];

console.log(highscore);


var rankNum = 0;
const creatingRowElem = (scores)=>{
    const row = document.createElement('div');
    const rank = document.createElement('div');
    console.log(row);
    const name = document.createElement('div');
    const highscore = document.createElement('div');
    highScoreDisplay.appendChild(row)
    row.appendChild(rank);
    row.appendChild(name);
    row.appendChild(highscore);
    rank.classList.add("rank");
    row.classList.add('HighScoreRow');
    name.classList.add('HighScoreName');
    highscore.classList.add('HighScoreScore');

    rankNum ++;
    rank.innerText = rankNum;
    name.innerText = scores.name;
    highscore.innerText = scores.score;
}


highscore.map(scores =>{
    creatingRowElem(scores);
});
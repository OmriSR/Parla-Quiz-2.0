const username = document.getElementById('userName');
const saveScoreBtn = document.getElementById('saveScoreButton');
const finalScore = document.getElementById('finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 11;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () =>{
  saveScoreBtn.disabled = !username.value;
})

saveHighScore = e => {
  e.preventDefault();

  const score = {
    score: Math.floor(Math.random()*100),
    name: username.value
  };

  highScores.push(score);
  highScores.sort( (a,b) => b.score - a.score);
  highScores.splice(4);

  localStorage.setItem("highScores", JSON.stringify(highScores));
  window.location.assign("index.html");
};

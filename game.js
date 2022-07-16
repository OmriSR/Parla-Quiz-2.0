const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = {};

let questions = [
{
    question:"'...השלם את השורה: 'אין קצינים",
    choice1: "אין ריתוקים",
    choice2: "אין דאגות",
    choice3: "דה נוג-דה-דה",
    choice4: "אנריקה תוקים",
    answer: 4
  },
  {
    question:"?לאיזו מטרה אביבי פרלמן קנה אופנוע חדש",
    choice1: "כדי לרכב עליו",
    choice2: "לתת מתנה לחבר פולני",
    choice3: "כדי לרכב על איתי",
    choice4: "כדי להגיע מהר יותר לאיציק הגדול",
    answer: 3
  },
  {
    question:"?מה היה המרכיב הנוסף במרק הכבס של ענר",
    choice1: "שקדי מרק",
    choice2: "שקדי עגל",
    choice3: "עוף",
    choice4: "כבש",
    answer: 3
  },
  {
    question:"?מי המציא את המילה נייס",
    choice1: "מיכאל קמחי",
    choice2: "אביבי פרלמן",
    choice3: "כריסטופר קולומבוס",
    choice4: "אליעזר בן יהודה",
    answer: 1
  },
  {
    question:"?באיזו צורה חומוס חליל הוא טעים ביותר",
    choice1: "במקום",
    choice2: "באף צורה",
    choice3: "בטייק אווי",
    choice4: "קר",
    answer: 3
  },
  {
    question:"?כשיואב אומר 'יש לי חדשות טובות וחדשות רעות' מה החדשות הטובות",
    choice1: "החדשות הטובות הן ששיקרתי ויש לי המון וויד",
    choice2: "אין חדשות טובות הפעם אין לי וויד באמת",
    choice3: "אין זהו הפעם באמת נגמר אין לי וויד",
    choice4: "כל התשובות נכונות",
    answer: 4
  },
  {
    question:"?כמה סנדוויצים עזרא היה אוכל במקביל בהפסקה",
    choice1: "3",
    choice2: "11",
    choice3: "2",
    choice4: "1",
    answer: 3
  },
  {
    question:"בחר את התשובה היקרה ביותר מהאופציות",
    choice1: "דירה בתל אביב",
    choice2: "להזמין צייסרים בשאפה כשפרלמן אחמש",
    choice3: "לקנות ביטקוין",
    choice4: "להשתמש בשטרות כמדליק פחמים",
    answer: 2
  },
  {
    question:"?איפה צפצפו האופנועים שהובילו למשפט 'המסיבה לא נפסקת עד שהאופנוע האחרון לא מפסיק לצפצף'",
    choice1: "מול אמ:פמ לינקולן",
    choice2: "רחוב שפרינצק",
    choice3: "שדרות חן",
    choice4: "מול דיזינגוף סנטר",
    answer: 1
  },
  {
    question:"?על פי בוריס מה לא מנוף",
    choice1: "המתג של האורות במגרש",
    choice2: "אבי חוברה",
    choice3: "בוריס",
    choice4: "הדלת של האולם",
    answer: 3
  },
  {
    question:"?סן בנדטו איך המים",
    choice1: "נוצרים",
    choice2: "מתוקים",
    choice3: "נעימים",
    choice4: "ערבים",
    answer: 4
  }
]

const CORRECT_BONUS = 10;
const MAX_QUESTION = 11;

startGame = () => {
  questioncounter = 0;
  score = 0;
  availableQuestions = [...questions];
getNewQuestion();
}

getNewQuestion = () => {
  if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTION){
    localStorage.setItem('mostRecentScore', score);
    if(score > 60)
    {
      return window.location.assign("invitation.html");
    }
    else
    {
      return window.location.assign("non-vintation.html");
    }
  }

  questionCounter++;
  progressText.innerText =  `Question ${questionCounter}/${MAX_QUESTION}`;
  //update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTION) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex,1);

  acceptingAnswers = true;
}

choices.forEach( choice => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

    if(classToApply == 'correct') {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout( () => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    },940);
  })
})

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
}

startGame();

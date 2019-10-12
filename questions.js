 // Variables Defined by ID
var viewScorebtn = document.getElementById("viewscore");
var shownTime = document.getElementById("timer");
var startbtn = document.getElementById("start");
var questionTitle = document.getElementById("question");
var choices = document.getElementById("choices");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var showAns = document.getElementById("isCorrect");// the answer shown on the question page
var showAns1 = document.getElementById("isCorrect1");//the answer shown on the initial-name page 
var initial = document.getElementById("initial");
var finalScore = document.getElementById("score");
var submitbtn = document.getElementById("submit");
var scoreList = document.getElementById("scoreList");
var gobackbtn = document.getElementById("goback");
var clearbtn = document.getElementById("clear");
var landingPage = document.getElementById("landingpage");
var quizPage = document.getElementById("quizpage");
var initialenterpage = document.getElementById("scoreenterpage");
var finalPage = document.getElementById("recordpage");
var header = document.getElementById("header");
var correctSound = document.getElementById("correct");
var wrongSound = document.getElementById("wrong");
var startSound = document.getElementById("startSound");
var endingSound = document.getElementById("endingSound");
$("#friend-summary").hide();
$("#newfriend-summary").hide();

//Questions-List
var questionCollection = [
    {
        title: "Where do I come from?",
        choices: ["China", "Japan", "Korea", "India"],
        answer: "China"
    },
    {
        title: "What is my nick name?",
        choices: ["Mike", "Brandon", "Nick", "Norman"],
        answer: "Norman"
    },
    {
        title: "What is my last name?",
        choices: ["Li", "Lee", "Lei", "Lu"],
        answer: "Lei"
    },
    {
        title: "What is the name of my food truck?",
        choices: ["Yumbit", "Yummy8", "Yummybox", "Yum"],
        answer: "Yummy8"
    },
    {
        title: "when did I get out of school?",
        choices: ["2019", "2018", "2017", "2016"],
        answer: "2018"
    }
];

// New Variables Definitions
var qcLength = questionCollection.length;
var index = 0;
var isCorrect = null;
var totalTime = 75;
var timeLeft = 75;
var timeCountDown;
var score = 0;
//localStore Initialation
var record = [];
var tempRecord = JSON.parse(localStorage.getItem("data"));
if (tempRecord !== null) record = tempRecord;
else localStorage.setItem("data", JSON.stringify(record));


// Add a stop prototype to html audio element
HTMLAudioElement.prototype.stop = function () {
    this.pause();
    this.currentTime = 0.0;
}

// Click Events //

// HighScore Button on the left-top of the page
viewScorebtn.addEventListener("click", renderRecorePage);

// Start Quiz Button
startbtn.addEventListener("click", startQuiz);


// Multiple Choices Selected
choices.addEventListener("click", function (event) {
    if (event.target.localName == "button") {
        event.preventDefault();
        var pick = event.target.firstChild.textContent.substring(3);
        checkAns(pick);
    }
    if (index === qcLength) {
        clearInterval(timeCountDown);
        finishQuiz();
    }
});


//Initial-name Submit 
submitbtn.addEventListener("click", submitScore);


// Go back buttton on the highscore page === refresh page
gobackbtn.addEventListener("click", function () {
    window.location.reload();
    //window.history.go(-1);
    // landingPage.style.display = "block";
    // quizPage.style.display = "none";
    // initialenterpage.style.display = "none";
    // header.style.display = "block";
    // finalPage.style.display = "none";
    // scoreList.innerHTML = "";
});


// clear the localStore 
clearbtn.addEventListener("click", function () {
    record = [];
    localStorage.setItem("data", JSON.stringify(record));
    scoreList.innerHTML = "";
});


// click-triggered Functions//

// startQuiz Button is clicked
function startQuiz() {
    startSound.play();
    landingPage.style.display = "none";
    quizPage.style.display = "block";
    isCorrect = null;
    renderQuestion();
    timeCountDown = setInterval(timeCount, 1000);
}
// startQuiz button is clicked and timer is triggered.
function timeCount() {
    if (timeLeft > 0) {
        timeLeft--;
        shownTime.innerHTML = timeLeft + " s";
    } else {
        clearInterval(timeCountDown);
        isCorrect = null;
        finishQuiz();
    }
}
// startQuiz button is clicked and question page is triggered.
function renderQuestion() {
    correctSound.stop();
    wrongSound.stop();
    var tempQuestion = questionCollection[index];
    questionTitle.innerHTML = tempQuestion.title;
    choiceA.innerHTML = "A. " + tempQuestion.choices[0];
    choiceB.innerHTML = "B. " + tempQuestion.choices[1];
    choiceC.innerHTML = "C. " + tempQuestion.choices[2];
    choiceD.innerHTML = "D. " + tempQuestion.choices[3];
    if (isCorrect) {
        showAns.innerHTML = "<hr> <h6>Correct!!!</h6>";
        correctSound.play();
    }
    else if (isCorrect === false) {
        showAns.innerHTML = "<hr> <h6>Wrong!!!</h6>";
        wrongSound.play();
    }
    setTimeout(function () {
        showAns.innerHTML = "";
    }, 1500);
    index++;
}

// multiple choices button is clicked and answer-checker is triggered.
function checkAns(pick) {
    var ans = questionCollection[index - 1].answer;
    if (pick === ans) {
        isCorrect = true;
        score++;
    }
    else {
        isCorrect = false;
        timeLeft -= 15;
    }
    if (index < qcLength)
        renderQuestion();
}


// When questions are all finished or time runs out,  initial-name page is triggered
function finishQuiz() {
    index = 0;
    if (timeLeft < 0) {
        timeLeft = 0;
        shownTime.innerHTML = "0 s";
    }
    quizPage.style.display = "none";
    initialenterpage.style.display = "block";
    score = timeLeft + score * 5;
    finalScore.innerHTML = " " + score;
    if (score >= 40) {
        $("#friend-summary").show(1000);
    } else $("#newfriend-summary").show(1000);
    if (isCorrect === true) {
        showAns1.innerHTML = "<hr> <h6>Correct!!!</h6>";
        correctSound.play();
    }
    else if (isCorrect === false) {
        showAns1.innerHTML = "<hr> <h6>Wrong!!!</h6>";
        wrongSound.play();
    }
    else {
        showAns1.innerHTML = "<hr> <h6>Time's Out!!!</h6>";
        wrongSound.play();
    }
    setTimeout(function () {
        showAns1.innerHTML = "";
    }, 1500);
}


// When initial name is entered and submit button is clicked
function submitScore() {
    // inital name enter validation
    if (initial.value === null || initial.value === "") {
        alert("Please Enter Your Valid Initial.");
        return;
    }
    // store inital name to localstore
    else {
        var initialInput = initial.value.trim();
        initial.value = "";
        var quizRecord = {
            initialName: initialInput,
            score: score
        };
        record = JSON.parse(localStorage.getItem("data"));
        record.push(quizRecord);
        localStorage.setItem("data", JSON.stringify(record));
        score = 0;
        isCorrect = null;
        timeLeft = totalTime;
        shownTime.innerHTML = "0 s";
        renderRecorePage();
    }
}

//Submit button is click and highscore/final page is triggered
function renderRecorePage() {
    endingSound.play();
    landingPage.style.display = "none";
    quizPage.style.display = "none";
    initialenterpage.style.display = "none";
    header.style.display = "none";
    finalPage.style.display = "block";
    record = JSON.parse(localStorage.getItem("data"));
    record.sort(compare);  // sort in decending order by score
    for (var i = 0; i < record.length; i++) {
        var currentScore = document.createElement("div");
        if (i === 0) { //highest
            currentScore.textContent = "🏅" + (i + 1) + ". " + record[i].initialName + " - " + record[i].score;
            currentScore.style.backgroundColor = "gold";
        } else if (i === 1) { //second highest
            currentScore.textContent = "🥈" + (i + 1) + ". " + record[i].initialName + " - " + record[i].score;
            currentScore.style.backgroundColor = "silver";
        } else if (i === 2) { //third highest
            currentScore.textContent = "🥉" + (i + 1) + ". " + record[i].initialName + " - " + record[i].score;
            currentScore.style.backgroundColor = "#b87333"; //copper
        } else {
            currentScore.textContent = (i + 1) + ". " + record[i].initialName + " - " + record[i].score;
            currentScore.style.backgroundColor = "green";
        }
        scoreList.appendChild(currentScore);
        currentScore.style.marginBottom = "10px";
    }
}

// Compare function for the array-sort to list out the local store data in decending order
function compare(a, b) {
    return b.score - a.score;
}



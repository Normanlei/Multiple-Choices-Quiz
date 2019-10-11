var viewScorebtn = document.getElementById("viewscore");
var shownTime = document.getElementById("timer");
var startbtn = document.getElementById("start");
var questionTitle = document.getElementById("question");
var choices = document.getElementById("choices");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var showAns = document.getElementById("isCorrect");
var showAns1 = document.getElementById("isCorrect1");
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


var qcLength = questionCollection.length;
var index = 0;
var isCorrect = null;
var totalTime = 75;
var timeLeft = 75;
var timeCountDown;
var score = 0;
var record = [];
var tempRecord = JSON.parse(localStorage.getItem("data"));
if (tempRecord!==null) record = tempRecord;
else localStorage.setItem("data", JSON.stringify(record));

viewScorebtn.addEventListener("click",function(){
    renderRecorePage();
});

startbtn.addEventListener("click", startQuiz);

choices.addEventListener("click", function (event) {
    //console.log(event.target.firstChild.textContent.substring(3));
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

submitbtn.addEventListener("click", submitScore);

gobackbtn.addEventListener("click", function () {
    //window.location.reload();
    //window.history.go(-1);
    landingPage.style.display = "block";
    quizPage.style.display = "none";
    initialenterpage.style.display = "none";
    header.style.display = "block";
    finalPage.style.display = "none";
    scoreList.innerHTML = "";
});

clearbtn.addEventListener("click",function(){
    record = [];
    localStorage.setItem("data", JSON.stringify(record));
    scoreList.innerHTML = "";
});

function startQuiz() {
    landingPage.style.display = "none";
    quizPage.style.display = "block";
    isCorrect = null;
    renderQuestion();
    timeCountDown = setInterval(timeCount, 1000);
}

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

function renderQuestion() {
    var tempQuestion = questionCollection[index];
    questionTitle.innerHTML = tempQuestion.title;
    choiceA.innerHTML = "A. " + tempQuestion.choices[0];
    choiceB.innerHTML = "B. " + tempQuestion.choices[1];
    choiceC.innerHTML = "C. " + tempQuestion.choices[2];
    choiceD.innerHTML = "D. " + tempQuestion.choices[3];
    if (isCorrect) showAns.innerHTML = "<hr> <h6>Correct!!!</h6>";
    else if (isCorrect === false) showAns.innerHTML = "<hr> <h6>Wrong!!!</h6>";
    setTimeout(function () {
        showAns.innerHTML = "";
    }, 2000);
    index++;
}


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
    if (isCorrect===true) showAns1.innerHTML = "<hr> <h6>Correct!!!</h6>";
    else if (isCorrect === false) showAns1.innerHTML = "<hr> <h6>Wrong!!!</h6>";
    else showAns1.innerHTML = "<hr> <h6>Time's Out!!!</h6>";
    setTimeout(function () {
        showAns1.innerHTML = "";
    }, 2000);
}

function submitScore() {
    if (initial.value === null || initial.value === "") {
        alert("Please Enter Your Valid Initial.");
        return;
    }
    else{
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

function renderRecorePage() {
    landingPage.style.display = "none";
    quizPage.style.display = "none";
    initialenterpage.style.display = "none";
    header.style.display = "none";
    finalPage.style.display = "block";
    record = JSON.parse(localStorage.getItem("data"));
    record.sort(compare);
    //localStorage.setItem("data", JSON.stringify(record));
    for (var i = 0; i < record.length; i++) {
        var currentScore = document.createElement("div");
        currentScore.textContent = record[i].initialName + " - " + record[i].score;
        scoreList.appendChild(currentScore);
    }
}


function compare(a, b) {
    return b.score - a.score;
}



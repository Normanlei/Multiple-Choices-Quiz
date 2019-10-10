var viewScorebtn = document.getElementById("viewscore");
var timeleft = document.getElementById("timer");
var startbtn = document.getElementById("start");
var questionTitle = document.getElementById("question");
var choices = document.getElementById("choices");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var showAns = document.getElementById("isCorrect");
var showAns1 = document.getElementById("isCorrect1");
var submitbtn = document.getElementById("submit");
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

startbtn.addEventListener("click", startQuiz);

choices.addEventListener("click", function (event) {
    //console.log(event.target.firstChild.textContent.substring(3));
    if (event.target.localName == "button") {
        event.preventDefault();
        var pick = event.target.firstChild.textContent.substring(3);
        checkAns(pick);
    }
    if (index === qcLength) {
        finishQuiz();
    }
});

submitbtn.addEventListener("click", viewScore);

gobackbtn.addEventListener("click", function () {
    window.location.reload();
});

function checkAns(pick) {
    var ans = questionCollection[index - 1].answer;
    if (pick === ans) isCorrect = true;
    else isCorrect = false;
    if (index < qcLength)
        renderQuestion();
}

function viewScore() {
    initialenterpage.style.display = "none";
    header.style.display = "none";
    finalPage.style.display = "block";
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

function finishQuiz() {
    quizPage.style.display = "none";
    initialenterpage.style.display = "block";
    if (isCorrect) showAns1.innerHTML = "<hr> <h6>Correct!!!</h6>";
    else if (isCorrect === false) showAns1.innerHTML = "<hr> <h6>Wrong!!!</h6>";
    setTimeout(function () {
        showAns1.innerHTML = "";
    }, 2000);
}

function startQuiz() {
    landingPage.style.display = "none";
    quizPage.style.display = "block";
    renderQuestion(index);
}



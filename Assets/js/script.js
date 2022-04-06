//home
    //start game
        //button

    //view highscores
        //href

//game start
    //timer activates
        //if timer <= 0 game over

    //create list of questions (array)
        //question 1,...,n
            //if correct, display correct and move on to next question
            //if not, (timer - 10), display wrong and wait until the player gets it right
    
    //when all questions are answered, or timer is 0 end game and timer. Show final score

//game over
    //enter initials to store a score
        //input: enter initials
        //button: click to submit
        //save to local storage
    //list scores for all players
        //Start over
            //button to homescreen
        //clear highscores
            //button to delete all records

var startButtonEl = document.querySelector("#start")
var timerCount = 120
var interval 
var timerEl = document.querySelector("#timer")
var homeScreenEl = document.querySelector("#homeScreen")
var questionsEl = document.querySelector("#quiz")
var displayQuestionEl = document.querySelector("#displayQuestion")
var multipleChoiceEl = document.querySelector("#multipleChoice")
var isCorrectEl = document.querySelector("#isCorrect")
var currentQuestion = 0
var endScreenEl = document.querySelector("#endScreen")
var feedBackEl = document.querySelector("#feedBack")
var initialsEl = document.querySelector("#initials")
var scoreEl = document.querySelector("#score")
var finalScoreEl = document.querySelector("#finalScore")
var scoreList = []
var submitButton = document.querySelector("#submit")
//grab info
var initialScoreStorage = JSON.parse(localStorage.getItem("savedInitials")) || []

//Set timer to decrease by 1 second and end quiz at time 0
function timer() {
    interval = setInterval(function() {
        timerCount--;
        timerEl.textContent = timerCount;
        if(timerCount <= 0) {
            endQuiz()
        }
    }, 1000)
}

//Quiz start. Hide the home screen and show questions
function startQuiz(event) {
    homeScreenEl.setAttribute("class", "hide")
    questionsEl.removeAttribute("class")
    timer()
    nextQuestion()
}

//Loop to show next question
function nextQuestion() {
    //clear content so it doesn't show all questions at once
    displayQuestionEl.innerHTML = ""
    multipleChoiceEl.innerHTML = ""

    displayQuestionEl.textContent = questionBank[currentQuestion].question

    for(var i=0; i < questionBank[currentQuestion].answers.length; i++) {
        var newButton = document.createElement("button")
        newButton.textContent = questionBank[currentQuestion].answers[i]
        multipleChoiceEl.append(newButton) //append answer choices to the screen. html line 26. checkAnswer() goes off when button is clicked
    }
}

//Display correct/wrong message. 10 second penalty applies when wrong. Call in next question or end quiz
function checkAnswer(event) {
    if(event.target.tagName === "BUTTON") {
        var chosen = event.target.textContent //storing value of the textcontent
        if(chosen === questionBank[currentQuestion].correctAnswer) { 
            isCorrectEl.textContent = "Correct!"
            isCorrectEl.setAttribute("class","correct")
            currentQuestion++
            if(currentQuestion <= questionBank.length - 1) {
                nextQuestion()
            } else {
                return endQuiz()
            }
        } else {
            isCorrectEl.textContent = "Wrong, try again!"
            timerCount -= 10
            isCorrectEl.setAttribute("class","wrong")
        }
    }
}

//Show end screen
function endQuiz() {
    clearInterval(interval)
    questionsEl.setAttribute("class","hide")
    endScreenEl.removeAttribute("class")
    finalScoreEl.textContent = timerCount
}

//Push scores from local storage. Score board is shown when initials are submitted. 
submitButton.addEventListener("click", function(event) {
    var initials = document.querySelector("#initials").value;
    var finalScore = timerCount
    
    if (initials === "") {
        alert("This field cannot be blank", "error")
    } else {
        var playerData = {
            initial:initials, 
            score:finalScore
        }
        initialScoreStorage.push(playerData)
        localStorage.setItem("savedInitials", JSON.stringify(initialScoreStorage))
        window.location.href = "highScores.html"
    }
})

//activate function
startButtonEl.addEventListener("click", startQuiz)
multipleChoiceEl.addEventListener("click", checkAnswer)
        
        
        
        
        
//If the funtion is being ran by an eventlistener: (event)
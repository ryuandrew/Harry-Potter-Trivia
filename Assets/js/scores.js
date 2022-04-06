var clearScoreEl = document.querySelector("#clear")

//Get scores from local storage or set to an empty array
function displayHighScores(){
var initialScoreStorage = JSON.parse(localStorage.getItem("savedInitials")) || []; //JSON.parse converts back to original array/object bc local storage only stores as strings

//Append stored scores to highScores.html page under <ol>
initialScoreStorage.forEach(userData => {
    var newli = document.createElement("li");
    newli.textContent = `${userData.initial} : ${userData.score}`
    // newli.textContent = "initials: " + userData.initial + "score: " + userData.score
    document.querySelector("ol").append(newli)
})
}

//Clear score board
function clearScores() {
    window.localStorage.removeItem("savedInitials")
    window.location.reload()
}

//Activate function
displayHighScores()
clearScoreEl.addEventListener("click", clearScores)
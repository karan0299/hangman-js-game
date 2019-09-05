var word = [["Hangman", "That game you are playing right now."],
            ["JavaScript", "Make web-page dynamic without reload the web page."]]

// Game keyboard
var keyboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Game memory
var select = 0
var wordLeft = []
var fail = 0


// Create keyboard
function createKeyboard() {
    var keys = document.getElementById("keyboard")
    keys.innerHTML = ""
    for(i = 0; i < keyboard.length; i++) {
        var key = document.createElement("span")
        key.className = "b"
        key.innerText = keyboard[i]
        key.setAttribute("data", "")
        key.onclick = function() {
            keyClick(this)
        }
        keys.appendChild(key)
    }
}

// Get new word
function createWord() {
    var d = document.getElementById("letter")
    d.innerHTML = ""
    select = Math.floor(Math.random() * word.length)
    for(i = 0; i < word[select][0].length; i++) {
        var x = word[select][0][i].toUpperCase()
        var b = document.createElement("span")
        b.className = "l" + (x == " " ? " ls" : "")
        b.innerHTML = "&nbsp"
        b.id = "l" + i;
        d.appendChild(b)
        
        if(x != " ") {
            if(wordLeft.indexOf(x) == -1) {
                wordLeft.push(x)
            }
        }
    }
}


// clear keyboard
function clearkeyboard() {
    var keys = document.getElementsByClassName("b")
    for(i = 0; i < keys.length; i++) {
        keys[i].setAttribute("data", "")
    }
}

// Clear player
function clearPlayer() {
    fail = 0
    wordLeft = []
    document.getElementsByClassName("ground")[0].setAttribute("data", "false")
    document.getElementsByClassName("stand")[0].setAttribute("data", "false")
    document.getElementsByClassName("stand2")[0].setAttribute("data", "false")
    document.getElementsByClassName("stand3")[0].setAttribute("data", "false")
    document.getElementsByClassName("head")[0].setAttribute("data", "false")
    document.getElementById("pm2").setAttribute("data", "false")
    document.getElementById("pm2").setAttribute("r", "false")
    document.getElementById("pm2").setAttribute("l", "false")
    document.getElementById("pm3").setAttribute("data", "false")
    document.getElementById("pm3").setAttribute("l", "false")
    document.getElementById("pm3").setAttribute("r", "false")
}




// Game check, If show next error / game end
function keyClick(key) {
    if(key.getAttribute("data") == "") {
        var x = isExist(key.innerText)
        key.setAttribute("data", x)
        if(x) {
            if(wordLeft.length == 0) {
                gameEnd(true)
            }
        } else {
            showNextFail()
        }
    }
}

// If letter "X" exist
function isExist(e) {
    e = e.toUpperCase()
    var x = wordLeft.indexOf(e)
    if(x != -1) {
        wordLeft.splice(x, 1)
        typeWord(e)
        return true
    }
    return false
}

// Show next fail drawing
function showNextFail() {
    fail++
    switch(fail) {
        case 1:
            document.getElementsByClassName("ground")[0].setAttribute("data", "true")
            break;
        
        case 2:
            document.getElementsByClassName("stand")[0].setAttribute("data", "true")
            break;
        
        case 3:
            document.getElementsByClassName("stand2")[0].setAttribute("data", "true")
            break;
        
        case 4:
            document.getElementsByClassName("stand3")[0].setAttribute("data", "true")
            break;
        
        case 5:
            document.getElementsByClassName("head")[0].setAttribute("data", "true")
            break;
        
        case 6:
            document.getElementById("pm2").setAttribute("data", "true")
            break;
        
        case 7:
            document.getElementById("pm2").setAttribute("l", "true")
            break;
        
        case 8:
            document.getElementById("pm2").setAttribute("r", "true")
            break;
        
        case 9:
            document.getElementById("pm3").setAttribute("data", "true")
            document.getElementById("pm3").setAttribute("l", "true")
            break;
        
        case 10:
            document.getElementById("pm3").setAttribute("r", "true")
            gameEnd(false)
            break;
    }
}

function typeWord(e) {
    for(i = 0; i < word[select][0].length; i++) {
        if(word[select][0][i].toUpperCase() == e) {
            document.getElementById("l" + i).innerText = e
        }
    }
}

// Web-page onload
window.onload = function() {
    newGame()
    createKeyboard()
}

// Game result
function gameEnd(e) {
    var d = document.getElementById("result")
    d.setAttribute("data", e)
    if(e) {
        document.getElementById("rT").innerText = "You Win!"
        document.getElementById("rM").innerHTML = "Congratulations, you found the word!<br/><br/>Good Job!"
    } else {
        document.getElementById("rT").innerText = "You Lose!"
        document.getElementById("rM").innerHTML = "The word was <br/><br/>\"" + word[select][0].toUpperCase() + "\"<br/><br/>Better luck next time."
    }
    d.className = ""
}



// New game
function newGame() {

    document.getElementById("result").className = "hide"
    clearPlayer()
    createWord()
    document.getElementById("hintText").innerText = word[select][1]
    clearkeyboard()
}


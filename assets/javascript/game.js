function init() {

    state = "start";
    modal = document.getElementById("modal");
    masterWordBank = [
     "christmas",
     "celebrate",
     "adventure",
     "australia",
     "halloween",
     "wonderful",
     "invisible",
     "different",
     "provoking",
     "education",
     "influence"
    ];

    wordBank = masterWordBank.slice();
    wins = 0;
    document.getElementById("wins").textContent = wins;
    maxTurns = 15;
    turns = maxTurns;
    document.getElementById("turns").textContent = "00:"+pad(turns);
    guessed = [];

  }



  function generateWord() {

    var randomNum = Math.floor(((Math.random()) * wordBank.length));
    word = wordBank.splice(randomNum, 1);
    word = word[0];
    blankCounter = word.length;
    var blanks = document.getElementById("blanks");
    var html = "";
    for (var i=0; i < word.length; i++) {
      html += "<td id='let"+i+"'>_</td>";
    }
    blanks.innerHTML = html;
  }

  function isLetter(str) {

    str = str.toLowerCase();
    return str.length === 1 && str.match(/[a-z]/i);
  }
  
  function pad(n) {
      return (n < 10) ? ("0" + n) : n;
  }
  
  function clearError() {
    var err = document.getElementById("error");
    err.className += " hide";
  }
  
  function errorMessage(msg) {
    var err = document.getElementById("error");
    err.className = "alert alert-danger";
    err.textContent = msg;
  }

  function resetRound() {
    turns = maxTurns;
    document.getElementById("turns").textContent = "00:"+pad(turns);
    guessed = [];
    document.getElementById("guessed").textContent = "";

    if (wordBank.length === 0) {

      wordBank = masterWordBank;
    }
    generateWord();
  }
  


  function gameOver() {
    wins = 0;
    document.getElementById("wins").textContent = wins;
    resetRound();
  }
  
  

  window.onload = function() {
    init();
  };

  document.onkeyup = function(event) {
    clearError();

    var key = event.key.toLowerCase();
  
 
    if (state !== "playing") {

      if(event.keyCode === 32) {

        state = "playing";

        modal.style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("lose").style.display = "none";
        resetRound();
      }
      return; 
    }
  

    if(!(isLetter(key))) {

      errorMessage("That is not a letter. Try again!");
      return;
    }

    if(guessed.indexOf(key) !== -1) {
      errorMessage("You already guessed this letter. Try again!");
      return;
    }
  
  
    guessed.push(key);
    guessed.sort();
  
    var list = ""; 
    for (var i=0; i<guessed.length; i++) {
      list += guessed[i];
      list += " ";
    }
    document.getElementById("guessed").textContent = list;
  

    var indices = [];


    for(var i=0; i<word.length;i++) {
        if (word[i] === key) indices.push(i);
    }

    if (indices.length > 0) {

      for (var j=0; j<indices.length; j++) {
        var pos = indices[j];
        document.getElementById("let"+pos).textContent = key;
        blankCounter--;
      }

      if(blankCounter===0) {
        console.log("YOU WON!");
        wins++;
        document.getElementById("wins").textContent = wins;
        state = "win";
  
      }
    } else {

      console.log("No match.");

      turns--;
      console.log("Turns remaining: "+turns);
      document.getElementById("turns").textContent = "00:"+pad(turns);

      if(turns<5) {
        document.getElementById("turns").style.color = "red";
      }

      if(turns===0) {

        state = "gameOver";
        gameOver();
      }
    } 
  
    if (state === "win") {
      document.getElementById("win").style.display = "block";
      document.getElementById("wordSolved").textContent = "\""+word+"\"";
      document.getElementById("turnsLeft").textContent = turns;
      return; 
    }
  
    if (state === "gameOver") {
      document.getElementById("lose").style.display = "block";
      return; 
    }
  
  
  };
  
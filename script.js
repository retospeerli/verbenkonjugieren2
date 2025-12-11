// ERWEITERTE VERBLISTE
const VERB_LIST = [
    { infinitive: "spielen", präsens: { ich: "spiele", du: "spielst", er: "spielt", wir: "spielen", ihr: "spielt", sie: "spielen" }, 
      präteritum: { ich: "spielte", du: "spieltest", er: "spielte", wir: "spielten", ihr: "spieltet", sie: "spielten" },
      perfekt: { ich: "habe gespielt", du: "hast gespielt", er: "hat gespielt", wir: "haben gespielt", ihr: "habt gespielt", sie: "haben gespielt" },
      plusquamperfekt: { ich: "hatte gespielt", du: "hattest gespielt", er: "hatte gespielt", wir: "hatten gespielt", ihr: "hattet gespielt", sie: "hatten gespielt" },
      type: "regular" },
    
    { infinitive: "lernen", präsens: { ich: "lerne", du: "lernst", er: "lernt", wir: "lernen", ihr: "lernt", sie: "lernen" }, 
      präteritum: { ich: "lernte", du: "lerntest", er: "lernte", wir: "lernten", ihr: "lerntet", sie: "lernten" },
      perfekt: { ich: "habe gelernt", du: "hast gelernt", er: "hat gelernt", wir: "haben gelernt", ihr: "habt gelernt", sie: "haben gelernt" },
      plusquamperfekt: { ich: "hatte gelernt", du: "hattest gelernt", er: "hatte gelernt", wir: "hatten gelernt", ihr: "hattet gelernt", sie: "hatten gelernt" },
      type: "regular" },
    
    { infinitive: "arbeiten", präsens: { ich: "arbeite", du: "arbeitest", er: "arbeitet", wir: "arbeiten", ihr: "arbeitet", sie: "arbeiten" }, 
      präteritum: { ich: "arbeitete", du: "arbeitetest", er: "arbeitete", wir: "arbeiteten", ihr: "arbeitetet", sie: "arbeiteten" },
      perfekt: { ich: "habe gearbeitet", du: "hast gearbeitet", er: "hat gearbeitet", wir: "haben gearbeitet", ihr: "habt gearbeitet", sie: "haben gearbeitet" },
      plusquamperfekt: { ich: "hatte gearbeitet", du: "hattest gearbeitet", er: "hatte gearbeitet", wir: "hatten gearbeitet", ihr: "hattet gearbeitet", sie: "hatten gearbeitet" },
      type: "regular" },
    
    { infinitive: "geben", präsens: { ich: "gebe", du: "gibst", er: "gibt", wir: "geben", ihr: "gebt", sie: "geben" }, 
      präteritum: { ich: "gab", du: "gabst", er: "gab", wir: "gaben", ihr: "gabt", sie: "gaben" },
      perfekt: { ich: "habe gegeben", du: "hast gegeben", er: "hat gegeben", wir: "haben gegeben", ihr: "habt gegeben", sie: "haben gegeben" },
      plusquamperfekt: { ich: "hatte gegeben", du: "hattest gegeben", er: "hatte gegeben", wir: "hatten gegeben", ihr: "hattet gegeben", sie: "hatten gegeben" },
      type: "strong" },
    
    { infinitive: "können", präsens: { ich: "kann", du: "kannst", er: "kann", wir: "können", ihr: "könnt", sie: "können" }, 
      präteritum: { ich: "konnte", du: "konntest", er: "konnte", wir: "konnten", ihr: "konntet", sie: "konnten" },
      perfekt: { ich: "habe gekonnt", du: "hast gekonnt", er: "hat gekonnt", wir: "haben gekonnt", ihr: "habt gekonnt", sie: "haben gekonnt" },
      plusquamperfekt: { ich: "hatte gekonnt", du: "hattest gekonnt", er: "hatte gekonnt", wir: "hatten gekonnt", ihr: "hattet gekonnt", sie: "hatten gekonnt" },
      type: "modal" }
];

// Personalpronomen
const PRONOUNS = ["ICH", "DU", "ER/SIE/ES", "WIR", "IHR", "SIE/SIE"];
const PRONOUNS_KEYS = ["ich", "du", "er", "wir", "ihr", "sie"];

// Audio-Elemente
const correctSound = document.getElementById('correct-sound');
const errorSound = document.getElementById('error-sound');
const gameWonSound = document.getElementById('gamewon-sound');
const gameLostSound = document.getElementById('gamelost-sound');
const roundWonSound = document.getElementById('roundwon-sound');
const roundLostSound = document.getElementById('roundlost-sound');
const pushSound = document.getElementById('push-sound');
const specialSound = document.getElementById('special-sound');
const victorySound = document.getElementById('victory-sound');
const defeatSound = document.getElementById('defeat-sound');

// Wrestling DOM-Elemente
const playerWrestler = document.getElementById('player-wrestler');
const cpuWrestler = document.getElementById('cpu-wrestler');
const playerHealthBar = document.getElementById('player-health-bar');
const cpuHealthBar = document.getElementById('cpu-health-bar');
const playerHealthText = document.getElementById('player-health-text');
const cpuHealthText = document.getElementById('cpu-health-text');
const playerImage = document.getElementById('player-image');
const cpuImage = document.getElementById('cpu-image');
const powerFill = document.getElementById('power-fill');

// Wrestling State
const wrestlingState = {
    playerHealth: 100,
    cpuHealth: 100,
    playerPosition: 30, // Prozent vom linken Rand
    cpuPosition: 70,   // Prozent vom rechten Rand
    powerLevel: 0,
    specialReady: false
};

// Spielzustand
let gameState = {
    score: 0,
    streak: 0,
    round: 0,
    maxRound: 10,
    maxStreak: 0,
    correctAnswers: 0,
    currentVerb: null,
    currentTense: "präsens",
    currentPronoun: "ich",
    gameActive: false,
    usedCombinations: []
};

// DOM-Elemente
const scoreElement = document.getElementById('score');
const streakElement = document.getElementById('streak');
const roundElement = document.getElementById('round');
const currentVerbElement = document.getElementById('current-verb');
const pronounElement = document.getElementById('pronoun');
const feedbackElement = document.getElementById('feedback');
const choiceButtons = [
    document.getElementById('choice1'),
    document.getElementById('choice2'),
    document.getElementById('choice3'),
    document.getElementById('choice4')
];
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const hintButton = document.getElementById('hint-btn');
const gameOverElement = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const correctAnswersElement = document.getElementById('correct-answers');
const maxStreakElement = document.getElementById('max-streak');
const totalScoreElement = document.getElementById('total-score');
const gameResultElement = document.getElementById('game-result');
const gameMessageElement = document.getElementById('game-message');
const restartButton = document.getElementById('restart-btn');
const tenseButtons = document.querySelectorAll('.tense-btn');

// Wrestling Funktionen
function updateWrestlingDisplay() {
    // Update Health Bars
    playerHealthBar.style.width = `${wrestlingState.playerHealth}%`;
    cpuHealthBar.style.width = `${wrestlingState.cpuHealth}%`;
    
    playerHealthText.textContent = `${Math.round(wrestlingState.playerHealth)}%`;
    cpuHealthText.textContent = `${Math.round(wrestlingState.cpuHealth)}%`;
    
    // Update Positions
    playerWrestler.style.left = `${wrestlingState.playerPosition}%`;
    cpuWrestler.style.left = `${wrestlingState.cpuPosition}%`;
    
    // Update Power Meter
    powerFill.style.width = `${wrestlingState.powerLevel}%`;
    
    // Update Emojis basierend auf Zustand
    updateWrestlerEmojis();
}

function updateWrestlerEmojis() {
    if (wrestlingState.playerHealth > 70) {
        playerImage.textContent = "💪";
    } else if (wrestlingState.playerHealth > 40) {
        playerImage.textContent = "👊";
    } else if (wrestlingState.playerHealth > 20) {
        playerImage.textContent = "😫";
    } else {
        playerImage.textContent = "😵";
    }
    
    if (wrestlingState.cpuHealth > 70) {
        cpuImage.textContent = "🤖";
    } else if (wrestlingState.cpuHealth > 40) {
        cpuImage.textContent = "👊";
    } else if (wrestlingState.cpuHealth > 20) {
        cpuImage.textContent = "😤";
    } else {
        cpuImage.textContent = "💀";
    }
}

function playerPush(power = 1) {
    // Spieler greift an
    playerWrestler.classList.add('push');
    cpuWrestler.classList.add('get-pushed');
    
    // Schaden berechnen
    const damage = 5 * power + Math.floor(Math.random() * 3);
    wrestlingState.cpuHealth = Math.max(0, wrestlingState.cpuHealth - damage);
    
    // CPU zurückdrängen
    wrestlingState.cpuPosition = Math.min(95, wrestlingState.cpuPosition + (3 * power));
    wrestlingState.playerPosition = Math.max(5, wrestlingState.playerPosition - (1 * power));
    
    // Sound abspielen
    pushSound.currentTime = 0;
    pushSound.play();
    
    // Power erhöhen
    wrestlingState.powerLevel = Math.min(100, wrestlingState.powerLevel + (10 * power));
    
    // Animation zurücksetzen
    setTimeout(() => {
        playerWrestler.classList.remove('push');
        cpuWrestler.classList.remove('get-pushed');
        updateWrestlingDisplay();
    }, 300);
    
    // Check for special move
    if (wrestlingState.powerLevel >= 100 && !wrestlingState.specialReady) {
        wrestlingState.specialReady = true;
        showSpecialReady();
    }
}

function cpuPush() {
    // CPU greift zurück (wenn Spieler falsch antwortet)
    cpuWrestler.classList.add('push');
    playerWrestler.classList.add('get-pushed');
    
    // Schaden berechnen
    const damage = 3 + Math.floor(Math.random() * 4);
    wrestlingState.playerHealth = Math.max(0, wrestlingState.playerHealth - damage);
    
    // Spieler zurückdrängen
    wrestlingState.playerPosition = Math.max(5, wrestlingState.playerPosition - 4);
    wrestlingState.cpuPosition = Math.min(95, wrestlingState.cpuPosition + 2);
    
    // Sound abspielen
    pushSound.currentTime = 0;
    pushSound.play();
    
    // Animation zurücksetzen
    setTimeout(() => {
        cpuWrestler.classList.remove('push');
        playerWrestler.classList.remove('get-pushed');
        updateWrestlingDisplay();
    }, 300);
}

function specialAttack() {
    if (!wrestlingState.specialReady) return;
    
    // Spezialangriff!
    specialSound.currentTime = 0;
    specialSound.play();
    
    // Großes Schadenspaket
    const damage = 15 + Math.floor(Math.random() * 10);
    wrestlingState.cpuHealth = Math.max(0, wrestlingState.cpuHealth - damage);
    
    // CPU weit zurückdrängen
    wrestlingState.cpuPosition = Math.min(98, wrestlingState.cpuPosition + 15);
    
    // Power zurücksetzen
    wrestlingState.powerLevel = 0;
    wrestlingState.specialReady = false;
    
    // Spezialanimation
    playerWrestler.classList.add('victory');
    cpuWrestler.classList.add('defeat');
    
    setTimeout(() => {
        playerWrestler.classList.remove('victory');
        cpuWrestler.classList.remove('defeat');
        updateWrestlingDisplay();
    }, 1500);
    
    return damage;
}

function showSpecialReady() {
    feedbackElement.textContent = "⭐ SPEZIALANGRIFF BEREIT! ⭐";
    feedbackElement.style.color = "#f1c40f";
    feedbackElement.style.textShadow = "0 0 10px #f1c40f";
    
    setTimeout(() => {
        if (gameState.gameActive) {
            feedbackElement.textContent = "";
            feedbackElement.style.color = "";
            feedbackElement.style.textShadow = "";
        }
    }, 2000);
}

function checkWrestlingWinner() {
    if (wrestlingState.playerHealth <= 0) {
        return "cpu";
    }
    if (wrestlingState.cpuHealth <= 0) {
        return "player";
    }
    return null;
}

// Restliche Funktionen (angepasst für Wrestling)
function generateWrongAnswers(verb, tense, pronoun, correctAnswer) {
    const wrongAnswers = [];
    const currentTenseForms = verb[tense];
    
    // Andere Personalformen nehmen
    const allForms = Object.values(currentTenseForms);
    let similarForms = allForms.filter(form => 
        form !== correctAnswer && 
        !wrongAnswers.includes(form)
    );
    
    if (similarForms.length > 0) {
        wrongAnswers.push(similarForms[0]);
        if (similarForms.length > 1 && wrongAnswers.length < 3) {
            wrongAnswers.push(similarForms[1]);
        }
    }
    
    // Fehlende Antworten mit generischen Fehlern füllen
    while (wrongAnswers.length < 3) {
        const verbStem = verb.infinitive.replace(/en$/, '');
        const wrongEndings = ["e", "st", "t", "en", "et", "en"];
        const randomEnding = wrongEndings[Math.floor(Math.random() * wrongEndings.length)];
        const wrongForm = verbStem + randomEnding;
        
        if (wrongForm !== correctAnswer && !wrongAnswers.includes(wrongForm)) {
            wrongAnswers.push(wrongForm);
        }
    }
    
    return wrongAnswers.slice(0, 3);
}

// Zeitform-Buttons Event Listener
tenseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tenseButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameState.currentTense = btn.dataset.tense;
        
        if (gameState.gameActive) {
            loadNextRound();
        } else {
            displayExample();
        }
    });
});

// Spiel initialisieren
function initGame() {
    gameState = {
        score: 0,
        streak: 0,
        round: 0,
        maxRound: 10,
        maxStreak: 0,
        correctAnswers: 0,
        currentVerb: null,
        currentTense: "präsens",
        currentPronoun: "ich",
        gameActive: false,
        usedCombinations: []
    };
    
    // Wrestling State zurücksetzen
    wrestlingState.playerHealth = 100;
    wrestlingState.cpuHealth = 100;
    wrestlingState.playerPosition = 30;
    wrestlingState.cpuPosition = 70;
    wrestlingState.powerLevel = 0;
    wrestlingState.specialReady = false;
    
    updateUI();
    updateWrestlingDisplay();
    resetChoices();
    feedbackElement.textContent = "WÄHLE ZEITFORM UND STARTE!";
    feedbackElement.className = "feedback";
    
    startButton.disabled = false;
    resetButton.disabled = true;
    hintButton.disabled = true;
    
    choiceButtons.forEach(btn => {
        btn.disabled = true;
        btn.className = "choice-btn";
    });
    
    displayExample();
}

// Beispiel anzeigen
function displayExample() {
    const exampleVerb = VERB_LIST[0];
    const examplePronoun = "ich";
    const exampleTense = gameState.currentTense;
    
    currentVerbElement.textContent = exampleVerb.infinitive.toUpperCase();
    pronounElement.textContent = PRONOUNS[PRONOUNS_KEYS.indexOf(examplePronoun)];
    
    const correctAnswer = exampleVerb[exampleTense][examplePronoun];
    const wrongAnswers = generateWrongAnswers(exampleVerb, exampleTense, examplePronoun, correctAnswer);
    
    const allAnswers = [correctAnswer, ...wrongAnswers];
    shuffleArray(allAnswers);
    
    choiceButtons.forEach((btn, index) => {
        if (allAnswers[index]) {
            btn.textContent = allAnswers[index].toUpperCase();
            btn.dataset.answer = allAnswers[index];
        }
    });
}

// Spiel starten
function startGame() {
    gameState.gameActive = true;
    gameState.round = 1;
    gameState.usedCombinations = [];
    
    startButton.disabled = true;
    resetButton.disabled = false;
    hintButton.disabled = false;
    
    choiceButtons.forEach(btn => {
        btn.disabled = false;
    });
    
    feedbackElement.textContent = "WÄHLE DIE RICHTIGE FORM!";
    loadNextRound();
}

// Nächste Runde laden
function loadNextRound() {
    if (gameState.round > gameState.maxRound) {
        endGame();
        return;
    }
    
    const randomVerbIndex = Math.floor(Math.random() * VERB_LIST.length);
    gameState.currentVerb = VERB_LIST[randomVerbIndex];
    
    const randomPronounIndex = Math.floor(Math.random() * PRONOUNS_KEYS.length);
    gameState.currentPronoun = PRONOUNS_KEYS[randomPronounIndex];
    
    const combination = `${gameState.currentVerb.infinitive}-${gameState.currentPronoun}-${gameState.currentTense}`;
    if (gameState.usedCombinations.includes(combination)) {
        loadNextRound();
        return;
    }
    
    gameState.usedCombinations.push(combination);
    
    currentVerbElement.textContent = gameState.currentVerb.infinitive.toUpperCase();
    pronounElement.textContent = PRONOUNS[randomPronounIndex];
    roundElement.textContent = `${gameState.round}/${gameState.maxRound}`;
    
    generateChoices();
    
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
    
    resetChoices();
}

// Antwortoptionen generieren
function generateChoices() {
    const correctAnswer = gameState.currentVerb[gameState.currentTense][gameState.currentPronoun];
    const wrongAnswers = generateWrongAnswers(
        gameState.currentVerb, 
        gameState.currentTense, 
        gameState.currentPronoun, 
        correctAnswer
    );
    
    const allAnswers = [correctAnswer, ...wrongAnswers];
    shuffleArray(allAnswers);
    
    choiceButtons.forEach((btn, index) => {
        btn.textContent = allAnswers[index].toUpperCase();
        btn.dataset.answer = allAnswers[index];
    });
}

// Array mischen
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Antwort überprüfen
function checkAnswer(selectedAnswer) {
    if (!gameState.gameActive) return;
    
    const correctAnswer = gameState.currentVerb[gameState.currentTense][gameState.currentPronoun];
    const isCorrect = selectedAnswer === correctAnswer;
    
    choiceButtons.forEach(btn => {
        btn.disabled = true;
        
        if (btn.dataset.answer === correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.dataset.answer === selectedAnswer && !isCorrect) {
            btn.classList.add('error');
        }
    });
    
    if (isCorrect) {
        // RICHTIG - Spieler greift an
        gameState.score += 10;
        gameState.streak += 1;
        gameState.correctAnswers += 1;
        
        if (gameState.streak >= 3) {
            gameState.score += 5;
            // Spezialangriff bei 3er-Serie
            if (gameState.streak === 3) {
                const damage = specialAttack();
                feedbackElement.textContent = `⭐ SPEZIALANGRIFF! ${damage} SCHADEN! ⭐`;
            } else {
                playerPush(2); // Stärkerer Angriff
            }
        } else {
            playerPush(1); // Normaler Angriff
        }
        
        if (gameState.streak > gameState.maxStreak) {
            gameState.maxStreak = gameState.streak;
        }
        
        feedbackElement.textContent = `✓ RICHTIG! ${PRONOUNS[PRONOUNS_KEYS.indexOf(gameState.currentPronoun)]} ${gameState.currentVerb.infinitive.toUpperCase()} → ${correctAnswer.toUpperCase()}`;
        feedbackElement.className = "feedback correct";
        
        correctSound.currentTime = 0;
        correctSound.play();
        
        // Wrestling Gewinner prüfen
        const winner = checkWrestlingWinner();
        if (winner === "player") {
            feedbackElement.textContent = "🎉 GEGNER BESIEGT! +50 PUNKTE 🎉";
            gameState.score += 50;
            victorySound.play();
            
            // CPU neu spawnen
            setTimeout(() => {
                wrestlingState.cpuHealth = 100;
                wrestlingState.cpuPosition = 70;
                updateWrestlingDisplay();
            }, 2000);
        }
        
        setTimeout(() => {
            gameState.round += 1;
            updateUI();
            loadNextRound();
        }, 1500);
    } else {
        // FALSCH - CPU greift an
        gameState.streak = 0;
        
        cpuPush();
        
        feedbackElement.textContent = `✗ FALSCH! ${PRONOUNS[PRONOUNS_KEYS.indexOf(gameState.currentPronoun)]} ${gameState.currentVerb.infinitive.toUpperCase()} → ${correctAnswer.toUpperCase()}`;
        feedbackElement.className = "feedback error";
        
        errorSound.currentTime = 0;
        errorSound.play();
        
        // Wrestling Gewinner prüfen
        const winner = checkWrestlingWinner();
        if (winner === "cpu") {
            feedbackElement.textContent = "💀 AUSGESCHIEDEN! SPIEL VERLOREN 💀";
            gameLostSound.play();
            setTimeout(() => {
                endGame();
            }, 2000);
            return;
        }
        
        setTimeout(() => {
            gameState.round += 1;
            updateUI();
            loadNextRound();
        }, 2000);
    }
    
    updateUI();
}

// Spiel beenden
function endGame() {
    gameState.gameActive = false;
    
    choiceButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    resetButton.disabled = true;
    hintButton.disabled = true;
    
    const percentage = (gameState.correctAnswers / gameState.maxRound) * 100;
    
    finalScoreElement.textContent = `${gameState.score} PUNKTE`;
    correctAnswersElement.textContent = gameState.correctAnswers;
    maxStreakElement.textContent = gameState.maxStreak;
    totalScoreElement.textContent = gameState.score;
    
    if (percentage >= 80) {
        gameResultElement.textContent = "LEGENDE!";
        gameMessageElement.textContent = "Du bist der ungeschlagene Verb-Konjugations-Champion!";
        gameWonSound.currentTime = 0;
        gameWonSound.play();
    } else if (percentage >= 60) {
        gameResultElement.textContent = "MEISTERHAFT!";
        gameMessageElement.textContent = "Ausgezeichnete Konjugations-Fähigkeiten!";
        roundWonSound.currentTime = 0;
        roundWonSound.play();
    } else if (percentage >= 40) {
        gameResultElement.textContent = "GUT GEMACHT!";
        gameMessageElement.textContent = "Solide Leistung - weiter so!";
    } else {
        gameResultElement.textContent = "WEITER ÜBEN!";
        gameMessageElement.textContent = "Gib nicht auf - jeder Meister war mal Anfänger!";
        gameLostSound.currentTime = 0;
        gameLostSound.play();
    }
    
    gameOverElement.classList.add('active');
}

// UI aktualisieren
function updateUI() {
    scoreElement.textContent = gameState.score;
    streakElement.textContent = gameState.streak;
    roundElement.textContent = `${gameState.round}/${gameState.maxRound}`;
}

// Choice-Buttons zurücksetzen
function resetChoices() {
    choiceButtons.forEach(btn => {
        btn.className = "choice-btn";
        btn.disabled = !gameState.gameActive;
    });
}

// Tipp anzeigen
function showHint() {
    if (!gameState.gameActive || !gameState.currentVerb) return;
    
    const hints = [
        `VERB-TYP: ${gameState.currentVerb.type === "regular" ? "REGELMÄSSIG" : "UNREGELMÄSSIG"}`,
        `PRÄSENS-ENDUNG: ${getTypicalEnding(gameState.currentPronoun)}`,
        `ZEITFORM: ${gameState.currentTense.toUpperCase()}`,
        `PERSON: ${PRONOUNS[PRONOUNS_KEYS.indexOf(gameState.currentPronoun)]}`
    ];
    
    const randomHint = hints[Math.floor(Math.random() * hints.length)];
    feedbackElement.textContent = `💡 TIPP: ${randomHint}`;
    feedbackElement.className = "feedback";
    
    hintButton.disabled = true;
    setTimeout(() => {
        if (gameState.gameActive) {
            hintButton.disabled = false;
        }
    }, 3000);
}

// Hilfsfunktionen
function getTypicalEnding(pronoun) {
    const endings = {
        "ich": "-E",
        "du": "-ST",
        "er": "-T",
        "wir": "-EN",
        "ihr": "-T",
        "sie": "-EN"
    };
    return endings[pronoun] || "";
}

// Event Listener
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', initGame);
hintButton.addEventListener('click', showHint);
restartButton.addEventListener('click', () => {
    gameOverElement.classList.remove('active');
    initGame();
    startGame();
});

choiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        checkAnswer(btn.dataset.answer);
    });
});

// Spiel initialisieren
initGame();

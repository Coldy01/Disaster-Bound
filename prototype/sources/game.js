let playerHP = 100;
let enemyHP  = 100;
let currentScenario = 0;
let currentRound = 1;

let timeLeft = 60;
let timerInterval = null;
let typingInterval = null;
let choiceLock = false;
let paused = false;
let musicOn = true;
let timerPausedForChoice = false;
let playerBarFaded = false;
let enemyBarFaded = false;
let gameWon = false;

// Detect difficulty based on page
let difficulty = "normal";
if (window.location.pathname.includes('gameHARD')) {
  difficulty = 'hard';
} else if (window.location.pathname.includes('gameIMPOSSIBLE')) {
  difficulty = 'impossible';
}




// --- SCENARIOS EARTHQUAKE ---
const scenariosRound1 = [
  {
    situation: "I shake the ground beneath your school, rattling desks and cracking walls with my mighty force. Will you duck under your desk for safety, or panic and run for the door?",
    bg: "url('images/round1.png')",
    good: ["duck under your desk for safety"],
    choices: [
      { text: "duck under your desk for safety" },
      { text: "panic and run for the door" },
      { text: "freeze in fear" }
    ]
  },
  {
    situation: "My tremors have subsided, but I left behind smoke and chaos in your hallway. Will you use the stairs to escape safely, or foolishly take the elevator?",
    bg: "url('images/round1.png')",
    good: ["use the stairs to escape safely"],
    choices: [
      { text: "use the stairs to escape safely" },
      { text: "foolishly take the elevator" },
      { text: "jump out the window in desperation" }
    ]
  },
  {
    situation: "I blocked your main exit with rubble and flames from my destructive wake. Will you find another exit through the debris, or hide in a classroom?",
    bg: "url('images/round1.png')",
    good: ["find another exit through the debris", "call for help"],
    choices: [
      { text: "find another exit through the debris" },
      { text: "hide in a classroom" },
      { text: "call for help" }
    ]
  },
  {
    situation: "My aftershocks send debris raining down as you flee outside, the ground still unstable beneath your feet. Will you find an open area away from buildings, or hide beside a crumbling wall?",
    bg: "url('images/round1.png')",
    good: ["find an open area away from buildings", "go back inside"],
    choices: [
      { text: "find an open area away from buildings" },
      { text: "hide beside a crumbling wall" },
      { text: "go back inside" }
    ]
  },
  {
    situation: "Outside, I scattered your friends and teachers in my violent upheaval. Will you stay with your group for safety, or wander off alone into my dangerous aftermath?",
    bg: "url('images/round1.png')",
    good: ["stay with your group for safety", "help others"],
    choices: [
      { text: "stay with your group for safety" },
      { text: "wander off alone into my dangerous aftermath" },
      { text: "help others" }
    ]
  },
  {
    situation: "The fires I ignited are under control, and rescue teams brave my ruins to save you. Will you listen to their instructions, or ignore them in confusion?",
    bg: "url('images/round1.png')",
    good: ["listen to their instructions", "thank the rescuers"],
    choices: [
      { text: "listen to their instructions" },
      { text: "ignore them in confusion" },
      { text: "thank the rescuers" }
    ]
  },
  {
    situation: "My shaking has stopped, but the ground remains scarred by my power. Will you listen to the authorities' guidance, or thank the brave rescuers who faced my wrath?",
    bg: "url('images/round1.png')",
    good: ["listen to the authorities' guidance", "thank the brave rescuers"],
    choices: [
      { text: "listen to the authorities' guidance" },
      { text: "ignore the warnings" },
      { text: "thank the brave rescuers" }
    ]
  }
];

//--SCENARIO FIRE--
const scenariosRound2 = [
  {
    situation: "I rage through the hallway with sparks and flames from broken wires, my heat warping the air around you. Will you move away from the sparks to safety, or stand and watch my destructive dance?",
    bg: "url('images/round2.png')",
    good: ["move away from the sparks to safety", "use a fire extinguisher"],
    choices: [
      { text: "move away from the sparks to safety" },
      { text: "stand and watch my destructive dance" },
      { text: "use a fire extinguisher" }
    ]
  },
  {
    situation: "My thick smoke billows down the stairwell, choking the air and hiding dangers in my dark embrace. Will you grab the extinguisher to fight me back, or rush blindly into my smoky trap?",
    bg: "url('images/round2.png')",
    good: ["grab the extinguisher to fight me back", "hide in the classroom"],
    choices: [
      { text: "grab the extinguisher to fight me back" },
      { text: "rush blindly into my smoky trap" },
      { text: "hide in the classroom" }
    ]
  },
  {
    situation: "You escape to the rooftop where I spread across the sports field below, my flames licking hungrily at the edges. Will you head to the helipad for rescue, or climb the water tower in foolish curiosity?",
    bg: "url('images/round2.png')",
    good: ["head to the helipad for rescue", "follow evacuation orders"],
    choices: [
      { text: "head to the helipad for rescue" },
      { text: "climb the water tower in foolish curiosity" },
      { text: "follow evacuation orders" }
    ]
  },
  {
    situation: "A rescue helicopter hovers above, but my winds and heat buffet you on the exposed rooftop. Will you signal the crew desperately, or run toward the edge in panic?",
    bg: "url('images/round2.png')",
    good: ["signal the crew desperately", "stay low and brace"],
    choices: [
      { text: "signal the crew desperately" },
      { text: "run toward the edge in panic" },
      { text: "stay low and brace" }
    ]
  },
  {
    situation: "You're sheltered in a gym, but I burned a classmate's hands with my cruel touch, their panic feeding my chaos. Will you calm them and apply cool water, or run outside into my waiting flames?",
    bg: "url('images/round2.png')",
    good: ["calm them and apply cool water", "find an adult for first aid"],
    choices: [
      { text: "calm them and apply cool water" },
      { text: "run outside into my waiting flames" },
      { text: "find an adult for first aid" }
    ]
  },
  {
    situation: "Buses wait to carry you away, but I jammed the roads with my burning debris, smoke rising on the horizon. Will you help clear small debris to escape, or board recklessly?",
    bg: "url('images/round2.png')",
    good: ["help clear small debris to escape", "stay with your group"],
    choices: [
      { text: "help clear small debris to escape" },
      { text: "board recklessly" },
      { text: "stay with your group" }
    ]
  },
  {
    situation: "My flames still threaten from the horizon as buses offer salvation, but debris blocks the path I created. Will you stay with your group for safety, or act impulsively in my smoky haze?",
    bg: "url('images/round2.png')",
    good: ["stay with your group for safety"],
    choices: [
      { text: "help clear debris" },
      { text: "board without caution" },
      { text: "stay with your group for safety" }
    ]
  }
];




// --- SCENARIOS EARTHQUAKE HARD ---
const scenariosRound1Hard = [
  {
    situation: "I unleash a violent aftershock, sending massive debris crashing down like deadly projectiles. Will you run through the falling rubble in desperation, or find a safer route away from my wrath?",
    bg: "url('images/round1.png')",
    good: ["find a safer route away from my wrath"],
    choices: [
      { text: "run through the falling rubble in desperation" },
      { text: "find a safer route away from my wrath" },
      { text: "wait for the debris to stop falling" }
    ]
  },
  {
    situation: "My power cracks the road beneath you, unstable and treacherous, as a nearby building collapses in a cloud of dust. Will you cross the cracking ground quickly, or go around the crumbling structure?",
    bg: "url('images/round1.png')",
    good: ["go around the crumbling structure"],
    choices: [
      { text: "cross the cracking ground quickly" },
      { text: "go around the crumbling structure" },
      { text: "shelter under a dangerous overhang" }
    ]
  },
  {
    situation: "I block your path with towering debris, my flickering lights casting eerie shadows that confuse your senses. Will you climb over the unstable pile, or seek a hidden side alley?",
    bg: "url('images/round1.png')",
    good: ["seek a hidden side alley"],
    choices: [
      { text: "climb over the unstable pile" },
      { text: "seek a hidden side alley" },
      { text: "wait helplessly for rescue" }
    ]
  },
  {
    situation: "Sirens scream as I send another powerful tremor, downed power lines sparking dangerously like angry serpents. Will you run recklessly under the live wires, or avoid the deadly area entirely?",
    bg: "url('images/round1.png')",
    good: ["avoid the deadly area entirely"],
    choices: [
      { text: "run recklessly under the live wires" },
      { text: "avoid the deadly area entirely" },
      { text: "check for survivors in the danger zone" }
    ]
  },
  {
    situation: "I tear open the earth itself, creating a gaping fissure that swallows the ground hungrily. Will you attempt a desperate jump across, or find a sturdy bridge to cross safely?",
    bg: "url('images/round1.png')",
    good: ["find a sturdy bridge to cross safely"],
    choices: [
      { text: "attempt a desperate jump across" },
      { text: "find a sturdy bridge to cross safely" },
      { text: "retreat back the way you came" }
    ]
  }
];

// --- SCENARIOS FIRE HARD ---
const scenariosRound2Hard = [
  {
    situation: "I engulf the school in my relentless flames, the heat warping the air and making escape routes treacherous. Will you brave the scorching hallways to reach safety, or risk jumping from a higher floor?",
    bg: "url('images/round2.png')",
    good: ["brave the scorching hallways to reach safety"],
    choices: [
      { text: "brave the scorching hallways to reach safety" },
      { text: "risk jumping from a higher floor" },
      { text: "hide and wait for rescue" }
    ]
  },
  {
    situation: "My fire spreads rapidly through the ventilation system, filling rooms with toxic smoke that burns your lungs. Will you crawl low to avoid the smoke, or break through a window for fresh air?",
    bg: "url('images/round2.png')",
    good: ["crawl low to avoid the smoke"],
    choices: [
      { text: "crawl low to avoid the smoke" },
      { text: "break through a window for fresh air" },
      { text: "use wet cloth to filter air" }
    ]
  },
  {
    situation: "I ignite flammable materials throughout the building, creating multiple fire barriers that block your path. Will you find an alternative route around the flames, or attempt to extinguish a small fire to pass?",
    bg: "url('images/round2.png')",
    good: ["find an alternative route around the flames"],
    choices: [
      { text: "find an alternative route around the flames" },
      { text: "attempt to extinguish a small fire to pass" },
      { text: "wait for firefighters" }
    ]
  },
  {
    situation: "The structural integrity of the building weakens under my intense heat, with creaking beams threatening collapse. Will you move quickly to a safer area, or stay put and brace for impact?",
    bg: "url('images/round2.png')",
    good: ["move quickly to a safer area"],
    choices: [
      { text: "move quickly to a safer area" },
      { text: "stay put and brace for impact" },
      { text: "call for structural assessment" }
    ]
  },
  {
    situation: "I create a backdraft situation where fresh air rushes in, potentially causing explosive flames. Will you avoid opening doors suddenly, or proceed cautiously through the building?",
    bg: "url('images/round2.png')",
    good: ["avoid opening doors suddenly"],
    choices: [
      { text: "avoid opening doors suddenly" },
      { text: "proceed cautiously through the building" },
      { text: "use a thermal camera" }
    ]
  }
];



// --- SCENARIOS EARTHQUAKE IMPOSSIBLE ---
const scenariosRound1Impossible = [
  {
    situation: "I unleash a catastrophic earthquake that shatters the ground beneath the school, creating instant sinkholes and collapsing structures. Will you sprint across unstable ground to reach solid earth, or leap into a nearby fissure to escape falling debris?",
    bg: "url('images/round1.png')",
    good: ["sprint across unstable ground to reach solid earth"],
    choices: [
      { text: "sprint across unstable ground to reach solid earth" },
      { text: "leap into a nearby fissure to escape falling debris" },
      { text: "climb onto a swaying structure" }
    ]
  },
  {
    situation: "My seismic waves cause massive liquefaction, turning solid ground into quicksand that swallows everything. Will you distribute your weight to stay afloat, or struggle violently which only makes you sink faster?",
    bg: "url('images/round1.png')",
    good: ["distribute your weight to stay afloat"],
    choices: [
      { text: "distribute your weight to stay afloat" },
      { text: "struggle violently which only makes you sink faster" },
      { text: "grab onto floating debris" }
    ]
  },
  {
    situation: "I trigger a tsunami of debris from collapsing buildings, sweeping away everything in its path. Will you climb to higher ground immediately, or try to outrun the wave on ground level?",
    bg: "url('images/round1.png')",
    good: ["climb to higher ground immediately"],
    choices: [
      { text: "climb to higher ground immediately" },
      { text: "try to outrun the wave on ground level" },
      { text: "hide behind a sturdy wall" }
    ]
  },
  {
    situation: "The earthquake causes underground gas lines to rupture, creating explosive hazards beneath your feet. Will you avoid stepping on suspicious cracks, or investigate strange hissing sounds?",
    bg: "url('images/round1.png')",
    good: ["avoid stepping on suspicious cracks"],
    choices: [
      { text: "avoid stepping on suspicious cracks" },
      { text: "investigate strange hissing sounds" },
      { text: "run blindly away" }
    ]
  },
  {
    situation: "I cause a complete structural failure of the school building, with floors pancaking down in deadly sequence. Will you time your descent perfectly between floor collapses, or stay on your current level hoping for rescue?",
    bg: "url('images/round1.png')",
    good: ["time your descent perfectly between floor collapses"],
    choices: [
      { text: "time your descent perfectly between floor collapses" },
      { text: "stay on your current level hoping for rescue" },
      { text: "jump between collapsing floors" }
    ]
  }
];

// --- SCENARIOS FIRE IMPOSSIBLE ---
const scenariosRound2Impossible = [
  {
    situation: "I fill the hallway with my choking smoke, blinding you and stealing your precious air. Will you crawl low to the exit where clean air might remain, or try the deadly elevator shaft?",
    bg: "url('images/round2.png')",
    good: ["crawl low to the exit where clean air might remain"],
    choices: [
      { text: "crawl low to the exit where clean air might remain" },
      { text: "try the deadly elevator shaft" },
      { text: "break a window for desperate air" }
    ]
  },
  {
    situation: "My roaring flames block the stairwell completely, alarms screaming in my fiery symphony. Will you grab the extinguisher to battle me directly, or leap from the window into my embrace?",
    bg: "url('images/round2.png')",
    good: ["grab the extinguisher to battle me directly"],
    choices: [
      { text: "grab the extinguisher to battle me directly" },
      { text: "leap from the window into my embrace" },
      { text: "hide in a room and hope I pass" }
    ]
  },
  {
    situation: "The floor burns hot beneath your feet, my flames weakening the structure with ominous creaks. Will you move to the center where heat concentrates, or run desperately to the exit?",
    bg: "url('images/round2.png')",
    good: ["run desperately to the exit"],
    choices: [
      { text: "move to the center where heat concentrates" },
      { text: "stay near the walls for false security" },
      { text: "run desperately to the exit" }
    ]
  },
  {
    situation: "I spread rapidly through the building, blocking every exit with my relentless advance. Will you follow the smoke to certain doom, or find a new path through my burning maze?",
    bg: "url('images/round2.png')",
    good: ["find a new path through my burning maze"],
    choices: [
      { text: "follow the smoke to certain doom" },
      { text: "find a new path through my burning maze" },
      { text: "wait helplessly for rescue" }
    ]
  },
  {
    situation: "Muffled cries echo from trapped souls in my smoky prison, their desperation fueling my hunger. Will you help them and risk joining their fate, or prioritize your own escape from my deadly grasp?",
    bg: "url('images/round2.png')",
    good: ["prioritize your own escape from my deadly grasp"],
    choices: [
      { text: "help them and risk joining their fate" },
      { text: "prioritize your own escape from my deadly grasp" },
      { text: "call for help and hope for miracles" }
    ]
  }
];


// --- TIMER --- pag natalo sa timer (naubusan ng time)
function startTimer() {
  clearInterval(timerInterval);
  if (difficulty === 'hard') timeLeft = 45;
  else if (difficulty === 'impossible') timeLeft = 30;
  else timeLeft = 60;
  document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

  timerInterval = setInterval(() => {
    if (paused || timerPausedForChoice) return;
    if (playerHP <= 0 || enemyHP <= 0) {
      clearInterval(timerInterval);
      return;
    }
    timeLeft--;
    document.getElementById('timer').textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      console.log('DEBUG: Time ran out, round ended, currentRound:', currentRound);
      // Stop background audio if playing
      const bgAudio = document.getElementById('secondRoundBg');
      if (bgAudio && !bgAudio.paused) {
        console.log('DEBUG: Stopping second round background audio on time out');
        bgAudio.pause();
      }
      clearInterval(timerInterval);
      
      // Set playerHP to 0 to trigger defeat logic
      playerHP = 0;
      updateHPBars();
      
      // Trigger player defeat animation when time runs out
      stopPlayerAnimation();
      showPlayerDefeatedFrame();
      
      // Hide player HP bar
      if (!playerBarFaded) {
        playerBarFaded = true;
        const playerBar = document.querySelector('.player-hp-bar');
        playerBar.classList.add('fade-out');
        setTimeout(() => playerBar.style.display = 'none', 750);
      }
      
      // Track timing for leaderboard
      if (currentRound === 1 && !enemy1End) {
        enemy1End = Date.now();
      } else if (currentRound === 2 && !enemy2End) {
        enemy2End = Date.now();
      }
      
      gameWon = false; // Mark as defeat
      
      typeText("Time's up! The disaster overwhelms you.", () => {
        showEndButton("ACCEPT YOUR FATE");
      });
    }
  }, 1000);
}
//-- PAUSE TIMER PAG NAG CHOICE--
function pauseTimerForChoice() {
  timerPausedForChoice = true;
  setTimeout(() => {
    timerPausedForChoice = false;
  }, 3000);
}

  //--DELAY SA TIMER PAG MAY DIALOGUE
function stopTimerWithDelay(isGood) {
  setTimeout(() => {
    if (isGood) {
      clearInterval(timerInterval);
    }
  }, 6000);
}

// --- HP BARS ---
function updateHPBars() {
  const playerHPBar = document.getElementById('playerHP');
  playerHPBar.style.width = Math.max(playerHP, 0) + "%";
  if (playerHP > 50) {
    playerHPBar.style.background = "linear-gradient(90deg, #44ff44 0%, #228822 100%)";
  } else if (playerHP > 25) {
    playerHPBar.style.background = "linear-gradient(90deg, #fff700 0%, #ffae00 100%)";
  } else {
    playerHPBar.style.background = "linear-gradient(90deg, #ff4444 0%, #b80000 100%)";
  }

  const enemyHPBar = document.getElementById('enemyHP');
  enemyHPBar.style.width = Math.max(enemyHP, 0) + "%";
  if (enemyHP > 50) {
    enemyHPBar.style.background = "linear-gradient(90deg, #44ff44 0%, #228822 100%)";
  } else if (enemyHP > 25) {
    enemyHPBar.style.background = "linear-gradient(90deg, #fff700 0%, #ffae00 100%)";
  } else {
    enemyHPBar.style.background = "linear-gradient(90deg, #ff4444 0%, #b80000 100%)";
  }
}

// --- TYPEWRITER ---
function typeText(text, onComplete, initialText = "") {
  clearInterval(typingInterval);
  const contentEl = document.getElementById('text-content');
  contentEl.textContent = initialText;
  let idx = 0;

  typingInterval = setInterval(() => {
    if (paused) return;  // Pause typing if game is paused
    contentEl.textContent += text[idx++];
    if (idx >= text.length) {
      clearInterval(typingInterval);
      onComplete && onComplete();
    }
  }, 30);
}

// --- SHOW SCENARIO ---
function showScenario(i) {
  choiceLock = false;
  let s;
  if (difficulty === 'hard' && currentRound === 1) {
    s = scenariosRound1Hard[i];
  } else if (difficulty === 'hard' && currentRound === 2) {
    s = scenariosRound2Hard[i];
  } else if (difficulty === 'impossible' && currentRound === 1) {
    s = scenariosRound1Impossible[i];
  } else if (difficulty === 'impossible' && currentRound === 2) {
    s = scenariosRound2Impossible[i];
  } else {
    s = currentRound === 1 ? scenariosRound1[i] : scenariosRound2[i];
  }
  document.body.style.backgroundImage = s.bg;

  // Set disaster name as initial text
  const disasterName = currentRound === 1 ? "Earthquake: " : "Fire: ";

  const choices = document.getElementById('choicesArea');
  choices.classList.add('hidden');
  choices.innerHTML = "";

  typeText(s.situation, () => {
    s.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.textContent = choice.text;
      btn.onclick = () => {
        if (choiceLock) return;
        choiceLock = true;
        Array.from(choices.children).forEach(b => b.disabled = true);
        pauseTimerForChoice();
        setTimeout(() => makeChoice(s.good.includes(choice.text)), 700);
      };
      choices.appendChild(btn);
    });
    choices.classList.remove('hidden');
  }, disasterName);
}

// --- CHOICE LOGIC ---
// Adjust damage with difficulty
function makeChoice(isGood) {
  let damage = 25;
  if (difficulty === "normal") damage = 25;
  if (difficulty === "hard") damage = 30;
  if (difficulty === "impossible") damage = 35;

  const overlay = document.getElementById('effectOverlay');

  if (isGood) {
    enemyHP -= damage;

    // Flash enemy if choice is good
    const enemyEl = currentRound === 1 ? document.getElementById("enemy-animation") : document.getElementById("enemy2-animation");
    enemyEl.classList.add("flash");
    setTimeout(() => enemyEl.classList.remove("flash"), 400);

    // Add success flash
    overlay.classList.add('success-flash');
    setTimeout(() => overlay.classList.remove('success-flash'), 300);

    typeText("It's effective! Disaster is weakened!", () => {
      setTimeout(() => {
        proceedAfterChoice(isGood);
      }, 1000);
    });
  } else {
    playerHP -= damage;
    // Increment mistake counter
    if (currentRound === 1) {
      enemy1Mistakes++;
    } else {
      enemy2Mistakes++;
    }
    document.querySelector(".battlefield").classList.add("shake-medium");
    setTimeout(() => document.querySelector(".battlefield").classList.remove("shake-medium"), 400);

    // Add damage flash
    overlay.classList.add('damage-flash');
    setTimeout(() => overlay.classList.remove('damage-flash'), 500);

    typeText("Bad move! You got hurt!", () => {
      setTimeout(() => {
        proceedAfterChoice(isGood);
      }, 1000);
    });
  }
  updateHPBars();
}

//proceed afterchoice function
function proceedAfterChoice(isGood) {
  const overlay = document.getElementById('effectOverlay');

  // Check defeated animations
  if (playerHP <= 0) {
    stopPlayerAnimation();
    showPlayerDefeatedFrame();
    // Add defeat flash
    overlay.classList.add('damage-flash');
    setTimeout(() => overlay.classList.remove('damage-flash'), 500);
  }
  if (enemyHP <= 0) {
    if (currentRound === 1) {
      stopEnemyAnimation();
      showEnemy1DefeatedFrame();
    } else {
      stopEnemy2Animation();
      showEnemy2DefeatedFrame();
    }
    // Add victory flash
    overlay.classList.add('victory-flash');
    setTimeout(() => overlay.classList.remove('victory-flash'), 800);
  }

  // Trigger fade-out on HP bars if HP reaches zero
  if (playerHP <= 0 && !playerBarFaded) {
    playerBarFaded = true;
    const playerBar = document.querySelector('.player-hp-bar');
    playerBar.classList.add('fade-out');
    setTimeout(() => playerBar.style.display = 'none', 750);
  }
  if (enemyHP <= 0 && !enemyBarFaded) {
    enemyBarFaded = true;
    const enemyBar = document.querySelector('.enemy-hp-bar');
    enemyBar.classList.add('fade-out');
    setTimeout(() => enemyBar.style.display = 'none', 750);
  }

  // Check win/lose
  if (enemyHP <= 0) {
    console.log('DEBUG: Round ended with victory, currentRound:', currentRound);
    // Stop background audio if playing
    const bgAudio = document.getElementById('secondRoundBg');
    if (bgAudio && !bgAudio.paused) {
      console.log('DEBUG: Stopping second round background audio on victory');
      bgAudio.pause();
    }
    gameWon = true; // Mark as victory
    // Track timing for leaderboard
    if (currentRound === 1) {
      enemy1End = Date.now();
    } else {
      enemy2End = Date.now();
    }

    // === ADD ACHIEVEMENT UNLOCKS HERE ===
    unlockAchievement('firstWin');  // Always unlock first win

    if (timeLeft > 30) {
      unlockAchievement('quickWin');  // Win with more than 30 seconds left
    }

    if (playerHP === 100) {
      unlockAchievement('noDamage');  // Win without taking damage
    }

    if (difficulty === 'hard') {
      unlockAchievement('hardWin');  // Win on hard difficulty
    }
    // === END ACHIEVEMENT UNLOCKS === add more if you want


    //PAGNANALO (CHANGE THE DIALOGUE TO A MYSTERIOUS THING HAS FALL EME EME)
    typeText(
      currentRound === 1
        ? "You overcame the earthquake! A mysterious object fall..."
        //sa round 2\/\/
        : "You overcame all disasters! And a mysterious portal appears...",
      () => currentRound === 1 ? showNextRoundButton("TAKE THE OBJECT") : showEndButton("Enter the portal")
    );
    return;
  }
  //pag natalo sa bad choice
  if (playerHP <= 0) {
    console.log('DEBUG: Round ended with defeat, currentRound:', currentRound);
    // Stop background audio if playing
    const bgAudio = document.getElementById('secondRoundBg');
    if (bgAudio && !bgAudio.paused) {
      console.log('DEBUG: Stopping second round background audio on defeat');
      bgAudio.pause();
    }
    gameWon = false; // Mark as defeat
    // Track timing for leaderboard if enemy1 was defeated but enemy2 wasn't
    if (currentRound === 2 && enemy1End && !enemy2End) {
      enemy2End = Date.now();
    } else if (currentRound === 1 && !enemy1End) {
      enemy1End = Date.now();
    }
    typeText("You fainted... THE DREAM IS NOW YOUR REALITY", () => showEndButton("ACCEPT YOUR FATE"));
    return;
  }


  // Advance scenario
  currentScenario++;
  let scenarioArr;
  if (difficulty === 'hard' && currentRound === 1) {
    scenarioArr = scenariosRound1Hard;
  } else if (difficulty === 'hard' && currentRound === 2) {
    scenarioArr = scenariosRound2Hard;
  } else if (difficulty === 'impossible' && currentRound === 1) {
    scenarioArr = scenariosRound1Impossible;
  } else if (difficulty === 'impossible' && currentRound === 2) {
    scenarioArr = scenariosRound2Impossible;
  } else {
    scenarioArr = currentRound === 1 ? scenariosRound1 : scenariosRound2;
  }
  if (currentScenario < scenarioArr.length) {
    setTimeout(() => showScenario(currentScenario), 800);
  } else {
    currentRound === 1
        ? "You overcame the earthquake! A mysterious object fall..."
        //sa round 2\/\/
        : "You overcame all disasters! And a mysterious portal appears...",
      () => currentRound === 1 ? showNextRoundButton("TAKE THE OBJECT") : showEndButton("Enter the portal")
    ();
  }
}


// --- END/RESTART BUTTONS --- decide if next round or go back to main menu
function showEndButton(label) {
  const choices = document.getElementById('choicesArea');
  choices.innerHTML = `<button onclick="saveGameSummary()">${label}</button>`;
  choices.classList.remove('hidden');
}


function showNextRoundButton() {
  const choices = document.getElementById('choicesArea');
  choices.innerHTML = `<button onclick="takeObject()">TAKE THE OBJECT</button>`;
  choices.classList.remove('hidden');
}

function takeObject() {
  // Add red flash effect
  const overlay = document.getElementById('effectOverlay');
  overlay.classList.add('damage-flash');
  setTimeout(() => {
    overlay.classList.remove('damage-flash');
    // Proceed to next round after flash
    startRound2();
  }, 500);
}

// --- ROUND 2 LOGIC ---
function startRound2() {
   console.log('DEBUG: Starting round 2');
   currentRound = 2;
   currentScenario = 0;  // Reset scenario index for round 2
   playerHP = 100;
   enemyHP = 100;
   enemy2Start = Date.now(); // Initialize enemy 2 timer
   enemyBarFaded = false; // Reset bar fade flag for new round
   // Reset enemy HP bar visibility
   const enemyBar = document.querySelector('.enemy-hp-bar');
   enemyBar.style.display = 'block';
   enemyBar.classList.remove('fade-out');
   enemyBar.style.opacity = '1';
   updateHPBars();
   startTimer();
   document.getElementById('enemy-animation').style.display = 'none';
   document.getElementById('enemy2-animation').style.display = 'block';
   document.getElementById('firstRoundBg').pause();
   // Set cutscene text for round 2
   document.querySelector('#cutscene span').textContent = 'Wake up';
   showCutscene(() => {
     console.log('DEBUG: Round 2 cutscene ended, round officially starting');
     // Play background audio for round 2
     if (musicOn) {
       const bgAudio = document.getElementById('secondRoundBg');
       if (bgAudio) {
         bgAudio.currentTime = 0;
         bgAudio.play().catch(e => console.log('Second round background audio play failed:', e));
         console.log('DEBUG: Started playing second round background audio');
       } else {
         console.log('DEBUG: Second round background audio element not found');
       }
     } else {
       console.log('DEBUG: Music is off, not playing background audio');
     }
     // Add special flash for round 2 start
     const overlay = document.getElementById('effectOverlay');
     overlay.classList.add('special-flash');
     setTimeout(() => overlay.classList.remove('special-flash'), 600);
     showScenario(0);
   });
 }

// --- RESTART GAME ---
function restartGame() {
   console.log('DEBUG: Restarting game');
   playerHP = 100;
   enemyHP  = 100;
   currentScenario = 0;  // Reset scenario index
   currentRound = 1;     // Reset to round 1
   playerBarFaded = false; // Reset bar fade flags
   enemyBarFaded = false;
   gameWon = false; // Reset victory flag
   // Reset HP bar visibility
   const playerBar = document.querySelector('.player-hp-bar');
   playerBar.style.display = 'block';
   playerBar.classList.remove('fade-out');
   playerBar.style.opacity = '1';
   const enemyBar = document.querySelector('.enemy-hp-bar');
   enemyBar.style.display = 'block';
   enemyBar.classList.remove('fade-out');
   enemyBar.style.opacity = '1';
   updateHPBars();
   startTimer();
   document.getElementById('enemy-animation').style.display = 'block';
   document.getElementById('enemy2-animation').style.display = 'none';
   document.getElementById('firstRoundBg').pause();
   document.getElementById('secondRoundCutscene').pause();
   // Stop background audio if playing
   const bgAudio = document.getElementById('secondRoundBg');
   if (bgAudio && !bgAudio.paused) {
     console.log('DEBUG: Stopping second round background audio on restart');
     bgAudio.pause();
   }
   showCutscene(() => {
     showScenario(0);
   });
 }
//tite
// --- CUTSCENE LOGIC ---
function showCutscene(onStart) {
  const cutscene = document.getElementById('cutscene');
  cutscene.style.display = 'flex';
  cutscene.style.opacity = '1';
  cutscene.classList.remove('fade-out');
  cutscene.tabIndex = 0; // Make focusable for keyboard events
  cutscene.focus(); // Focus the cutscene for keyboard events

  // Handle audio based on round
  if (currentRound === 1) {
    const audio1 = document.getElementById('firstRoundCutscene');
    audio1.currentTime = 0;
    audio1.play().catch(e => console.log('Audio play failed:', e));
  } else if (currentRound === 2) {
    const audio2 = document.getElementById('secondRoundCutscene');
    if (audio2) {
      console.log('Round 2 audio element found:', audio2);
      console.log('Audio src:', audio2.src);
      console.log('Audio readyState:', audio2.readyState);
      console.log('Audio volume:', audio2.volume);
      console.log('Audio muted:', audio2.muted);
      console.log('musicOn variable:', musicOn);
      audio2.currentTime = 0;
      // Try to play with user interaction context
      const playPromise = audio2.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Round 2 audio started playing successfully');
        }).catch(e => {
          console.log('Round 2 audio play failed:', e);
          // Try to play on user interaction with the cutscene
          const playOnInteraction = () => {
            console.log('Attempting to play audio on user interaction');
            audio2.play().catch(e2 => console.log('Retry play failed:', e2));
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('keydown', playOnInteraction);
          };
          // Add listeners to the cutscene element specifically
          const cutscene = document.getElementById('cutscene');
          if (cutscene) {
            cutscene.addEventListener('click', playOnInteraction);
            cutscene.addEventListener('keydown', playOnInteraction);
          }
        });
      }
    } else {
      console.log('Round 2 audio element not found!');
    }
  }
  function startGameFromCutscene(event) {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop event bubbling
    cutscene.classList.add('fade-out');
    setTimeout(() => {
      cutscene.style.display = 'none';
      cutscene.classList.remove('fade-out');
    }, 500);
    cutscene.removeEventListener('keydown', startGameFromCutscene);
    cutscene.removeEventListener('click', startGameFromCutscene);
    if (currentRound === 1) {
      document.getElementById('firstRoundCutscene').pause();
      document.getElementById('firstRoundBg').currentTime = 0;
      if (musicOn) document.getElementById('firstRoundBg').play();
    } else if (currentRound === 2) {
      // Check if audio is actually playing before pausing
      const audio2 = document.getElementById('secondRoundCutscene');
      if (audio2) {
        // Only pause if audio is currently playing
        if (!audio2.paused && audio2.currentTime > 0) {
          console.log('Pausing round 2 audio that is currently playing, currentTime:', audio2.currentTime);
          audio2.pause();
        } else {
          console.log('Round 2 audio not playing or not started, not pausing. CurrentTime:', audio2.currentTime, 'Paused:', audio2.paused);
        }
      } else {
        console.log('Round 2 audio element not found for pausing');
      }
    }
    onStart && onStart();
  }
  cutscene.addEventListener('keydown', startGameFromCutscene);
  cutscene.addEventListener('click', startGameFromCutscene);
}

// --- ACHIEVEMENTS ---
const achievements = [
  { key: 'firstWin', name: 'First Victory', desc: 'Win your first battle.' },
  { key: 'quickWin', name: 'Speedster', desc: 'Win with more than 30 seconds left.' },
  { key: 'noDamage', name: 'Untouchable', desc: 'Win without taking damage.' },
  { key: 'hardWin', name: 'Survivor', desc: 'Win on Hard difficulty.' }
];

// Unlock achievement and persist to localStorage
function unlockAchievement(key) {
  const unlocked = JSON.parse(localStorage.getItem('unlockedAchievements') || '{}');
  if (!unlocked[key]) {
    unlocked[key] = true;
    localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
    showAchievementNotification(key);
  }
}

function showAchievementNotification(key) {
  const achievement = achievements.find(a => a.key === key);
  if (achievement) {
  
    alert(`Achievement Unlocked: ${achievement.name}\n${achievement.desc}`);
  }
}

// Track time and mistakes for each enemy
let enemy1Start, enemy1End, enemy2Start, enemy2End;
let enemy1Mistakes = 0, enemy2Mistakes = 0;

// When game ends:
function saveGameSummary() {
   const enemy1Time = enemy1End ? Math.round((enemy1End - enemy1Start) / 1000) : 0;
   const enemy2Time = enemy2End && enemy2Start ? Math.round((enemy2End - enemy2Start) / 1000) : 0;

   const totalTime = enemy1Time + enemy2Time;
   const totalMistakes = enemy1Mistakes + enemy2Mistakes;
   const score = totalTime + (totalMistakes * 60); // Lower score is better

  const summary = {
    name: localStorage.getItem('playerName') || 'Anonymous',
    totalTime,
    totalMistakes,
    score,
    date: new Date().toLocaleString(),
    won: gameWon, // Include victory status
    difficulty: difficulty || 'normal' // Include difficulty
  };

  console.log('Saving game summary:', summary, 'gameWon:', gameWon);

  // Always save current summary for end.html display
  localStorage.setItem('latestSummary', JSON.stringify(summary));

  // Only save to leaderboard history if game was won
  if (gameWon) {
    const historyKey = `gameHistory_${difficulty || 'normal'}`;
    let history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    history.push(summary);
    localStorage.setItem(historyKey, JSON.stringify(history));
    console.log('DEBUG: Saved game summary to leaderboard:', historyKey, summary);
  } else {
    console.log('DEBUG: Game not won, not saving to leaderboard');
  }

  window.location.href = 'end.html';
}

function getPerformanceRating(e1Time, e1Mistakes, e2Time, e2Mistakes) {
  const totalMistakes = e1Mistakes + e2Mistakes;
  const totalTime = e1Time + e2Time;
  if (totalMistakes === 0 && totalTime < 60) return "S+";
  if (totalMistakes === 0) return "S";
  if (totalMistakes <= 2 && totalTime < 120) return "A";
  if (totalMistakes <= 5) return "B";
  return "C";
}

// --- BOOT ---
window.addEventListener('load', () => {
  currentRound = 1;       // Ensure round 1 starts
  currentScenario = 0;    // Start from first scenario
  enemy1Start = Date.now(); // Initialize enemy 1 timer
  enemy1Mistakes = 0;     // Reset mistakes
  enemy2Mistakes = 0;
  playerBarFaded = false; // Reset bar fade flags
  enemyBarFaded = false;
  gameWon = false; // Reset victory flag
  updateHPBars();
  updateAllAudioVolumes(); // Apply saved volume
  document.getElementById('enemy-animation').style.display = 'block';
  document.getElementById('enemy2-animation').style.display = 'none';

  // Debug audio loading
  const round2Audio = document.getElementById('secondRoundCutscene');
  if (round2Audio) {
    console.log('Round 2 audio element exists at load time');
    console.log('Round 2 audio src:', round2Audio.src);
    round2Audio.addEventListener('canplaythrough', () => {
      console.log('Round 2 audio loaded successfully');
    });
    round2Audio.addEventListener('error', (e) => {
      console.log('Round 2 audio loading error:', e);
    });
    round2Audio.addEventListener('loadstart', () => {
      console.log('Round 2 audio load started');
    });
    round2Audio.addEventListener('loadeddata', () => {
      console.log('Round 2 audio data loaded');
    });
  } else {
    console.log('Round 2 audio element does not exist at load time!');
  }

  // Set cutscene text for round 1
  document.querySelector('#cutscene span').textContent = 'Press anywhere to play';
  showCutscene(() => {
    startTimer();
    showScenario(0);
  });
});

// Modular animation function
function createAnimation(selector, intervalTime, loop = true, loopLength = null) {
  const frames = document.querySelectorAll(selector);
  let idx = 0;
  const length = loopLength || frames.length;
  const interval = setInterval(() => {
    frames.forEach((img, i) => img.style.display = (i === idx ? 'block' : 'none'));
    if (idx === length - 1 && !loop) {
      clearInterval(interval);
      return;
    }
    idx = (idx + 1) % length;
  }, intervalTime);
  return interval;
}

// PLAYER ANIMATION
const playerFrames = document.querySelectorAll('#player .player-frame');
let playerAnimInterval = createAnimation('#player .player-frame:not(.defeated)', 200, true);

// ENEMY 1 ANIMATION
const enemyFrames = document.querySelectorAll('#enemy-animation .enemy-frame:not(.defeated)');
let enemyAnimInterval = createAnimation('#enemy-animation .enemy-frame:not(.defeated)', 400);

// ENEMY 2 ANIMATION
const enemy2Frames = document.querySelectorAll('#enemy2-animation .enemy2-frame:not(.defeated)');
let enemy2AnimInterval = createAnimation('#enemy2-animation .enemy2-frame:not(.defeated)', 400);

// --for death animation--
let enemy1DefeatedAnimInterval = null;
let enemy2DefeatedAnimInterval = null;
let playerEarthquakeDefeatedInterval = null;
let playerFireDefeatedInterval = null;

function stopPlayerAnimation() {
  clearInterval(playerAnimInterval);
}

// Enhanced player defeat animation function
function showPlayerDefeatedAnimation() {
  console.log('DEBUG: showPlayerDefeatedAnimation called, currentRound:', currentRound);
  
  // Stop normal player animation
  clearInterval(playerAnimInterval);
  
  // Hide all normal player frames
  const normalFrames = document.querySelectorAll('#player .player-frame:not(.defeated)');
  console.log('DEBUG: Hiding normal frames, found:', normalFrames.length);
  normalFrames.forEach(img => {
    img.style.display = 'none';
  });
  
  // Determine which defeat animation to show based on current round
  if (currentRound === 1) {
    console.log('DEBUG: Round 1 - calling earthquake defeat animation');
    // Earthquake defeat animation (Enemy 1)
    showEarthquakeDefeatedAnimation();
  } else if (currentRound === 2) {
    console.log('DEBUG: Round 2 - calling fire defeat animation');
    // Fire defeat animation (Enemy 2)
    showFireDefeatedAnimation();
  }
}

function showEarthquakeDefeatedAnimation() {
  console.log('DEBUG: Starting earthquake defeat animation');
  
  // Hide fire defeat frames
  document.querySelectorAll('#player .player-frame.defeated.fire').forEach(img => {
    img.style.display = 'none';
  });
  
  // Debug: Check if earthquake defeat frames exist
  const earthquakeFrames = document.querySelectorAll('#player .player-frame.defeated.earthquake');
  console.log('DEBUG: Found earthquake defeat frames:', earthquakeFrames.length);
  earthquakeFrames.forEach((frame, index) => {
    console.log(`DEBUG: Earthquake frame ${index}:`, frame.src);
  });
  
  // If no frames found, show first frame manually
  if (earthquakeFrames.length === 0) {
    console.log('DEBUG: No earthquake frames found, checking all defeated frames');
    const allDefeatedFrames = document.querySelectorAll('#player .player-frame.defeated');
    console.log('DEBUG: All defeated frames found:', allDefeatedFrames.length);
    allDefeatedFrames.forEach((frame, index) => {
      console.log(`DEBUG: Defeated frame ${index}:`, frame.src, frame.className);
    });
  } else {
    // Show first frame immediately
    earthquakeFrames[0].style.display = 'block';
    // Animate earthquake defeat frames
    playerEarthquakeDefeatedInterval = createAnimation('#player .player-frame.defeated.earthquake', 400, true);
  }
}

function showFireDefeatedAnimation() {
  console.log('DEBUG: Starting fire defeat animation');
  
  // Hide earthquake defeat frames
  document.querySelectorAll('#player .player-frame.defeated.earthquake').forEach(img => {
    img.style.display = 'none';
  });
  
  // Debug: Check if fire defeat frames exist
  const fireFrames = document.querySelectorAll('#player .player-frame.defeated.fire');
  console.log('DEBUG: Found fire defeat frames:', fireFrames.length);
  fireFrames.forEach((frame, index) => {
    console.log(`DEBUG: Fire frame ${index}:`, frame.src);
  });
  
  // If no frames found, show first frame manually
  if (fireFrames.length === 0) {
    console.log('DEBUG: No fire frames found, checking all defeated frames');
    const allDefeatedFrames = document.querySelectorAll('#player .player-frame.defeated');
    console.log('DEBUG: All defeated frames found:', allDefeatedFrames.length);
  } else {
    // Show first frame immediately
    fireFrames[0].style.display = 'block';
    // Animate fire defeat frames
    playerFireDefeatedInterval = createAnimation('#player .player-frame.defeated.fire', 500, true);
  }
}

function showPlayerDefeatedFrame() {
  console.log('DEBUG: showPlayerDefeatedFrame called, currentRound:', currentRound);
  showPlayerDefeatedAnimation(); // Use new enhanced function
}
function stopEnemyAnimation() {
  clearInterval(enemyAnimInterval);
}
function showEnemy1DefeatedFrame() {
  clearInterval(enemyAnimInterval);
  // Hide running frames
  document.querySelectorAll('#enemy-animation .enemy-frame:not(.defeated)').forEach(img => img.style.display = 'none');
  // Animate defeated frames (play once, no loop)
  enemy1DefeatedAnimInterval = createAnimation('#enemy-animation .enemy-frame.defeated', 400, false);
}
function stopEnemy2Animation() {
  clearInterval(enemy2AnimInterval);
}
function showEnemy2DefeatedFrame() {
  clearInterval(enemy2AnimInterval);
  // Hide running frames
  document.querySelectorAll('#enemy2-animation .enemy2-frame:not(.defeated)').forEach(img => img.style.display = 'none');
  // Animate defeated frames (looping)
  enemy2DefeatedAnimInterval = createAnimation('#enemy2-animation .enemy2-frame.defeated', 400, true);
}

  // SETTINGS VARIABLES
let sfxOn = true;

// SETTINGS HANDLERS
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettings = document.getElementById('closeSettings');
const toggleSound = document.getElementById('toggleSound');
const backToMainMenu = document.getElementById('backToMainMenu');

let gamePaused = false;

// Pause game logic (implement your own pauseGame/resumeGame functions)
function pauseGame() {
  paused = true;  // Pause the timer
  gamePaused = true;
  // Stop all animations
  clearInterval(playerAnimInterval);
  clearInterval(enemyAnimInterval);
  clearInterval(enemy2AnimInterval);
  if (enemy1DefeatedAnimInterval) clearInterval(enemy1DefeatedAnimInterval);
  if (enemy2DefeatedAnimInterval) clearInterval(enemy2DefeatedAnimInterval);
  if (playerEarthquakeDefeatedInterval) clearInterval(playerEarthquakeDefeatedInterval);
  if (playerFireDefeatedInterval) clearInterval(playerFireDefeatedInterval);
  // Typing animation pauses automatically via paused check
  // Disable gameplay interactions
  document.querySelector('.battlefield').classList.add('paused');
}

function resumeGame() {
  paused = false;  // Resume the timer
  gamePaused = false;
  // Restart all animations
  playerAnimInterval = createAnimation('#player .player-frame:not(.defeated)', 200, true);
  enemyAnimInterval = createAnimation('#enemy-animation .enemy-frame:not(.defeated)', 400);
  enemy2AnimInterval = createAnimation('#enemy2-animation .enemy2-frame:not(.defeated)', 400);
  if (enemy1DefeatedAnimInterval) enemy1DefeatedAnimInterval = createAnimation('#enemy-animation .enemy-frame.defeated', 400, false);
  if (enemy2DefeatedAnimInterval) enemy2DefeatedAnimInterval = createAnimation('#enemy2-animation .enemy2-frame.defeated', 400, true);
  if (playerEarthquakeDefeatedInterval) playerEarthquakeDefeatedInterval = createAnimation('#player .player-frame.defeated.earthquake', 400, true);
  if (playerFireDefeatedInterval) playerFireDefeatedInterval = createAnimation('#player .player-frame.defeated.fire', 500, true);
  // Re-enable gameplay interactions
  document.querySelector('.battlefield').classList.remove('paused');
}

// Show settings modal and pause game
settingsBtn.addEventListener('click', () => {
  settingsModal.classList.remove('hidden');
  pauseGame();
});

// Close settings modal and resume game
closeSettings.addEventListener('click', () => {
  settingsModal.classList.add('hidden');
  resumeGame();
});

// Sound toggle
toggleSound.addEventListener('change', () => {
  const muted = !toggleSound.checked;
  console.log('Sound toggle changed, muted:', muted);
  // Mute/unmute all game audio elements
  document.querySelectorAll('audio').forEach(audio => {
    audio.muted = muted;
    console.log('Audio element muted status:', audio.id, audio.muted);
  });
});

// Volume control
const volumeSlider = document.getElementById('volumeSlider');
const volumePercent = document.getElementById('volumePercent');
let currentVolume = 1; // 0 to 1

// Function to update all audio volumes
function updateAllAudioVolumes() {
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    audio.volume = currentVolume;
  });
}

// Load saved volume
const savedVolume = localStorage.getItem('gameVolume');
if (savedVolume !== null) {
  currentVolume = parseFloat(savedVolume);
  volumeSlider.value = currentVolume * 100;
  volumePercent.textContent = Math.round(currentVolume * 100) + '%';
  updateAllAudioVolumes();
}

// Volume slider event
volumeSlider.addEventListener('input', () => {
  currentVolume = volumeSlider.value / 100;
  volumePercent.textContent = Math.round(currentVolume * 100) + '%';
  updateAllAudioVolumes();
  localStorage.setItem('gameVolume', currentVolume);
});
// Back to Main Menu - handled in game.html inline script

// Fullscreen toggle with state persistence
function toggleFullscreen() {
  const isFullscreen = !!document.fullscreenElement;

  if (!isFullscreen) {
    document.documentElement.requestFullscreen().catch(err => {
      alert(`Error enabling fullscreen: ${err.message}`);
    });
    localStorage.setItem('fullscreenMode', 'true');
  } else {
    document.exitFullscreen();
    localStorage.setItem('fullscreenMode', 'false');
  }
}

// Initialize fullscreen state on page load
function initializeFullscreenState() {
  const savedFullscreenState = localStorage.getItem('fullscreenMode');

  // Listen for fullscreen changes to update localStorage
  document.addEventListener('fullscreenchange', () => {
    const isCurrentlyFullscreen = !!document.fullscreenElement;
    localStorage.setItem('fullscreenMode', isCurrentlyFullscreen.toString());
  });

  // If user was in fullscreen before and page supports it, try to restore
  if (savedFullscreenState === 'true' && !document.fullscreenElement) {
    // Only attempt to restore if not already in fullscreen
    setTimeout(() => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {
          // Silently fail if fullscreen is not available
        });
      }
    }, 100);
  }
}

// Add fullscreen button event listener
document.addEventListener('DOMContentLoaded', () => {
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', toggleFullscreen);
  }

  // Initialize fullscreen state
  initializeFullscreenState();
});




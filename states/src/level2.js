var level2 = function (game) {
    
};

// Create background variable
var background;

// Create varibale for group of bubbles
var bubbles;
var bubbles_velocity;

// Creat a variable for background bubbles
var background_bubbles;

// Create variables for the individual bubbles
var bubble_01, bubble_02, bubble_03;

// Create variables for bubble labels
var bubble_text_01, bubble_text_02, bubble_text_03;

// Create varibale for spikes and group of spikes
var spikes;
var spike_group;
var spike_set_01, spike_set_02, spike_set_03, spike_set_04;

// Create variable for score text display
var score_text;

// Create a variable to display chemical formula name
var chemical_formula_text_display;

// Ceate a variable to hold the data for the formulas
var level_2_data;

// Create random variables for the formulas and the name
var current_round, randomFormula;

var SCALE_FOR_ANSWER_BUBBLE = 0.75;

var correct_answer, wrong_answer;

var emitter;

// Ceate count down label to start game
var count_down_label;

// Create timer varibale
var game_timer;

// Create boolen for game being in a started state
var is_started = false;

// Create variable to hold counter value
var counter_level_2 = 5;

// Create variable to hold heart image
var heart_1, heart_2, heart_3;

var short_beep;
var long_beep;

var right_mark;
var wrong_mark;

var correct_sound;
var incorrect_sound;

var is_correct = false;
var is_wrong = false;

var is_timer_paused = false;
var pause_delay = 150;

var current_bubble;

// Create an array of the main functions of the game 
level2.prototype = {

    // Create funion runs one time only
    create: function () {
       
        background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'level_2_background_image');
    
        count_down_label = this.game.add.text(this.game.world.centerX - 40, 10, "", {font: "120px Courier", fill: "#ffffff"});
        
        game_timer = this.game.time.create(false);
        game_timer.loop(1000, updateCounter, this);
        game_timer.start();
        
        heart_1 = this.game.add.sprite(770, 90, 'heart');
        heart_2 = this.game.add.sprite(heart_1.x + 50, 90, 'heart');
        heart_3 = this.game.add.sprite(heart_2.x + 50, 90, 'heart');
   
        correct_sound = this.game.add.audio('correctSound');
        correct_sound.volume = 0.1;
        
        incorrect_sound = this.game.add.audio('wrongSound');
        incorrect_sound.volume = 0.1;
        
        // Asign the chemical name text display a value
        // Display basic game instructions first
        chemical_formula_text_display = this.game.add.text(this.game.world.centerX - 430, 130, "Select The Correct Bubble.", {font: "50px Courier", fill: "White"});
      
        // Pause the main theme music
        music.pause();
        
        // Assign value to the beep variables
        short_beep = this.game.add.audio('shortBeep');
        short_beep.volume = 0.1;
        
        long_beep = this.game.add.audio('longBeep');
        long_beep.volume = 0.1;
    
        // Add spike image and set visible to false
        // Image is only used for size attributes it is not displayed in the game
        spikes = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 250, 'spike_image');
        spikes.visible = false;
    
        // Parse the text back to a JSON object
        level_2_data = JSON.parse(this.game.cache.getText('level_2_JSON'));
        
        // Print data to the console
        console.log("You made it this far!!" + level_2_data);
        
        // Set current round to zero
        current_round = 0;
       
        // Assign value to the random variable
        randomFormula = Math.floor(Math.random() * 3);
        
        // Assign score a value and the score text display
        score_text = this.game.add.text(this.game.width - 200, 30, "", {font: "30px Courier", fill: "Yellow"});
        score_text.setText("Score: " + score);
        
        // Create group of bubbles
        bubbles = this.game.add.group();
       
        // Enables all kinds of input actions on the bubble group (Click, etc....)
        bubbles.inputEnableChildren = true;
        bubbles.enableBody = true;
        bubbles.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Set bubbles_velocity
        bubbles_velocity = 0.63;
        
        // Create group for bubble labels
        bubble_labels = this.game.add.group();
        bubble_labels.enableBody = true;
        bubble_labels.physicsBodyType = Phaser.Physics.ARCADE;
        
        // Create 3 individual bubbles and allow them to be selected and add them to the bubbles group
        bubble_01 = bubbles.create(this.game.width/6, 0, 'bubble_image');
        bubble_01.events.onInputDown.add(selectedBubble, this);
        bubble_01.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        // Create variable to hold the font style crap
        var style_01 = { font: "47px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: bubble_01.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        // Create a text label and add it to the bubble_labels group
        bubble_text_01 = this.game.add.text(Math.floor(bubble_01.x + bubble_01.width/2), Math.floor(bubble_01.y + bubble_01.height/2), "", style_01, bubble_labels);
        
        bubble_text_01.anchor.set(0.5);
        bubble_text_01.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
       
        // Create a text label and add it to the bubble_labels group
        bubble_02 = bubbles.create(bubble_01.x + 250, 0, 'bubble_image');
        bubble_02.events.onInputDown.add(selectedBubble, this);    
        bubble_02.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        var style_02 = { font: "47px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: bubble_02.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
       
        bubble_text_02 = this.game.add.text(Math.floor(bubble_02.x + bubble_02.width/2), Math.floor(bubble_02.y + bubble_02.height/2), "", style_02, bubble_labels);
        bubble_text_02.anchor.set(0.5);
        bubble_text_02.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        // Create a text label and add it to the bubble_labels group
        bubble_03 = bubbles.create(bubble_02.x + 250, 0, 'bubble_image');
        bubble_03.events.onInputDown.add(selectedBubble, this);
        bubble_03.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
        
        var style_03 = { font: "47px Arial", fill: "Yellow", wordWrap: true, wordWrapWidth: bubble_03.width, align: "center", backgroundColor: "rgba(0,0,0,0)" };
        
        bubble_text_03 = this.game.add.text(Math.floor(bubble_03.x + bubble_03.width/2), Math.floor(bubble_03.y + bubble_03.height/2), "", style_03, bubble_labels);
        bubble_text_03.anchor.set(0.5);
        bubble_text_03.scale.setTo(SCALE_FOR_ANSWER_BUBBLE, SCALE_FOR_ANSWER_BUBBLE);
       
        // Set bubbles not visible 
        bubbles.visible = false;
        
        check_mark_group = this.game.add.group();
        check_mark_group.enableBody = true;
        check_mark_group.physicsBodyType = Phaser.Physics.ARCADE;
        
        check_mark_01 = check_mark_group.create(bubble_01.x, bubble_01.y, 'checkMark');
        check_mark_02 = check_mark_group.create(bubble_02.x, bubble_02.y, 'checkMark');
        check_mark_03 = check_mark_group.create(bubble_03.x, bubble_03.y, 'checkMark');
        
        x_mark_group = this.game.add.group();
        x_mark_group.enableBody = true;
        x_mark_group.physicsBodyType = Phaser.Physics.ARCADE;
        
        x_mark_01 = x_mark_group.create(bubble_01.x, bubble_01.y, 'xMark');
        x_mark_02 = x_mark_group.create(bubble_02.x, bubble_02.y, 'xMark');
        x_mark_03 = x_mark_group.create(bubble_03.x, bubble_03.y, 'xMark');
        
        check_mark_group.visible = false;
        x_mark_group.visible = false;
             
        /*
        right_mark = this.game.add.sprite(0, 0, 'checkMark');
        right_mark.visible = false;
        right_mark.scale.setTo(0.7, 0.7);
        right_mark.anchor.set(0, 0.5);
        
        wrong_mark = this.game.add.sprite(0, 0, 'xMark');
        wrong_mark.visible = false;
        wrong_mark.scale.setTo(0.7, 0.7);
        wrong_mark.anchor.set(0, 0.5); 
        */
        
        // Create a group of spike sets
        spike_group = this.game.add.group();
        spike_group.enableBody = true;
        
        spike_set_01 = spike_group.create(0, height - spikes.height, 'spike_image', spike_group);
        spike_set_02 = spike_group.create(spike_set_01.x + 300, height - spikes.height, 'spike_image', spike_group);
        spike_set_03 = spike_group.create(spike_set_02.x + 300, height - spikes.height, 'spike_image', spike_group);
        spike_set_04 = spike_group.create(spike_set_03.x + 300, height - spikes.height, 'spike_image', spike_group);
        
        
        //	Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
        emitter = this.game.add.emitter(this.game.world.centerX, 200, 200);

        //	This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
        emitter.width = this.game.width - 50;

        emitter.makeParticles('emitter_bubble_image');

        emitter.minParticleSpeed.set(0, 300);
        emitter.maxParticleSpeed.set(0, 400);

        emitter.setRotation(0, 0);
        emitter.setAlpha(0.3, 0.8);
        emitter.setScale(0.5, 0.5, 1, 1);
        emitter.gravity = -200;

        //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //	The 5000 value is the lifespan of each particle before it's killed
        emitter.start(false, 5000, 100);
    },

    // Function holds information for things that move 24fps 
    update: function () {
        
        bubbles.y += bubbles_velocity;
        bubble_labels.y += bubbles_velocity;
        check_mark_group.y += bubbles_velocity;
        x_mark_group.y += bubbles_velocity;
        
        // Set whats happens when bubbles hit spikes
        this.game.physics.arcade.overlap(bubbles, spike_group, bubbleHitSpike, null, this);
       
        score_text.setText("Score: " + score);
      
       if (is_started) {
           handleData();
           bubbles.visible = true;
       }
        
        // Handle hearts and lives 
        if (lives == 2) {
            
            heart_1.visible = false;
        } else if (lives == 1) {
           
            heart_1.visible = false;
            heart_2.visible = false;
        
        } else if (lives == 0) {
            
            this.game.state.start('GameOver');
        }
        
        // Score cannot go to a negative value
        if (score < 0) {
            score = 0;
        }
    },
    
    // Function holds information for things that move 50fps
    render: function () {
        count_down_label.setText(counter_level_2);
        
          //Chnages Count Down Label Red
        if (counter_level_2 <= 5) {
            count_down_label.addColor("RED", 0);
        }
        else if (counter_level_2 > 5) {
            count_down_label.addColor("#ffffff", 0);
        } 
        
       // markAnswerRightOrWrong(current_bubble);
    } 
};

function updateCounter() {  
        
    //Game Time not started 
    if(is_started == false) {
        counter_level_2--;
        short_beep.play();
            
        if(counter_level_2 < 1){
            short_beep.pause();
            long_beep.play();
        }
            
        if(counter_level_2 <= 0) { 
            counter_level_2 = 8;
            is_started = true;
        }
    }
        //Game Time has started 
    else if(is_started == true) {
        counter_level_2--;
        
        if (counter_level_2 < 1) {
            //wrongSound.play();
                
            if (lives == 3) {
                lives = 2;
                counter_level_2 = 8;
                }
            else if (lives == 2) {
                lives = 1;
                counter_level_2 = 8;
            }
            else {
                lives = 0;
                counter_level_2 = 0;
            }
        }
    }
// Closes method
}

/*
function markAnswerRightOrWrong(input_bubble) {
    
    // Update the check mark position when correct answer is chosen
    if (right_mark.visible == true) {
        right_mark.x = Math.floor(input_bubble.x + input_bubble.width/2);
        right_mark.y = Math.floor(input_bubble.y + input_bubble.height/2);
    } 
    
    if (wrong_mark.visible == true) {
        wrong_mark.x = Math.floor(input_bubble.x + input_bubble.width/2);
        wrong_mark.y = Math.floor(input_bubble.y + input_bubble.height/2);
    }
}
*/

// Collision handler for bubbles and spikes
function bubbleHitSpike(input_bubble) {
    input_bubble.visible = false;
    bubble_labels.visible = false;
}

// Collision handler for selected bubble
function selectedBubble(input_bubble) {

    if (input_bubble === bubble_01) {   
        checkIfSelectedBubbleIsCorrect(bubble_text_01.text);
        // Assign a value to current bubble to the input bubble
        current_bubble = bubble_01;
        } 
        
    if (input_bubble === bubble_02) {   
        checkIfSelectedBubbleIsCorrect(bubble_text_02.text);
        current_bubble = bubble_02;    
    } 
        
    if (input_bubble === bubble_03) {   
        checkIfSelectedBubbleIsCorrect(bubble_text_03.text);
        current_bubble = bubble_03;
    }
}

/* Function holds the functionality for what happens
    when the user gets the answer correct 
*/
function stuffThatHappensWhenAnswerIsCorrect() {
   
    // Increase score by 50 
    score += 50;
    
    /* 
        Check to see if it is the last round,
        if it is then advance to the next
        level
    */
    if (current_round == 4) {
        this.game.state.start('Level5');
    } else {
        current_round++;
    }
    
    // Changes the data values 
    randomFormula = Math.floor(Math.random() * 3);
    
    // Reset the postion of the bubble group
    resetBubblesPosition();
    
    // Reset the velocity of the bubbles
    bubbles_velocity = 0.7;
    
    // Reset the counter to 8
    counter_level_2 = 8;
        // is_correct = true;
       // game_timer.pause();
    // Play sound for correct answer
    correct_sound.play();
    
}

/* Function holds the functionality for what happens
    when the user gets the answer wrong 
*/
function stuffThatHappensWhenAnswerIsWrong() {
    
    // Decrease score by 50
    score -= 50;
    // Increase bubbles velocity
    bubbles_velocity += 0.5;
    // Play sound for wrong answer
    incorrect_sound.play();
    
    // Decrease lives by one
    lives--;
     
}

function checkIfSelectedBubbleIsCorrect(input_bubble_text) {
    
    // Condition for what happens if user gets formula 1 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula1.right) {
        
        stuffThatHappensWhenAnswerIsCorrect();
    } 

   /* if (is_timer_paused = true) {
        
   
        if (is_correct == true) {
            pause_delay--;

            counter_level_2 = 8;
        }
    }
    
    if (pause_delay < 1) {
        game_timer.resume();
        right_mark.visible = false;
        pause_delay = 150;
        is_correct = false;
        is_wrong = false;
        is_timer_paused = false;
    } */
    
    // Condition for what happens if user gets formula 1 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula1.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong6 ||
        input_bubble_text === level_2_data.chemical_formulas.formula1.wrong7 ) {
        
        stuffThatHappensWhenAnswerIsWrong();
    }
    
     // Condition for what happens if user gets formula 2 right
	if (input_bubble_text === level_2_data.chemical_formulas.formula2.right) {
        
        stuffThatHappensWhenAnswerIsCorrect();
    }
    
    // Condition for what happens if user gets formula 2 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula2.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong6 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong7 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong8 ||
        input_bubble_text === level_2_data.chemical_formulas.formula2.wrong9 ) {
        
        stuffThatHappensWhenAnswerIsWrong();
    }
    
     // Condition for what happens if user gets formula 3 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula3.right) {
        
        stuffThatHappensWhenAnswerIsCorrect();
    }
    
    // Condition for what happens if user gets formula 3 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula3.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula3.wrong6 ) {
       
        stuffThatHappensWhenAnswerIsWrong();
    }
    
     // Condition for what happens if user gets formula 4 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula4.right) {
   
        stuffThatHappensWhenAnswerIsCorrect();
    } 
    
     // Condition for what happens if user gets formula 4 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula4.wrong1  ||      
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong2  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong3  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong4  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong5  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong6  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong7  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong8  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong9  ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong10 ||
        input_bubble_text === level_2_data.chemical_formulas.formula4.wrong11 ) {
        
        stuffThatHappensWhenAnswerIsWrong();
    }
     // Condition for what happens if user gets formula 5 right
    if (input_bubble_text === level_2_data.chemical_formulas.formula5.right) {

        stuffThatHappensWhenAnswerIsCorrect();
    }
    
     // Condition for what happens if user gets formula 5 wrong
    if (input_bubble_text === level_2_data.chemical_formulas.formula5.wrong1 ||      
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong2 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong3 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong4 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong5 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong6 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong7 ||
        input_bubble_text === level_2_data.chemical_formulas.formula5.wrong8 ) {
        
        stuffThatHappensWhenAnswerIsWrong();
    }
   
    console.log("This is the value passed to checkIfSelectedBubbleIsCorrect(): " + input_bubble_text);
      
}

// Function will reset the y position of the bubbles
function resetBubblesPosition() {
    bubbles.y =  bubble_01.height;
    bubble_labels.y = bubble_01.height;
    check_mark_group.y = bubble_01.height;
    x_mark_group.y = bubble_01.height;
}

/* 
    Function handles the data for the bubble lables 
    assigning a different value for the bubble labels
    from a JSON data file
*/
function handleData() {
    
    if (current_round == 0) {
        chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula1.name);
            
        if (randomFormula == 0) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula1.right);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula1.wrong1);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula1.wrong2);
        }
        else if (randomFormula == 1) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula1.wrong3);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula1.right);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula1.wrong4);
        }
        else if (randomFormula == 2) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula1.wrong5);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula1.wrong6);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula1.right);
        }      
    }
        
        
/////////////////////////////////////////////////////////////////////////////////////////
    if (current_round == 1) {
        chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula2.name);

        if (randomFormula == 0) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula2.right);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula2.wrong1);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula2.wrong2);
               
        }
        else if (randomFormula == 1) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula2.wrong3);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula2.right);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula2.wrong4);
                
               
        }
        else if (randomFormula == 2) { 
               bubble_text_01.setText(level_2_data.chemical_formulas.formula2.wrong5);
               bubble_text_02.setText(level_2_data.chemical_formulas.formula2.wrong6);
               bubble_text_03.setText(level_2_data.chemical_formulas.formula2.right);
           } 
      }
//////////////////////////////////////////////////////////////////////////////////////////
       if (current_round == 2) {
         chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula3.name);

           if (randomFormula == 0) { 
               bubble_text_01.setText(level_2_data.chemical_formulas.formula3.right);
               bubble_text_02.setText(level_2_data.chemical_formulas.formula3.wrong1);
               bubble_text_03.setText(level_2_data.chemical_formulas.formula3.wrong2);
           }
        else if (randomFormula == 1) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula3.wrong3);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula3.right);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula3.wrong4);
        }
        else if (randomFormula == 2) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula3.wrong5);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula3.wrong6);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula3.right);2
        }
    }
 
////////////////////////////////////////////////////////////////////////////////////////      
    if (current_round == 3) {
        chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula4.name);

        if (randomFormula == 0) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula4.right);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula4.wrong1);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula4.wrong2);
        }
        else if (randomFormula == 1) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula4.wrong3);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula4.right);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula4.wrong4);
        }
        else if (randomFormula == 2) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula4.wrong5);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula4.wrong6);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula4.right);
        } 
    }
 
//////////////////////////////////////////////////////////////////////////////////////        
    if (current_round == 4) {
         
        chemical_formula_text_display.setText(level_2_data.chemical_formulas.formula5.name);

        if (randomFormula == 0) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula5.right);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula5.wrong1);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula5.wrong2);
        }
        else if (randomFormula == 1) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula5.wrong3);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula5.right);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula5.wrong4);
        }
        else if (randomFormula == 2) { 
            bubble_text_01.setText(level_2_data.chemical_formulas.formula5.wrong5);
            bubble_text_02.setText(level_2_data.chemical_formulas.formula5.wrong6);
            bubble_text_03.setText(level_2_data.chemical_formulas.formula5.right);
        } 
            //Adjusting Instruction label for Chemical Names 
            chemical_formula_text_display.anchor.setTo(-0.1, 0);
            chemical_formula_text_display.addColor("White", 0);
            chemical_formula_text_display.fontSize = 50;
            
    }
// Closes method        
}
    

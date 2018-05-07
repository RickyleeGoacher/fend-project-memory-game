/*
 * Create a list that holds all of your cards
 */
const cards = ["fas fa-pound-sign", "fas fa-pound-sign", "fas fa-dollar-sign", "fas fa-dollar-sign", "fas fa-euro-sign", "fas fa-euro-sign", "fas fa-yen-sign", "fas fa-yen-sign", "fas fa-ruble-sign", "fas fa-ruble-sign", "fas fa-rupee-sign", "fas fa-rupee-sign", "fas fa-shekel-sign", "fas fa-shekel-sign", "fas fa-won-sign", "fas fa-won-sign"];
let openCards = []; //Array for open cards

const $deckSelector = document.querySelector('.deck'); //Selects the deck class
const cardSelector = document.getElementsByClassName('card'); //Selects the cards
const shown = document.getElementsByClassName('show'); //Selects card with the class show
const moveSelector = document.querySelector('.moves'); //Selects the moves class

let moves = 0; //Number of moves made
let matched = 0; //Number of cards matched

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function initGame (){

	let card = shuffle(cards); //Shuffles cards

    createDeck(card); //Calls create deck function

	}

// Function to generate cards and append the class card to the generate list items
const createDeck = function (card){

    const deckLength = card.length; //Get card array length for card gen

        //iterate over the array and call genCard
        for (let i = 0; i < deckLength; i++) {

            //Imediately invoked generate deck function to create elements and appned classes   
            const genDeck = (function (){
    
                //Create elements
                let newCard = document.createElement('li');
                const cardIcon = document.createElement('i');

                // Give <li> class of card
                newCard.classList.add('card');

                // Update the new <li> to the deck <ul>
                $deckSelector.appendChild(newCard);

                //Append the card icon to the new card element
                newCard.appendChild(cardIcon);

                //Add the class fas and itterate over the card array to append card classes
                cardIcon.setAttribute("class", card[i]);

                //Add event listeners open and show to the cards when clicked
                newCard.addEventListener('click', clickEvent);

                function clickEvent(){
                    newCard.classList.add('open'); //Add class open
                    newCard.classList.add('show'); //Add class show
                    openCards.push(card[i]); //Pushes card into the openCards array
                    checkCards(newCard); //Calls a function to check cards  
                    }


        })();
        
    }
};

//Function to check cards for how many have been flipped and whether or not they match 

let checkCards = function (newCard){
    //Check how many cards are open and if they match
    if(openCards.length === 2 && openCards[0] !== openCards[1] ){
        setTimeout(cardFlipBack, 700); // if the cards are not the same call flipBack function
    } else if (openCards[0] === openCards[1]){
        matchCards(newCard); //if the cards do match call the matchCards function
    }   
};

// Flip the cards back over if there is two and they don't match

function cardFlipBack (){
//Loop over the cards and remove the open and show classes  
for(let i = 0; i < cardSelector.length; i++) { 
  cardSelector[i].classList.remove('open', 'show');
}
openCards = []; //Set open cards back to empty
moves++ //Increment move number
displayMoves(); //Display new move number
}

//If the cards match
function matchCards (){
    //Loop through the cards with the class shown and add the class match
for(let i = 0; i < shown.length; i++) { 
  shown[i].classList.add('match');
}
openCards = []; //Reset openCards
moves++ //Increment moves
matched++ //Increment number of matched found
displayMoves(); //Display new move number
}

//Display number of moves 

const displayMoves = function (){
    moveSelector.innerHTML = moves;
};
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
document.addEventListener("DOMContentLoaded", function(){
  initGame(); //Initiialise game
});

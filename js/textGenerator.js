var input = document.querySelector('#coldInput');
var output = document.querySelector('#coldOutput');
var queue = new Deque();
var wordQueue = new Deque();

// Add starting text to the queue
var startingText = 'Cold Type Practice';
queue.enqueue(startingText.split(''));
wordQueue.enqueue(startingText.split(' '));


/* Event listener for input*/
input.addEventListener('input', function() {
  var inputChar = input.value;
  input.value = '';
  
  // detect if we want a word
  if (type == 'word' || type == 'longWord') var word = true;
  
  // if they got it right
  if (inputChar === queue.peek()) {
    // remove the first item
    popQueues();
    
    // add the new stuff if applicable
    if (queue.peek() === ' ') {
      popQueues(word);
      appendQueues(getRandom(type, capitalization), word);
    } 
    
    if (word !== true) {
      appendQueues(getRandom(type, capitalization));
    }
  }
  // reset to the previous word if applicable
  else if (functionalities['reset'] == true && word === true) {
    // pop queues until " "
    var resetted = output.textContent.substr(output.textContent.indexOf(" ")); 
    while (!queue.isEmpty()) {
      queue.dequeue(true);
    }
    
    // if there was a space, pop it and move on
    if (wordQueue.peek() === "") wordQueue.dequeue();
   
    // add the previous word to the rest of the words
    queue.enqueue((wordQueue.peek() + resetted).split(''));
    output.textContent = wordQueue.peek() + resetted;
  }
});

/* Remove stuff from queues. Will remove from word queue if provided */
function popQueues(word) {
  output.textContent = output.textContent.substr(1);
  queue.dequeue();
  
  if (word === true) {
    wordQueue.dequeue();
  }
}

/* Append text given to queues. Adds spacing after a word if specified.*/
function appendQueues(text, word) {
  output.textContent += text;
  queue.enqueue(text.split(''));
  
  if (word === true) {
    output.textContent += ' '
    queue.enqueue(' ');
    wordQueue.enqueue(text.split(' '));
  }
}

/*  Settings Functionality  */
// Set default type and create function to change type
var type = 'keyboardCharacters';
function changeType(typeRadio) {
  type = typeRadio.value;
  resetToType();
}

// Set default capitalization and create function to change capitalization
var capitalization = 'random';
function changeCapitalization(capitalizationRadio) {
  capitalization = capitalizationRadio.value;
  resetToType();
}

// change the functionality of the typing completion
var functionalities = {'reset': false}
function changeFunctionality(functionalityCheckbox) {
  functionalities['reset'] = true;
}


/*  Word Generation Functions  */
/* Resets the page text to a certain type */
function resetToType() {
  var newText = getRandom(type, capitalization);
  
  var delimeter = ''
  if (type == 'word' || type == 'longWord') delimeter = ' ' 
  // Keep adding words until you get to 18 characters
  while (newText.length < 18) {
        newText += delimeter+ getRandom(type, capitalization);
  }
  
  if (type == 'word' || type == 'longWord') newText += ' ';
  
  queue = new Deque();
  wordQueue = new Deque();
  wordQueue.enqueue(newText.split(' '));
  queue.enqueue(newText.split(''));
  output.textContent = newText;
}

/* Gets a random string depending on the type and capitalization provided
 *
 * If the type argument is provided, returns the specified type of string. Valid types are below:
 *    "longWord": Returns a long word
 *    "word": Returns a regular word   
 *    "alphabet": Returns a random alphabet character
 *    Default: Returns a random keyboard character
 * 
 * If the capitalization argument is provided, returns the string with the specified capitalization
 * transformation. Valid capitalization transformations are below:
 *    "lowercase" - doesn't change characters
 *    "title" - Capitalizes first letter of each word
 *    Default: randomly changes characters to uppercase
 */
function getRandom(type, capitalization) {
  var nextText = '';
  if (type === 'longWord') nextText = getRandomWord(true);
  else if (type === 'word') nextText = getRandomWord();
  else if (type === 'alphabet') nextText = getRandomChar(true); 
  else nextText = getRandomChar();
  
  var result = nextText.capitalize(capitalization);
  return result;
}

/* Gets a single random character.
 *
 * If the alphabet argument is provided, always returns a letter
 */
function getRandomChar(alphabet) {
  // randomly choose between letters and symbols w/ alphabet argument overriding choice to letters
  var randomChoice = Math.round(Math.random()) == 0;
  if (alphabet !== undefined) randomChoice = 0;
  
  
  var letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
  var symbols = ['~','!','1','@','2','#','3','$','4','%','5','^','6','&','7','*','8','(','9',')',
                 '0','_','-','+','=',';',':','\'','"',',','<','.','>','/','?'];
  
  // randomly choose a character and return it
  var choice = (randomChoice == 0 ? letters : symbols);
  var index = Math.floor(Math.random() * (choice.length - 1));
  return choice[index];
}

/* Gets a random word from a list.
 *
 * If the longWord bool argument is provided, returns a long word.
 */
function getRandomWord(longWord) {
  // randomly choose between letters and symbols w/ alphabet argument overriding choice to letters
  var source = words;
  if (longWord !== undefined) source = longWords;
  
  var index = Math.floor(Math.random() * source.length - 1);
  return source[index];
}

/* Capitalizes certain characters depending on capitalizationType:
 *    "lowercase" - doesn't change characters
 *    "title" - Capitalizes first letter of each word
 *    Default: randomly changes characters to uppercase
 */
String.prototype.capitalize = function (capitalizationType) {
  // if title
  if (capitalizationType == 'title') return (this.charAt(0).toUpperCase() + this.substring(1));
  // if lowercase
  else if (capitalizationType == 'lowercase') return this.toLowerCase();
  // if capitalization type is random
  else {
    // split string into array of characters and randomly convert to uppercase
    var stringBuilder = this.split('');
    for (var i = 0; i < stringBuilder.length; i++) {
      if (Math.round(Math.random()) == 0) stringBuilder[i] = stringBuilder[i].toUpperCase();
    }
    
    var endResult = stringBuilder.join('');
    return endResult;
  }
};

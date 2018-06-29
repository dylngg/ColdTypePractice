var input = document.querySelector('#coldInput');
var output = document.querySelector('#coldOutput');
var queue = new Queue();

// Add starting text to the queue
var startingText = 'Cold Type Practice';
queue.enqueue(startingText.split(''));

var type = 'keyboardCharacters';
function changeType(typeRadio) {
  type = typeRadio.value;
  resetToType();
}
var capitalization = 'random';
function changeCapitalization(capitalizationRadio) {
  capitalization = capitalizationRadio.value;
  resetToType();
}

// Add event listener for when input is changed
input.addEventListener('input', function() {
  // reset input to nothing and update queue
  var inputChar = input.value;
  input.value = '';
  
  if (inputChar === queue.peek()) {
    var newText = getRandom(type, capitalization);
    // remove the character from output and queue
    output.textContent = output.textContent.substr(1);
    queue.dequeue();
    
    // automatically add a character if not a word type
    if (type != 'word' && type != 'longWord') {
      // add a new character to output and queue
      output.textContent += newText;
      queue.enqueue(newText);
    }
    
    // check for spaces next
    if (queue.peek() == ' ') {
      // remove all spaces so the user doesn't have to type them
      output.textContent = output.textContent.substr(1);
      queue.dequeue();
     
      // if we are a word, add another word with a space at the end
      if (type == 'word' || type == 'longWord') {
        output.textContent += newText + ' ';
        queue.enqueue(newText.split(''));
        queue.enqueue(' ');
      }
    }
  }
});

function resetToType() {
  var newText = getRandom(type, capitalization);
  while (newText.length < 18) {
     if (type == 'word' || type == 'longWord') {
        newText += ' ' + (getRandom(type, capitalization));
      } else {
        newText += getRandom(type, capitalization);
      }
  }
  
  if (type == 'word' || type == 'longWord') newText += ' ';
  
  queue = new Queue();
  queue.enqueue(newText.split(''));
  output.textContent = newText;
}

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
  var symbols = ['~','!','1','@','2','#','3','$','4','%','5','^','6','&','7','*','8','(','9',')','0','_','-','+','=',';',':','\'','"',',','<','.','>','/','?'];
  
  // randomly choose a character and return it
  var choice = (randomChoice == 0 ? letters : symbols);
  var index = Math.floor(Math.random() * (choice.length - 1));
  return choice[index];
}

function getRandomWord(uncommon) {
  // randomly choose between letters and symbols w/ alphabet argument overriding choice to letters
  var source = words;
  if (uncommon !== undefined) source = longWords;
  
  var index = Math.floor(Math.random() * source.length - 1);
  return source[index];
}

/* Capitalizes certain characters depending on capitalizationType:
 * 
 * "lowercase" - doesn't change characters
 * "title" - Capitalizes first letter of each word
 * Default: randomly changes characters to uppercase
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

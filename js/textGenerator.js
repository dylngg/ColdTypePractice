var randomChars = ['~','!','1','@','2','#','3','$','4','%','5','^','6','&','7','*','8','(','9',')','0','_','-','+','=','q','Q','w','W','e','E','r','R','t','T','y','Y','u','U','i','I','o','O','p','P','a','A','s','S','d','D','f','F','g','G','h','H','j','J','k','K','l','L',';',':','\'','"','z','Z','x','X','c','C','v','V','b','B','n','N','m','M',',','<','.','>','/','?']
var input = document.querySelector('#coldInput');
var output = document.querySelector('#coldOutput');
var queue = new Queue();

var startingText = "Cold Type Practice";
for (var i = 0; i < startingText.length; i++) {
  queue.enqueue(startingText[i]);
}
console.log('Queue is', queue);

getRandomChar();

input.addEventListener('input', function() {
  console.log(input.value, ' was entered');
  var inputChar = input.value;
  input.value = '';
  if (inputChar === queue.peek()) {
    var newChar = getRandomChar();
    // update the queue
    queue.dequeue();
    queue.enqueue(newChar);

    // update the page
    output.textContent = output.textContent.substr(1);
    output.textContent += newChar;
  }
  console.log('Updated the text. It is ', output.textContent);
});

function getRandomChar() {
  var index = Math.floor(Math.random() * (randomChars.length - 1));
  return randomChars[index];
}


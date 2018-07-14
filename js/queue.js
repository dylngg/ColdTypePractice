/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
function Deque() {

  // initialise the queue and offset
  var queue  = [];
  var offset = 0;

  // Returns the length of the queue.
  this.getLength = function() {
    return (queue.length);
  }

  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function() {
    return (queue.length == 0);
  }

  /* Enqueues the specified items. The parameter is:
   *
   * items - the items to enqueue
   */
  this.enqueue = function(items) {
    queue = queue.concat(items);
  }

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function() {
    queue.shift();
  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function() {
    return (queue.length > 0 ? queue[0] : undefined);
  }
  
  /* Pushes an item to the top of the queue, much like a stack.
   */
  
  this.viewQueue = function() {
    var view = ""
    for (var i = 0; i < queue.length; i++) {
      view += queue[i]
    }
    return view 
  }
}

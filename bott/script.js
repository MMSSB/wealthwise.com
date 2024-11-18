// Function to show the message
function showMessage() {
  var messageElement = document.getElementById('message');
  messageElement.classList.remove('hidden');
  messageElement.classList.add('visible');

  // Set a timeout to hide the message after 3 seconds
  setTimeout(function() {
    messageElement.classList.remove('visible');
    messageElement.classList.add('hidden');
  }, 4000); // 4000 milliseconds = 4 seconds
}

// Call the function to show the message
showMessage();

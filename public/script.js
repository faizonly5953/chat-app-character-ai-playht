const socket = io();

const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;

// Dark mode toggle
darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark-mode');
}

// Send message function
function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    socket.emit("message", message);
    appendMessage("You", message);
    chatInput.value = "";
  }
}

// Event listeners for sending messages
sendButton.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Receive message from server
socket.on("response", (message) => {
  appendMessage("AI", message);
});

// Append message to chat box
function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender.toLowerCase());
    
    const senderElement = document.createElement("strong");
    senderElement.textContent = sender + ": ";
    
    const textElement = document.createElement("span");
    textElement.textContent = message;
    
    messageElement.appendChild(senderElement);
    messageElement.appendChild(textElement);
    
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  
    // Add audio generation button if the sender is AI
    if (sender.toLowerCase() === "ai") {
      const generateAudioButton = document.createElement("button");
      generateAudioButton.textContent = "Generate Audio";
      generateAudioButton.classList.add("generate-audio-button");
      generateAudioButton.addEventListener("click", () => generateAudio(message));
      messageElement.appendChild(generateAudioButton);
    }
  }
  
// Typing indicator
let typingTimer;
chatInput.addEventListener("input", () => {
  socket.emit("typing", true);
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    socket.emit("typing", false);
  }, 1000);
});

// Display typing indicator
socket.on("userTyping", (isTyping) => {
  const typingIndicator = document.getElementById("typing-indicator");
  typingIndicator.style.display = isTyping ? "block" : "none";
});

// Reconnection handling
socket.on("connect", () => {
  console.log("Connected to server");
  appendMessage("System", "Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
  appendMessage("System", "Disconnected from server. Trying to reconnect...");
});

// Error handling
socket.on("connect_error", (error) => {
  console.error("Connection error:", error);
  appendMessage("System", "Error connecting to server. Please try again later.");
});

// Function to generate audio
function generateAudio(text) {
  socket.emit("generateAudio", text);
}

// Receive audio file path from server
socket.on("audio", (filePath) => {
  const audioElement = document.createElement("audio");
  audioElement.controls = true;
  audioElement.src = filePath;

  const audioContainer = document.getElementById("audio-container");
  audioContainer.innerHTML = "";
  audioContainer.appendChild(audioElement);
});

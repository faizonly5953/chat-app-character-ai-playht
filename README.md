# ARCHIVE BECAUSE OLD.CHARACTER.AI AS BASE AI MODEL DOESNT WORK ANYMORE (HAS BEEN SHUTDOWN)

# Chat App with Character.ai and PlayHT

This project is a chat application that integrates Character.ai's unofficial API for generating AI responses and PlayHT for converting those responses into audio files. It is built using Node.js, HTML, CSS, and JavaScript.

## Features

- Real-time chat with AI using Character.ai
- Generate and play audio from AI responses using PlayHT
- Dark mode support
- Responsive design

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (>= 14.x)
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/faizonly5953/chat-app-character-ai-playht.git
   cd chat-app-character-ai-playht
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your API keys:**

   - Change The All API Key From `server.js`
     
   - **How To Get C.AI Token**
   See This Python Docs : [CLICK HERE](https://docs.kram.cat/auth.html)

   OR

   ### On PC:
    Open the Character.AI website in your browser (https://old.character.ai)
    Open the developer tools (<kbd>F12</kbd>, <kbd>Ctrl+Shift+I</kbd>, or <kbd>Cmd+J</kbd>)
    Go to the `Application` tab
    Go to the `Storage` section and click on `Local Storage`
    Look for the `char_token` key
    Open the object, right click on value and copy your session token.

   ![Session_Token](https://github.com/realcoloride/node_characterai/assets/108619637/1d46db04-0744-42d2-a6d7-35152b967a82)

     ```bash
     CHARACTER_AI_TOKEN=your_character_ai_token
     PLAYHT_API_KEY=your_playht_api_key
     PLAYHT_USER_ID=your_playht_user_id
     ```

5. **Change Character ID**
  - In `server.js` in `line 35`, change character id from Character Ai as You Like
    ```bash
    const characterId = "your_character_id";
    ```
   ![Character_ID](https://i.imgur.com/nd86fN4.png)


4. **Run the server:**

   ```bash
   npm start
   ```

   The application will be running at `http://localhost:3000`.

### Usage

1. **Open the application in your browser:**

   Navigate to `http://localhost:3000`.

2. **Chat with the AI:**

   Type your messages in the input field and click "Send" or press "Enter" to send them.

3. **Generate audio:**

   After receiving a response from the AI, a "Generate Audio" button will appear below the AI's message. Click this button to convert the response into an audio file.

4. **Listen to the audio:**

   The audio file will be automatically appended below the chat box, where you can play it.

#### Overview
![image](https://github.com/user-attachments/assets/0f286d1a-737f-4eb5-81b7-da901d5bf846)



### Project Structure

- `public/` - Contains static files such as HTML, CSS, and JavaScript.
- `server.js` - The Node.js server file for handling chat and audio generation.
- `index.html` - Interface Of the ChatApp
- `styles.css` - Styles for the chat application.
- `scripts.js` - JavaScript for handling chat interactions and audio generation.

### Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

### To-do list
- Connecting ChatApp with image generation (Stable Diffusion)
- Create a function where for every conversation, AI will generate an 'Emotion' image of its own face
- Make More Responsive WebUI
- Make A Detection Emotion for every audio conversation
- I Think create a deepfake so that AI from the image generation results, to combine audio and image generation, create an AI representation via Video source (but that is if I already have enough logic to make it 💀 ) 


### Thanks To

- [realcoloride](https://github.com/realcoloride/node_characterai) for Unofficial API
- [Character.ai](https://character.ai)
- [PlayHT](https://play.ht) for their text-to-speech service.
- [Node.js](https://nodejs.org) for the runtime environment.
- [Socket.io](https://socket.io) for real-time communication.
- [kramcat](https://github.com/kramcat/CharacterAI) for Authorization
- [Claude.Ai](https://claude.ai/) For Base Design
- [ChatGPT](https://chatgpt.com/) For Base Code Generation

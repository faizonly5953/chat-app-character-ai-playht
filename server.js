const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const CharacterAI = require("node_characterai");
const fs = require("fs");
const PlayHT = require("playht");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const characterAI = new CharacterAI();

// Initialize PlayHT API with your credentials
PlayHT.init({
  apiKey: 'your_api_key',
  userId: 'your_api_key',
});

// Configure streaming options
const streamingOptions = {
  voiceEngine: 'PlayHT2.0-turbo',
  voiceId: 's3://voice-cloning-zero-shot/a926dcdb-d614-4966-998a-9bd1f9d21eaa/original/manifest.json', //example voice
  sampleRate: 44100,
  outputFormat: 'mp3',
  speed: 0.8,
};

app.use(express.static("public"));

(async () => {
  try {
    await characterAI.authenticateWithToken("your_user_token");

    const characterId = "your_character_token";
    const chat = await characterAI.createOrContinueChat(characterId);

    io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("message", async (msg) => {
        try {
          const response = await chat.sendAndAwaitResponse(msg, true);
          socket.emit("response", response.text);
        } catch (error) {
          console.error("Error in sending message:", error);
          socket.emit("response", "An error occurred while processing your message.");
        }
      });

      socket.on("generateAudio", async (text) => {
        try {
          // Start streaming
          const stream = await PlayHT.stream(text, streamingOptions);

          // Create a writable stream to save the MP3 file
          const filePath = `public/output_${Date.now()}.mp3`;
          const fileStream = fs.createWriteStream(filePath);

          stream.on('data', (chunk) => {
            fileStream.write(chunk);
          });

          stream.on('end', () => {
            fileStream.end();
            console.log(`File MP3 berhasil disimpan sebagai ${filePath}`);
            socket.emit("audio", filePath.replace("public/", ""));
          });

          stream.on('error', (error) => {
            console.error('Terjadi kesalahan saat menulis ke file:', error);
            socket.emit("audio", "An error occurred while generating the audio.");
          });

        } catch (audioError) {
          console.error("Error in generating audio:", audioError);
          socket.emit("audio", "An error occurred while generating the audio.");
        }
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });

    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error in initialization:", error);
  }
})();

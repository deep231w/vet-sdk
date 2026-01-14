# Quick Start
Prerequisites

Node.js (v18 or higher)
MongoDB (local or cloud instance)
Google Gemini API key (Get it here)

Backend Setup
bash# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your credentials
nano .env

# Start the server
npm run dev
Frontend Setup
bash# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start development server
npm run dev


# Environment Configuration

Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vet-chatbot
GEMINI_API_KEY=your_gemini_api_key_here
FRONTEND_URL=http://localhost:5173
NODE_ENV=development

Frontend (.env)

VITE_API_URL=http://localhost:5000/api

## INSTRUSCTION TO BOOK AN APPOINTMENT
 First you need to send some keword booking related that keword includes - 
    ['appointment', 'schedule', 'book', 'visit', 'consultation', 'see a vet', 'meet']

 and after detect one of these keyword it will start asking few questions those questiones are -
    1-Sure! Let's book an appointment 🐾\nWhat is the pet owner's name?
    2-Great! What's your pet's name?
    3-Please share your phone number 📞
    4-When would you like to visit? (date & time)

 Then  after booked the message will recieve -
    Your appointment has been booked! Our team will contact you shortly
 This means the Appointment has been booked successfully .

## EXAMPLE SETUP

<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Vet Chatbot Test</title>
        
    </head>
    <body>
        <div class="content">
        <h1>🐾 My Veterinary Clinic Website</h1>
        <p>Welcome to our clinic! We provide comprehensive care for your beloved pets.</p>
        <p>The chatbot should appear in the bottom-right corner. Try asking questions about pet care or booking an appointment!</p>
        </div>

        <div class="content">
        <h2>Our Services</h2>
        <ul>
            <li>General Health Checkups</li>
            <li>Vaccinations</li>
            <li>Emergency Care</li>
            <li>Dental Care</li>
            <li>Surgery</li>
        </ul>
        </div>
        
        <!-- Load Chatbot SDK -->
        <script src="https://vet-sdk.vercel.app/chatbot-loader.js"></script>
    </body>
</html>


## Chat UI

![Chat UI Screenshot](screenshots/chat-ui.png)

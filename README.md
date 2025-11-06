# Gemini AI Assistant

A beautiful, modern chatbot website powered by Google Gemini AI. No login required - your chat history is saved locally in your browser.

## ✨ Features

- 🤖 **Gemini AI Integration** - Choose between Gemini 2.0 Flash and 2.5 Pro models
- 💾 **Local Storage** - Chat history is saved automatically in your browser
- 🎨 **Modern Minimalist UI** - Clean, responsive design with smooth animations
- 🌓 **Dark/Light Mode** - Toggle between themes or use system preference
- 📱 **Mobile Responsive** - Works perfectly on desktop and mobile devices
- 📤 **Export Conversations** - Download your chats as Markdown or JSON
- 💬 **Full Chat Features** - Markdown support, code syntax highlighting, copy messages
- ⚡ **Fast & Secure** - Built with Next.js 16 and TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/billynabil-gemini-ai-free-llm.git
   cd billynabil-gemini-ai-free-llm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.local.example` to `.env.local` (or create the file)
   - Add your Gemini API key:
   ```env
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Get your Gemini API key**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy it to your `.env.local` file

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

1. **Start a new chat** - Click "New Chat" or just start typing
2. **Choose your model** - Select between Flash (fast) or Pro (advanced)
3. **Send messages** - Type your question and press Enter
4. **View history** - All conversations are saved in the sidebar
5. **Export chats** - Download individual conversations anytime
6. **Toggle themes** - Use the theme button for light/dark mode

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/chat/          # Gemini API route
│   ├── components/        # React components
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── ChatSidebar.tsx
│   │   ├── ModelSelector.tsx
│   │   └── ThemeToggle.tsx
│   ├── lib/               # Utilities and types
│   │   ├── storage.ts     # localStorage helpers
│   │   └── types.ts       # TypeScript definitions
│   ├── utils/             # Helper functions
│   │   └── export.ts      # Chat export functionality
│   ├── page.tsx           # Main chat interface
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **AI Integration**: Google Generative AI (Gemini)
- **Markdown**: React Markdown, Syntax Highlighting
- **Icons**: Lucide React

## 📱 Features in Detail

### Chat Interface
- Real-time streaming responses
- Markdown rendering with syntax highlighting
- Code blocks with copy functionality
- Message timestamps
- Typing indicators
- Auto-scroll to latest messages

### Chat Management
- Automatic chat title generation
- Persistent chat history in localStorage
- Delete individual chats
- Export conversations (Markdown/JSON)
- Search and filter chat history

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Keyboard shortcuts (Enter to send, Shift+Enter for new line)
- Dark/light theme toggle
- Clean, minimalist interface

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### Available Models

- **Gemini 2.0 Flash** (`gemini-2.0-flash-exp`) - Fast and efficient responses
- **Gemini 2.5 Pro** (`gemini-2.5-pro`) - Advanced reasoning and analysis

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🆘 Support

If you encounter any issues:

1. Check that your Gemini API key is correctly set
2. Ensure you have a stable internet connection
3. Try refreshing the page
4. Check the browser console for any errors

## 📊 Privacy

- No user accounts or login required
- All chat data is stored locally in your browser
- No data is sent to any third-party servers except Google's Gemini API
- Your conversations are private and secure

---

**Built with ❤️ using Next.js and Google Gemini AI**

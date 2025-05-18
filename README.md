# ParaDoc

## A Parallel Reality Simulation for Medical Decision-Making

ParaDoc is an innovative healthcare application that simulates multiple "what-if" futures based on your current health choices. Like exploring a multiverse of preventative care, ParaDoc helps users visualize potential outcomes of different medical decisions.

<!-- ![ParaDoc Banner](https://placeholder-for-banner-image.com) -->

## 🧠 The Concept

Think of ParaDoc as answering questions like:
- "What would happen if I ignore this pain for 2 weeks?"
- "What if I go to the clinic today?" 
- "Should I try home remedies or seek medical attention?"

By leveraging advanced AI, ParaDoc creates parallel timelines showing the potential progression of symptoms and outcomes, helping you make more informed healthcare decisions today.

## 🔍 Features

### 🔀 Multi-Path Simulator
- AI-powered generation of three possible outcome paths based on your symptoms
- See what might happen if you do nothing, seek medical attention, or self-medicate

### 📊 Timeline Visualizer
- Day 1 → Day 7 outcome visualization for each decision path
- Track the progression of symptoms and consequences over time

### 🧠 Risk & Recovery Assessment
- Each decision path is rated with risk percentage and recovery percentage
- Visual indicators help quickly identify the safest options

### 🗣 Explainer Bot
- Detailed explanations of why certain paths are better than others
- Evidence-based reasoning like "Because untreated infection often worsens within 72 hours..."

### 🖼️ Visual Health Representations
- AI-generated medical illustrations showing the progression of symptoms
- Visual storytelling to help understand potential health outcomes

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/aliasgarsogiawala/ParaDoc-dreamhacks.git

# Navigate to the project directory
cd ParaDoc-dreamhacks

# Install dependencies
ppnpm install

# Set up environment variables
cp .env.example .env.local
# Add your Google Gemini API key to .env.local

# Run the development server
ppnpm run dev
```

Visit `http://localhost:3000` to start using ParaDoc.

## 📋 How to Use

1. **Enter your symptoms** - Describe what you're experiencing as specifically as possible
2. **Select a symptom category** (optional) - This helps the AI provide more accurate simulations
3. **Review the timelines** - See how your symptoms might progress under different scenarios
4. **Examine risk scores** - Higher scores mean greater potential health risks
5. **Follow the recommendation** - ParaDoc will suggest the safest course of action

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Framer Motion
- **AI Engine**: Google Gemini with prompt chains for multi-path generation
- **Timeline**: Custom React components for timeline visualization
- **Risk Logic**: AI-based scoring model using symptom severity and progression

## 🚀 Future Enhancements

### 💬 Persistent Chat History
- Save conversation history between sessions
- Review past symptoms and timeline simulations
- Track health changes over time with historical context

### 🤖 Multiple AI Model Options
- Switch between different AI models (Gemini, GPT-4, Claude)
- Compare simulations across different AI perspectives
- Choose models optimized for specific medical domains or conditions

### 🎨 Comic-Style Symptom Visualizations
- Sequential comic panels showing symptom progression
- Visual storytelling with expressive character illustrations
- Day-by-day visual representation of each timeline path
- Educational, non-graphic representations of medical concepts

### 📱 Mobile App Version
- Native mobile experience for iOS and Android
- Offline mode for viewing saved simulations
- Push notifications for follow-up reminders

## ⚠️ Important Disclaimer

ParaDoc is a simulation tool designed for educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.


## 🙏 Acknowledgments

- Google Gemini for powering the AI simulations
- Medical advisors who provided guidance on symptom progression accuracy
- DreamHacks for inspiring this healthcare innovation


---

*ParaDoc shows you alternate health futures — because the best way to make decisions today is to see the consequences of tomorrow.*

### Made with ❤️ by Aliasgar , Bhadra and Kavya

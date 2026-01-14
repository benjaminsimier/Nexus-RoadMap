# Nexus Roadmap

A dynamic, interactive product roadmap system.

## How to run locally

1. **Install Dependencies** (Ensure you have Node.js installed):
   ```bash
   npm install
   ```

2. **Set your API Key**:
   Create a `.env` file in the root directory or set an environment variable:
   ```bash
   # In your terminal
   export API_KEY=your_gemini_api_key_here
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Visit the URL shown in your terminal (usually `http://localhost:5173`).

## Project Features
- **List View (Default)**: Clean, tabular overview of all features.
- **Kanban Board**: Drag-and-drop style visualization of progress.
- **Filtering**: Filter by Status, Category, and Date.
- **Search**: Instant search across titles and descriptions.
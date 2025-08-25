import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Lessons from "./components/Lessons";
import Converter from "./components/Converter";
import Exercises from "./components/Exercises";
import AIChatbot from "./components/AIChatbot";

export type Page = "lessons" | "converter" | "exercises" | "chatbot";

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>("lessons");

  const renderPage = () => {
    switch (activePage) {
      case "lessons":
        return <Lessons />;
      case "converter":
        return <Converter />;
      case "exercises":
        return <Exercises />;
      case "chatbot":
        return <AIChatbot />;
      default:
        return <Lessons />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 sm:mb-0">
            <svg
              className="w-8 h-8 text-cyan-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <h1 className="text-2xl font-bold text-white">chmod Trainer</h1>
          </div>
          <Navbar activePage={activePage} setActivePage={setActivePage} />
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
      <footer className="bg-gray-800 text-center py-4 mt-8">
        <p className="text-gray-400 text-sm">
          สร้างสรรค์เพื่อการเรียนรู้คำสั่ง chmod โดย Kamthorn Sarawan X Gemini
        </p>
      </footer>
    </div>
  );
};

export default App;

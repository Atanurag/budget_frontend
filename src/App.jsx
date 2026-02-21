import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [voucherTime, setVoucherTime] = useState(86400);
  const [answers, setAnswers] = useState({});
  const [toast, setToast] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const [uniqueId] = useState("ID" + Math.floor(Math.random() * 999999));

  const couponCode = "TECH-SCHOLAR-50";

  const quizzes = {
    "Computer Basics": [
      { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Power Unit", "Control Panel Unit"], correct: 0 },
      { q: "Which is an input device?", options: ["Monitor", "Keyboard", "Speaker"], correct: 1 },
      { q: "Which software is used for typing?", options: ["MS Word", "Chrome", "Paint"], correct: 0 }
    ],
    "MS Office + Tally": [
      { q: "Excel is used for?", options: ["Editing photos", "Spreadsheets", "Video editing"], correct: 1 },
      { q: "Tally is used for?", options: ["Accounting", "Gaming", "Coding"], correct: 0 },
      { q: "Shortcut to Save?", options: ["Ctrl + S", "Ctrl + X", "Ctrl + P"], correct: 0 }
    ],
    "Software Engineering + Data Science": [
      { q: "React is a?", options: ["Library", "Database", "OS"], correct: 0 },
      { q: "Python is used in?", options: ["Data Science", "Cooking", "Driving"], correct: 0 },
      { q: "Git is used for?", options: ["Version Control", "Editing Video", "Design"], correct: 0 }
    ]
  };

  useEffect(() => {
    if (screen === "quiz" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && screen === "quiz") checkResult();
  }, [timeLeft, screen]);

  useEffect(() => {
    if (screen === "result") {
      const interval = setInterval(() => {
        setVoucherTime(prev => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [screen]);

  const startQuiz = (course) => {
    setSelectedCourse(course);
    setAnswers({});
    setAttempts(0);
    setErrorMsg("");
    setTimeLeft(60);
    setScreen("quiz");
  };

  const checkResult = () => {
    const quiz = quizzes[selectedCourse];

    if (Object.keys(answers).length !== quiz.length) {
      setErrorMsg("Please answer all questions.");
      return;
    }

    const correct = quiz.every((item, index) => answers[index] === item.correct);

    if (correct) {
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 }
      });
      setScreen("result");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 3) {
        alert("Maximum attempts reached.");
        setScreen("home");
      } else {
        setErrorMsg(`Wrong answers. Attempts left: ${3 - newAttempts}`);
        setAnswers({});
      }
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <div className="app">

      {/* HOME */}
      {screen === "home" && (
        <div className="centerScreen">
          <h1 className="mainTitle">Unlock Your Tech Scholarship</h1>

          <div className="card blue" onClick={() => startQuiz("Computer Basics")}>
            💻 Computer Basics
          </div>

          <div className="card purple" onClick={() => startQuiz("MS Office + Tally")}>
            📊 MS Office + Tally
          </div>

          <div className="card gradient" onClick={() => startQuiz("Software Engineering + Data Science")}>
            🚀 Software Engineering + Data Science
          </div>
        </div>
      )}

      {/* QUIZ */}
      {screen === "quiz" && (
        <div>
          <div className="timer">⏳ {timeLeft}s</div>
          <h2>{selectedCourse}</h2>

          {quizzes[selectedCourse].map((item, index) => (
            <div key={index} className="questionBox">
              <p>{item.q}</p>
              {item.options.map((opt, i) => (
                <div
                  key={i}
                  className={`option ${answers[index] === i ? "selected" : ""}`}
                  onClick={() => setAnswers({ ...answers, [index]: i })}
                >
                  {opt}
                </div>
              ))}
            </div>
          ))}

          {errorMsg && <div className="error">{errorMsg}</div>}

          <button className="btnPrimary" onClick={checkResult}>Submit</button>
        </div>
      )}

      {/* RESULT */}
      {screen === "result" && (
        <div className="centerScreen">
          <h1 className="congrats">🎉 Congratulations!</h1>

          <div className="voucher">

            <div className="offerBadge">🔥 LIMITED OFFER</div>

            <h2 className="offerTitle">
              50% OFF on {selectedCourse} with AI
            </h2>

            <div className="validity">
              ⏳ Valid for 24 Hours Only
            </div>

            <div className="countdown pulse">
              {formatTime(voucherTime)}
            </div>

            <div className="couponTicket">
              {couponCode}
            </div>

          </div>

          <button
            className="btnWhatsApp"
            onClick={() =>
              window.open(
                `https://wa.me/917875853859?text=Hi, my ID is ${uniqueId}. Please send me the institute address.`,
                "_blank"
              )
            }
          >
            WhatsApp
          </button>

          <button className="btnSecondary" onClick={copyCode}>
            Copy Code
          </button>

          {toast && <div className="toast">Copied!</div>}
        </div>
      )}

      <div className="footer">Made with ❤️</div>

      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: radial-gradient(circle at top,#1c1c2e,#0f0f1a);
          color: white;
        }

        .app {
          max-width: 420px;
          margin: auto;
          padding: 20px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .centerScreen {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          flex: 1;
        }

        .mainTitle {
          margin-bottom: 30px;
          font-weight: 700;
          font-size: 22px;
        }

        .card {
          width: 100%;
          padding: 18px;
          margin-bottom: 15px;
          border-radius: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.4);
        }

        .card:hover {
          transform: translateY(-4px);
        }

        .blue { background: linear-gradient(135deg,#4facfe,#00f2fe); }
        .purple { background: linear-gradient(135deg,#a18cd1,#fbc2eb); color:black;}
        .gradient { background: linear-gradient(135deg,#ff9966,#ff5e62); }

        .timer { text-align: right; font-weight: bold; color: #ff4d6d; }

        .option {
          background: #1f1f2e;
          padding: 12px;
          border-radius: 12px;
          margin-top: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .option.selected {
          background: #4facfe;
        }

        .btnPrimary, .btnSecondary {
          width: 100%;
          padding: 14px;
          margin-top: 15px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          font-weight: bold;
        }

        .btnPrimary { background: #6c63ff; color: white; }

        .btnWhatsApp {
          width: 100%;
          padding: 15px;
          background: #25d366;
          border-radius: 16px;
          border: none;
          margin-top: 20px;
          font-weight: bold;
          font-size: 16px;
          color: white;
        }

        .voucher {
          position: relative;
          background: linear-gradient(135deg,#ff8a00,#ff0080);
          padding: 28px;
          border-radius: 24px;
          margin: 25px 0;
          text-align: center;
          color: white;
          box-shadow: 0 20px 50px rgba(255,0,128,0.4);
          overflow: hidden;
        }

        .voucher::before {
          content: "";
          position: absolute;
          top: -100%;
          left: -50%;
          width: 200%;
          height: 300%;
          background: linear-gradient(
            120deg,
            rgba(255,255,255,0.1) 0%,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0.1) 100%
          );
          transform: rotate(25deg);
          animation: shine 4s infinite;
        }

        @keyframes shine {
          0% { top: -100%; }
          100% { top: 100%; }
        }

        .offerBadge {
          display: inline-block;
          background: black;
          color: #ff0080;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 12px;
        }

        @keyframes pulseBadge {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        .offerTitle {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
        }

        .validity { font-size: 14px; margin-bottom: 8px; }

        .countdown { font-size: 20px; font-weight: bold; margin-bottom: 15px; }

        .pulse { animation: blink 1s infinite; }

        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        .couponTicket {
          background: white;
          color: #ff0080;
          padding: 14px;
          border-radius: 12px;
          font-weight: bold;
          font-size: 16px;
          position: relative;
          margin-top: 10px;
        }

        .couponTicket::before,
        .couponTicket::after {
          content: "";
          position: absolute;
          top: 50%;
          width: 18px;
          height: 18px;
          background: #ff8a00;
          border-radius: 50%;
          transform: translateY(-50%);
        }

        .couponTicket::before { left: -9px; }
        .couponTicket::after { right: -9px; }

        .error { color: #ff4d6d; margin-top: 10px; }

        .footer {
          text-align: center;
          margin-top: 20px;
          opacity: 0.7;
          font-size: 13px;
        }

        .toast {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          padding: 10px 20px;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}


// // File: src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // ✅ Add this
// import DiscoveryPage from './pages/DiscoveryPage';
// import CollectionPage from './pages/CollectionPage';

// const queryClient = new QueryClient(); // ✅ Create client

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}> {/* ✅ Wrap app */}
//       <Router>
//         <div className="p-4">
//           <nav className="mb-4 space-x-4">
//             <NavLink to="/" className={({ isActive }) => isActive ? 'font-bold' : ''}>Discovery</NavLink>
//             <NavLink to="/collection" className={({ isActive }) => isActive ? 'font-bold' : ''}>My Collection</NavLink>
//           </nav>
//           <Routes>
//             <Route path="/" element={<DiscoveryPage />} />
//             <Route path="/collection" element={<CollectionPage />} />
//           </Routes>
//         </div>
//       </Router>
//     </QueryClientProvider>
//   );
// }



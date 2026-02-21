import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [voucherTime, setVoucherTime] = useState(86400);
  const [answers, setAnswers] = useState({});
  const [toast, setToast] = useState(false);
  const [uniqueId] = useState(
    "ID" + Math.floor(Math.random() * 999999)
  );

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
    setTimeLeft(60);
    setScreen("quiz");
  };

  const checkResult = () => {
    const quiz = quizzes[selectedCourse];

    if (Object.keys(answers).length !== quiz.length) {
      alert("Please answer all questions.");
      return;
    }

    const correct = quiz.every((item, index) => answers[index] === item.correct);

    if (correct) {
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
      });
    }

    setScreen("result");
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

      {screen === "home" && (
        <>
          <h1 className="title">Unlock Your Tech Scholarship</h1>
          {Object.keys(quizzes).map((course) => (
            <div key={course} className="card" onClick={() => startQuiz(course)}>
              {course}
            </div>
          ))}
        </>
      )}

      {screen === "quiz" && (
        <>
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
          <button className="btnPrimary" onClick={checkResult}>Submit</button>
        </>
      )}

      {screen === "result" && (
        <>
          <h1>🎉 Congratulations!</h1>

          <div className="voucher">
            <div className="voucherHeader">LIMITED OFFER</div>
            <h2>50% OFF on {selectedCourse} with AI</h2>
            <div className="validity">Valid for 24 Hours Only</div>
            <div className="countdown">{formatTime(voucherTime)}</div>
            <div className="codeBox">{couponCode}</div>
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
        </>
      )}

      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #0d0d0d;
          color: white;
        }
        .app {
          max-width: 420px;
          margin: auto;
          padding: 20px;
        }
        .title {
          text-align: center;
          margin-bottom: 30px;
          font-weight: 600;
        }
        .card {
          background: linear-gradient(145deg,#1a1a1a,#111);
          padding: 20px;
          margin-bottom: 15px;
          border-radius: 18px;
          text-align: center;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 8px 25px rgba(0,0,0,0.6);
        }
        .card:hover {
          transform: scale(1.04);
        }
        .timer {
          text-align: right;
          font-weight: bold;
          color: #ff5252;
        }
        .questionBox {
          margin-bottom: 20px;
        }
        .option {
          background: #1f1f1f;
          padding: 12px;
          border-radius: 12px;
          margin-top: 8px;
          cursor: pointer;
          transition: 0.3s;
        }
        .option.selected {
          background: #6c63ff;
        }
        .btnPrimary, .btnSecondary {
          width: 100%;
          padding: 14px;
          margin-top: 15px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
        }
        .btnPrimary {
          background: #6c63ff;
          color: white;
        }
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
          cursor: pointer;
        }
        .voucher {
          background: linear-gradient(135deg,#ffd700,#ffb300);
          color: black;
          padding: 25px;
          border-radius: 22px;
          margin-top: 25px;
          text-align: center;
          box-shadow: 0 15px 40px rgba(255,215,0,0.4);
          animation: fadeIn 0.6s ease;
        }
        .voucherHeader {
          font-size: 12px;
          letter-spacing: 2px;
          font-weight: bold;
        }
        .validity {
          margin-top: 10px;
          font-weight: bold;
          color: #b00020;
        }
        .countdown {
          margin-top: 5px;
          font-size: 18px;
          font-weight: bold;
        }
        .codeBox {
          margin-top: 15px;
          background: black;
          color: #ffd700;
          padding: 12px;
          border-radius: 12px;
          font-weight: bold;
        }
        .toast {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          padding: 10px 20px;
          border-radius: 20px;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

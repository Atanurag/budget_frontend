# Personal Budget Tracker – Frontend (React)

This is the frontend for the **Personal Budget Tracker** application. It allows users to manage their income, expenses, and monthly budgets through a clean and good interface with dynamic visualizations.

---

## ✅ Live Demo

Frontend Hosted on Vercel:
https://workstation-kappa.vercel.app

---

## ✅ Demo Credentials

Use the following credentials to log in and test the app:

| Email              | Password  |
|--------------------|-----------|
| a@email.com     | 1234   |
| b@email.com | 1234   |
| c@email.com     | 1234 |


---

## ✨ Features

- **Authentication**
  - Login with email and password
  - JWT token-based authentication

- **Dashboard**
  - Monthly financial summary with:
    - Total income
    - Total expenses
    - Current balance
  - **D3.js Bar Chart** and **Donut Chart** visualizations for transactions

- **Transaction Management**
  - Add, edit, and delete transactions
  - Categorize as income or expense
  - Filter transactions by date, category, or amount
  - Paginated transaction list

- **Budget Management**
  - Set monthly budget
  - Edit or update existing budget
  - Compare actual expenses with budget
  - Visualize budget vs expense using D3.js Donut and Bar Charts

- **Reusable UI Components**
  - Form components shared between add/edit
  - Summary cards, graphs, tables using **Ant Design UI components**
  - Styling done with **plain CSS** to demonstrate CSS understanding (no Tailwind or other CSS frameworks)

---

## ⚙️ Tech Stack

- **React** (with functional components & hooks)
- **React Router DOM** – For routing
- **Fetch API** – For API requests 
- **D3.js** – For interactive charts
- **Ant Design** – UI components (buttons, tables, inputs, pagination)
- **JWT** – Token handling from frontend
- **Plain CSS** – Custom styling (no Tailwind or CSS frameworks)

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the Repo
```
git clone https://github.com/Atanurag/Budget_Frontend.git
cd budget_frontend
Install Dependencies
npm install or pnpm install (if pnpm environment)
Run the app
npm start or pnpm start (if pnpm environment)
```
### 2. Assumptions 

Each user can have one budget per month.

Only authenticated users can manage transactions and budgets.

App assumes that monthly calculations are done based on the selected month and year on the dashboard.

### 3. Note on Hosting

This project will remain publicly available and hosted for at least 30 days post submission.

### 4. Folder Structure
src/      
├── components/          
├── pages/              
├── css/              
└── App.jsx               

### 5. Images

 ![Model](https://raw.githubusercontent.com/Atanurag/budget_frontend/05d6e70ab0d61753781d492e8989a2a2eefb1463/page1.png)

 ![Model](https://raw.githubusercontent.com/Atanurag/budget_frontend/refs/heads/main/page2.png)

 ![Model](https://raw.githubusercontent.com/Atanurag/budget_frontend/refs/heads/main/page3.png)

![Model](https://raw.githubusercontent.com/Atanurag/budget_frontend/refs/heads/main/page4.png)

![Model](https://raw.githubusercontent.com/Atanurag/budget_frontend/refs/heads/main/page5.png)

![Model](https://raw.githubusercontent.com/Atanurag/budget_frontend/refs/heads/main/page6.png)

![Model](https://raw.githubusercontent.com/Atanurag/budget_frontend/refs/heads/main/page7.png)

![Model](https://raw.githubusercontent.com/Atanurag/budget_frontend/refs/heads/main/page8.png)

![Model](https://raw.githubusercontent.com/Atanurag/budget_frontend/refs/heads/main/page9.png)

import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TransactionManagement from './pages/TransactionManagement';
import Budget from './pages/Budget';
import BudgetManagement from './pages/BudgetManagement';
import Login from './pages/Login';

// import { Collapse } from 'antd';
// import { Space, Table, Tag } from 'antd';
// import { Select, Space } from 'antd';
// const { Panel } = Collapse;
// import { Radio, Tabs } from 'antd';
// import { Button, Drawer } from 'antd';
const App = () => {


  return (
    

      <Routes>


        <Route path="/login"
element={<Login/>} />
<Route path="/"
element={<Login/>} />

            <Route path="/dashboard" element={<Dashboard/>} />

        <Route
          path="/transaction/add"
          element={<TransactionManagement/>}
        />
         <Route
          path="/transaction/edit/:transactionId"
          element={<TransactionManagement/>}
        />
        <Route path="/budget"
element={<Budget/>} />


<Route
          path="/budget/add"
          element={<BudgetManagement/>}
        />
         <Route
          path="/budget/edit/:budgetId"
          element={<BudgetManagement/>}
        />
</Routes>
 
  
  );
};

export default App;

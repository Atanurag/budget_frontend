import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';

// import { Collapse } from 'antd';
// import { Space, Table, Tag } from 'antd';
// import { Select, Space } from 'antd';
// const { Panel } = Collapse;
// import { Radio, Tabs } from 'antd';
// import { Button, Drawer } from 'antd';
import Lo from './lo.js';
const App = () => {


  return (
    
      
      <Routes>
        <Route
          path="/"
          element={ <Lo />}
        />
</Routes>
 
  
  );
};

export default App;

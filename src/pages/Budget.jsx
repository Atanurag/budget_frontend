import React, { useState,useRef,useEffect } from 'react';
import { DatePicker, Button,Table } from 'antd';
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDownload,faTrash, faFileExcel,faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import { handleAPICall, notificationDisplay } from "../components/Utils";
import { SpaceContext } from 'antd/es/space';
const monthFormat = 'YYYY/MM';

const Budget = () => {
  const [budgetMonth, setBudgetMonth] = useState(dayjs('2025/05'));
  const [budgetInfo, setBudgetInfo] = useState({});
  const [incomeList,setIncomeList] = useState([]);
  const [expense,setExpense] = useState(0);
  const [filtersParameter, setFiltersParameter] = useState({});
  const [loading, setLoading] = useState(false)
  const searchInput = useRef(null);
  const navigate = useNavigate();

  const onSubmit = () => {
    setLoading(true)
    const postObj = {
      date: budgetMonth.format('YYYY/MM'),
  }
    let budgetUrl = `https://6d4e0550-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/budget/budget-by-date`;
    
    handleAPICall(budgetUrl, "POST", postObj).then(res => {
        if (res.status === "success") {
          setBudgetInfo(res.data[0]);
            console.log(res)
            setLoading(false)
        }
        else{
          setLoading(false)

        }
       
    })
    let txnDetailUrl = `https://6d4e0550-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/transaction/txn-details`;
    handleAPICall(txnDetailUrl, "POST", postObj).then(res => {
      if (res.status === "success") {
        setExpense(res.expense.reduce((acc,curr)=>{
return acc+curr['amount'];
        },0));
          console.log(res);
      }
      
     
  })

};
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setBudgetMonth(date);
  };
  const disabledDate = (current) => {
    return current && current.isBefore(dayjs().startOf("month"), "month");
  };


useEffect(()=>{
onSubmit()
},[])

  return (
    <>
    {loading && <span>loading ...</span>}
      <DatePicker
        defaultValue={dayjs(budgetMonth, monthFormat)}
        format={monthFormat}
        picker="month"
        onChange={onChange}
        disabledDate={disabledDate}
      />
      <Button type="primary"  onClick={()=>{
        onSubmit()
      }}>Submit</Button>


      <Button type="primary" onClick={()=>{
         navigate(`/budget/add`, { state: { propType: "Add New Budget" } })
      }}>Add New Budget</Button>

{budgetInfo?.title }
{budgetInfo?.amount }
{budgetInfo?.date }
      

      {expense ? expense : `no expense added for ${budgetMonth.format(monthFormat)}`}


      <span onClick={()=>{
         navigate(`/budget/edit/${budgetInfo._id}`, { state: { propType: "Edit Budget" } })
      }
    
    }>i</span>
    </>
  );
};

export default Budget;


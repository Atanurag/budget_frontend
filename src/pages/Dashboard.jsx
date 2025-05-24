import React, { useState,useRef,useEffect } from 'react';
import { DatePicker, Button,Table,Popconfirm } from 'antd';
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDownload,faTrash, faFileExcel,faPenToSquare,faCircleInfo  } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import '../css/Dashboard.css';
import { handleAPICall, notificationDisplay } from "../components/Utils";
import { SpaceContext } from 'antd/es/space';
import CountUp from 'react-countup';
const monthFormat = 'YYYY/MM';
import BarChart from '../components/BarChart.jsx'

const Dashboard = () => {
  const [budgetMonth, setBudgetMonth] = useState(dayjs('2025/05'));
  const [summaryInfo, setSummaryInfo] = useState({});
  const [incomeList,setIncomeList] = useState([]);
  const [expenseList,setExpenseList] = useState([]);
  const [filtersParameter, setFiltersParameter] = useState({});
  const [loading, setLoading] = useState(false)
  const searchInput = useRef(null);
  const navigate = useNavigate();

  const onSubmit = () => {
    setLoading(true)
    const postObj = {
      date: budgetMonth.format('YYYY/MM'),
  }
    let summaryUrl = `https://6d4e0600-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/transaction/summary`;
    
    handleAPICall(summaryUrl, "POST", postObj).then(res => {
        if (res.status === "success") {
          setSummaryInfo(res)
            console.log(res)
            setLoading(false)
        }
        else{
          setLoading(false)

        }
       
    })
    let txnDetailUrl = `https://6d4e0600-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/transaction/txn-details`;
    handleAPICall(txnDetailUrl, "POST", postObj).then(res => {
      if (res.status === "success") {
        setIncomeList(res.income.map(({ _id, ...rest }) => ({
          key: _id,
          ...rest
        })));
        setExpenseList(res.expense.map(({ _id, ...rest }) => ({
          key: _id,
          ...rest
        })));
          console.log(res);
      }
      
     
  })

};
const onDelete = (id) => {
  if(!id){
    return;
  }
  setLoading(true);
  let deleteUrl = `https://6d4e0600-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/transaction/${id}`;
  
  handleAPICall(deleteUrl, "DELETE").then(res => {
      if (res.status === "success") {
        console.log(res)
        notificationDisplay('success',res.message)
        setLoading(false)
      }
      else{
    notificationDisplay('error',res.message)
    setLoading(false)


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
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Search
           allowClear
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
            setFiltersParameter({...filtersParameter,[dataIndex]:e.target.value})
          }}
        //   onPressEnter={() => setTimeout(confirm)}
        //   onSearch={(searchText) => setTimeout(() => searchText === "" ? confirm({closeDropdown: false}) : confirm() )}
      
        onPressEnter={() => setTimeout(confirm)}
        onSearch={(searchText) => setTimeout(() => searchText === "" ? confirm({closeDropdown: false}) : confirm() )}

        />
      </div>
    ),
    filterIcon: (filtered) => (
      <FontAwesomeIcon icon={faSearch} />
    ),
    // onFilter: (value, record) =>
    //   record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
});
const columns = [
  {
    title:'Title',
    dataIndex:'title',
    key:'title',
    ...getColumnSearchProps('title')
  },
  {
    title:'Category',
    dataIndex:'category',
    key:'category',
    ...getColumnSearchProps('category')
  },
  {
    title:'Amount',
    dataIndex:'amount',
    key:'amount',
    ...getColumnSearchProps('amount'),
    sorter: (a, b) => a.amount - b.amount,
        sortDirections: ['descend', 'ascend'],
  },
  {
    title:'Month',
    dataIndex:'date',
    key:'date',
    ...getColumnSearchProps('date'),
  },
  {
    title: 'Edit Details',
    key: 'edit',
    render: (text, record) => (
        <FontAwesomeIcon 
        style={{cursor:'pointer'}}
            icon={faPenToSquare}
            onClick={() => { navigate(`/transaction/edit/${record.key}`, { state: { propType: "Edit Transaction:" } });
            ;
          }}
        />
    ),
},
{
  title: 'Delete',
  key: 'delete',
  render: (text, record) => (


<Popconfirm
                                    title="Delete This Transaction"
                                    description="Are you sure you want to delete?"
                                    okText="Yes"
                                    cancelText="No"
                                    icon={<FontAwesomeIcon icon={faCircleInfo} style={{ color: '#2196F3',fontSize:'14px',marginRight:'6px' }}  />}
                                    onConfirm={() => {
                                      onDelete(record.key)
                                    }}
                                    okButtonProps={{
                                    style: {
                                        fontSize: '14px',
                                        //backgroundColor: 'var(--primary-client-color)',
                                    }
                                    }}
                                    cancelButtonProps={{
                                        style: {
                                            fontSize: '14px'
                                        }
                                        }}
                                >   
                               <FontAwesomeIcon 
      style={{cursor:'pointer'}}
          icon={faTrash}
      />
                                </Popconfirm>



      



  ),
},
 
];
const data = [
  {
    key: '682f2214faffd3bf671de2d3',
    title: 'John Brown',
    category: "opeopeiroiewor uwew",
    amount: 3000,
    month:'2025/5'
  },
 
];

useEffect(()=>{
onSubmit()
},[])

const onNewTxn = () =>{
  navigate(`/transaction/add`, { state: { propType: "Add New Transaction" } });
}
const onBudget = () =>{
  navigate(`/budget`);
}

  return (
    <>
    {loading && <span>loading ...</span>}

<div style={{display:'flex'}}>
<BarChart chartData={incomeList.map(({ amount,category, ...rest }) => ({
         value: amount,
         name : category
        }))} xLabel={'Income Category'} yLabel={'Income Amount'}/>

<BarChart chartData={expenseList.map(({ amount,category, ...rest }) => ({
         value: amount,
         name : category
        }))} xLabel={'Expense Category'} yLabel={'Expense Amount'}/>
</div>

    <div className="top-strip-card">
  <div className="top-strip-left">
    <span className="top-strip-icon">📅</span>
  </div>
  <div className="top-strip-right">
    <DatePicker
      className="top-strip-date-picker"
      defaultValue={dayjs(budgetMonth, monthFormat)}
      format={monthFormat}
      picker="month"
      onChange={onChange}
      disabledDate={disabledDate}
    />
    <Button type="primary" className="top-strip-button" onClick={onSubmit}>
      Submit
    </Button>
    <Button type="primary" className="top-strip-button" style={{backgroundColor:'green'}} onClick={onNewTxn}>
    Add New Transaction
    </Button>
    <Button className="top-strip-button" type="primary"  style={{backgroundColor:'green'}} onClick={onBudget}>Access Your Budget</Button>
  </div>
</div>


<div className="as-on-container">
  <div className="as-on-text">{dayjs(budgetMonth, monthFormat).format('MMMM YYYY')}</div>
</div>


<div className="info-card-row">
  <div className="info-card">
    <div className="info-card-icon">
    <svg
  id="SvgjsSvg1001"
  width={60}
  height={60}
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <defs id="SvgjsDefs1002" />
  <g id="SvgjsG1008">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 64 64"
      viewBox="0 0 64 64"
      width={60}
      height={60}
    >
      <path
        d="M11.48,39.62H0.87C0.38,39.62,0,40.01,0,40.48v18.71c0,0.47,0.38,0.87,0.87,0.87h10.61c0.47,0,0.87-0.39,0.87-0.87V40.48
				C12.35,40.01,11.95,39.62,11.48,39.62z M11.36,59.07H0.98V40.61h10.38V59.07z"
      />
      <path
        fill="#1c77b5"
        d="M0.98,40.61v18.46h10.38V40.61H0.98z M10.43,57.41H1.92V42.26h8.51V57.41z"
        className="color1c77b5 svgShape"
      />
      <rect
        width="8.51"
        height="15.15"
        x="1.92"
        y="42.26"
        fill="#1d7dc8"
        className="color1d7dc8 svgShape"
      />
      <path
        d="M42.88,48.96c0,0.14-0.01,0.27-0.03,0.39c-0.04,0.42-0.17,0.82-0.35,1.18c-0.57,1.12-1.74,1.9-3.09,1.9H24.71
				c-0.28,0-0.49-0.22-0.49-0.49s0.22-0.49,0.49-0.49H39.4c0.34,0,0.68-0.07,0.97-0.2c0.1-0.04,0.21-0.1,0.31-0.16
				c0.18-0.1,0.33-0.23,0.48-0.37c0.06-0.06,0.11-0.12,0.16-0.18c0.06-0.06,0.1-0.13,0.15-0.2c0.05-0.06,0.09-0.13,0.13-0.21
				c0.04-0.07,0.07-0.14,0.1-0.22c0.1-0.24,0.17-0.48,0.19-0.75c0.01-0.07,0.01-0.15,0.01-0.22c0-0.1-0.01-0.2-0.02-0.3
				c-0.01-0.1-0.03-0.19-0.05-0.28c-0.02-0.09-0.04-0.18-0.08-0.27c-0.03-0.09-0.07-0.18-0.11-0.27c-0.04-0.07-0.08-0.15-0.13-0.22
				c-0.05-0.1-0.12-0.19-0.19-0.27c-0.05-0.06-0.1-0.12-0.16-0.18c-0.17-0.17-0.35-0.31-0.55-0.42c-0.11-0.06-0.22-0.11-0.33-0.15
				c-0.09-0.04-0.19-0.07-0.29-0.09c-0.07-0.03-0.15-0.04-0.23-0.05c-0.12-0.02-0.24-0.03-0.36-0.03h-8.43
				c-0.14,0-0.27-0.06-0.35-0.16c-3.9-4.11-10.56-4.15-18.27-3.71c-0.16,0.01-0.32,0.02-0.47,0.03c-0.26,0.01-0.5-0.2-0.51-0.46
				v-0.04c0-0.26,0.2-0.47,0.46-0.48c0.18-0.01,0.35-0.02,0.52-0.03c7.84-0.44,14.64-0.38,18.84,3.87h8.22
				C41.32,45.47,42.88,47.04,42.88,48.96z"
      />
      <path
        fill="#e5c39e"
        d="M61.83,48.34L37.99,60.69c-1.86,0.96-4,1.21-6.04,0.71l-19.6-4.92v-2.2l19.6,4.92
				c2.04,0.5,4.17,0.26,6.04-0.71l23.85-12.36c0.31-0.18,0.56-0.38,0.75-0.62c0.13,0.13,0.22,0.28,0.29,0.42
				C63.26,46.79,62.85,47.75,61.83,48.34z"
        className="colore5c39e svgShape"
      />
      <path
        fill="#f7d3a5"
        d="M62.58,45.52c-0.19,0.24-0.44,0.44-0.75,0.62L37.99,58.5c-1.86,0.96-4,1.21-6.04,0.71l-19.6-4.92v-11.7
				c7.71-0.43,14.37-0.39,18.27,3.71c0.09,0.1,0.22,0.16,0.35,0.16h8.43c0.98,0,1.83,0.57,2.24,1.4c0.17,0.33,0.26,0.71,0.26,1.1
				c0,0.07,0,0.15-0.01,0.22c-0.11,1.27-1.17,2.27-2.48,2.27H24.71c-0.28,0-0.49,0.22-0.49,0.49s0.22,0.49,0.49,0.49H39.4
				c1.35,0,2.52-0.78,3.09-1.9l13.94-5.31C59.59,44.06,61.72,44.53,62.58,45.52z"
        className="colorf7d3a5 svgShape"
      />
      <path
        d="M62.3,49.2L38.44,61.57c-1.37,0.71-2.88,1.07-4.39,1.07c-0.79,0-1.57-0.1-2.33-0.29l-19.37-4.86l-0.62-0.16
				c-0.2-0.05-0.34-0.23-0.36-0.42V56.8c0-0.02,0.01-0.04,0.01-0.06c0.07-0.27,0.33-0.43,0.6-0.36l0.37,0.1l19.6,4.92
				c2.04,0.5,4.17,0.26,6.04-0.71l23.85-12.36c1.01-0.58,1.43-1.55,1.03-2.39c-0.07-0.15-0.16-0.3-0.29-0.42
				c-0.86-0.99-2.99-1.46-6.14-0.3l-13.94,5.31l-0.18,0.07c-0.26,0.1-0.54-0.03-0.63-0.29c-0.1-0.26,0.03-0.54,0.29-0.63l0.88-0.33
				l13.24-5.05c3.3-1.22,5.66-0.82,6.91,0.25c0.33,0.28,0.59,0.61,0.76,0.97C64.37,46.84,63.78,48.36,62.3,49.2z"
      />
      <g>
        <path
          d="M39.69,29.12c0,0.28-0.23,0.49-0.49,0.49h-4.9c-0.28,0-0.49-0.22-0.49-0.49c0-0.27,0.22-0.49,0.49-0.49h4.9
					C39.46,28.62,39.69,28.85,39.69,29.12z"
        />
        <path d="M39.69 26.8c0 .28-.23.49-.49.49h-1.54c.31.36.52.83.6 1.33.03.14.04.29.04.43 0 .19-.02.37-.06.55-.26 1.25-1.36 2.2-2.69 2.2h-.11L38 34.45c.19.2.18.51-.02.7-.09.1-.22.14-.33.14-.13 0-.27-.05-.35-.15l-3.36-3.5c-.14-.14-.18-.35-.1-.53.07-.18.26-.3.45-.3h1.26c.78 0 1.44-.51 1.66-1.21.07-.17.1-.35.1-.55 0-.15-.02-.3-.06-.43-.19-.77-.88-1.33-1.7-1.33h-1.26c-.28 0-.49-.22-.49-.49 0-.28.22-.49.49-.49h4.9C39.46 26.31 39.69 26.53 39.69 26.8zM56.2 39.72c0 .28-.22.49-.49.49H17.77c-.28 0-.49-.22-.49-.49 0-.27.22-.49.49-.49h37.94C55.98 39.23 56.2 39.45 56.2 39.72z" />
        <path d="M28.77 34.16v5.55c0 .28-.23.49-.49.49-.28 0-.49-.22-.49-.49v-5.55c0-.27.22-.49.49-.49C28.54 33.67 28.77 33.89 28.77 34.16zM31.84 18.22c-.07.19-.26.31-.45.31h-2.62v7.63c0 .28-.23.49-.49.49-.28 0-.49-.22-.49-.49v-8.12c0-.27.22-.49.49-.49h1.92l-4.77-4.77-4.71 4.72h1.63c.28 0 .49.23.49.49v21.73c0 .28-.22.49-.49.49-.27 0-.49-.22-.49-.49V18.47h-2.33c-.2 0-.37-.12-.45-.3-.07-.19-.03-.4.11-.54l5.9-5.91c.09-.09.22-.15.34-.15.13 0 .26.06.34.15l5.96 5.96C31.88 17.82 31.92 18.04 31.84 18.22zM54.38 18.09c-.07.19-.26.31-.45.31h-2.31v21.32c0 .28-.23.49-.49.49-.28 0-.49-.22-.49-.49V17.9c0-.27.22-.49.49-.49h1.61l-4.59-4.59-4.62 4.61h1.63c.27 0 .49.22.49.49v7.32c0 .27-.23.49-.49.49-.14 0-.26-.06-.35-.15-.01-.01-.02-.03-.03-.04-.02-.03-.04-.06-.05-.08-.01-.02-.02-.03-.02-.04-.03-.06-.04-.12-.04-.19v-6.82h-2.33c-.2 0-.38-.12-.45-.31-.08-.19-.04-.39.1-.54l5.82-5.79c.19-.2.5-.2.69 0l5.79 5.78C54.42 17.7 54.46 17.91 54.38 18.09zM45.66 35.08v4.63c0 .28-.23.49-.49.49-.28 0-.49-.22-.49-.49v-4.63c0-.07.01-.14.04-.2 0-.01.01-.02.02-.03.02-.03.04-.07.06-.1 0-.01.01-.02.02-.03.1-.08.22-.14.35-.14C45.43 34.59 45.66 34.81 45.66 35.08z" />
        <path
          d="M45.66,25.11c-0.29-0.5-0.62-0.97-0.98-1.41c-1.19-1.42-2.77-2.5-4.56-3.09c-0.33-0.11-0.65-0.2-0.98-0.27
					c-0.7-0.16-1.42-0.24-2.16-0.24c-0.96,0-1.87,0.14-2.75,0.38c-0.33,0.09-0.67,0.21-0.98,0.34c-1.81,0.72-3.36,1.95-4.47,3.52
					c-0.38,0.54-0.72,1.12-0.98,1.74c-0.56,1.24-0.87,2.62-0.87,4.07c0,1.45,0.31,2.83,0.87,4.07c0.27,0.62,0.6,1.2,0.98,1.74
					c0.98,1.39,2.31,2.52,3.86,3.26c1.32,0.63,2.79,0.98,4.34,0.98s3.02-0.35,4.34-0.98c1.29-0.62,2.44-1.52,3.36-2.61
					c0.36-0.43,0.7-0.91,0.98-1.41c0.87-1.49,1.37-3.21,1.37-5.05S46.52,26.6,45.66,25.11z M44.79,34.76
					c-0.02,0.03-0.04,0.07-0.06,0.1c-0.01,0.01-0.02,0.02-0.02,0.03c-1.6,2.6-4.47,4.34-7.74,4.34c-5,0-9.07-4.07-9.07-9.07
					c0-3.94,2.51-7.29,6.03-8.55c0.95-0.33,1.98-0.52,3.04-0.52c3.27,0,6.13,1.73,7.74,4.33c0,0.01,0.01,0.02,0.02,0.04
					c0.01,0.02,0.03,0.05,0.05,0.08c0.01,0.01,0.02,0.03,0.03,0.04c0.78,1.34,1.23,2.91,1.23,4.58s-0.45,3.23-1.23,4.57
					C44.8,34.74,44.79,34.75,44.79,34.76z"
        />
        <path
          fill="#f7b052"
          d="M44.81,25.58c-0.01-0.01-0.02-0.03-0.03-0.04c-0.02-0.03-0.04-0.06-0.05-0.08
					c-0.01-0.02-0.02-0.03-0.02-0.04c-1.6-2.6-4.47-4.33-7.74-4.33c-1.06,0-2.1,0.19-3.04,0.52c-3.51,1.26-6.03,4.61-6.03,8.55
					c0,5,4.07,9.07,9.07,9.07c3.27,0,6.14-1.74,7.74-4.34c0-0.01,0.01-0.02,0.02-0.03c0.02-0.03,0.04-0.07,0.06-0.1
					c0-0.01,0.01-0.02,0.02-0.03c0.78-1.34,1.23-2.9,1.23-4.57S45.59,26.92,44.81,25.58z M36.97,37.34c-3.96,0-7.18-3.22-7.18-7.18
					s3.22-7.18,7.18-7.18s7.18,3.22,7.18,7.18S40.93,37.34,36.97,37.34z"
          className="colorf7b052 svgShape"
        />
        <path
          fill="#23ad7d"
          d="M52.73 17.41h-1.61c-.28 0-.49.23-.49.49v21.33h-4.97v-4.02c.87-1.49 1.37-3.21 1.37-5.05s-.5-3.56-1.37-5.05v-7.19c0-.28-.23-.49-.49-.49h-1.63l4.62-4.61L52.73 17.41zM30.2 17.54h-1.92c-.28 0-.49.23-.49.49v8.06c-.56 1.24-.87 2.62-.87 4.07 0 1.45.31 2.83.87 4.07v5h-4.93V17.98c0-.27-.22-.49-.49-.49h-1.63l4.71-4.72L30.2 17.54zM41.63 7.35h-2.01c-.28 0-.49.22-.49.49v12.5c-.7-.16-1.42-.24-2.16-.24-.96 0-1.87.14-2.75.38V7.86c0-.27-.22-.49-.49-.49H32l4.83-4.82L41.63 7.35z"
          className="color23ad7d svgShape"
        />
        <path
          d="M43.27,8.03c-0.07,0.19-0.26,0.31-0.45,0.31h-2.71v12.63c0,0.28-0.23,0.49-0.49,0.49c-0.28,0-0.49-0.22-0.49-0.49V7.84
					c0-0.28,0.22-0.49,0.49-0.49h2.01l-4.79-4.8L32,7.37h1.73c0.28,0,0.49,0.23,0.49,0.49v13.3c0,0.21-0.12,0.38-0.3,0.45
					c-0.06,0.03-0.13,0.04-0.2,0.04c-0.28,0-0.49-0.22-0.49-0.49V8.35h-2.42c-0.21,0-0.38-0.12-0.46-0.3
					c-0.07-0.19-0.03-0.4,0.11-0.54l6.02-6.02c0.19-0.19,0.51-0.19,0.7,0l5.99,5.99C43.31,7.63,43.35,7.84,43.27,8.03z"
        />
        <g>
          <path
            d="M36.97,22.98c-3.96,0-7.18,3.22-7.18,7.18s3.22,7.18,7.18,7.18s7.18-3.22,7.18-7.18S40.93,22.98,36.97,22.98z
					 M36.97,36.35c-3.42,0-6.19-2.78-6.19-6.19c0-3.42,2.78-6.19,6.19-6.19c3.41,0,6.19,2.78,6.19,6.19
					C43.16,33.58,40.38,36.35,36.97,36.35z"
          />
          <path
            fill="#f7be73"
            d="M36.97,23.97c-3.42,0-6.19,2.78-6.19,6.19c0,3.42,2.78,6.19,6.19,6.19c3.41,0,6.19-2.78,6.19-6.19
					C43.16,26.74,40.38,23.97,36.97,23.97z M38.26,28.62h0.94c0.27,0,0.49,0.23,0.49,0.49c0,0.28-0.23,0.49-0.49,0.49h-0.96
					c-0.26,1.25-1.36,2.2-2.69,2.2h-0.11L38,34.45c0.19,0.2,0.18,0.51-0.02,0.7c-0.09,0.1-0.22,0.14-0.33,0.14
					c-0.13,0-0.27-0.05-0.35-0.15l-3.36-3.5c-0.14-0.14-0.18-0.35-0.1-0.53c0.07-0.18,0.26-0.3,0.45-0.3h1.26
					c0.78,0,1.44-0.51,1.66-1.21h-2.92c-0.28,0-0.49-0.22-0.49-0.49c0-0.27,0.22-0.49,0.49-0.49h2.96c-0.19-0.77-0.88-1.33-1.7-1.33
					h-1.26c-0.28,0-0.49-0.22-0.49-0.49c0-0.28,0.22-0.49,0.49-0.49h4.9c0.27,0,0.49,0.22,0.49,0.49c0,0.28-0.23,0.49-0.49,0.49
					h-1.54C37.97,27.66,38.18,28.12,38.26,28.62z"
            className="colorf7be73 svgShape"
          />
        </g>
      </g>
    </svg>
  </g>
</svg>

   
</div>
    <div className="info-card-content">
      <div className="info-card-label">Total Income</div>
      <div className="info-card-value">₹ <CountUp delay={1} decimals={2} separator="," decimal="." end={summaryInfo?.totalIncome} /></div>
    </div>
  </div>

  <div className="info-card">
    <div className="info-card-icon"><svg
  id="SvgjsSvg1001"
  width={60}
  height={60}
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <defs id="SvgjsDefs1002" />
  <g id="SvgjsG1008">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 50 50"
      viewBox="0 0 50 50"
      width={60}
      height={60}
    >
      <path
        fill="#ffe27c"
        d="M44.1,30.1c0,1.6-4.1,2.8-9.2,2.8s-9.2-1.3-9.2-2.8s4.1-2.8,9.2-2.8S44.1,28.5,44.1,30.1z"
        className="colorFFCA67 svgShape"
      />
      <path
        fill="#f5b948"
        d="M34.8,33c-5.1,0-9.2-1.3-9.2-2.8v2.8c0,1.6,4.1,2.8,9.2,2.8c5.1,0,9.2-1.3,9.2-2.8v-2.8
			C44,31.7,39.9,33,34.8,33z"
        className="colorF5B948 svgShape"
      />
      <path
        fill="#ffe27c"
        d="M46.7,25.3c0,1.6-4.1,2.9-9.2,2.9c-5.1,0-9.2-1.3-9.2-2.9c0-1.6,4.1-2.8,9.2-2.8
			C42.6,22.5,46.7,23.8,46.7,25.3z"
        className="colorFFCA67 svgShape"
      />
      <path
        fill="#f5b948"
        d="M37.5,28.2c-5.1,0-9.2-1.3-9.2-2.8v2.8c0,1.6,4.1,2.8,9.2,2.8c5.1,0,9.2-1.3,9.2-2.8v-2.8
			C46.7,26.9,42.6,28.2,37.5,28.2z"
        className="colorF5B948 svgShape"
      />
      <path
        fill="#ffe27c"
        d="M44.1,20.6c0,1.6-4.1,2.8-9.2,2.8s-9.2-1.3-9.2-2.8c0-1.6,4.1-2.9,9.2-2.9S44.1,19,44.1,20.6z"
        className="colorFFCA67 svgShape"
      />
      <path
        fill="#f5b948"
        d="M34.8,23.4c-5.1,0-9.2-1.3-9.2-2.8v2.8c0,1.6,4.1,2.8,9.2,2.8c5.1,0,9.2-1.3,9.2-2.8v-2.8
			C44,22.1,39.9,23.4,34.8,23.4z"
        className="colorF5B948 svgShape"
      />
      <path
        fill="#ffe27c"
        d="M46.7,15.3c0,1.6-4.1,2.8-9.2,2.8c-5.1,0-9.2-1.3-9.2-2.8c0-1.6,4.1-2.8,9.2-2.8
			C42.6,12.4,46.7,13.7,46.7,15.3z"
        className="colorFFCA67 svgShape"
      />
      <path
        fill="#f5b948"
        d="M37.5,18.2c-5.1,0-9.2-1.3-9.2-2.8v2.8c0,1.6,4.1,2.8,9.2,2.8c5.1,0,9.2-1.3,9.2-2.8v-2.8
			C46.7,16.9,42.6,18.2,37.5,18.2z"
        className="colorF5B948 svgShape"
      />
      <path
        fill="#491c1c"
        d="M32.9,4v28.8c0,1.7-1.3,3-3,3H6.3c-1.7,0-3-1.3-3-3V4c0-1.7,1.3-3,3-3h23.6C31.5,1,32.9,2.3,32.9,4z"
        className="color696967 svgShape"
      />
      <rect
        width="21.7"
        height="7.1"
        x="7.2"
        y="4.8"
        fill="#e4e4e3"
        className="colorE4E4E3 svgShape"
      />
      <path
        fill="#e4e4e3"
        d="M12.6 15.6v2.7c0 .5-.4 1-1 1H8.2c-.5 0-1-.5-1-1v-2.7c0-.5.5-1 1-1h3.3C12.1 14.6 12.6 15.1 12.6 15.6zM20.7 15.6v2.7c0 .5-.5 1-1 1h-3.3c-.5 0-1-.5-1-1v-2.7c0-.5.5-1 1-1h3.3C20.3 14.6 20.7 15.1 20.7 15.6zM28.9 15.6v2.7c0 .5-.5 1-1 1h-3.3c-.6 0-1-.5-1-1v-2.7c0-.5.4-1 1-1h3.3C28.4 14.6 28.9 15.1 28.9 15.6zM12.6 22v2.7c0 .6-.4 1-1 1H8.2c-.5 0-1-.4-1-1V22c0-.6.5-1 1-1h3.3C12.1 21 12.6 21.4 12.6 22zM20.7 22v2.7c0 .6-.5 1-1 1h-3.3c-.5 0-1-.4-1-1V22c0-.6.5-1 1-1h3.3C20.3 21 20.7 21.4 20.7 22zM28.9 22v2.7c0 .6-.5 1-1 1h-3.3c-.6 0-1-.4-1-1V22c0-.6.4-1 1-1h3.3C28.4 21 28.9 21.4 28.9 22zM12.6 28.3V31c0 .5-.4 1-1 1H8.2c-.5 0-1-.5-1-1v-2.7c0-.6.5-1 1-1h3.3C12.1 27.3 12.6 27.7 12.6 28.3zM20.7 28.3V31c0 .5-.5 1-1 1h-3.3c-.5 0-1-.5-1-1v-2.7c0-.6.5-1 1-1h3.3C20.3 27.3 20.7 27.7 20.7 28.3zM28.9 28.3V31c0 .5-.5 1-1 1h-3.3c-.6 0-1-.5-1-1v-2.7c0-.6.4-1 1-1h3.3C28.4 27.3 28.9 27.7 28.9 28.3z"
        className="colorE4E4E3 svgShape"
      />
      <path
        fill="#ffe27c"
        d="M30.1,32.4c-1.3-0.2-2.4,0.8-2.4,2l0-1.3c0-1-0.7-1.9-1.7-2.1c-1.3-0.2-2.4,0.8-2.4,2l0-1.3
			c0-1-0.7-1.9-1.7-2.1c-1.3-0.2-2.4,0.8-2.4,2l0-6.8c0-1-0.7-1.9-1.7-2.1c-1.3-0.2-2.4,0.8-2.4,2V37l-0.3-0.3
			c-1.4-1.4-3.8-1.4-5.2,0.1c-0.5,0.5-0.5,1.4,0,1.9l6.6,6.4c1.5,1.5,1.1,3.3,1.2,4h11.9v-1.6c3.2-2.9,1.6-8.7,2-11.4l0-1.5
			C31.8,33.5,31.1,32.5,30.1,32.4z"
        className="colorFFCA67 svgShape"
      />
    </svg>
  </g>
</svg>
</div>
    <div className="info-card-content">
      <div className="info-card-label">Total Expense</div>
      <div className="info-card-value">₹ <CountUp delay={1} decimals={2} separator="," decimal="." end={summaryInfo?.totalExpense} /></div>
    </div>
  </div>

  <div className="info-card">
    <div className="info-card-icon"><svg
  id="SvgjsSvg1022"
  width={60}
  height={60}
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <defs id="SvgjsDefs1023" />
  <g id="SvgjsG1024">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={60}
      height={60}
    >
      <path
        fill="#00acea"
        d="M415.99,21.84V12.5h62.42V127.54H415.99V21.84Zm46.34,68.49a15,15,0,1,0-15,15A15,15,0,0,0,462.33,90.33Z"
        className="color00acea svgShape"
      />
      <circle
        cx="447.33"
        cy="90.33"
        r={15}
        fill="#f5c487"
        className="color00efd1 svgShape"
      />
      <path
        fill="#fce4d1"
        d="M221.91 81.25L164.7 110.23a26.815 26.815 0 0 1-35.71-9.77L244.71 21a81.075 81.075 0 0 1 50.4-7.11L377 34.46a30.058 30.058 0 0 0 22.25-3.06l16.74-9.56v82.94h-.67a79.562 79.562 0 0 1-82.47 8.06l-4.93-2.39a56.817 56.817 0 0 0-24.74-5.67H255.37A35.551 35.551 0 0 1 221.91 81.25zM270.09 430.75l57.21-28.98a26.815 26.815 0 0 1 35.71 9.77L247.29 491a81.075 81.075 0 0 1-50.4 7.11L115 477.54a30.058 30.058 0 0 0-22.25 3.06l-16.74 9.56V407.22h.67a79.562 79.562 0 0 1 82.47-8.06l4.93 2.39a56.817 56.817 0 0 0 24.74 5.67h47.81A35.551 35.551 0 0 1 270.09 430.75z"
        className="colorf7caa5 svgShape"
      />
      <circle
        cx={246}
        cy={256}
        r="127.54"
        fill="#f5c487"
        className="color00efd1 svgShape"
      />
      <polygon
        fill="#00acea"
        points="76.01 490.16 76.01 499.5 33.59 499.5 33.59 384.46 76.01 384.46 76.01 407.22 76.01 490.16"
        className="color00acea svgShape"
      />
      <g>
        <path
          fill="#062542"
          d="M323.6 394.677l-49.885 25.159A43.771 43.771 0 0 0 236.63 399H188.82a48.985 48.985 0 0 1-21.251-4.759l-4.942-2.338A87.162 87.162 0 0 0 84 393.158v-8.7c0-4.418-3.572-8.46-7.99-8.46H33.59c-4.418 0-7.59 4.042-7.59 8.46V499.5c0 4.418 3.172 8.5 7.59 8.5H76.01c4.418 0 7.99-4.082 7.99-8.5v-4.693l12.72-7.265a21.961 21.961 0 0 1 16.329-2.243l81.891 20.57c.173.044.349.081.525.113a88.278 88.278 0 0 0 15.731 1.4 89.671 89.671 0 0 0 39.642-9.217 7.877 7.877 0 0 0 .98-.575l115.721-79.46a8 8 0 0 0 2.326-10.718A34.758 34.758 0 0 0 323.6 394.677zM68 492H42V392H68zm175.244-7.926a73.6 73.6 0 0 1-44.672 6.21l-81.625-20.5a37.9 37.9 0 0 0-28.17 3.872L84 476.379V411.807a71.236 71.236 0 0 1 71.656-5.448l4.937 2.282A65.069 65.069 0 0 0 188.82 415h47.81a27.816 27.816 0 0 1 25.933 18.47 4.516 4.516 0 0 1 .431 1.53h-69.4a8 8 0 0 0 0 16h78.58a8.1 8.1 0 0 0 8-8.12 44.511 44.511 0 0 0-.7-7.852l51.444-26.092c.062-.031.124-.078.184-.111a18.79 18.79 0 0 1 19.914 1.256zM478.41 5H415.99C411.572 5 408 8.082 408 12.5v4.693l-12.72 7.265A21.95 21.95 0 0 1 378.951 26.7L297.06 6.131c-.173-.044-.349-.081-.525-.113a89.668 89.668 0 0 0-55.373 7.812 7.877 7.877 0 0 0-.98.575l-115.72 79.46a8 8 0 0 0-2.328 10.718 34.752 34.752 0 0 0 46.267 12.74l49.885-25.159A43.772 43.772 0 0 0 255.37 113h47.81a48.985 48.985 0 0 1 21.251 4.759l4.937 2.338a87.594 87.594 0 0 0 38.181 8.756 88.308 88.308 0 0 0 40.451-10v8.686c0 4.418 3.572 8.46 7.99 8.46h62.42c4.418 0 7.59-4.042 7.59-8.46V12.5A7.246 7.246 0 0 0 478.41 5zM336.344 105.641l-4.937-2.282A65.083 65.083 0 0 0 303.18 97H255.37a27.816 27.816 0 0 1-25.933-18.47 4.516 4.516 0 0 1-.431-1.53h69.4a8 8 0 0 0 0-16H219.83a8.1 8.1 0 0 0-8 8.12 44.511 44.511 0 0 0 .7 7.852l-51.444 26.092c-.062.031-.123.078-.184.111a18.791 18.791 0 0 1-19.915-1.256l107.77-74a73.586 73.586 0 0 1 44.672-6.208l81.625 20.505a37.882 37.882 0 0 0 28.17-3.872L408 35.62v64.573A71.229 71.229 0 0 1 336.344 105.641zM470 120H424V21h46z"
          className="color083863 svgShape"
        />
        <path
          fill="#062542"
          d="M447.33 113.33a23 23 0 1 0-23-23A23.026 23.026 0 0 0 447.33 113.33zm0-30a7 7 0 1 1-7 7A7.008 7.008 0 0 1 447.33 83.33zM246 120.46c-74.737 0-135.54 60.8-135.54 135.54S171.263 391.54 246 391.54 381.54 330.737 381.54 256 320.737 120.46 246 120.46zm0 255.08A119.54 119.54 0 1 1 365.54 256 119.675 119.675 0 0 1 246 375.54z"
          className="color083863 svgShape"
        />
        <path
          fill="#062542"
          d="M290.55,196a8,8,0,0,0,0-16h-89.1a8,8,0,0,0,0,16h25.5c13.894,0,25.62,10,29.137,22H201.45a8,8,0,0,0,0,16H256.1a31.353,31.353,0,0,1-7.775,13.758A30.407,30.407,0,0,1,226.95,257h-25.5a7.8,7.8,0,0,0-5.494,13.53l63.72,60.162a8.015,8.015,0,0,0,11.309-.356,7.778,7.778,0,0,0-.321-11.124L221.564,273h5.386a46.3,46.3,0,0,0,32.687-13.928A44.629,44.629,0,0,0,272.471,234H290.55a8,8,0,0,0,0-16H272.463a46.232,46.232,0,0,0-10.586-22Z"
          className="color083863 svgShape"
        />
      </g>
    </svg>
  </g>
</svg></div>
    <div className="info-card-content">
      <div className="info-card-label">Total Balance</div>
      <div className="info-card-value">₹ <CountUp delay={1} decimals={2} separator="," decimal="." end={summaryInfo?.balance} /></div>
    </div>
  </div>
</div>

<div className="table-section">
  <div className="table-heading">Total Income Data</div>
  <Table columns={columns} dataSource={incomeList} />
</div>

<div className="table-section">
  <div className="table-heading">Total Expense Data</div>
  <Table columns={columns} dataSource={expenseList} />
</div>

    </>
  );
};

export default Dashboard;


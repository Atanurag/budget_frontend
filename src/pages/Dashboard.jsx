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
const monthFormat = 'YYYY/MM';

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
    let summaryUrl = `https://6d4e0550-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/transaction/summary`;
    
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
    let txnDetailUrl = `https://6d4e0550-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/transaction/txn-details`;
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
  let deleteUrl = `https://6d4e0550-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/transaction/${id}`;
  
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
  navigate(`/transaction/add`, { state: { propType: "Add New Transaction" } })
}

  return (
    <>
    {loading && <span>loading ...</span>}


    <div className="top-strip-card">
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
      <Button type="primary" className="top-strip-button" onClick={onNewTxn}>
        New Txn
      </Button>
    </div>






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
         navigate(`/transaction/add`, { state: { propType: "Add New Transaction" } })
      }}>Add New Transaction</Button>


<Button type="primary" onClick={()=>{
         navigate(`/budget`)
      }}>Access Your Budget</Button>


    <div className="small-card">
      <div className="icon-container">P</div>
      <div className="text-container">
        <div className="label">Total Income</div>
        <div className="value">{summaryInfo?.totalIncome}</div>
      </div>
    </div>
    <div className="small-card">
      <div className="icon-container">P</div>
      <div className="text-container">
        <div className="label">Total Expense</div>
        <div className="value">{summaryInfo?.totalExpense}</div>
      </div>
    </div>
    <div className="small-card">
      <div className="icon-container">P</div>
      <div className="text-container">
        <div className="label">Total Balance</div>
        <div className="value">{summaryInfo?.balance}</div>
      </div>
    </div>

    <span>Income table</span>
<Table columns={columns} dataSource={incomeList} />
<span>Expense table</span>
<Table columns={columns} dataSource={expenseList} />
    </>
  );
};

export default Dashboard;


import React, { useState,useRef,useEffect } from 'react';
import { DatePicker, Button,Table } from 'antd';
import { Input } from "antd";
const { Search } = Input;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faDownload,faTrash, faFileExcel,faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import '../css/Dashboard.css';

const monthFormat = 'YYYY/MM';

const Dashboard = () => {
  const [budgetMonth, setBudgetMonth] = useState('2025/05');
  const [summaryInfo, setSummaryInfo] = useState({});
  const [filtersParameter, setFiltersParameter] = useState({});
  const searchInput = useRef(null);
  const submit =()=>{

  }
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setBudgetMonth(dateString);
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
        //   allowClear
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [])
            setFiltersParameter({...filtersParameter,[dataIndex]:e.target.value})
          }}
        //   onPressEnter={() => setTimeout(confirm)}
        //   onSearch={(searchText) => setTimeout(() => searchText === "" ? confirm({closeDropdown: false}) : confirm() )}
        onPressEnter={() => { setTimeout(() => { submit(); confirm(); }); }}
        onSearch={(searchText) => { setTimeout(() => {
               if (searchText === "") {
                    submit();
                    confirm({ closeDropdown: true });
                } else {
                    submit();
                    confirm();
                }
            });
        }}
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
    dataIndex:'month',
    key:'month',
    ...getColumnSearchProps('month'),
  },
  {
    title: 'Edit Details',
    key: 'edit',
    render: (text, record) => (
        <FontAwesomeIcon 
            icon={faPenToSquare}
            onClick={() => {}}
        />
    ),
},
{
  title: 'Delete',
  key: 'delete',
  render: (text, record) => (
      <FontAwesomeIcon 
          icon={faTrash}
          onClick={() => {}}
      />
  ),
},
 
];
const data = [
  {
    key: '1',
    title: 'John Brown',
    category: "opeopeiroiewor uwew",
    amount: 3000,
    month:'2025/5'
  },
 
];


  return (
    <>
      <DatePicker
        defaultValue={dayjs(budgetMonth, monthFormat)}
        format={monthFormat}
        picker="month"
        onChange={onChange}
        disabledDate={disabledDate}
      />
      <Button type="primary">Submit</Button>


      <Button type="primary">Add New Transaction</Button>


      <div className="small-card">
      <div className="icon-container">{90}</div>
      <div className="text-container">
        <div className="label">{90}</div>
        <div className="value">{9}</div>
      </div>
    </div>

<Table columns={columns} dataSource={data} />;
    </>
  );
};

export default Dashboard;


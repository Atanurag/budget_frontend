import React, { useState, useRef, useEffect } from 'react';
import { DatePicker, Button, Table } from 'antd';
import { useNavigate, Link } from "react-router-dom";
import { Input } from "antd";
const { Search } = Input;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import { handleAPICall, notificationDisplay } from "../components/Utils";
import DonutChart from '../components/DonutChart';
const monthFormat = 'YYYY/MM';
import '../css/Budget.css';
import '../css/Loading.css';
import CountUp from 'react-countup';
import BarChart from '../components/BarChart.jsx'
const Budget = () => {
  const [budgetMonth, setBudgetMonth] = useState(dayjs('2025/05'));
  const [budgetInfo, setBudgetInfo] = useState({});
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [dateView, setDateView] = useState(dayjs(budgetMonth, monthFormat).format('MMMM YYYY'))
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const onSubmit = () => {
    setLoading(true)
    const postObj = {
      date: budgetMonth.format('YYYY/MM'),
    }
    let budgetUrl = `https://budget-backend-2xm2.onrender.com/api/budget/budget-by-date`;

    handleAPICall(budgetUrl, "POST", postObj).then(res => {
      if (res.status === "success") {
        setBudgetInfo(res.data[0]);
        setDateView(dayjs(budgetMonth, monthFormat).format('MMMM YYYY'));
        setLoading(false);
      }
      else {
        setLoading(false);
      }

    })
    let txnDetailUrl = `https://budget-backend-2xm2.onrender.com/api/transaction/txn-details`;
    handleAPICall(txnDetailUrl, "POST", postObj).then(res => {
      if (res.status === "success") {
        setExpenseList(res.expense);
        setExpense(res.expense.reduce((acc, curr) => {
          return acc + curr['amount'];
        }, 0));
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
  const onBudget = () => {
    navigate(`/budget/add`, { state: { propType: "Add New Budget" } })
  }

  useEffect(() => {
    onSubmit()
  }, [])

  return (
    <>

      <div className="top-strip-card">
        <div className="top-strip-left">
          <span className="top-strip-icon">
            <Link to='/dashboard' ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 40, cursor: 'pointer', color: 'black' }} /> </Link>
          </span>
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
          <Button type="primary" className="top-strip-button" style={{ backgroundColor: 'green' }} onClick={onBudget}>
            Add New Budget
          </Button>
        </div>
      </div>



      <div className="as-on-container">
        <div className="as-on-text">Budget Dashboard {dateView}</div>
      </div>
      <div className="info-card-row">




        <div className="info-card">
          <div className="info-card-icon">
            <svg id="SvgjsSvg1001" width={60} height={60} xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"><defs id="SvgjsDefs1002" /><g id="SvgjsG1008"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 512" width={60} height={60}><path fill="#918291" d="M351.25 36.79v437a30 30 0 0 1-29.94 30l-40.82.11-229.18.6a30 30 0 0 1-30.06-30v-437a30 30 0 0 1 29.94-30l270-.72a30 30 0 0 1 30.06 30.01Z" className="color918291 svgShape" /><path fill="#7a6d79" d="M351.25 208.43v265.36a30 30 0 0 1-29.94 30l-40.82.11-.38-.08c-.52-.1-1-.22-1.54-.35l-.32-.08c-.6-.15-1.2-.33-1.79-.52l-.32-.11c-.51-.17-1-.35-1.51-.54l-.33-.13c-.58-.23-1.16-.48-1.72-.74l-.15-.08c-.53-.24-1-.51-1.55-.78l-.29-.15a35.36 35.36 0 0 1-3.21-2l-.22-.16a34.59 34.59 0 0 1-3-2.42l-.15-.14a34.46 34.46 0 0 1-2.72-2.82l-.07-.09c-.41-.49-.82-1-1.2-1.5v-.05a34 34 0 0 1-3.71-6.25 33.61 33.61 0 0 1-2.3-7.09 157 157 0 0 1 32.42-131.1l15.12-18.43L321 304.57h4.73c-.66 0-1.3 0-1.94-.09l-.62-.08c-.43-.06-.86-.12-1.27-.2q-.36-.06-.72-.15c-.38-.08-.75-.18-1.12-.29l-.72-.22c-.37-.11-.72-.25-1.07-.39s-.46-.17-.69-.27c-.4-.17-.78-.36-1.16-.56s-.75-.4-1.11-.61l-.82-.5c-.29-.19-.57-.4-.84-.6l-.59-.44c-.29-.23-.57-.47-.85-.71l-.45-.41c-.3-.28-.59-.56-.86-.85l-.27-.29a20.28 20.28 0 0 1-3.45-5.15v-.09c-.21-.47-.41-.94-.59-1.43l-.06-.16a20.44 20.44 0 0 1 19.25-27.51h4.1l-30.48-51.81a8.59 8.59 0 0 1 4-12.26 8.35 8.35 0 0 1 5.36-.43h.17l25.76 6.73a83.11 83.11 0 0 0 16.56 2.63Z" className="color7a6d79 svgShape" /><rect width={60} height={45} x="66.25" y="236.76" fill="#f3f0f3" rx={10} className="colorf3f0f3 svgShape" /><rect width={60} height={45} x="66.25" y="326.76" fill="#f3f0f3" rx={10} className="colorf3f0f3 svgShape" /><rect width={60} height={45} x="66.25" y="414.57" fill="#f3f0f3" rx={10} className="colorf3f0f3 svgShape" /><rect width={60} height={45} x="156.25" y="236.76" fill="#f3f0f3" rx={10} className="colorf3f0f3 svgShape" /><rect width={60} height={45} x="246.25" y="236.76" fill="#f3f0f3" rx={10} className="colorf3f0f3 svgShape" /><rect width={60} height={45} x="156.25" y="326.76" fill="#f3f0f3" rx={10} className="colorf3f0f3 svgShape" /><rect width={60} height={45} x="156.25" y="414.57" fill="#f3f0f3" rx={10} className="colorf3f0f3 svgShape" /><rect width={60} height="132.81" x="246.25" y="326.76" fill="#f3f0f3" rx={10} className="colorf3f0f3 svgShape" /><path fill="#e2dee2" d="M296.25 459.57a10 10 0 0 0 10-10V336.76a10 10 0 0 0-4.72-8.49l-15.12 18.43a156.9 156.9 0 0 0-35.16 111.52 10 10 0 0 0 5 1.35Z" className="colore2dee2 svgShape" /><path fill="#fd4755" d="M126.25 199.5h-60a7.5 7.5 0 0 1 0-15h60a7.5 7.5 0 0 1 0 15Z" className="colorfd4755 svgShape" /><path fill="#fedf30" d="M216.25 199.5h-60a7.5 7.5 0 0 1 0-15h60a7.5 7.5 0 0 1 0 15Z" className="colorfedf30 svgShape" /><path fill="#22b37f" d="M306.25 199.5h-60a7.5 7.5 0 0 1 0-15h60a7.5 7.5 0 0 1 0 15Z" className="color22b37f svgShape" /><rect width={240} height={105} x="66.25" y="52.5" fill="#ffffff" rx={15} className="colorfff svgShape" /><path fill="#bc7c63" d="M411.74 264.28H359.8l-30.48-51.81a8.58 8.58 0 0 1 9.57-12.65l25.76 6.73a83.5 83.5 0 0 0 42.24 0l25.76-6.73a8.58 8.58 0 0 1 9.56 12.65Z" className="colorbc7c63 svgShape" /><path fill="#aa6a51" d="M432.65 199.82 412.82 205a8.38 8.38 0 0 1-.61 7.47l-30.47 51.81h30l30.47-51.81a8.58 8.58 0 0 0-9.56-12.65Z" className="coloraa6a51 svgShape" /><rect width="101.15" height="41.01" x="335.19" y="264.28" fill="#bc7c63" rx="20.5" className="colorbc7c63 svgShape" /><path fill="#aa6a51" d="M415.84 264.28h-10.27a20.35 20.35 0 0 1 .77 5.5 20.5 20.5 0 0 1-20.5 20.5H336a20.5 20.5 0 0 0 19.74 15h60.14a20.5 20.5 0 0 0 20.5-20.5 20.5 20.5 0 0 0-20.54-20.5Z" className="coloraa6a51 svgShape" /><path fill="#bc7c63" d="M454.84 505.19H316.69A33.39 33.39 0 0 1 284 478.51a156.94 156.94 0 0 1 32.42-131.1L351 305.28h69.6l34.56 42.13a157 157 0 0 1 32.42 131.1 33.39 33.39 0 0 1-32.74 26.68Z" className="colorbc7c63 svgShape" /><path fill="#aa6a51" d="m455.13 347.41-34.56-42.13h-17.7l22.26 27.13a157 157 0 0 1 32.42 131.1 33.39 33.39 0 0 1-32.71 26.68h-136a33.37 33.37 0 0 0 27.86 15h138.14a33.39 33.39 0 0 0 32.71-26.68 157 157 0 0 0-32.42-131.1Z" className="coloraa6a51 svgShape" /><path fill="#fedf30" d="M412.94 385.91h-8.08a37 37 0 0 0-6.58-14.64h14.66a7.5 7.5 0 1 0 0-15H358.6a7.5 7.5 0 0 0 0 15h9.88a22.17 22.17 0 0 1 20.83 14.64H358.6a7.5 7.5 0 0 0 0 15h30.71a22.17 22.17 0 0 1-20.83 14.64h-9.88a7.5 7.5 0 0 0-5.42 12.68l39.52 41.37a7.5 7.5 0 0 0 10.6.25 7.51 7.51 0 0 0 .24-10.61l-28-29.36a37.23 37.23 0 0 0 29.35-29h8.09a7.5 7.5 0 0 0 0-15Z" className="colorfedf30 svgShape" /></svg></g></svg>


          </div>
          <div className="info-card-content">
            <div className="info-card-label">Budget Set</div>
            <div className="info-card-value">₹ <CountUp delay={1} decimals={2} separator="," decimal="." end={budgetInfo?.amount} /></div>
          </div>
        </div>




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
            <div className="info-card-value">₹ <CountUp delay={1} decimals={2} separator="," decimal="." end={expense} /></div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-icon">
            <svg id="SvgjsSvg1032" width={60} height={60} xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"><defs id="SvgjsDefs1033" /><g id="SvgjsG1034"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 512" width={60} height={60}><circle cx={392} cy={120} r={100} fill="#e48e66" className="colore48e66 svgShape" /><path fill="#e2d574" d="M176.75 409.22v-4.44c0 24.08 48.81 43.61 109.02 43.61s109.03-19.53 109.03-43.61v43.61c0 24.09-48.81 43.61-109.03 43.61s-109.02-19.52-109.02-43.61Z" className="colore2d574 svgShape" /><path fill="#f8ec7d" d="M394.8 361.17v43.61c0 24.08-48.81 43.61-109.03 43.61s-109.02-19.53-109.02-43.61v-43.61c0 24.08 48.81 43.61 109.02 43.61s109.03-19.53 109.03-43.61Z" className="colorf8ec7d svgShape" /><path fill="#e2d574" d="M394.8 317.56v43.61c0 24.08-48.81 43.61-109.03 43.61s-109.02-19.53-109.02-43.61v-43.61c0 24.08 48.81 43.61 109.02 43.61s109.03-19.53 109.03-43.61Z" className="colore2d574 svgShape" /><path fill="#f8ec7d" d="M238.05 278.34a251.48 251.48 0 0 1 47.72-4.39c60.22 0 109.03 19.52 109.03 43.61s-48.81 43.61-109.03 43.61-109.02-19.53-109.02-43.61c0-17.24 25.01-32.14 61.3-39.22Z" className="colorf8ec7d svgShape" /><path fill="#f8ec7d" d="M238.05 239.16v39.18c-36.29 7.08-61.3 21.98-61.3 39.22V322a251.636 251.636 0 0 1-47.72 4.39C68.81 326.39 20 306.86 20 282.77v-43.61c0 24.09 48.81 43.61 109.03 43.61s109.02-19.52 109.02-43.61Z" className="colorf8ec7d svgShape" /><path fill="#e2d574" d="M238.05 195.55v43.61c0 24.09-48.81 43.61-109.02 43.61S20 263.25 20 239.16v-43.61c0 24.09 48.81 43.61 109.03 43.61s109.02-19.52 109.02-43.61Z" className="colore2d574 svgShape" /><path fill="#f8ec7d" d="M238.05 151.94v43.61c0 24.09-48.81 43.61-109.02 43.61S20 219.64 20 195.55v-43.61c0 24.09 48.81 43.61 109.03 43.61s109.02-19.52 109.02-43.61Z" className="colorf8ec7d svgShape" /><path fill="#e2d574" d="M238.05 108.33v43.61c0 24.09-48.81 43.61-109.02 43.61S20 176.03 20 151.94v-43.61c0 24.09 48.81 43.61 109.03 43.61s109.02-19.52 109.02-43.61Z" className="colore2d574 svgShape" /><path fill="#f8ec7d" d="M129.03 64.72c60.21 0 109.02 19.53 109.02 43.61s-48.81 43.61-109.02 43.61S20 132.42 20 108.33s48.81-43.61 109.03-43.61zm47.72 343.99v.51a251.636 251.636 0 0 1-47.72 4.39C68.81 413.61 20 394.08 20 370v-43.61C20 350.47 68.81 370 129.03 370a251.636 251.636 0 0 0 47.72-4.39v43.1z" className="colorf8ec7d svgShape" /><path fill="#e2d574" d="M176.75 361.17v4.44a251.636 251.636 0 0 1-47.72 4.39C68.81 370 20 350.47 20 326.39v-43.62c0 24.09 48.81 43.62 109.03 43.62a251.636 251.636 0 0 0 47.72-4.39Z" className="colore2d574 svgShape" /><path fill="#63316d" d="M392 14a106 106 0 1 0 106 106A106.121 106.121 0 0 0 392 14Zm0 200a94 94 0 1 1 94-94 94.106 94.106 0 0 1-94 94Z" className="color63316d svgShape" /><path fill="#63316d" d="M430.265 68h.066a5.887 5.887 0 0 0 6-5.8 5.809 5.809 0 0 0-5.934-5.838L376.176 56l-21.741-1h-.065a6.2 6.2 0 0 0-6 6.162 6.1 6.1 0 0 0 5.937 6.176l21.737.285a26.655 26.655 0 0 1 25.679 20.883L354.085 88h-.066a6.015 6.015 0 0 0-.065 12.03l47.629.519a26.869 26.869 0 0 1-25.8 20.494l-22.05-.043h-.063a5.8 5.8 0 0 0-4.167 10.039l53.78 51.873a6.014 6.014 0 0 0 8.334-8.673l-42.929-41.377 6.722.138h.37a38.756 38.756 0 0 0 38.025-32.174l16.112.174h.064a6.053 6.053 0 0 0 .063-12.105l-16.1-.191a38.939 38.939 0 0 0-9.977-20.847zM365.2 281.15c-21.283-8.512-49.53-13.2-79.4-13.2a260.383 260.383 0 0 0-41.8 3.241V108.33c0-14.267-12.655-27.195-35.677-36.406-21.285-8.515-49.441-13.2-79.305-13.2s-58.035 4.689-79.32 13.2C26.673 81.135 14 94.063 14 108.33V370c0 14.267 12.68 27.195 35.7 36.406 21.285 8.515 49.583 13.2 79.451 13.2A270.452 270.452 0 0 0 171 416.369v32.021c0 14.27 12.555 27.2 35.578 36.41 21.281 8.512 49.387 13.2 79.254 13.2s58.112-4.688 79.395-13.2C388.251 475.591 401 462.66 401 448.39V317.56c0-14.271-12.78-27.201-35.8-36.41zM129.03 70.72c60.711 0 103.02 19.821 103.02 37.61 0 8.9-10.264 18.109-28.159 25.268-19.9 7.96-46.485 12.342-74.861 12.342C68.313 145.94 26 126.119 26 108.33s42.313-37.61 103.03-37.61zM26 131.042c5.883 5.124 13.841 9.753 23.7 13.7 21.283 8.512 49.455 13.2 79.326 13.2s58.011-4.688 79.292-13.2c9.862-3.945 17.678-8.575 23.678-13.7v20.9c0 8.9-10.239 18.11-28.134 25.268-19.9 7.959-46.471 12.342-74.848 12.342C68.3 189.55 26 169.729 26 151.94zm0 43.61c5.883 5.123 13.841 9.753 23.7 13.7 21.283 8.512 49.455 13.2 79.326 13.2s58.011-4.688 79.292-13.2c9.862-3.945 17.678-8.575 23.678-13.7v20.9c0 8.9-10.239 18.109-28.134 25.267-19.9 7.96-46.472 12.343-74.848 12.343C68.3 233.16 26 213.339 26 195.55zm0 43.61c5.883 5.123 13.841 9.753 23.7 13.7 21.283 8.512 49.455 13.2 79.326 13.2s58.011-4.688 79.292-13.2c9.862-3.945 17.678-8.575 23.678-13.7v20.9c0 8.9-10.239 18.11-28.134 25.268-19.9 7.959-46.471 12.342-74.848 12.342C68.3 276.77 26 256.949 26 239.16zm0 43.61c5.883 5.123 13.841 9.752 23.7 13.7 21.283 8.513 49.455 13.2 79.326 13.2s58.011-4.688 79.292-13.2C218.184 271.625 226 267 232 261.871v11.59c-38 8.339-60.805 24.415-61.252 43.525a248.163 248.163 0 0 1-41.73 3.4C68.3 320.39 26 300.563 26 282.77zm0 43.611c5.883 5.125 13.841 9.755 23.7 13.7 21.285 8.515 49.582 13.2 79.452 13.2A270.462 270.462 0 0 0 171 329.149V360.6a248.21 248.21 0 0 1-41.845 3.4C68.438 364 26 344.179 26 326.39zM26 370v-20.9c5.883 5.123 13.841 9.753 23.7 13.7 21.285 8.515 49.583 13.2 79.451 13.2A270.462 270.462 0 0 0 171 372.759v31.45a248.2 248.2 0 0 1-41.845 3.4C68.438 407.61 26 387.789 26 370zm334.74 103.658c-19.9 7.959-46.414 12.342-74.8 12.342C225.234 486 183 466.179 183 448.39v-20.9c6 5.123 13.715 9.752 23.577 13.7 21.284 8.514 49.391 13.2 79.255 13.2s58.11-4.69 79.395-13.2c9.863-3.946 17.773-8.575 23.773-13.7v20.9c0 8.9-10.364 18.11-28.26 25.268zM286 442.39c-60.716 0-103-19.821-103-37.61v-20.9c6 5.123 13.715 9.752 23.577 13.7 21.285 8.515 49.391 13.2 79.255 13.2s58.11-4.689 79.395-13.2C375.09 393.63 383 389 389 383.877v20.9c0 17.792-42.289 37.613-103 37.613zm0-43.61c-60.716 0-103-19.821-103-37.61v-20.9c6 5.123 13.715 9.752 23.577 13.7 21.285 8.514 49.391 13.2 79.255 13.2s58.11-4.69 79.395-13.2c9.863-3.95 17.773-8.58 23.773-13.703v20.9c0 17.792-42.289 37.613-103 37.613zm-.225-43.61c-60.711 0-103.02-19.821-103.02-37.61 0-13.349 22.685-26.744 56.448-33.331a244.271 244.271 0 0 1 46.572-4.279c60.716 0 103.03 19.821 103.03 37.61s-42.319 37.61-103.035 37.61z" className="color63316d svgShape" /></svg></g></svg>
          </div>
          <div className="info-card-content">
            <div className="info-card-label">Remainings</div>
            <div className="info-card-value">₹ <CountUp delay={1} decimals={2} separator="," decimal="." end={budgetInfo?.amount > expense ? budgetInfo?.amount - expense : 0} /></div>


          </div>
        </div>

        <div className="info-card">
          <div className="info-card-icon">
            <svg id="SvgjsSvg1049" width={60} height={60} xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" ><defs id="SvgjsDefs1050" /><g id="SvgjsG1051"><svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 512 512" width={60} height={60}><g data-name="&lt;Group&gt;"><polygon fill="#ed664c" points="451.3 201.04 507.69 282.76 394.91 282.76 451.3 201.04" className="colored664c svgShape" /><ellipse cx={256} cy={256} fill="#fdc75b" rx={120} ry="119.71" className="colorfdc75b svgShape" /><polygon fill="#fdc75b" points="117.09 229.24 60.7 310.96 4.31 229.24 117.09 229.24" className="colorfdc75b svgShape" /><path d="M457.061 197.064a7 7 0 0 0-11.522 0l-56.39 81.72a7 7 0 0 0 5.761 10.976h47.22c-15.106 98.9-107.511 159.84-186.5 159.84-55.812 0-115-30.013-150.785-76.462a7 7 0 0 0-11.09 8.544 213.783 213.783 0 0 0 74.178 60.5c28.278 14.015 58.6 21.423 87.7 21.423 44.484 0 91.3-17.364 128.452-47.64 39.7-32.356 65.223-77.036 72.2-126.2h51.4a7 7 0 0 0 5.761-10.976zm-48.816 78.7L451.3 213.365l43.055 62.395zM123.60 225.987a7 7 0 0 0-6.2-3.747H69.869C84.977 123.34 177.382 62.4 256.37 62.4c55.812 0 115 30.013 150.785 76.462a7 7 0 0 0 11.09-8.544 213.783 213.783 0 0 0-74.178-60.5c-28.278-14.015-58.6-21.423-87.7-21.423-44.484 0-91.3 17.364-128.452 47.64C88.217 128.4 62.7 173.076 55.713 222.24H4.31a7 7 0 0 0-5.761 10.976l56.39 81.72a7 7 0 0 0 11.522 0l56.39-81.72A7 7 0 0 0 123.60 225.987zM60.7 298.635L17.645 236.24h86.11z" /><path d="M129,256c0,69.868,56.972,126.71,127,126.71S383,325.868,383,256,326.028,129.29,256,129.29,129,186.132,129,256Zm240,0c0,62.148-50.691,112.71-113,112.71S143,318.148,143,256s50.691-112.71,113-112.71S369,193.852,369,256Z" /><path d="M214.28,185a7,7,0,1,0,0,14h23.88A28.847,28.847,0,0,1,266.1,220.8H214.28a7,7,0,0,0,0,14h51.827a28.827,28.827,0,0,1-27.947,21.8H214.28a7,7,0,0,0-4.808,12.088l59.68,56.4a7,7,0,0,0,9.617-10.175L231.879,270.6h6.282a42.795,42.795,0,0,0,42.223-35.8h17.338a7,7,0,0,0,0-14H280.38A42.693,42.693,0,0,0,269.8,199h27.927a7,7,0,0,0,0-14H214.28Z" /></g></svg></g></svg>
          </div>
          <div className="info-card-content">
            <div className="info-card-label">Total Usage</div>
            <div className="info-card-value"><CountUp delay={1} decimals={2} separator="," decimal="." end={Math.round((expense / budgetInfo?.amount) * 100)} /> %</div>
          </div>
        </div>
      </div>



      <div className="edit-budget-text" onClick={() => {
        navigate(`/budget/edit/${budgetInfo._id}`, { state: { propType: "Edit Budget" } })
      }

      }>Edit {budgetInfo?.title} budget</div>


      <div style={{ display: 'flex' }}>
        {budgetInfo?.amount != undefined &&
          <DonutChart usedPercent={Math.round((expense / budgetInfo?.amount) * 100)} totalBudget={budgetInfo?.amount} title={`Budget Usage ${dateView}`} />
        }
        <BarChart chartData={expenseList.map(({ amount, category, ...rest }) => ({
          value: amount,
          name: category
        }))} xLabel={'Expense Category'} yLabel={'Expense Amount'} title={`Expense Summary ${dateView}`} />
      </div>



      {loading && <div className="loader-wrapper">
        <div className="loader"></div>
      </div>
      }
    </>
  );
};

export default Budget;


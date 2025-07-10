
import { useEffect, useContext, useState, useRef } from "react";
import { Form, Input, Button } from "antd";
import "../css/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faUser} from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import { handleAPICall, notificationDisplay } from "../components/Utils.js";
import { useNavigate } from "react-router-dom";
// import QrScanner from 'path/to/qr-scanner.min.js'; // if using plain es6 import
// import QrScanner from 'qr-scanner'; 
import { Scanner } from '@yudiel/react-qr-scanner';

function Login() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    setSubmitLoading(true);
    let url = `https://budget-backend-2xm2.onrender.com/api/users/login`;
    let postObj = {
      email: values.email,
      password: values.password,
    }
    handleAPICall(url, "POST", postObj).then(res => {
      setSubmitLoading(false);
      if (res.status === "success") {
        navigate('/dashboard');
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.name);
      }
      else {
        notificationDisplay("error", res.message);
        setSubmitLoading(false);
        form.resetFields();
      }
    }).catch((err) => {
      console.log(err.message)
    })

  }

  useEffect(() => {
    document.title = "Welcome to Budget Manager";
    if (localStorage.getItem('token') === null) navigate('/login');
    if (localStorage.getItem('token') != null) navigate('/dashboard');
  }, []);

// const videoRef = React.useRef()

//   const qrScanner = new QrScanner(
//     videoRef.current,
//     result => console.log('decoded qr code:', result),
//     { /* your options or returnDetailedScanResult: true if you're not specifying any other options */ },
// );



  return (
    <div className="login-background" >

<Scanner onScan={(result) => console.log(result)} />;


{/* 


<video ref={videoRef}></video>


<button onClick={()=>{
  qrScanner.start();

}}>button</button> */}













      <div className="login-box">
        <div className="login-box-text">
          <div className="login-box-text-header">
            Budget Manager
          </div>
          <div className="login-box-text-subheader">
            Please Login
          </div>

         
        </div>

        <div className="login-box-form">
          <Form
            layout="vertical"
            name="normal_login"
            className="login-form"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
              
                const tag = e.target.tagName.toLowerCase();
                if (tag !== 'textarea') {
                  e.preventDefault();
                  form.submit()
                }
              }
            }}
          >
            <div style={{ marginBottom: 12 }}>Enter your details</div>

            <Form.Item
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                suffix={<FontAwesomeIcon icon={faUser} className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-box-form-button"
                loading={submitLoading}
              >
                Continue
              </Button>
            </Form.Item>
          </Form>

          <span className="login-copyright">All Rights Reserved {dayjs().get('year')}</span>
        </div>


      </div>

    </div>
  )
}

const styles = {
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    margin: "2px 0",
  },
  otpInput: {
    width: "25px",
    height: "25px",
    fontSize: "16px",
    textAlign: "center",
    border: "1px solid #b4b0b0",
    borderRadius: "4px",
    outline: "none",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: '8px',
    background: '#fff'
  },
  card: {

    fontFamily: 'Exo, sans-serif',
    textAlign: "center",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    width: "90%",
    maxWidth: "350px",
  },
  icon: {
    fontSize: "40px",
    marginBottom: "10px",
  },
  title: {
    color: "#333",
  },
  text: {
    color: "#555",
  },
};
export default Login;

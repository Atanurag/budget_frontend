
import { useEffect, useContext, useState, useRef } from "react";
//import { useHistory } from "react-router-dom";
import { Form, Input, Button, Card, Typography, Cascader, Select } from "antd";
import "../css/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUser, faCity, faRandom } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import { handleAPICall, notificationDisplay } from "../components/Utils.js";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
   
    let url = `https://6d4e0550-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/users/login`;
    let postObj = {
      email: values.email,
      password: values.password,
    }
    handleAPICall(url, "POST", postObj).then(res => {
      if (res.status === "success") {
        navigate('/dashboard');
        localStorage.setItem('token', res.token);
        localStorage.setItem('name', res.user.name);
      }
      else {
        notificationDisplay("info", res.message)
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

  return (
    <div className="login-background" >

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
              // loading={isLoginClicked}
              // disabled={isLoginClicked}
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
    //height: "100vh",
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

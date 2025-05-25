
import { useEffect, useContext, useState, useRef } from "react";
//import { useHistory } from "react-router-dom";
import { Form, Input, Button,Card,Typography,Cascader,Select} from "antd";
import "../css/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faUser, faCity } from "@fortawesome/free-solid-svg-icons";
import dayjs from 'dayjs';
import { handleAPICall, notificationDisplay } from "../components/Utils.js";

function Login() {



    //console.log(localStorage.getItem('customer_token') !== null)
    
    // const onFinish = (values) => {
    //     const url = `${urlOrigin}/api-token-auth/`;
    //     let postObj = {
    //         username : values.username,
    //         password: values.password
    //     }

    //     handleAPICall(url,"POST",postObj).then(res => {
    //         if(res.status && res.status.toLowerCase() === "success"){
    //             localStorage.setItem('token',res.token);
    //             localStorage.setItem('userName',res.user_name);
    //             localStorage.setItem('email',res.email);
    //             localStorage.setItem('phone','9998887770');
    //             history.push('/dashboard');

    //             //setShowOtpForm(true)

    //         }
    //     })        
    // };

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        otpformRef.current.submit(); 
      }
      
    };
  
    const onFinish = (values) => {
        //notificationDisplay('error', 'success')
        //console.log('clicked')
        //setShowOtpForm(true)
           //let url = `${urlOrigin}/api/v1/user/user-verification-with-password/ `;
           //if user coms back from otp and edited the number then as of flow
           
           setIsLoginClicked(true);
           //let url1 = `${urlOrigin}/api/v1/mob_app/register-customer/`;
           let url = `${urlOrigin}/api/v1/mob_app/customer-login/`;
           
          // setGlobalUsname(values.username)
          // setCustomerMobile(values.number);
          // let postObjCustOnb = {
          //   "mobile_number": values.number,
          //   "name": values.customer_name == undefined ? '' : values.customer_name,
          //   city: values.city == undefined ? '' : values.city,
          //   //"vehicle_type": 3,
          // }
          let postObjOtp = {
            mobile_number: values.number,
        }
       // setCustomerMobile(values.number);
        // setIsLoginClicked(true);
        handleAPICall(url, "POST", postObjOtp).then(res => {
            if (res.status === "success") {
              setShowOtpForm(true);
              setIsLoginClicked(false);
              notificationDisplay(res.status, res.message);
              //   handleAPICall(url, "POST", postObjOtp).then(res => {
              //     if (res.status === "success") {
              //         setShowOtpForm(true);
              //         setIsLoginClicked(false);
              //         notificationDisplay(res.status, res.message);
              //     }
              //     else {
              //         notificationDisplay("error", res.message);
              //         setIsLoginClicked(false);
              //     }
              // })
            }
            else {
              notificationDisplay("info", res.message)
              setIsLoginClicked(false);
            }
        }).catch((err) =>{
          setIsLoginClicked(false);
          //setShowOtpForm(true);
          //notificationDisplay("error",err.message);
  
        })
          
    }

    
      
    // Let the user skip the login if they already have a token set
    useEffect(() => {
        document.title = "Welcome to Budget Manager";
      
    }, []);
  
    return (
        <div className="login-background" >

          <div className="login-box">
                          {/* <Avatar className="company-logo" src={"/src/assets/img/fuelsense.png"} alt={`${clientImageName} logo`} size={136} /> */}
                          <div className="login-box-text">
                          <div className="login-box-text-header">
                                 Budget Manager
                              </div>
                              <div className="login-box-text-subheader">
                                  Please Login
                              </div>
                              
                              {/* <div style={{fontSize:16,fontWeight:400}}>30 powerful years of energising India!</div>
                              <div style={{display:'flex',justifyContent:'space-between'}}>
                                  <p>
                                      <span style={{color:'#0068AC',fontWeight:700,display:'block'}}>2000+ </span>Dealer Network
                                  </p>
                                  <p><span style={{color:'#0068AC',fontWeight:700, display:'block'}}>277+</span> Auto LPG Station</p>
                                  <p><span style={{color:'#0068AC',fontWeight:700, display:'block'}}>350+</span> Own Fleet of Tankers</p>
                                  <p><span style={{color:'#0068AC',fontWeight:700, display:'block'}}>1M+ </span>Satisfied Customers</p>
                              </div> */}
                          </div>
                          
                          <div className="login-box-form">
                              <Form
                              layout="vertical"
                                  name="normal_login"
                                  className="login-form"
                                  initialValues={{
                                      remember: true,
                                  }}
                                  onFinish={onFinish}
                              >
                                  <div style={{ marginBottom: 12 }}>Enter your details</div>
                                
                                  <Form.Item
                                  label={'Phone number'}
                                      name="number"
                                      rules={[
                                          {
                                              required: true,
                                              message: 'Please enter your Phone Number!',
                                          },
                                      ]}
                                      style={{ marginBottom:10}}
                                      // rules={[{ validator: async () => Promise.resolve() }]}
                                  >
                                      <Input
                                      type='tel'
                                      tabIndex={0}
                                      prefix={<span>+91</span>}
                                      suffix={<FontAwesomeIcon icon={faPhone}
                                      className="site-form-item-icon" />}
                                      
                                      onKeyDown={(event) => {
                                        const isNumericKey = /[0-9.]/.test(event.key);
                                        const isControlKey = event.key === "Backspace" || event.key === "Delete" || event.ctrlKey || event.metaKey;
                                        const isTabKey = event.key === "Tab";
                                        const inputValue = event.target.value;
                                        const hasDot = inputValue.includes('.');
                                    
                                        if ((!isNumericKey && !isControlKey && !isTabKey) || (event.key === '.' && hasDot)) {
                                            event.preventDefault();
                                        }
                                    }}
                                          // onKeyDown={(event) => {
                                          //     if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete") { event.preventDefault(); }
                                          // }} 
                                          
                                          />
                                  </Form.Item>
                                  <Form.Item
                                  label='Password'
                                      name="password"
                                      style={{ marginBottom:18}}
                                  >
          <Input/>

                                  </Form.Item>
                                  <Form.Item>
                                      <Button type="primary" htmlType="submit" 
                                    //   loading={isLoginClicked} disabled={isLoginClicked}
                                       className="login-box-form-button">
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
    borderRadius:'8px',
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

// const styles = {

//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     //height: "100vh",
//     borderRadius:'8px',
//     background: '#fff'
//   },
//   card: {
   
//   fontFamily: 'Exo, sans-serif',
//     textAlign: "center",
//     padding: "20px",
//     borderRadius: "10px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//     width: "90%",
//     maxWidth: "350px",
//   },
//   icon: {
//     fontSize: "40px",
//     marginBottom: "10px",
//   },
//   title: {
//     color: "#333",
//   },
//   text: {
//     color: "#555",
//   },
// };
export default Login;

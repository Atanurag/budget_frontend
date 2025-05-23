import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, Form, Input, Select, Card, Col, Row, DatePicker, TimePicker } from 'antd';
import { useParams, useLocation, useNavigate, } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { handleAPICall, notificationDisplay } from "../components/Utils";
import dayjs from 'dayjs';
import '../css/Transaction.css';
const BudgetManagement = () => {

  
    const [form] = Form.useForm();
    const { budgetId } = useParams();
    const location = useLocation();
    const navigate = useNavigate()
    const propType = location.state?.propType || 'Add New Budget';
    // const backToUnloadingTankManagement = () => {
    //     history.push('/profile/unloading-tank-management');
    // };
    
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [budgetDetail, setBudgetDetail] = useState();
    useEffect(() => {
        if (budgetId) {
            const budgetUrl = `https://6d4e0550-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/budget/${budgetId}`;
            handleAPICall(budgetUrl, "GET").then(res => {
                setBudgetDetail(res.data);
                console.log(res)
            });
        }
    }, [])
    useEffect(() => {
        form.setFieldsValue({
            title:budgetDetail?.title,
            amount: budgetDetail?.amount,
            date:  dayjs(budgetDetail?.date)
        })
    }, [form, budgetDetail])
    
    const onFinish = (values) => {
        setSubmitLoading(true);
        setSubmitDisabled(true);
        let budgetUrl = `https://6d4e0550-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/budget/`;
        const postObj = {
            title: values.title,
            amount: values.amount,
            date: values.date.format('YYYY/MM'),
        }
        if (budgetId) {
            budgetUrl = `https://6d4e0550-535f-4581-9751-7162b32bf5da-00-7br79xy2c9sc.sisko.replit.dev/api/budget/${budgetId}`;
        }
        
        let method = budgetId ? "PUT" : "POST"
        handleAPICall(budgetUrl, method, postObj).then(res => {
            setSubmitLoading(false);
            setSubmitDisabled(false);
            if (res.status === "success") {
                console.log(res.message)
                notificationDisplay("success", res.message);
                navigate(-1);
            }
            else {
                notificationDisplay("error", res.message);
            }
        })
    };
   
    
    const disabledDate = (current) => {
        return current && current.isBefore(dayjs().startOf("month"), "month");
      };
    return (
        <div className="dashboard-container">
            <Row className="dashboard-filter">
                <Col span={24}>
                    <Card className="org-header-container">
                        <div className="org-header-text"> <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigate(-1)} style={{ marginRight: 40, cursor: 'pointer' }} />
                            {propType} {budgetDetail?.title}
                        </div>
                    </Card>
                </Col>
            </Row>
            <Row style={{ marginTop: 18 }}>
                <Col span={24}>
                    <Card style={{ padding: 25 }}>
                        <Form
                            form={form}
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 14,
                            }}
                            layout="horizontal"
                            style={{
                                maxWidth: 600, margin: 'auto'
                            }}
                            
                            onFinish={onFinish}
                        >
                            <Form.Item label="Title" name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your title!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Amount" name="amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your amount!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input onKeyDown={(event) => {
                                    if (!/[0-9]/.test(event.key) && event.key !== "Backspace" && event.key !== "Delete" && event.key !== ".") { event.preventDefault(); }
                                }} />
                            </Form.Item>
                           
                            <Form.Item label="Date" name="date"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your date!',
                                    },
                                ]}
                                hasFeedback
                            >
                                <DatePicker  disabledDate={disabledDate} picker="month" style={{ width: '100%' }} />
                            </Form.Item>
                          
                            
                            <Form.Item wrapperCol={{ span: 14, offset: 11 }}>
                                <Button htmlType="submit" //loading={submitLoading} disabled={submitDisabled}
                                >Submit</Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
export default BudgetManagement;
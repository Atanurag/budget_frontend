import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, Card, Col, Row, DatePicker, TimePicker } from 'antd';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { handleAPICall, notificationDisplay } from "../components/Utils";
import dayjs from 'dayjs';
import '../css/Transaction.css';
import '../css/Loading.css';
const monthFormat = 'YYYY/MM';
const BudgetManagement = () => {


    const [form] = Form.useForm();
    const { budgetId } = useParams();
    const location = useLocation();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const propType = location.state?.propType || 'Add New Budget';
    const [budgetDetail, setBudgetDetail] = useState();
    useEffect(() => {
        if (budgetId) {
            setLoading(true);
            const budgetUrl = `https://budget-backend-2xm2.onrender.com/api/budget/${budgetId}`;
            handleAPICall(budgetUrl, "GET").then(res => {
                setBudgetDetail(res.data);
                setLoading(false);
            });
        }
        if (localStorage.getItem('token') === null) navigate('/login');
    }, [])
    useEffect(() => {
        form.setFieldsValue({
            title: budgetDetail?.title,
            amount: budgetDetail?.amount,
            date: dayjs(budgetDetail?.date)
        })
    }, [form, budgetDetail])

    const onFinish = (values) => {
        setSubmitLoading(true);
        let budgetUrl = `https://budget-backend-2xm2.onrender.com/api/budget/`;
        const postObj = {
            title: values.title,
            amount: values.amount,
            date: values.date.format('YYYY/MM'),
        }
        if (budgetId) {
            budgetUrl = `https://budget-backend-2xm2.onrender.com/api/budget/${budgetId}`;
        }

        let method = budgetId ? "PUT" : "POST"
        handleAPICall(budgetUrl, method, postObj).then(res => {
            setSubmitLoading(false);
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
        <>
            <div className="dashboard-container">
                <Row className="dashboard-filter">
                    <Col span={24}>
                        <Card className="org-header-container">
                            <div className="org-header-text"> <Link to='/budget' ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 40, cursor: 'pointer', color: 'black' }} /> </Link>
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
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {

                                        const tag = e.target.tagName.toLowerCase();
                                        if (tag !== 'textarea') {
                                            e.preventDefault();
                                            form.submit();
                                        }
                                    }
                                }}
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
                                    <DatePicker disabledDate={disabledDate} picker="month" format={monthFormat} style={{ width: '100%' }} />
                                </Form.Item>


                                <Form.Item wrapperCol={{ span: 14, offset: 11 }}>
                                    <Button htmlType="submit" loading={submitLoading} >Submit</Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
            {loading && <div className="loader-wrapper">
                <div className="loader"></div>
            </div>
            }</>
    );
};
export default BudgetManagement;
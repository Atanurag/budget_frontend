import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button, Form, Input, Select, Card, Col, Row, DatePicker, TimePicker } from 'antd';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { handleAPICall, notificationDisplay } from "../components/Utils";
import dayjs from 'dayjs';
import '../css/Transaction.css';
import '../css/Loading.css';
const TransactionManagement = () => {
    const monthFormat = 'YYYY/MM';

    const [form] = Form.useForm();
    const { transactionId } = useParams();
    const location = useLocation();
    const navigate = useNavigate()
    const propType = location.state?.propType || 'Add New Transaction';
    const [txnDetail, setTxnDetail] = useState();
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    useEffect(() => {
        if (transactionId) {
            setLoading(true);
            const txnUrl = `https://budget-backend-2xm2.onrender.com/api/transaction/${transactionId}`;
            handleAPICall(txnUrl, "GET").then(res => {
                setTxnDetail(res.data);
                setLoading(false);
            });
        }
        if (localStorage.getItem('token') === null) navigate('/login');
    }, [])
    useEffect(() => {
        form.setFieldsValue({
            title: txnDetail?.title,
            amount: txnDetail?.amount,
            type: txnDetail?.type,
            category: txnDetail?.category,
            date: dayjs(txnDetail?.date)
        })
    }, [form, txnDetail])

    const onFinish = (values) => {
        setSubmitLoading(true);
        let TransactionUrl = `https://budget-backend-2xm2.onrender.com/api/transaction/`;
        const postObj = {
            title: values.title,
            amount: values.amount,
            type: values.type,
            category: values.category,
            date: values.date.format('YYYY/MM'),
        }
        if (transactionId) {
            TransactionUrl = `https://budget-backend-2xm2.onrender.com/api/transaction/${transactionId}`;
        }

        let method = transactionId ? "PUT" : "POST"
        handleAPICall(TransactionUrl, method, postObj).then(res => {
            setSubmitLoading(false);
            if (res.status === "success") {
                notificationDisplay("success", res.message);
                navigate(-1)
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
                            <div className="org-header-text"> <Link to='/dashboard' ><FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 40, cursor: 'pointer', color: 'black' }} /> </Link>
                                {propType} {txnDetail?.title}
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
                                <Form.Item label="Type" name="type"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select your type!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Select
                                        showSearch
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        options={[{ value: 'income', label: 'Income' }, { value: 'expense', label: 'Expense' }]}
                                    />
                                </Form.Item>
                                <Form.Item label="Category" name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your category!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Amount(₹)" name="amount"
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
                                    <Button htmlType="submit" loading={submitLoading}>Submit</Button>
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
export default TransactionManagement;
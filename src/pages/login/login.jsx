import React, {Component} from "react"

import "./login.less"
import logo from "../../assets/images/logo.png"
import {Redirect} from "react-router-dom"
import {
    Form,
    Icon,
    Input,
    Button,
    message
} from 'antd'
import {reqLogin} from "../../api"
import memoryUtil from "../../utils/memory-util"
import storageUtil from "../../utils/storage-util"

class Login extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                const {username, password}=values
                const result = await reqLogin(username, password)
                if (result.status === 0) {
                    message.success("登录成功")
                    const user=result.data
                    memoryUtil.user = user
                    storageUtil.saveUser(user)
                    this.props.history.push("/")
                } else {
                    message.error("登录失败：" + result.msg)
                }
            }
        });
    }

    render() {
        const user = memoryUtil.user
        if (user && user._id) {
            return <Redirect to="/"/>
        }

        const {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>Rect项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                getFieldDecorator("username", {
                                    rules: [
                                        {required: true, message: '请输入用户名'},
                                        {min: 4, message: '最少4位'},
                                        {max: 8, message: '最多8位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'},
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password", {
                                    rules: [
                                        {required: true, message: '请输入用户名'},
                                        {min: 4, message: '最少4位'},
                                        {max: 8, message: '最多8位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数组或下划线组成'},
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default Form.create()(Login)
import React, {PureComponent} from "react"
import {Form, Select, Input} from "antd"
import PropTypes from "prop-types"
const Option = Select.Option
const Item = Form.Item

class UserFrom extends PureComponent {

    static propTypes = {
        roles: PropTypes.array.isRequired,
        setForm: PropTypes.func.isRequired,
        flag: PropTypes.number.isRequired,
        user: PropTypes.object
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator}=this.props.form
        const {roles, user, flag}=this.props
        console.log(user, flag)
        return (
            <Form labelCol={{span: 4}} wrapperCol={{span: 16}}>
                <Item label="用户名：">
                    {
                        getFieldDecorator("username", {
                            initialValue: flag === 2 ? user.username : "",
                            rules: [{required: true, message: '用户名称必填！'}]
                        })(
                            <Input placeholder="请输入用户名"/>
                        )
                    }
                </Item>
                <Item label="密码：" style={{display:flag == 2 ? 'none' : "block"}}>
                    {
                        getFieldDecorator("password", {
                            initialValue: flag == 2 ? user.password : "",
                            rules: [{required: true, message: '密码必填！'}]
                        })(
                            <Input placeholder="请输入密码" type="password"/>
                        )
                    }
                </Item>
                <Item label="手机号：">
                    {
                        getFieldDecorator("phone", {
                                initialValue: flag == 2 ? user.phone : "",
                                rules: [{required: true, message: '手机号必填！'}]
                            }
                        )(
                            <Input placeholder="请输入手机号" type="phone"/>
                        )
                    }
                </Item>
                <Item label="邮箱：">
                    {
                        getFieldDecorator("email", {
                                initialValue: flag == 2 ? user.email : "",
                                rules: [{required: true, message: '邮箱必填！'}]
                            }
                        )(
                            <Input placeholder="请输入邮箱" type="email"/>
                        )
                    }
                </Item>
                <Item label="角色：">
                    {
                        getFieldDecorator("role_id", {
                            initialValue: flag == 2 ? user.role_id : "",
                            rules: [{required: true, message: '角色必填！'}]
                        })(
                            <Select>
                                {
                                    roles.map(item => (<Option value={item._id} key={item._id}>{item.name}</Option>))
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UserFrom)
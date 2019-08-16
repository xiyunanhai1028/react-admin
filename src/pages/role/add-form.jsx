import React, {Component} from "react"
import {Form, Input} from "antd"
import PropTypes from "prop-types"
const Item = Form.Item
class AddForm extends Component {

    static propType = {
        setForm: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {getFieldDecorator}=this.props.form
        return (
            <Form>
                <Item label="角色名称" labelCol={{span: 4}} wrapperCol={{span: 16}}>
                    {
                        getFieldDecorator(
                            "roleName", {
                                rules: [
                                    {required: true, message: "角色名称必须输入"}
                                ]
                            }
                        )(<Input placeholder="请输入角色名称"/>)
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(AddForm)
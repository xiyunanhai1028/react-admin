import React, {Component} from "react"
import PropTypes from "prop-types"
import {Form, Select, Input} from 'antd'
const Item = Form.Item
class UpdateForm extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }

    render() {
        const {categoryName}=this.props
        const {getFieldDecorator} = this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator("categoryName", {
                            rules: [{required: true, message: '请输入分类名称!'}],
                            initialValue:categoryName
                        })(
                            <Input
                                placeholder="请输入分类名称"
                            />
                        )
                    }
                </Item>

            </Form>
        )
    }
}

export default Form.create()(UpdateForm)
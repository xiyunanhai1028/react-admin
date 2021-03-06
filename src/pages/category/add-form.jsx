import React, {Component} from "react"
import PropTypes from "prop-types"
import {Form, Select, Input} from 'antd'
const Item = Form.Item
const {Option} = Select
class AddForm extends Component {
    static propTypes = {
        category: PropTypes.array.isRequired,
        parentId: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const {category, parentId}=this.props
        const {getFieldDecorator} = this.props.form
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator("parentId", {initialValue:parentId})(
                            <Select>
                                <Option value="0">一级分类</Option>
                                {
                                    category.map(item => (<Option value={item._id} key={item._id}>{item.name}</Option>))
                                }

                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator("categoryName", {
                            rules: [{required: true, message: '请输入分类名称!'}],
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

export default Form.create()(AddForm)
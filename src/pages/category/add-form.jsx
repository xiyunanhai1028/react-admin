import React,{Component} from "react"
import { Form, Select} from 'antd'
const Item=Form.Item
const { Option  } = Select
export default class AddForm extends Component{
    render(){
        return (
            <Form>
                <Item>
                    <Select
                        placeholder="Select a option and change input text above"
                    >
                        <Option value="male">male</Option>
                        <Option value="female">female</Option>
                    </Select>,
                </Item>
            </Form>
        )
    }
}
import React, {Component} from "react"
import {Card, Button, Table, message, Modal} from "antd"
import {reqRoles} from "../../api/index"
export default class Role extends Component {
    state = {
        roles: [],
        showAddRole: false
    }

    componentWillMount() {
        this.getRoles()
    }

    getRoles = async() => {
        const result = await reqRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({
                roles
            })
        } else {
            message.error("没有角色数据")
        }
    }

    //展示添加对话框
    showAddRole = () => {
        this.setState({
            showAddRole: true
        })
    }

    render() {

        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'age'
            },
            {
                title: '授权时间',
                dataIndex: 'address'
            },
            {
                title: '授权人',
                dataIndex: 'address'
            },
        ];
        const title = (
            <span>
                <Button type="primary">创建角色</Button>
                <Button style={{marginLeft: 20}} disabled>设置角色权限</Button>
            </span>
        )

        const {roles, showAddRole}=this.state
        return (
            <Card title={title}>
                <Table
                    bordered
                    dataSource={roles}
                    columns={columns}
                    rowKey={roles._id}/>
                <Modal
                    title="Basic Modal"
                    visible={showAddRole}
                    onOk={this.ok}
                    onCancel={this.handleCancel}
                    onClick={this.showAddRole}

                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </Card>
        )
    }
}
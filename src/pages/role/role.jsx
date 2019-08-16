import React, {Component} from "react"
import {Card, Button, Table, message, Modal} from "antd"
import {reqRoles, reqAddRoleName, reqRoleUpdate} from "../../api/index"
import AddForm from "./add-form"
import AuthForm from "./auth_form"
import memoryUtil from "../../utils/memory-util"
export default class Role extends Component {
    state = {
        roles: [],
        role: {},
        showAddRole: false,
        showSetRole: false
    }

    constructor(props) {
        super(props)
        this.authRef = React.createRef()
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

    showSetRole = () => {
        this.setState({
            showSetRole: true
        })
    }

    //添加角色
    addRole = () => {
        console.log(this.form)
        this.form.validateFields(async(err, values) => {
            if (!err) {
                this.setState({
                    showAddRole: false
                })
                const result = await reqAddRoleName(values.roleName)
                this.form.resetFields()
                if (result.status === 0) {
                    message.success('添加角色成功')
                    const role = result.data
                    this.setState(state => ({
                        roles: [...state.roles, role]
                    }))
                } else {
                    message.success('添加角色失败')
                }
            }
        });
    }

    //设置角色权限
    setRole = async() => {
        this.setState({
            showSetRole: false,
        })
        const node = this.authRef.current
        const role = node.getcheckedKeys()
        role.auth_time = Date.now()
        role.auth_name = memoryUtil.user.username
        console.log(role)

        const result = await reqRoleUpdate(role)
        if (result.status === 0) {
            message.success("权限设置成功")
            this.setState({
                roles: [...this.state.roles]
            })
        } else {
            message.error("权限设置失败")
        }
    }

    handleCancel = () => {
        this.setState({
            showAddRole: false,
            showSetRole: false,
        })
    }

    onRow = (role) => {
        return {
            onClick: event => {
                this.setState({role})
            }
        }
    }

    render() {

        const columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            },
        ];
        const {roles, role, showAddRole, showSetRole}=this.state
        const title = (
            <span>
                <Button type="primary" onClick={this.showAddRole}>创建角色</Button>
                <Button style={{marginLeft: 20}} disabled={!role._id} type="primary"
                        onClick={this.showSetRole}>设置角色权限</Button>
            </span>
        )


        return (
            <Card title={title}>
                <Table
                    bordered
                    dataSource={roles}
                    columns={columns}
                    rowKey="_id"
                    onRow={this.onRow}
                    rowSelection={{type: "radio", selectedRowKeys: [role._id]}}/>
                <Modal
                    title="添加角色"
                    visible={showAddRole}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    <AddForm setForm={form => this.form = form}/>
                </Modal>

                <Modal
                    title="设置角色权限"
                    visible={showSetRole}
                    onOk={this.setRole}
                    onCancel={this.handleCancel}
                >
                    <AuthForm role={role} ref={this.authRef}/>
                </Modal>
            </Card>
        )
    }
}
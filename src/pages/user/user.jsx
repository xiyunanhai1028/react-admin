import React, {Component} from "react"
import {Card, Button, Table, Modal, message} from "antd"
import {reqUsersList, reqRemoveUser, reqAddUser, reqUpdateUser} from "../../api/index"
import UserForm from "./user-form"

const {confirm} = Modal

export default class User extends Component {

    state = {
        users: [],
        roles: [],
        columns: [],
        showModal: false,
        flag: 0,//1：代表添加,2:代码更新
        user: {}
    }

    componentWillMount() {
        this.initColumns()
        this.initUsers()
    }

    initUsers = async() => {
        const result = await reqUsersList()
        if (result.status === 0) {
            const {users, roles}=result.data
            this.getRoleName(roles)
            this.setState({
                users, roles
            })
        } else {
            message.error("获取用户列表失败")
        }
    }

    // 获取角色名称
    getRoleName = (roles) => {
        this.roleNames = roles.reduce((pre, role) => {
            pre[role._id] = role.name
            return pre
        }, {})
    }
    //删除用户
    removeUser = (user) => {
        confirm({
            content: `确定删除${user.username}嘛`,
            onOk: async() => {
                const reuslt = await reqRemoveUser(user._id)
                if (reuslt.status === 0) {
                    message.success("删除用户成功")
                    this.initUsers()
                } else {
                    message.error("删除用户失败")
                }
            }
        })

    }

    //添加或更新用户
    addAndUpdate = async() => {
        this.setState({showModal: false})
        this.form.validateFields(async(err, values) => {
            if (!err) {
                const user = values
                console.log(user)
                this.form.resetFields()
                let result;
                if (this.state.flag === 1) {
                    result = await reqAddUser(user)
                } else {
                    user._id=this.state.user._id
                    result = await reqUpdateUser(user)
                }
                var msg = this.state.flag === 1 ? "添加" : "更新"
                if (result.status === 0) {
                    message.success(`${msg}用户成功`)
                    // const user = result.data
                    // this.setState(state => ({
                    //     users: [...state.users, user]
                    // }))
                    this.initUsers()
                } else {
                    message.error(`${msg}用户失败`)
                }
            }
        })

    }

    initColumns = () => {
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: '电话',
                dataIndex: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time'
            },
            {
                title: '所属角色',
                dataIndex: "role_id",
                render: (role_id) => this.roleNames[role_id]
            },
            {
                title: '操作',
                render: (user) => (
                    <span>
                        <a href="javaScript:" onClick={() => this.setState({showModal: true, flag: 2, user})}>操作</a>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <a href="javaScript:" onClick={() => this.removeUser(user)}>删除</a>
                    </span>
                )
            }
        ]
        this.setState({
            columns
        })
    }

    render() {
        const {users, roles, columns, showModal, flag, user}=this.state
        const title = (
            <Button type="primary" onClick={() => this.setState({showModal: true, flag: 1, user: {}})}>创建用户</Button>)
        return (
            <Card title={title}>
                <Table dataSource={users}
                       columns={columns}
                       rowKey="_id"
                       bordered
                >
                </Table>
                <Modal
                    title={flag === 1 ? "添加用户" : "修改用户"}
                    visible={showModal}
                    onOk={this.addAndUpdate}
                    onCancel={() => this.setState({showModal: false})}
                >
                    <UserForm roles={roles} user={user} flag={flag} setForm={(form) => this.form = form}></UserForm>
                </Modal>
            </Card>
        )
    }
}
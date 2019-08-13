import React, {Component} from "react"
import {Card, Button, Icon, Table, message, Modal} from 'antd'
import {reqCategory, addCategory, updateCategory} from "../../api/index"
import AddForm from "./add-form"
import UpdateForm from "./update-form"
export default class Category extends Component {

    state = {
        category: [],
        subCategory: [],
        parentId: "0",
        parentName: "",
        loading: true,
        showStatus: 0, // 是否显示对话框 0: 都不显示, 1: 显示添加, 2: 显示更新
    }

    componentWillMount() {
        this.initColum()
    }

    componentDidMount() {
        this.getCategory()
    }

    //初始化Colum数据
    initColum = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
                key: 'name',
            },
            {
                width: 300,
                title: '操作',
                render: (category) => (
                    <span>
                        <a href="javascript:;" style={{marginRight: 20}} onClick={() => this.updateCategory(category)}>修改分类</a>
                        {
                            this.state.parentId === "0" ?
                                <a href="javascript:;" onClick={() => this.showSubCategory(category)}>查看子分类</a> : null
                        }
                    </span>
                ),
            },
        ]
    }

    getCategory = async() => {
        this.setState({
            loading: true
        })
        const {parentId}=this.state
        const result = await reqCategory(parentId)
        if (result.status === 0) {
            if (parentId === "0") {
                this.setState({
                    category: result.data,
                    loading: false
                })
            } else {
                this.setState({
                    subCategory: result.data,
                    loading: false
                })
            }

        } else {
            message.error("数据请求失败")
            this.setState({
                loading: false
            })
        }
    }

    //获取子列表
    showSubCategory = (category) => {
        this.setState({
            parentId: category._id,
            parentName: category.name

        }, () => {
            this.getCategory()
        })
    }

    //获取category
    showCategory = () => {
        this.setState({
            parentId: "0",
            parentName: "",
            subCategory: [],
        }, () => {
            this.getCategory()
        })
    }

    //更新对话框
    updateCategory = (category) => {
        this.setState({
            showStatus: 2
        })
        this.category = category
    }

    //添加对话框
    showAdd = () => {
        this.setState({
            showStatus: 1
        })
    }

    //取消对话框
    handleCancel = () => {
        this.setState({
            showStatus: 0
        })
    }

    //添加确定
    addSubmit = async() => {
        this.setState({showStatus: 0})
        const {parentId, categoryName}=this.form.getFieldsValue()
        this.form.resetFields()
        const result = await addCategory(parentId, categoryName)
        if (result.status === 0) {
            this.getCategory()
        } else {
            message.error("添加失败")
        }
    }

    updateSubmit = async() => {
        this.setState({showStatus: 0})
        const {categoryName} = this.form.getFieldsValue()
        const categoryId = this.category._id
        this.form.resetFields()
        const result = await updateCategory(categoryId, categoryName)
        if (result.status === 0) {
            this.getCategory()
        } else {
            message.error("更新失败失败")
        }
    }

    render() {
        const {category, parentId, subCategory, parentName, loading, showStatus}=this.state
        const title = parentId === "0" ? "一级分类列表" : (
                <span>
                    <a href="javaScript:" onClick={this.showCategory}>一级分类列表</a>
                    <Icon type="arrow-right" style={{marginLeft: 10, marginRight: 10}}/>
                   <span>{parentName}</span>
                </span>
            )
        const extra = (
            <Button type="primary" onClick={this.showAdd}>
                <span><Icon type="plus"/></span>
                <span>添加</span>
            </Button>
        )


        return (
            <Card title={title} extra={<a href="#">{extra}</a>} style={{width: "100%"}}>
                <Table
                    dataSource={parentId === "0" ? category : subCategory}
                    columns={this.columns}
                    bordered
                    loading={loading}
                />
                <Modal
                    title="添加"
                    visible={showStatus === 1}
                    onOk={this.addSubmit}
                    onCancel={this.handleCancel}
                >
                    <AddForm category={category} parentId={parentId} setForm={form => this.form = form}></AddForm>
                </Modal>
                <Modal
                    title="更新数据"
                    visible={showStatus === 2}
                    onOk={this.updateSubmit}
                    onCancel={this.handleCancel}
                >
                    <UpdateForm categoryName={this.category ? this.category.name : ""}
                                setForm={form => this.form = form}></UpdateForm>
                </Modal>
            </Card>
        )
    }
}
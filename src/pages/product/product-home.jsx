import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import {Card, Select, Input, Button, Icon, Table, message} from "antd"
import {reqProducts, updateProductStatus, searchProduct} from "../../api/index"
import {pageSize} from "../../utils/constance"
const Option = Select.Option
export default class ProductHome extends Component {
    state = {
        products: [],
        columns: [],
        pageNum: 1,//当前页码
        total: 0,//总共有多少页
        loading: false,
        searchType: "productName",
        searchContent: ''
    }

    componentWillMount() {
        this.initColum()
    }

    componentDidMount() {
        this.getProducts(this.state.pageNum)
    }

    //初始化Colum数据
    initColum = () => {
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => "￥" + price
            },
            {
                title: '状态',
                width: 100,
                render: (product) => {// 1: 在售, 2: 已下架
                    const {status, _id}=product
                    return (
                        <span>
                        <Button type="primary"
                                onClick={() => this.updateStatus(status === 1 ? 2 : 1, _id)}>{status === 1 ? "下架" : "上架"}</Button>
                        <span>{status === 1 ? "在售" : "已下架"}</span>
                    </span>
                    )
                }


            },
            {
                title: '操作',
                width: 100,
                render: (product) => (
                    <span>
                        <a href="javaScript:"
                           onClick={() => this.props.history.push("/product/detail", {product})}>详情</a>
                        <br/>
                        <a href="javaScript:">修改</a>
                    </span>
                )
            },
        ]
        this.setState({columns})
    }

    //获取商品列表
    getProducts = async(pageNum) => {
        this.setState({pageNum, loading: true})
        const {searchType, searchContent}=this.state
        let result
        if (searchContent) {//搜索
            result = await searchProduct(pageNum, pageSize, searchType, searchContent)
        } else {
            result = await reqProducts(pageNum, pageSize)
        }

        if (result.status === 0) {
            const {total, list}=result.data
            console.log(list)
            this.setState({
                products: list,
                total,
                loading: false
            })
        } else {
            message.error("请求商品列表失败")
            this.setState({loading: false})
        }
    }

    //商品上下架
    updateStatus = async(status, productId) => {
        const result = await updateProductStatus(productId, status)
        if (result.status === 0) {
            this.getProducts(this.state.pageNum)
        } else {
            message.error("状态更新失败")
        }
    }

    render() {
        const {products, columns, total, loading}=this.state
        const title = (
            <span>
                <Select defaultValue="productName" style={{width: 150}}
                        onChange={val => this.setState({searchType: val})}>
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{width: 150, margin: "0 15px"}}
                       onChange={e => this.setState({searchContent: e.target.value})}/>
                <Button type="primary" onClick={() => this.getProducts(1)}>搜索</Button>
            </span>
        )

        const extra = (
            <Button type="primary">
                <Icon type="plus"/>
                <span>添加商品</span>
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered
                    dataSource={products}
                    columns={columns}
                    rowKey="_id"
                    loading={loading}
                    pagination={{defaultPageSize: pageSize, total, showQuickJumper: true, onChange: this.getProducts}}
                />
            </Card>
        )
    }
}

// withRouter(ProductHome)
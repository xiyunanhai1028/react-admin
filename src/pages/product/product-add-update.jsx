import React, {Component} from "react"
import {Card, Form, Icon, Input, Cascader, Button, message} from "antd"
import {reqCategory} from "../../api/index"
import PicturesWall from "./pictures-wall"
import RichTextEditor from "./rich-text-editor"
import {reqAddProduct} from "../../api/index"

const Item = Form.Item
const {TextArea} = Input
class ProductAddUpdate extends Component {


    constructor(props) {
        super(props)
        this.imgRef = React.createRef()
        this.richTxtRef = React.createRef()
        this.state = {
            options: []
        }
    }

    componentDidMount() {
        this.getCategorys("0")
    }


    getCategorys = async(parentId) => {
        const result = await reqCategory(parentId)
        if (result.status === 0) {
            if (parentId === "0") {
                const options = result.data.map(item => ({
                    value: item._id,
                    label: item.name,
                    isLeaf: false,
                }))

                const {product, isUpdate}=this.props.location.state
                const {pCategoryId, categoryId}=product
                if (isUpdate && pCategoryId != "0") {
                    const subCategory = await this.getCategorys(pCategoryId)
                    if (result.status === 0) {
                        if (subCategory && subCategory.length > 0) {
                            const childrenOption = subCategory.map(item => ({
                                label: item.name,
                                value: item._id,
                                isLeaf: true,
                            }))
                            const targetOption = options.find(item => item.value === pCategoryId)
                            targetOption.children = childrenOption
                        }
                    }
                }
                this.setState({options})
            } else {
                return result.data
            }

        }
    }

    loadData = async(selectedOptions) => {
        const targetOption = selectedOptions[0]
        targetOption.loading = true
        const subCategory = await this.getCategorys(targetOption.value)
        targetOption.loading = false
        if (subCategory && subCategory.length > 0) {
            targetOption.children = subCategory.map(item => ({
                label: item.name,
                value: item._id,
                isLeaf: true,
            }))
        } else {
            targetOption.isLeaf = true
        }

        this.setState({
            options: [...this.state.options]
        })
    }

    submitProduct = () => {
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
                const {categoryIds, name, desc, price}=values
                let pCategoryId
                let categoryId
                if (categoryIds.length === 1) {
                    pCategoryId = "0"
                    categoryId = categoryIds[0]
                } else {
                    pCategoryId = categoryIds[0]
                    categoryId = categoryIds[1]
                }
                const imgs = this.imgRef.current.getImgs()
                const detail = this.richTxtRef.current.getRichTxt()
                const result = await reqAddProduct(categoryId, pCategoryId, name, desc, price, detail, imgs)

                if (result.status === 0) {
                    console.log(result.data)
                    this.props.history.goBack()
                } else {
                    message.error("添加失败")
                }
                //categoryId, pCategoryId, name, desc, price, detail, imgs
            }
        })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                span: 2
            },
            wrapperCol: {
                span: 8
            },
        }
        const title = (
            <span>
                <a href="javaScript:" onClick={() => this.props.history.goBack()}><Icon type="arrow-left"/></a>
                <span style={{marginLeft: 10}}>添加商品</span>
            </span>
        )
        const {getFieldDecorator}=this.props.form
        const product = this.props.location.state.product || {}
        let categoryIds = []
        const {pCategoryId, categoryId}=product
        if (this.props.location.state.isUpdate) {
            if (pCategoryId === "0") {
                categoryIds.push(categoryId)
            } else {
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }
        return (
            <Card title={title}>
                <Form {...formItemLayout}>
                    <Item label="商品名称：">
                        {
                            getFieldDecorator("name", {
                                initialValue: product.name,
                                rules: [{required: true, message: '商品名称不能为空'}],
                            })(
                                <Input placeholder="请输入商品名称"/>
                            )
                        }

                    </Item>
                    <Item label="商品描述：">
                        {
                            getFieldDecorator("desc", {
                                initialValue: product.desc,
                                rules: [{required: true, message: '商品名称不能为空'},],
                            })(
                                <TextArea
                                    placeholder="请输入商品描述"
                                    autosize={{minRows: 2, maxRows: 6}}
                                />
                            )
                        }

                    </Item>
                    <Item label="商品价格：">
                        {
                            getFieldDecorator("price", {
                                initialValue: product.price,
                                rules: [{required: true, message: '商品名称不能为空'}],
                            })(
                                <Input placeholder="请输入商品价格" type='number' addonAfter="元"/>
                            )
                        }
                    </Item>
                    <Item label="商品分类：">
                        {
                            getFieldDecorator("categoryIds", {
                                initialValue: categoryIds,
                                rules: [{required: true, message: '商品分类不能为空'}],
                            })(
                                <Cascader
                                    options={this.state.options}
                                    loadData={this.loadData}
                                    changeOnSelect
                                />
                            )
                        }
                    </Item>
                    <Item label="商品图片：">
                        <PicturesWall ref={this.imgRef} imgs={product.imgs}></PicturesWall>
                    </Item>
                    <Item label="商品详情：" labelCol={{span: 2}} wrapperCol={{span: 20}}>
                        <RichTextEditor ref={this.richTxtRef} detail={product.detail}></RichTextEditor>
                    </Item>
                    <Button onClick={ this.submitProduct} type="primary">提交</Button>
                </Form>

            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate)
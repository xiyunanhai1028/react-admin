import React, {Component} from "react"
import {reqCategoryOne} from "../../api/index"
import {Card, Icon, List} from "antd"
import "./product-detail.less"
import {IMAGE_URL} from "../../utils/constance"

const Item = List.Item
export default class ProductDetail extends Component {
    state = {
        name1: '',
        name2: ''
    }

    async componentDidMount() {
        const {categoryId, pCategoryId}=this.props.location.state.product
        if (pCategoryId === '0') {//已经分类下的商品
            const result = await reqCategoryOne(categoryId)
            if (result.status === 0) {
                this.setState({name1: result.data.name})
            }
        } else {
            const result = await Promise.all([reqCategoryOne(pCategoryId), reqCategoryOne(categoryId)])
            debugger
            this.setState({name1: result[0].data.name, name2: result[1].data.name})

        }
    }

    render() {
        const title = (
            <span>
                <a href="javaScript" style={{marginRight: 10}} onClick={() => this.props.history.goBack()}><Icon
                    type="arrow-left"/></a>
                <span>商品详情</span>
            </span>
        )
        const {product}=this.props.location.state
        const {name1, name2}=this.state
        return (
            <Card title={title}>
                <List>
                    <Item>
                        <span className="title">商品名称：</span>
                        <span className="content">{product.name}</span>
                    </Item>
                    <Item>
                        <span className="title">商品描述：</span>
                        <span className="content">{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="title">商品价格：</span>
                        <span className="content">{product.price}元</span>
                    </Item>
                    <Item>
                        <span className="title">所属分类：</span>
                        <span className="content">{name2 ? (name1 + "-->" + name2) : name1}</span>
                    </Item>
                    <Item>
                        <span className="title">商品图片：</span>
                        <div>
                            {
                                product.imgs.map(item => (
                                    <img src={IMAGE_URL + item} alt="" className="content-img"
                                         key={item}/>
                                ))
                            }

                        </div>
                    </Item>
                    <Item>
                        <span className="title">商品详情：</span>
                        <span className="content" dangerouslySetInnerHTML={{__html: product.detail}}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
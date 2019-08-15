import React, {Component} from "react"
import {Redirect, Switch, Route} from "react-router-dom"
import memoryUtil from "../../utils/memory-util"
import {Layout} from 'antd'
import Header from "../../component/header/header"
import LeftNav from "../../component/left-nav/left-nav"
import Home from "../home/home"
import Category from "../category/category"
import Product from "../product/product"
import User from "../user/user"
import Role from "../role/role"
import Bar from "../bar/bar"
import Pie from "../pie/pie"
import Line from "../line/line"

const {Footer, Sider, Content} = Layout

export default class Admin extends Component {
    render() {
        const user = memoryUtil.user
        if (!user || !user._id) {
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{minHeigth: "100%"}}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{backgroundColor:"#fff",margin:20}}>
                        <Switch>
                            <Route component={Home} path="/home"/>
                            <Route component={Category} path="/category"/>
                            <Route component={Product} path="/product"/>
                            <Route component={User} path="/user"/>
                            <Route component={Role} path="/role"/>
                            <Route component={Bar} path="/charts/bar"/>
                            <Route component={Pie} path="/charts/pie"/>
                            <Route component={Line} path="/charts/line"/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: "center", color: "#cccccc"}}>推荐使用谷歌浏览器，可以有更多的用户体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
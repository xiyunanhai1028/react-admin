import React, {Component} from "react"
import {Switch,Route,Redirect} from "react-router-dom"
import ProductHome from "./product-home"
import ProductDetail from "./product-detail"
import ProductAdd from "./product-add"
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path="/product" component={ProductHome} exact/>
                <Route path="/product/detail" component={ProductDetail}/>
                <Route path="/product/add" component={ProductAdd}/>
                <Redirect to="/product"/>
            </Switch>
        )
    }
}
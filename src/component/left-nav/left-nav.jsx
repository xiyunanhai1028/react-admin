import React, {Component} from "react"
import {Link, withRouter} from "react-router-dom"
import "./left-nav.less"
import Logo from "../../assets/images/logo.png"
import menuList from "../../config/menu-config"
import {Menu, Icon} from 'antd'
const {SubMenu} = Menu
class LeftNav extends Component {

    componentWillMount() {
        this.meunNodes = this.getMenuNodes(menuList)
    }

    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        return menuList.reduce((pre, item) => {
            if (!item.children) {//没有孩子
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)//找到一个与当前路径匹配的子item
                if (cItem) {//存在说明当前item需要打开
                    this.openKey = item.key
                }
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                <Icon type={item.icon}/>
                <span>{item.title}</span>
              </span>
                        }
                    >
                        { this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            return pre
        }, [])
    }

    render() {
        let path = this.props.location.pathname
        if (path.indexOf("/product") === 0) {
            path = "/product"
        }
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={Logo} alt="logo"/>
                    <h2>硅谷后台</h2>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[this.openKey]}
                >
                    {
                        this.meunNodes
                    }
                </Menu>
            </div>
        )
    }
}

export default withRouter(LeftNav)
import React, {Component} from "react"
import {withRouter} from "react-router-dom"
import "./header.less"
import {reqWeather} from "../../api/index"
import date_format from "../../utils/time-util"
import memoryUtil from "../../utils/memory-util"
import storageUtil from "../../utils/storage-util"
import meunList from "../../config/menu-config"
import {Modal} from 'antd'
const {confirm} = Modal;
class Header extends Component {

    state = {
        time: date_format(Date.now()),
        dayPictureUrl: "",
        weather: ''
    }

    //render完成后执行,适宜做一些异步操作
    componentDidMount() {
        this.getTime()
        this.getWeather()
    }

    //获取当前时间
    getTime = () => {
        setInterval(() => {
            const time = date_format(Date.now())
            this.setState({time})
        }, 1000)

    }

    //获取天气
    getWeather = async() => {
        const {dayPictureUrl, weather}=await reqWeather("北京")
        this.setState({
            dayPictureUrl, weather
        })
    }

    //获取标题
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        meunList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }

    //退出登录
    loginOut = () => {
        confirm({
            title: '确定退出登录嘛?',
            onOk: () => {
                memoryUtil.user = {}
                storageUtil.removeUser()
                this.props.history.replace("/login")
            }
        });
    }


    render() {
        const {time, dayPictureUrl, weather}=this.state
        const username = memoryUtil.user.username
        const title = this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    <a href="javaScript:" onClick={this.loginOut}>退出</a>
                </div>
                <div className="header-bottom">
                    <span className="header-bottom-left">{title}</span>
                    <div className="header-bottom-right">
                        <span >{time}</span>
                        <img src={dayPictureUrl} alt=""/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)
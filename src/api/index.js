/**
 * Created by flyTigger on 2019/8/9.
 */
import ajax from "./ajax"
import jsonp from "jsonp"
import {message} from "antd"
//登录
export const reqLogin = (username, password) => ajax("/login", {username, password}, "POST")

//获取天气
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (err, data) => {
            console.log(err,data)
            if (!err && data.status === 'success') {
                const {dayPictureUrl, weather}=data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                message.error('获取天气失败')
            }
        })
    })
}

//获取商品管理列表
export const reqCategory=(parentId)=>ajax("/manage/category/list",{parentId})

//添加分类
export const addCategory=(parentId,categoryName)=>ajax("/manage/category/add",{parentId,categoryName},"POST")

//更新品类名称
export const updateCategory=(categoryId,categoryName)=>ajax("/manage/category/update",{categoryId,categoryName},"POST")
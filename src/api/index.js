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
            console.log(err, data)
            if (!err && data.status === 'success') {
                const {dayPictureUrl, weather}=data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            } else {
                message.error('获取天气失败')
            }
        })
    })
}

//获取品类管理列表
export const reqCategory = (parentId) => ajax("/manage/category/list", {parentId})

//添加分类
export const addCategory = (parentId, categoryName) => ajax("/manage/category/add", {parentId, categoryName}, "POST")

//更新品类名称
export const updateCategory = (categoryId, categoryName) => ajax("/manage/category/update", {
    categoryId,
    categoryName
}, "POST")

//获取商品列表
export const reqProducts = (pageNum, pageSize) => ajax("/manage/product/list", {pageNum, pageSize})

//商品上下架
export const updateProductStatus = (productId, status) => ajax("/manage/product/updateStatus", {
    productId,
    status
}, "POST")

//商品详情
// export const

//商品搜索
export const searchProduct = (pageNum, pageSize, searchType, searchContent) => ajax("/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchContent
})

//获取一个分类
export const reqCategoryOne = (categoryId) => ajax("/manage/category/info", {categoryId})

//删除照片
export const reqRomveImg = (name) => ajax("/manage/img/delete", {name}, "POST")

//添加商品
export const reqAddProduct = (categoryId, pCategoryId, name, desc, price, detail, imgs) => ajax("/manage/product/add", {
    categoryId,
    pCategoryId,
    name,
    desc,
    price,
    detail,
    imgs
}, "POST")

//获取角色管理数据
export const reqRoles = () => ajax("/manage/role/list")

//添加角色名称
export const reqAddRoleName = (roleName) => ajax("/manage/role/add", {roleName}, "POST")

//更新权限
export const reqRoleUpdate = (role) => ajax("/manage/role/update", role, "POST")

//获取所有用户列表
export const reqUsersList = () => ajax("/manage/user/list")

//删除用户
export const reqRemoveUser = (userId) => ajax("/manage/user/delete", {userId}, "POST")

//添加用户
export const reqAddUser=(user)=>ajax("/manage/user/add",user,"POST")

//更新用户
export const reqUpdateUser=(user)=>ajax("/manage/user/update",user,"POST")
/**
 * Created by flyTigger on 2019/8/9.
 */
import axios from "axios"
import {message} from "antd"

export default function ajax(url, data = {}, type = "GET") {
    return new Promise((resolve, reject) => {
        let promise
        if (type === "GET") {
            promise = axios.get(url, {params: data})
        } else {
            promise = axios.post(url, data)
        }
        promise.then(function (repsonse) {
            resolve(repsonse.data)
        }).catch(function (error) {
            message.error('请求错误：' + error.message)
        })
    })
}
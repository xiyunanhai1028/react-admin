/**
 * Created by flyTigger on 2019/8/8.
 */
import React from "react"
import ReactDOM from "react-dom"

import App from "./app"
import storageUtil from "./utils/storage-util"
import memoryUtil from "./utils/memory-util"

const user = storageUtil.getUser()
if (user && user._id) {
    memoryUtil.user = user
}
ReactDOM.render(<App/>, document.getElementById("root"))
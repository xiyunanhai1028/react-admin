import React from "react"
import PropTypes from "prop-types"
import {Upload, Icon, Modal, message} from 'antd'
import {reqRomveImg} from "../../api/index"
import {IMAGE_URL} from "../../utils/constance"

export default class PicturesWall extends React.Component {
    static propTypes = {
        imgs: PropTypes.array
    }

    constructor(props) {
        super(props)
        let fileList = []
        const imgs = this.props.imgs
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((item, index) => ({
                uid: -index,
                name: item,
                status: "done",
                url: IMAGE_URL + item
            }))
        }
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: fileList
        }
    }


    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = async file => {

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        })
    }

    handleChange = async({file, fileList}) => {
        console.log(file)
        if (file.status === "done") {//上传成功
            console.log(file.response)
            const result = file.response
            if (result.status === 0) {
                message.info("上传图片成功")
                const {name, url}=result.data
                file = fileList[fileList.length - 1]
                file.name = name
                file.url = url
            } else {
                message.error("上传图片失败")
            }

        } else if (file.status === "removed") {//删除照片
            const result = await reqRomveImg(file.name)
            if (result.status === 0) {
                message.info("图片删除成功")
            } else {
                message.error("图片删除失败")
            }
        }
        this.setState({fileList})
    }

    getImgs = () => this.state.fileList.map(item => item.name)

    render() {
        const {previewVisible, previewImage, fileList} = this.state
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div>Upload</div>
            </div>
        )
        return (
            <div className="clearfix">
                <Upload action="/manage/img/upload"
                        accept="image/*"
                        listType="picture-card"
                        name="image"
                        fileList={fileList}
                        onPreview={this.handlePreview}
                        onChange={this.handleChange}>
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </div>
        )
    }
}
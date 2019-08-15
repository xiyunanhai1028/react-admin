import React, {Component} from "react"
import PropTypes from "prop-types"
import {EditorState, convertToRaw,ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import {IMAGE_URL} from "../../utils/constance"


export default class RichTextEditor extends Component {

    static propTypes = {
        detail: PropTypes.string
    }

    constructor(props){
        super(props)
        const detail=this.props.detail
        let editorState
        if(detail){
            const blocksFromHtml =htmlToDraft(detail)
            const {contentBlocks, entityMap}=blocksFromHtml
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap)
            editorState = EditorState.createWithContent(contentState)
        }else{
            editorState = EditorState.createEmpty()
        }
        this.state = {
            editorState,
        }
    }
    // state = {
    //     editorState: EditorState.createEmpty(),
    // }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        })
    }

    getRichTxt = () => draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))

    uploadImageCallBack = (file) => {
        return new Promise(
            (resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.open('POST', '/manage/img/upload')
                const data = new FormData()
                data.append('image', file)
                xhr.send(data)
                xhr.addEventListener('load', () => {
                    const response = JSON.parse(xhr.responseText)
                    resolve(response)
                })
                xhr.addEventListener('error', () => {
                    const error = JSON.parse(xhr.responseText)
                    reject(error)
                })
            }
        )
    }


    render() {
        const {editorState} = this.state
        return (
            <div>
                <Editor
                    editorState={editorState}
                    editorStyle={{height: 250, border: '1px solid #000', padding: '0 30px'}}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                        inline: {inDropdown: true},
                        list: {inDropdown: true},
                        textAlign: {inDropdown: true},
                        link: {inDropdown: true},
                        history: {inDropdown: true},
                        image: {uploadCallback: this.uploadImageCallBack, alt: {present: true, mandatory: true}},
                    }}
                />
            </div>
        )
    }
}
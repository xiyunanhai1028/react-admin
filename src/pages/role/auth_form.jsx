import React, {Component} from "react"
import {Form, Input, Tree} from "antd"
import PropTypes from "prop-types"
import menuList from "../../config/menu-config"
const Item = Form.Item
const {TreeNode} = Tree
export default class AuthForm extends Component {

    static propTypes = {
        role: PropTypes.object.isRequired
    }

    constructor(props){
        super(props)
        const role=this.props.role
        this.state={
            checkedKeys:role.menus
        }
    }

    componentWillMount() {
        this.treeNode = this.getTreeNodes(menuList)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            checkedKeys:nextProps.role.menus
        })

    }

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }

    onCheck = (checkedKeys) => {
        console.log(checkedKeys)
        this.setState({
            checkedKeys
        })
    }

    getcheckedKeys = () => {
        this.props.role.menus = this.state.checkedKeys
        return this.props.role
    }

    render() {
        const {role}=this.props
        const {checkedKeys}=this.state
        console.log("render",role)
        return (
            <div>
                <Item labelCol={{span: 4}} wrapperCol={{span: 16}} label="角色名称">
                    <Input value={role.name} disabled/>
                </Item>
                <Item>
                    <Tree
                        checkable
                        defaultExpandAll={true}
                        checkedKeys={checkedKeys}
                        onCheck={this.onCheck}
                    >
                        <TreeNode title="平台权限" key="all">
                            {this.treeNode}
                        </TreeNode>
                    </Tree>
                </Item>
            </div>
        )
    }
}
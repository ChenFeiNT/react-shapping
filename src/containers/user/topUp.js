/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeLocalItem, localItem} from '../../utils/cookie'


import {InputItem, Modal, Icon, Flex,Toast} from 'antd-mobile'

import * as user from 'actions/user'

require('./styles/topUp.less')
const alert = Modal.alert;
@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)

export default class TopUP extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
            value:null
        }

    }

    handleClick() {
        //该函数用来执行组件内部的事件，比如在这里就是nav组件菜单的导航点击事件
        // this.props.history.push('/')
    }

    componentDidMount() {
        // const {getUserInfo} = this.props
        //
        // let userInfo = localItem('userInfo')
        //
        // if (typeof userInfo == 'string') {
        //     // console.log(JSON.parse(userInfo))
        //     getUserInfo({uid: JSON.parse(userInfo).id})
        // }
    }


    _topUp=()=>{

        const {uid,fetchTopUp,history}=this.props


        console.log(localItem('userInfo'))


        if(this.state.value==null){

            Toast.info("请输入充值金额！",1)
            return false

        }

        if(this.state.value>10000){

            Toast.info("本次充值最大金额为10000",1)

            return false
        }
        fetchTopUp({

            uid:uid?uid:JSON.parse(localItem('userInfo')).id,
            money:this.state.value
        },history)

    }
    render() {
        const { history,topUp} = this.props
        return (
            <div className="about-container"

                 style={{
                     minHeight: document.documentElement.clientHeight,
                     background: "#f3f3f1"
                 }}
            >
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center">充值中心</Flex.Item>
                        <Flex.Item className="item-head right"><span></span></Flex.Item>
                    </Flex>
                </div>
                <div className="title">

                    充值金额
                </div>
                <div className="cnt">
                <InputItem type="number"

                           value={this.state.value}

                           onChange={(v)=>this.setState({
                               value:v
                           })}
                           placeholder="0">￥</InputItem>
                </div>
                <p className="more">
                    本次最多充值10000元
                </p>
                <div className="up-btn"
                onClick={()=>this._topUp()}
                >
                    充值
                </div>
            </div>
        )
    }
}
/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {createForm} from 'rc-form';

import {Modal, Icon, Flex, List, InputItem, Toast, Picker,Button,WhiteSpace} from 'antd-mobile'

const area = require('./json/area.json')

import * as user from 'actions/user'

require('./styles/newads.less')
const alert = Modal.alert;


let areaTxt = ''

const CustomChildren = props => {

    areaTxt = props.extra

    return (
        <div
            onClick={props.onClick}
            style={{backgroundColor: '#fff',}}
        >
            <div style={{
                display: 'flex',
                height: '45px',
                paddingLift: 15,
                paddingRight: 15,
                lineHeight: '45px',
                borderBottom: '1PX solid #f3f3f1'
            }}>
                <div style={{
                    marginLeft: 15,
                    fontSize: ".25rem",
                    color: '#4b4b49',
                    width: 90,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                }}>{props.children}</div>
                <div style={{textAlign: 'left', color: '#888', paddingLeft: 25, fontSize: ".22rem", width: "100%"}}>
                    <input type="text" disabled
                           style={{width: "100%"}}
                           value={props.extra}/></div>
            </div>
        </div>
    )

};

@connect(
    state => {
        return {...state.user}
    },
    dispatch => bindActionCreators({...user}, dispatch)
)

class NewAds extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            modal1: false,
            modal2: false,
            hasError: false,
            value: '',
            area: [],
            areaTxt: ""
        }
    }

    _save = () => {

        const {uid, fetchAddAds, form, history, location} = this.props;

        let id = 0;
        let isdefault = 1
        if (location.state != undefined) {

            let data = location.state.data

            id = data.id
            isdefault = data.isdefault
        }

        const {getFieldValue} = form

        let realname = getFieldValue('receiveName')

        let mobile = this.state.value

        let area = areaTxt
        let address = getFieldValue('delAds')


        if (realname == undefined) {

            Toast.info("收件人不能为空！", 1)
        }

        else if (mobile == undefined) {

            Toast.info("联系电话不能为空！", 1)

        }


        else if (area == '请选择配送地址') {

            Toast.info('请选择所在地区', 1)

        }


        else if (address == undefined) {

            Toast.info('收货地址不能为空！', 1)

        }
        else {

            area = area.split(",")


            let data = {
                uid: uid,
                id: id,
                realname: realname,
                mobile: mobile.replace(/\s/g, ''),
                province: area[0] ? area[0] : '/',
                city: area[1] ? area[1] : '/',
                county: area[2] ? area[2] : '/',
                address: address,
                isdefault: isdefault
            }

            fetchAddAds(data, history)

        }

        // const realname = getFieldValue('receiveName')
        // const realname = getFieldValue('receiveName')


    }

    componentDidMount() {

        const {history, location} = this.props
        if (location.state != undefined) {

            let data = location.state.data

            this.setState({

                value: data.mobile
            })
        }

    }

    onErrorClick = () => {
        if (this.state.hasError) {
            Toast.info('Please enter 11 digits');
        }
    }
    onChange = (value) => {
        if (value.replace(/\s/g, '').length < 11) {
            this.setState({
                hasError: true,
            });
        } else {
            this.setState({
                hasError: false,
            });
        }
        this.setState({
            value,
        });
    }

    render() {
        const {history, location} = this.props
        const {getFieldProps} = this.props.form;

        console.log(location)

        if (location.state != undefined) {

            let data = location.state.data

            let provincename = data.provincename == '/' ? '' : data.provincename
            let cityname = data.cityname == '/' ? '' : data.cityname
            let countyname = data.countyname == '/' ? '' : data.countyname


            let exp = ''

            if (countyname != '') {

                exp = provincename + "," + cityname + "," + countyname
            }
            else {

                exp = provincename + "," + cityname
            }


            return (
                <div className="newads-container"

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
                            <Flex.Item className="item-head center">编辑收货地址</Flex.Item>
                            <Flex.Item className="item-head right"> </Flex.Item>
                        </Flex>
                    </div>
                    <div className="form-info">

                        {/*<List className="pos">*/}

                            {/*<List.Item*/}
                                {/*thumb={ require('static/image/ic_pos.png')}*/}
                                {/*arrow="horizontal"*/}
                                {/*className="txt"*/}

                            {/*>*/}
                                {/*当前位置：未获取地址*/}

                            {/*</List.Item>*/}
                        {/*</List>*/}
                        <List className="list">
                            <InputItem

                                {...getFieldProps('receiveName', {
                                    initialValue:data.realname ,
                                })}

                                clear
                                placeholder="请填写收件人"
                                ref={el => this.autoFocusInst = el}
                            >收件人</InputItem>
                            <InputItem
                                {...getFieldProps('phone')}
                                type="phone"
                                placeholder="请输入联系电话"
                                error={this.state.hasError}
                                onErrorClick={this.onErrorClick}
                                onChange={this.onChange}
                                value={this.state.value}
                            >联系电话</InputItem>
                            <Picker

                                title="选择地区"
                                extra={exp }
                                data={area.data}
                                value={this.state.area}
                                onChange={v => this.setState({area: v})}
                            >
                                <CustomChildren       {...getFieldProps('area')} >所在地区</CustomChildren>
                            </Picker>
                            <InputItem
                                {...getFieldProps('delAds',{
                                    initialValue:data.address ,
                                })}
                                clear
                                placeholder="请填写详细配送地址"
                                ref={el => this.autoFocusInst = el}

                            >详细地址</InputItem>
                        </List>
                        <WhiteSpace />
                        <WhiteSpace />
                        <WhiteSpace />
                        <Button type="primary"   style={{width:"95%",margin:"0 auto"}}     onClick={() => this._save()}>保存</Button>
                    </div>
                </div>
            )


        } else {
            console.log("我是新增页面")
            return (
                <div className="newads-container"

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
                            <Flex.Item className="item-head center">编辑收货地址</Flex.Item>
                            <Flex.Item className="item-head right"> </Flex.Item>
                        </Flex>
                    </div>
                    <div className="form-info">

                        {/*<List className="pos">*/}

                            {/*<List.Item*/}
                                {/*thumb={ require('static/image/ic_pos.png')}*/}
                                {/*arrow="horizontal"*/}
                                {/*className="txt"*/}

                            {/*>*/}
                                {/*当前位置：未获取地址*/}

                            {/*</List.Item>*/}
                        {/*</List>*/}
                        <List className="list">
                            <InputItem
                                {...getFieldProps('receiveName')}
                                clear
                                placeholder="请填写收件人"
                                ref={el => this.autoFocusInst = el}
                            >收件人</InputItem>
                            <InputItem
                                {...getFieldProps('phone')}
                                type="phone"
                                placeholder="请输入联系电话"
                                error={this.state.hasError}
                                onErrorClick={this.onErrorClick}
                                onChange={this.onChange}
                                value={this.state.value}
                            >联系电话</InputItem>
                            <Picker

                                title="选择地区"
                                extra="请选择配送地址"
                                data={area.data}
                                value={this.state.area}
                                onChange={v => this.setState({area: v})}
                            >
                                <CustomChildren       {...getFieldProps('area')} >所在地区</CustomChildren>
                            </Picker>
                            <InputItem
                                {...getFieldProps('delAds')}
                                clear
                                placeholder="请填写详细配送地址"
                                ref={el => this.autoFocusInst = el}
                            >详细地址</InputItem>
                        </List>
                        <WhiteSpace />
                        <WhiteSpace />
                        <WhiteSpace />
                        <Button type="primary" style={{width:"95%",margin:"0 auto"}}     onClick={() => this._save()}>保存</Button>
                    </div>
                </div>
            )
        }


    }
}
export default createForm()(NewAds)
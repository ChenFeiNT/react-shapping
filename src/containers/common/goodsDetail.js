/**
 * Created by Administrator on 2016/7/1.
 */
import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Flex, Icon, List, ActionSheet, InputItem, Toast, Modal} from 'antd-mobile'
const alert = Modal.alert;
import * as goodsDetail from 'actions/goodsDetail'
import ReactDrawer from '../../components/Commons/lib/react-drawer';
import Timer from '../../components/Commons/timer';
import {localItem} from '../../utils/cookie'
require('../../components/Commons/lib/react-drawer.less')
require('./styles/goodsDetail.less')

@connect(
    state => {

        return {...state.goodsDetail}
    },
    dispatch => bindActionCreators({...goodsDetail}, dispatch)
)
export default class GoodsDetail extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            copen:false,
            position: 'bottom',
            noOverlay: false,
            inputValue: 1,
            addOrBuyState: "",
            clear: false,
            tabState: true,
            tabValue: 0,
            drawerType:"know",
        };
        this.userInfo = localItem('userInfo')
    }

    onChange = (v) => {
        this.setState({

            inputValue: v
        })

    }

    add = () => {


        let count = this.state.inputValue
        count++;
        this.setState({

            inputValue: count
        })

    }
    lose = () => {

        let count = this.state.inputValue
        count--

        if (count < 1) {


            Toast.info("商品最小数量为1", 1)
            return false
        }
        this.setState({

            inputValue: count
        })

    }

    toggleDrawer = (type) => {

        this.setState({
            drawerType:"buy",
        })
        let userInfo = this.userInfo
        const {history} = this.props
        // console.log(userInfo)
        if ((typeof userInfo) != 'string') {

            alert('请先登录', '立即前往？', [

                {text: '取消', onPress: () => console.log('cancel')},
                {
                    text: '确定', onPress: () => {


                    let url = window.location.href

                    url = url.match(/#(\S*)/)[1];

                    url = url.replace('/', '')

                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://www.worldwideapp.chinazjtc.com/app/user/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

                    // history.push("/auth")
                }
                },
            ])


        } else {
            this.setState({
                open: !this.state.open,
                inputValue: 1,
                addOrBuyState: type
            });
        }
    }
    closeDrawer = () => {
        this.setState({open: false});
    }
    onDrawerClose = () => {
        this.setState({open: false});
    }

    componentWillMount() {
        window.scrollTo(0, 0)
    }

    componentWillUnmount() {
        const {removeDetail} = this.props
        removeDetail()
        window.onScroll = null

    }

    _submite_gs = (id) => {
        const {fetchAddCar, history} = this.props

        let userInfo = this.userInfo

        console.log(userInfo)

        if (this.state.addOrBuyState == 'add') {
            let userInfo = this.userInfo

            // console.log(userInfo)
            if ((typeof userInfo) == 'string') {


                this.setState({open: false});
                fetchAddCar({
                    goods_id: id,
                    goods_num: this.state.inputValue,
                    goods_att1: "",
                    goods_att2: "",
                    id: '',
                    uid: JSON.parse(userInfo).id
                })
            } else {


            }

        }

        if (this.state.addOrBuyState == 'buy') {


            let userInfo = this.userInfo

            // console.log(userInfo)
            if ((typeof userInfo) == 'string') {

                const {data, history} = this.props

                let price = ''

                if (JSON.parse(userInfo).isvip == 0) {
                    price = data.zkprice
                } else {
                    price = data.vipprice
                }
                let newData = [{
                    att1: "",
                    att2: "",
                    goods_att1: "",
                    goods_att2: "",
                    goods_desc: '',
                    goods_id: data.id,
                    goods_num: this.state.inputValue,
                    goods_price: price,
                    goods_smallpic: data.smallpic,
                    goods_title: data.gtitle,
                    id: data.id,
                    shareurl: data.shareurl,
                    user_id: JSON.parse(userInfo).id,

                }]

                history.push({
                    pathname: "/orderDetail",

                    state: {

                        data: newData,
                        state: "det"
                    }
                })

            } else {

                alert('请先登录', '立即前往？', [

                    {text: '取消', onPress: () => console.log('cancel')},
                    {
                        text: '确定', onPress: () => {

                        let url = window.location.href

                        url = url.match(/#(\S*)/)[1];

                        url = url.replace('/', '')

                        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfeeca20eb6657e60&redirect_uri=http://www.worldwideapp.chinazjtc.com/app/user/wxgetopenid?url=auth_${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

                    }

                        // history.push("/auth")


                    },
                ])

            }


        }


    }

    componentDidMount() {


        const {match, getGoodsDetail, location} = this.props

        // console.log(location)


        const {params} = match
        getGoodsDetail({
            pagesize: 1,
            pagenum: 10,
            id: parseInt(params.id)
        })
    }


    _tabChange = (v) => {
        if(v===0){

            window.scrollTo(0,0)

        }
        else {

            window.scrollTo(0,this.dlScroll.offsetTop-50)
        }


        if ((v === 0 || v === 1) && this.state.tabValue === v && this.state.tabState) {

            return false

        }
        else {

            this.setState({

                tabState: true,

                tabValue: v
            })
        }


    }

    render() {
        const {data, history} = this.props

        const cntInfo = () => {
            if (data && data.id) {
                const cnt = {

                    __html: data.gcontent
                }
                return (
                    <div className="cnt-info">
                        <div className="img-info">
                            <img src={data.bigpic} alt=""/>
                        </div>

                        {/*<div className="active-info"*/}
                             {/*style={{*/}
                                 {/*background: 'url(' + require('static/images/gs/gs_detail_bg.png') + ') center center /  105%  105%  no-repeat'*/}
                             {/*}}*/}
                        {/*>*/}

                            {/*<div className="ac-price">*/}
                                {/*<p>￥{data.zkprice}</p>*/}
                                {/*<p>￥{data.price}</p>*/}
                            {/*</div>*/}
                            {/*<div className="count-info">*/}
                                {/*<p > 距结束还</p>*/}
                                {/*<div>*/}
                                    {/*<Timer*/}
                                        {/*date="2017-11-28T00:00:00+00:00"*/}
                                        {/*days={{plural: 'Days ', singular: 'day '}}*/}
                                        {/*hours=':'*/}
                                        {/*mins=':'*/}
                                        {/*segs=''*/}
                                    {/*/>*/}
                                {/*</div>*/}

                            {/*</div>*/}

                        {/*</div>*/}

                        <div className="msg-info">
                            <div className="title">
                                <p>{data.gtitle}</p>
                            </div>

                            <Flex >

                                <Flex.Item className="sall">
                                    <p>￥{data.zkprice}</p>
                                    <p className="vip">￥{data.vipprice}
                                        <img style={{width: '.5rem'}} src={require('static/images/gs/vip_icon.png')} alt=""/>
                                    </p>
                                </Flex.Item>

                                <Flex.Item className="usl">
                                    <span style={{textDecoration: 'line-through'}}>￥{data.price}</span>
                                </Flex.Item>
                            </Flex>
                        </div>

                        <div className="know-info" onClick={()=>this.setState({drawerType:"know", open: !this.state.open,})}>
                            <ul >
                                <li>
                                    <img src={require('static/images/gs/k_icon.png')} alt=""/>

                                    正品保障
                                </li>

                                <li>
                                    <img src={require('static/images/gs/k_icon.png')} alt=""/>

                                    假一罚百

                                </li>

                                <li>
                                    <img src={require('static/images/gs/k_icon.png')} alt=""/>

                                    税费

                                </li>
                                <li>
                                    <img src={require('static/images/gs/k_icon.png')} alt=""/>

                                    自提

                                </li>

                            </ul>
                            <Icon type="right" className="r-icon"/>
                        </div>

                        <div className="more-know-info">

                            美纶购购物须知
                            <Icon type="right" className="r-icon"/>

                        </div>

                        <div className="url" >

                            <div className="title" ref={(el)=>this.dlScroll=el}>
                                商品详情

                            </div>

                            <div className=".markdown-body" dangerouslySetInnerHTML={cnt}/>

                            <div ref="cnt"></div>

                        </div>

                        <div className="like">

                            <div className="head">
                                <span className="line"></span>
                                <span className="title">猜你喜欢</span>
                                <span className="line"></span>
                            </div>

                            <div className="flex-container" >
                                <div wrap="wrap">
                                    {
                                        data.likes.map((i, key) => (

                                            <div key={key} className="goods"


                                                 onClick={() => {
                                                     history.push({
                                                         pathname: `/goodsDetail/${i.id}`,
                                                         // state:location.state.title
                                                     });

                                                     window.scrollTo(0, 0)
                                                 }}
                                            >

                                                <div className="img-info">

                                                    <img src={i.bigpic} alt=""/>

                                                </div>

                                                <div className="txt-info">
                                                    <p className="title">
                                                        {i.gtitle}
                                                    </p>
                                                    <p className="price">￥{Number(i.zkprice).toFixed(2)}</p>
                                                </div>

                                            </div>

                                            )
                                        )
                                    }
                                </div>
                            </div>


                        </div>
                        <ReactDrawer
                            open={this.state.open}
                            position={this.state.position}
                            onClose={this.onDrawerClose}
                            noOverlay={this.state.noOverlay}

                        >

                            {
                                this.state.drawerType=="know"?

                                    <div className="know-drawer-info" >
                                        <div className="drawer-title">
                                            <span className="title">服务说明</span>
                                            <span className='close-btn' onClick={this.closeDrawer}>x</span>
                                        </div>
                                        <ul className="list">
                                            <li>
                                                <div className="title"><img src={require('static/images/gs/true.png')} alt=""/>正品保障</div>
                                                <div className="exp">全球精选，正品保障</div>
                                            </li>
                                            <li>
                                                <div className="title"><img src={require('static/images/gs/pei.png')} alt=""/>假一罚百</div>
                                                <div className="exp">商品可查，假一罚百</div>
                                            </li>
                                            <li>
                                                <div className="title"><img src={require('static/images/gs/sui.png')} alt=""/>税费</div>
                                                <div className="exp">税费：0元，该商品已完税</div>
                                            </li>
                                            <li>
                                                <div className="title"><img src={require('static/images/gs/zi.png')} alt=""/>自提</div>
                                                <div className="exp">全国体验店提供自提服务</div>
                                            </li>
                                        </ul>
                                        <div className="drawer-btn" onClick={() => this.setState({open:!this.state.open})}>确定</div>
                                    </div>
                                    :
                                    <div className="buy-info">

                                        <div className="drawer-title">
                                            <span className="title">请选择商品属性</span>
                                            <span className='close-btn' onClick={this.closeDrawer}>x</span>
                                        </div>

                                        <div className="drawer-body">
                                            <div className="drawer-img">

                                                <img src={data.bigpic} alt=""/>

                                            </div>

                                            <div className="drawer-gs-title">
                                                <p className="one">{data.gtitle}</p>
                                                <div className="two">

                                                    数量： <span className="lose box" onClick={this.lose}>-</span>

                                                    <List >
                                                        <InputItem
                                                            type="number"
                                                            error={this.state.hasError}

                                                            onChange={this.onChange}
                                                            value={this.state.inputValue}
                                                        />
                                                    </List>
                                                    <span className="add box" onClick={this.add}>＋</span>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="drawer-btn" onClick={() => this._submite_gs(data.id)}>
                                            确定
                                        </div>
                                    </div>
                            }
                        </ReactDrawer>
                    </div>
                )
            } else {
                return (

                    <div style={{width: '100%', textAlign: "center", marginTop: '.2rem'}}>
                        <Icon type="loading"/>
                    </div>
                )
            }


        }
        return (
            <div className="goods-detail-container">
                <div className="nav-tab">
                    <Flex justify="center" align="center">
                        <Flex.Item className="item-head left"><Icon type="left" size="lg" onClick={() => {
                            history.goBack()
                        }}/></Flex.Item>
                        <Flex.Item className="item-head center"><span
                            className={`${this.state.tabState && this.state.tabValue === 0 ? 'active' : ''}`}
                            onClick={() => this._tabChange(0)}>商品</span><span
                            className={`${this.state.tabState && this.state.tabValue === 1 ? 'active' : ''}`}
                            onClick={() => this._tabChange(1)} >详情</span></Flex.Item>
                        <Flex.Item className="item-head right"></Flex.Item>
                    </Flex>
                </div>

                <div className="detail-info">


                    {cntInfo()}
                </div>
                <div className="bottom">
                    <Flex >
                        <Flex.Item className="other">

                                    <span>
                                        <a href="tel:4001080305"
                                           style={{
                                               textDecoration: "none"

                                           }}
                                        >
                                            <img src={require('static/image/ic_call_service_02.png')} alt=""/>
                                        <p>客服咨询</p>

                                        </a>
                                    </span>
                            <span onClick={() => history.push(`/burCar/${'dltocar'}`)}>
                                <img src={require('static/image/ic_to_car_02.png')} alt=""/>
                                <p>购物车 </p>
                            </span>
                        </Flex.Item>
                        <Flex.Item className="add-car-btn" onClick={() => this.toggleDrawer('add')}>
                            加入购物车
                        </Flex.Item>
                        <Flex.Item className="buy-btn" onClick={() => this.toggleDrawer('buy')}>
                            立即购买
                        </Flex.Item>
                    </Flex>

                </div>

            </div>

        )
    }
}

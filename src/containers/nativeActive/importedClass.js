import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';



import './style/importedClass.less';
import {nativeClick} from '../../utils/native-sdk'

export default class ImportedClass extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            id:'',
            modall:false
        }
    }

    componentDidMount(){

        this.props.feachAndroid({pagesize:3,pagenum:3,cid:3,id:2})

        document.title = '进口食品';

    }


    render(){

        const{data}=this.props;
        const goodsList = [];
        if(data && data.length>0){
            data.map(function (i,index) {

                switch(i.name){
                    case "商品列表" :
                        goodsList.push(i.dataList);

                        break;
                    default :
                        console.log(false);

                }

            })
        }

        return(
            <div className='new-imp'>


                <div className='box'>
                    <div className='one' style={{backgroundColor:'#e81d39'}}>
                        <div className='banner'><img src={require('static/image/imported.png')} alt=""/></div>
                        <ul>
                              <li>
                                <div className='picture'><img src={require('static/image/tuijian.png')} alt=""/></div>
                                <div className='details'>
                                    <p className='title'>11111111</p>
                                    <p className='price'>￥11<span>￥111</span></p>
                                </div>
                              </li>
                            <li>
                                <div className='picture'><img src={require('static/image/tuijian.png')} alt=""/></div>
                                <div className='details'>
                                    <p className='title'>11111111</p>
                                    <p className='price'>￥11<span>￥111</span></p>
                                </div>
                            </li>




                        </ul>
                    </div>
                </div>


            </div>
        )
    }



}

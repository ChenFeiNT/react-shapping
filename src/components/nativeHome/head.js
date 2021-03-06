import React from 'react'
import {Badge,SearchBar} from 'antd-mobile'

class Head extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            focused: false,
        }
    }

    render(){
        const {type,history}=this.props
        return (

            <div className={type==0?"search-bar":"search-bar-active"}>
                <div className="box name">美纶购</div>
                <div className="box s-btn">
                    <SearchBar
                        placeholder="上新1200商品"
                        focused={this.state.focused}
                        showCancelButton={false}
                            style={{

                            width: "100%",
                            background:"transparent"

                        }}

                        onFocus={() => {
                            this.setState({
                                focused: false,
                            });
                        }}
                        // onCancel={this._onSearch}
                        onSubmit={value =>

                            history.push(`/search/${value}`)

                        }
                    />
                </div>
                <div className="box msg">

                    {/*<p><img src={type==1?require('static/images/wmsg.png'):require('static/images/msg.png')} alt=""/><Badge dot className="badge"/></p>*/}
                    {/*<p>消息</p>*/}
                </div>
            </div>
        )

    }





}


export  default Head



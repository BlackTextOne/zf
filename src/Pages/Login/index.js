import React from "react";
import './style.min.css'
import back from '../../assets/image/返回.png'

export default class Login extends React.Component {
    state = {
        val1:'',
        val2:''
    }
    back = ()=>{
        this.props.history.go(-1)
    }
    rule1 = (e)=>{
        this.setState({
            val1:e.target.value
        })
        if(e.target.value=='') {
            document.querySelector('.rule1').innerText = '用户名不能为空'
            document.querySelector('.rule1').style.display = 'block'
        } else if(/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(e.target.value)==false) {
            document.querySelector('.rule1').innerText = '请输入正确的手机号'
            document.querySelector('.rule1').style.display = 'block'
        } else {
            document.querySelector('.rule1').style.display = 'none'
        }
    }
    rule2 = (e)=>{
        this.setState({
            val2:e.target.value
        })
        if(e.target.value=='') {
            document.querySelector('.rule2').innerText = '密码不能为空'
            document.querySelector('.rule2').style.display = 'block'
        } else {
            document.querySelector('.rule2').style.display = 'none'
        }
    }
    login = ()=>{
        if(document.querySelector('.rule1').style.display == 'none' && document.querySelector('.rule2').style.display == 'none') {
            alert('登陆成功')
            this.setState({
                val1:'',
                val2:''
            })
        } else {
            alert('请输入正确的用户名与密码')
        }
    }
    render() {
        return (
            <div className="login-container">
                <div className="top">
                    <div className="back" onClick={this.back}>
                        <img src={back} />
                    </div>
                </div>
                <div className="form">
                    <span>
                        用户名：
                        <p className="rule1"></p>
                    </span>
                    <input type="text" value={this.state.val1} onChange={this.rule1} className='inp1' />
                    <br />
                    <span>
                        密码：
                        <p className="rule2"></p>
                    </span>
                    <input type="password" value={this.state.val2} onChange={this.rule2} className='inp2' />
                    <br />
                    <button onClick={this.login}>登录</button>
                </div>
            </div>
        )
    }
}
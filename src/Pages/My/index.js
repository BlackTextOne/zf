import React from "react";
import "./style.min.css";
import bg from "../../assets/image/bg.png";
import avatar from "../../assets/image/nav-1.png";
import join from "../../assets/image/join.png";

export default class My extends React.Component {
  state = {
    list: [
      { id: 1, icon: "icon-coll", text: "我的收藏" },
      { id: 2, icon: "icon-ind", text: "我的出租" },
      { id: 3, icon: "icon-ind", text: "看房记录" },
      { id: 4, icon: "icon-ind", text: "成为房主" },
      { id: 5, icon: "icon-my", text: "个人资料" },
      { id: 6, icon: "icon-ind", text: "联系我们" },
    ],
  };
  login = ()=>{
    this.props.history.push('/login')
  }
  render() {
    return (
      <div className="my-container">
        <div className="bg">
          <img src={bg} />
        </div>
        <div className="user">
          <div className="avatar">
            <img src={avatar} />
          </div>
          <div className="name">游客</div>
          <div className="login">
            <button onClick={this.login}>去登陆</button>
          </div>
        </div>
        <div className="line"></div>
        <div className="fn">
          <ul>
            {this.state.list.map((item) => {
              return (
                <li key={item.id}>
                  <i className={`iconfont ${item.icon}`}></i>
                  {item.text}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="join">
          <img src={join} />
        </div>
      </div>
    );
  }
}

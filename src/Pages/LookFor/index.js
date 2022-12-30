import React from "react";
import { lkHouses } from "../../api/lookfor";
import "./style.min.css";
import back from "../../assets/image/返回.png";

export default class LookFor extends React.Component {
  state = {
    list: [],
  };
  async componentDidMount() {
    const res = await lkHouses();
    console.log("找房页面", res.data.body.list);
    this.setState({
      list: res.data.body.list,
    });
  }
  details = (e) => {
    //获取id跳转详情
    if(e.target.parentNode.className=='text') {
      this.props.history.push(`/detail/${e.target.parentNode.nextElementSibling.innerText}`);
      console.log(e.target.parentNode.nextElementSibling.innerText);
    }else if(e.target.parentNode.className=='content') {
      this.props.history.push(`/detail/${e.target.parentNode.lastChild.innerText}`);
      console.log(e.target.parentNode.lastChild.innerText);
    } else if(e.target.parentNode.className=='img') {
      this.props.history.push(`/detail/${e.target.parentNode.parentNode.lastChild.innerText}`);
      console.log(e.target.parentNode.parentNode.lastChild.innerText);
    } else if(e.target.parentNode.className=='price') {
      this.props.history.push(`/detail/${e.target.parentNode.parentNode.parentNode.lastChild.innerText}`);
      console.log(e.target.parentNode.parentNode.parentNode.lastChild.innerText);
    } else {
      return
    }
  };
  render() {
    return (
      <div className="lookfor-container">
        <div className="top">
          <div className="back">
            <img src={back} />
          </div>
          找房
        </div>
        <div className="main">
          <div className="newTx">
            {this.state.list.map((item) => {
              return (
                <div className="content" key={item.desc} onClick={this.details}>
                  <div className="img">
                    <img src={`http://localhost:8080${item.houseImg}`} />
                  </div>
                  <div className="text">
                    <h4>{item.title}</h4>
                    <div className="desc">{item.desc}</div>
                    {item.tags.map((val) => {
                      return (
                        <div className="tags" key={val}>
                          {val}
                        </div>
                      );
                    })}
                    <div className="price">
                      <strong>{item.price}</strong>
                      &nbsp;元/月
                    </div>
                  </div>
                  <div className="houseCode" style={{display:'none'}}>{item.houseCode}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

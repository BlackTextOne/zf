import React from "react";
import "./style.min.css";
import { getInfoNews } from "../../api/information";
import back from "../../assets/image/返回.png";

export default class Information extends React.Component {
  state = {
    list: [],
  };
  async componentDidMount() {
    const res = await getInfoNews({ area: "AREA|88cff55c-aaa4-e2e0" });
    console.log("资讯页面", res.data.body);
    this.setState({
      list: res.data.body,
    });
  }
  render() {
    return (
      <div className="information-container">
        <div className="top">
          <div className="back">
            <img src={back} />
          </div>
          资讯
        </div>
        <div className="newTx">
          {this.state.list.map((item) => {
            return (
              <div className="content" key={item.id}>
                <div className="img">
                  <img src={`http://localhost:8080${item.imgSrc}`} />
                </div>
                <div className="text">
                  <div className="text-top">
                    <h4>{item.title}</h4>
                  </div>
                  <div className="text-down">
                    <span className="from">{item.from}</span>
                    <span className="date">{item.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
          {this.state.list.map((item) => {
            return (
              <div className="content" key={item.id}>
                <div className="img">
                  <img src={`http://localhost:8080${item.imgSrc}`} />
                </div>
                <div className="text">
                  <div className="text-top">
                    <h4>{item.title}</h4>
                  </div>
                  <div className="text-down">
                    <span className="from">{item.from}</span>
                    <span className="date">{item.date}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

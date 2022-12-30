import React from "react";
import { getHouses, getLike } from "../../api/detail";
import "./style.min.css";
import back from "../../assets/image/返回w.png";
import share from "../../assets/image/分享.png";
import { Carousel } from "antd-mobile";
import img1 from "../../assets/image/nav-1.png";
import { Modal, Button, WhiteSpace, WingBlank, Toast } from "antd-mobile";
import {
  Map,
  Marker,
  NavigationControl,
  InfoWindow,
  CustomOverlay,
} from "react-bmapgl"; //百度地图

const alert = Modal.alert;

const showAlert = () => {
  const alertInstance = alert("提示", "登录后才能收藏房源，是否去登录?", [
    { text: "取消", onPress: () => console.log("cancel"), style: "default" },
    { text: "去登陆", onPress: () => console.log("ok") },
  ]);
};

export default class detail extends React.Component {
  state = {
    list: [],
    // 轮播
    sed: [],
    // 小板块
    tags: [],
    // 房屋配套
    matching: [],
    // 猜你喜欢
    like: [],
    latitude: null,
    longitude: null,
  };
  back = () => {
    this.props.history.go(-1);
  };
  async componentDidMount() {
    const res = await getHouses(this.props.match.params.id);
    console.log(res.data.body);
    this.setState({
      list: res.data.body,
      sed: res.data.body.houseImg,
      tags: res.data.body.tags,
      matching: res.data.body.supporting,
      latitude: Number(res.data.body.coord.latitude),
      longitude: Number(res.data.body.coord.longitude),
    });
    // 猜你喜欢
    const res1 = await getLike({ area: "AREA|88cff55c-aaa4-e2e0" });
    this.setState({
      like: res1.data.body,
    });
  }
  render() {
    return (
      <div className="detail-container">
        {/* 头部 */}
        <div className="top">
          <div className="back" onClick={this.back}>
            <img src={back} />
          </div>
          {this.state.list.community}
          <div className="share">
            <img src={share} />
          </div>
        </div>
        {/* 轮播 */}
        <div className="seeding">
          <Carousel autoplay={true} infinite>
            {this.state.sed.map((val) => (
              <a
                className="lbA"
                key={val}
                href="#"
                style={{ display: "inline-block", width: "100%" }}
              >
                <img
                  src={`http://localhost:8080${val}`}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    verticalAlign: "top",
                  }}
                />
              </a>
            ))}
          </Carousel>
        </div>
        {/* 内容主体 */}
        <div className="main-text">
          <div className="title">{this.state.list.title}</div>
          {this.state.tags.map((val) => {
            return (
              <div className="tags" key={val}>
                {val}
              </div>
            );
          })}
          <div className="line"></div>
          <ul className="money-ul">
            <li>
              <div className="price">
                <strong>{this.state.list.price}</strong>
                &nbsp;/月
              </div>
              <p>租金</p>
            </li>
            <li>
              <div className="price">
                <strong>{this.state.list.roomType}</strong>
              </div>
              <p>房型</p>
            </li>
            <li>
              <div className="price">
                <strong>{this.state.list.size}平米</strong>
              </div>
              <p>面积</p>
            </li>
          </ul>
          <div className="line"></div>
          <ul className="type">
            <li>
              <span>装修：</span>
              精装
            </li>
            <li>
              <span>朝向：</span>
              {this.state.list.oriented}
            </li>
            <li>
              <span>楼层：</span>
              {this.state.list.floor}
            </li>
            <li>
              <span>类型：</span>
              普通住宅
            </li>
          </ul>
        </div>
        {/* 地图 */}
        <div className="map">
          <div className="title">小区：{this.state.list.community}</div>
          <div className="map-container">
            <Map
              center={{ lng: this.state.longitude, lat: this.state.latitude }}
              zoom="16"
              style={{ width: "100%", height: "100%" }}
            >
              {/* <Marker position={{lng: this.state.longitude, lat: this.state.latitude}} /> */}
              <NavigationControl />
              <CustomOverlay
                position={{
                  lng: this.state.longitude,
                  lat: this.state.latitude,
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    whiteSpace: "nowrap",
                    padding: "2vmin 3vmin",
                    backgroundColor: "rgb(238,92,91)",
                    border: "1px solid red",
                    transform: "translate(30%,0)",
                  }}
                >
                  {this.state.list.community}
                  <span
                    style={{
                      display: "inline-block",
                      width: "3vmin",
                      height: "3vmin",
                      backgroundColor: "rgb(238,92,91)",
                      transform: "rotate(45deg)",
                      position: "absolute",
                      left: "6.5vmin",
                      bottom: "-1.5vmin",
                    }}
                  ></span>
                </div>
              </CustomOverlay>
            </Map>
          </div>
          <div className="all-title">房屋配套</div>
          <div className="line"></div>
          <div className="matching">
            {this.state.matching.length == 0
              ? "暂无数据"
              : this.state.matching.map((item) => {
                  return <span key={item}>{item}</span>;
                })}
          </div>
        </div>
        {/* 概况 */}
        <div className="overview">
          <div className="all-title">房源概况</div>
          <div className="line"></div>
          <div className="call">
            <div className="user-avatar">
              <img src={img1} />
            </div>
            <div className="username">
              <p>王女士</p>
              <p style={{ color: "#ff461d" }}>
                <i className="iconfont icon-auth"></i> 已认证房主
              </p>
            </div>
            <button className="message">发消息</button>
          </div>
          <div className="description">
            {this.state.list.description == ""
              ? "暂无房屋描述"
              : this.state.list.description}
          </div>
        </div>
        {/* 猜你喜欢 */}
        <div className="like">
          <div className="all-title">猜你喜欢</div>
          <div className="line"></div>
          <div className="like-content">
            {this.state.like.map((item) => {
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
        {/* 底部 */}
        <div className="down">
          <ul>
            <li style={{ borderRight: "1px solid #999" }}>
              <WingBlank size="lg">
                <WhiteSpace size="lg" />
                <Button onClick={showAlert}>
                  <i className="iconfont icon-coll"></i> 收藏
                </Button>
              </WingBlank>
            </li>
            <li>在线咨询</li>
            <li style={{ backgroundColor: "rgb(32,185,121)", color: "#fff" }}>
              电话预约
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

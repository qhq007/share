import axios from 'axios';
import React, { Fragment, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import qs from "qs"
import "./index.css"

export default function Mine() {
    const inputRef = useRef();
    const navigate = useNavigate();
    const inputClick = () => {
        inputRef.current.click();
    }
    const updateImg = (event) => {
        const file = event.target.files[0];
        if(file.size > 100 * 1024){
            alert("呜呜，您选取的头像太大了！");
            return;
        }
        const fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = () => {
            const userImg = fr.result;
            const userId = JSON.parse(localStorage.getItem("user")).userId;
            axios.post("UserController/updateUserImg",qs.stringify({userImg,userId})).then(
                data => {
                    if(!data.code){
                        const user = JSON.parse(localStorage.getItem("user"));
                        user.userImg = userImg;
                        localStorage.setItem("user",JSON.stringify(user));
                        alert("修改头像成功");
                        // 使页面刷新，头像能刷新
                        navigate("/mine",{replace:true});
                    }
                }
            )
        }
    }
    const loginout = () => {
        localStorage.clear();
        navigate("/login",{replace:true});
    }
  return (
    <Fragment>
        <div className="mine-wrapper">
            <div className="userInfo">
                <div className="head-img">
                    <input ref={inputRef} type="file" name="headImg" style={{display:"none"}} accept="image/*" onChange={updateImg}/>
                    <img src={JSON.parse(localStorage.getItem("user")).userImg ? JSON.parse(localStorage.getItem("user")).userImg : require("../../assets/headImg.webp")} alt="出错啦！" style={{width:"4rem",height:"4rem"}} onClick={inputClick}/>
                </div>
                <span>{localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).userName}</span>
            </div>
            <div className="service">
                <div className="create">
                    <Link to="/share">分享</Link>
                </div>
                <div className="like">
                    <Link to="/love">喜欢</Link>
                </div>
                <div className="update">
                    <Link to="/update">更改昵称</Link>
                </div>
                <div className="loginout" onClick={loginout}>
                    <span>退出登录</span>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

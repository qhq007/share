import axios from 'axios';
import qs from "qs"
import React, { Fragment, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Index() {
    const myRef1 = useRef();
    const myRef2 = useRef();
    const myRef3 = useRef();
    const myRef4 = useRef();
    const navigate = useNavigate();
    function register() {
        const userName = myRef1.current.value;
        const userId = myRef2.current.value;
        const password = myRef3.current.value;
        const confirmPassword = myRef4.current.value;
        const user = {
            userId,
            userName,
            password
        }
        if (userId === '') {
            alert('手机号码不能为空！');
            return;
        }
        if (password === '') {
            alert('密码不能为空！');
            return;
        }
        if (password !== confirmPassword) {
            alert('两次输入的密码不一致！');
            return;
        }
        if (userName === '') {
            alert('用户名不能为空！');
            return;
        }
        axios.post("UserController/register", qs.stringify(user)).then(
            data => {
                if (data.code) {
                    alert("注册失败");
                    return;
                } 
                localStorage.setItem("token",data.token);
                delete user.password;
                localStorage.setItem("user", JSON.stringify(user));
                alert("注册成功");
                navigate("/home", { replace: true })
            }
        )
    }
    return (
        <Fragment>
            <div className="login-register-wrapper">
                <div className="inner">
                    <div className="register">
                        <input type="text" name="userName" placeholder="昵称" ref={myRef1}></input>
                        <input type="text" name="userId" placeholder="电话" ref={myRef2}></input>
                        <input type="password" name="password" placeholder="密码" ref={myRef3}></input>
                        <input type="password" name="confirmPassword" placeholder="确认密码" ref={myRef4}></input>
                    </div>
                    <div className="box register-box">
                        <div onClick={register}>
                            <span>注册</span>
                        </div>
                    </div>
                    <div className="box login-box">
                        <Link to="/login">
                            <span>登录</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

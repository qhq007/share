import React, { Fragment,useRef } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import axios from "axios"
import qs from "qs"
import "./index.css"
export default function Index() {
    const myRef1 = useRef();
    const myRef2 = useRef();
    const navigate = useNavigate();
    function login(){
        const userId = myRef1.current.value;
        const password = myRef2.current.value;
        if (userId === '') {
            alert('手机号码不能为空！');
            return;
        }
        if (password === '') {
            alert('密码不能为空！');
            return;
        }
        axios.post("UserController/login",qs.stringify({
            userId,
            password
        })).then(data => {
            if(data.code){
                alert("登录失败");
            }else{
                localStorage.setItem("token",data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                alert("登录成功");
                navigate("/home",{replace:true});
            }
        })
    }
        return (
        <Fragment>
            <div className="login-register-wrapper">
                <div className="inner">
                    <div className="login">
                        <input ref={myRef1} type="text" placeholder=" 账户" name="userId"  />
                        <input ref={myRef2} type="password" placeholder=" 密码" name="password" />
                    </div>
                    <div className="box register-box">
                        <Link to="/register">
                            <span>注册</span>
                        </Link>
                    </div>
                    <div className="box login-box" onClick={login}>
                            <span>登录</span>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

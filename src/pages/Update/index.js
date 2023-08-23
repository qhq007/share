import axios from 'axios';
import qs from "qs"
import React, { Fragment,useRef } from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import "./index.css"
export default function Index() {
    const myRef = useRef();
    const navigate = useNavigate();
    function update(){
        const userName = myRef.current.value;
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        axios.post("UserController/updateUserName",qs.stringify({
            userName,
            userId
        })).then(data => {
            if(!data.code){
                alert("更新成功");
                const user = JSON.parse(localStorage.getItem("user"));
                user.userName = userName;
                localStorage.setItem("user",JSON.stringify(user));
                navigate("/mine");
            }else{
                alert("更新失败");
            }
        })
    }
    return (
        <Fragment>
             <div className="update-wrapper">
                <div className="inner">
                    <div className="update">
                        <input  placeholder={JSON.parse(localStorage.getItem("user")).userName} type="text" readOnly  />
                        <input ref={myRef} autoFocus type="text" placeholder="新昵称" name="userName" />
                    </div>
                    <div className="box update-box" onClick={update}>
                        <NavLink >
                            <span>更改</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

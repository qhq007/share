import axios from 'axios'
import qs from "qs"
import React, { Fragment, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import "./index.css"
export default function Share() {
    const myRef1 = useRef();
    const myRef2 = useRef();
    const navigate = useNavigate();
    function share(){
        const user = {
            userId:JSON.parse(localStorage.getItem("user")).userId,
            content:myRef2.current.value,
            keyWord:myRef1.current.value
        }
        axios.post("StoryController/addStory",qs.stringify(user)).then(
            data => {
                if(!data.code){
                    alert("发送成功");
                    navigate("/mine");
                }else{
                    alert("发送失败");
                }
            }
        )
    }
    return (
        <Fragment>
            <div className="story-share">
                <input type="text" ref={myRef1} name="keyWord" placeholder='关键字' ></input>
                <textarea ref={myRef2} placeholder='内容' name="content"></textarea>
                <div onClick={share}><span>分享</span></div>
            </div>
        </Fragment>
    )
}

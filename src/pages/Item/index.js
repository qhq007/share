import axios from 'axios';
import qs from "qs"
import React, { Fragment, useRef, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./index.css"
export default function Item(props) {
    const { storyId, content, loves } = props;
    const myRef = useRef();
    const [state, setState] = useState(0);
    const [loveState,setLove] = useState(loves);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const userId = user.userId;
            axios.post("LoveController/hasLove", qs.stringify({
                storyId,
                userId
            })).then(data => {
                if(!data.code) setState(1);
            })
        }
    })
    function love() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const userId = user.userId;
            if (!state) {
                axios.post("LoveController/addLove", qs.stringify({
                    storyId,
                    userId
                })).then(
                    data => {
                        if (!data.code) {
                            setState(1);
                            setLove(loveState+1);
                        }
                    }
                )
            }
            else {
                axios.post("LoveController/removeLove", qs.stringify({
                    storyId,
                    userId
                })).then(
                    data => {
                        if (!data.code) {
                            setState(0);
                            setLove(loveState-1);
                        }
                    }
                )
            }
        } else {
            alert("请先登录");
        }
    }
    return (
        <Fragment>
                <div className="share">
                    <span className='icon' onClick={love}>
                        <FontAwesomeIcon icon="fas fa-heart" ref={myRef} style={{color:(state ? "red":"")}}/>{loveState}
                    </span>
                    <div className='content'>{content}</div>
                </div>
        </Fragment>
    )
}

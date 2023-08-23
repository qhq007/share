import Item from '../Item'
import React, { Fragment, useState, useEffect } from 'react'
import "./index.css"
import axios from 'axios';
export default function Home() {
    const [storys, setStorys] = useState([]);
    const [pages,setPages] = useState(1);
    const [totalPages,setTotalpages] = useState(0);
    useEffect(() => {
        axios.get(`StoryController/getStoryList/${pages}/5`).then(
            data => {
                if(data.code){
                    alert("出错了，请稍后重试~~");
                    return;
                } 
                setStorys(storys => [...storys,...data.storyList]);
                setTotalpages(data.totalPage);
            }
        );
    }, [pages])
    const getPages = () => {
        let timer;
        return (event) => {
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                const distance = 20;
                if(event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight - distance){
                    pages < totalPages && setPages(pages => pages + 1 )
                }
                timer = null;
            },400)
        }

    }
    const search = (event) => {
        event.preventDefault();
        const fm = new FormData(event.target);
        const keyWord = fm.get("keyWord");
        axios.get(`StoryController/getStoryBykeyWord/${keyWord}`).then(
            data => {
                if(data.code){
                    alert("出错了，请稍后重试~~");
                    return;
                }
                setStorys(data.storyList);
            }
        )
    }

    return (
        <Fragment>
            <main onScroll={getPages()}>
                <div className="wrapper">
                    <form className="search" onSubmit={search}>
                        <input type="text" name="keyWord" placeholder="输入关键字" />
                    </form>
                    {
                        storys.map(story => <Item key={story.storyId} {...story} />)
                    }
                </div>
            </main>
        </Fragment>
    )
}

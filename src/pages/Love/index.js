import axios from 'axios'
import Item from "../Item"
import React, { Fragment,useEffect, useState } from 'react'

export default function Index() {
    const [loves,setLoves] = useState([]);
    useEffect(()=>{
        const userId = JSON.parse(localStorage.getItem("user")).userId;
        axios.get(`LoveController/getLoveList/${userId}`).then(data => {
            if(!data.code){
                setLoves(data.loveList);
            }
        })
    },[])
  return (
    <Fragment>
        {
            loves.map(loves => <Item key={loves.storyId} {...loves}/>)
        }
    </Fragment>
  )
}

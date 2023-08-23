import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./index.css"
export default function Header() {
    const navigate = useNavigate();
    return (
        <Fragment>
            <header>
                <FontAwesomeIcon icon="fa-solid fa-angle-left" onClick={() => navigate(-1)}/>
                <span>爱分享</span>
            </header>
        </Fragment>
    )
}

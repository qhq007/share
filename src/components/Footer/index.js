import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./index.css"

export default function Footer() {
  return (
    <Fragment>
      <footer>
        <div className="home">
          <NavLink className={({isActive}) => isActive? "light" :""} to="/home">
          <FontAwesomeIcon icon="fa-solid fa-house" />
          </NavLink>
        </div>
        <div className="user">
          <NavLink className={({isActive}) => isActive? "light" :""} to="/mine" >
          <FontAwesomeIcon icon="fas fa-user" />
          </NavLink>
        </div>
      </footer>
    </Fragment>
  )
}

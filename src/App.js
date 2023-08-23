import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Mine from "./pages/Mine"
import Update from "./pages/Update"
import Share from "./pages/Share"
import Love from "./pages/Love"
import { Routes, Route, Navigate } from "react-router-dom"
import { Fragment } from 'react';
import Auth from "./Auth"
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas);

export default function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mine" element={<Auth><Mine /></Auth>} />
        <Route path="/update" element={<Auth><Update /></Auth>} />
        <Route path="/share" element={<Auth><Share /></Auth>} />
        <Route path="/love" element={<Auth><Love /></Auth>} />
        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}



import React from 'react'
import { Link } from 'react-router-dom'

import '../../App.css'
import BackgroundImage from '../../assets/images/bg.png'

export default function LandingPage() {
    return (
        <header style={ HeaderStyle }>
            <h1 className="main-title text-center">zkSalary</h1>
            <p className="main-para text-center">reveal nothing</p>
            <div className="buttons text-center">
                <Link to="/login">
                    <button className="primary-button" id="reg_btn"><span>log in</span>
                    {/* <span style={Description}>(Only for HR)</span> */}
                    </button>
                </Link>
                <Link to="/prove">
                    <button className="primary-button" id="reg_btn"><span>prove </span></button>
                </Link>
                <Link to="/verify">
                    <button className="primary-button" id="reg_btn"><span>verify </span></button>
                </Link>
            </div>
        </header>
    )
}

const HeaderStyle = {
    width: "100%",
    height: "100vh",
    // background: `url(${BackgroundImage})`,
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover"
}
const Description = {
    // fontsize: '1rem'
}
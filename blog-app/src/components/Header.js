import React from 'react'
import { NavLink } from "react-router-dom"

function Header() {
    return (
        <header className="header_section">
            <div className="container">
                <section className="header flex between align_center">
                    <div className="header_left flex-30">
                        <a href="#">
                            <img className="logo" src="/images/hashnode.svg" alt="logo" />
                        </a>
                    </div>

                    <div className="header_right flex-20">
                        <nav className="nav">
                            <ul className="flex ">
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/signin">Log in</NavLink></li>
                                <li><NavLink to="/signup">Sign up</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </section>
            </div>
        </header>
    )
}

export default Header

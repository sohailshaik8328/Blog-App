import React from 'react'
import { NavLink } from "react-router-dom"
import {withRouter} from "react-router"

function Header(props) {
    return (
        props.isLogged ? <AuthenticatedHeader logout={props.logout} /> : <UnAuthenticatedHeader />
    )
}

function AuthenticatedHeader(props) {
    return (
        <>
            <header className="header_section">
            <div className="container">
                <section className="header flex between align_center">
                    <div className="header_left flex-30">
                        <a href="/">
                            <img className="logo" src="/images/hashnode.svg" alt="logo" />
                        </a>
                    </div>

                    <div className="header_right ">
                        <nav className="nav">
                            <ul className="flex ">
                                {/* <li><a href="/"><NavLink activeClassName="nav_active" exact to="/">Home</NavLink></a></li> */}
                                <li><a href="/" className="">Home</a></li>
                                {/* <li><NavLink activeClassName="nav_active" exact to="/">Home</NavLink></li> */}
                                <li><NavLink activeClassName="nav_active" to="">Profile</NavLink></li>
                                <li><NavLink activeClassName="nav_active"  to="">Settings</NavLink></li>
                                <li><NavLink activeClassName="nav_active" onClick={props.logout} to="/">Log Out</NavLink></li>
                                {/* <li><a href="/" onClick={props.logout}>Log Out</a></li> */}
                            </ul>
                        </nav>
                    </div>
                </section>
            </div>
        </header>
        </>
    )
}

function UnAuthenticatedHeader(props) {
    return (
        <>
            <header className="header_section">
            <div className="container">
                <section className="header flex between align_center">
                    <div className="header_left flex-30">
                        <a href="/">
                            <img className="logo" src="/images/hashnode.svg" alt="logo" />
                        </a>
                    </div>

                    <div className="header_right flex-20">
                        <nav className="nav">
                            <ul className="flex ">
                                {/* <li><NavLink activeClassName="nav_active" exact to="/">Home</NavLink></li> */}
                                <li><a href="/"  className="">Home</a></li>
                                <li><NavLink activeClassName="nav_active" to="/signin">Log in</NavLink></li>
                                <li><NavLink activeClassName="nav_active" to="/signup">Sign up</NavLink></li>
                            </ul>
                        </nav>
                    </div>
                </section>
            </div>
        </header>
        </>
    )
}




export default withRouter(Header)

import React from 'react'
import { Link } from 'react-router-dom'
import validate from './utils/validate';
import { BaseUrl, localStorageKey } from './utils/constant';
import {withRouter} from "react-router"

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : "",
            errors : {
                email : "",
                password : ""
            }
        }
    }

    handleChange = (event) => {
        let {name, value} = event.target;
        let errors = {...this.state.errors};

        validate(errors, name, value)

        this.setState({
            [name] : value,
            errors,
        })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let url = BaseUrl + "users/login"
        let {email, password} = this.state;
        fetch(url, {
            method : "POST",
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers : {'Content-Type' : 'application/json'},
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            body : JSON.stringify({
                "user": {
                   email,
                   password
                }
            })
        })
        .then(res => {
            console.log(res)
            if(!res.ok) {
                return res.json().then(({errors}) => {
                    
                    return Promise.reject(errors);
                })
            }
            return res.json();
        })
        .then(({user}) => {
            console.log("sadfasdfasdf")
            this.props.updateUser(user)
            this.setState({
                email : "",
                password : ""
            })
            this.props.history.push('/')
            console.log("User successfully logged in", user);
            localStorage.setItem(localStorageKey, user.token)
        })
        .catch(errors => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    errors : {
                        ...prevState.errors,
                        email : "Email or password is Invalid!"
                    }
                }
            })
        })

    }

    render() {
        let {email, password, errors} = this.state;
        return (
            <>
              <section>
                  <div className="container">
                      <div className="form_div flex align_center center">
                        <form className='form' onSubmit={this.handleSubmit }>
                            <h2 className="form_heading">Log In</h2>
                            <label className="label" htmlFor="email">Email</label>
                            <input className="input" onChange={this.handleChange} name="email" value={email}  type="email" placeholder="Enter your email"  />
                            <p className="error">{errors.email}</p>
                            <label className="label" htmlFor="password">Password</label>
                            <input className="input" onChange={this.handleChange} name="password" value={password} type="password" placeholder="Enter your Password"  />
                            <p className="error">{errors.password}</p>
                            <input disabled={errors.email || errors.password} type="submit" value="Log in" className="input_btn input"  /> 
                            <Link to="/signup">
                                <button className="form_btn">Signup</button>
                            </Link>
    
                        </form>
                      </div>
                  </div>
              </section>
            </>
        )
    }
}

export default withRouter(Signin)

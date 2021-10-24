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
        // console.log(event.target.value)
        let errors = {...this.state.errors};

        validate(errors, name, value)

        this.setState({
            [name] : value,
            errors,
        })
    }

    // login = () => {
    //     let url = BaseUrl + "users/login"
    //     // console.log(url)
    //     let {email, password, errors} = this.state;
    //     fetch(url, {
    //         method : "POST",
    //         mode: 'cors', 
    //         cache: 'no-cache', 
    //         credentials: 'same-origin', 
    //         headers : {'Content-Type' : 'application/json'},
    //         redirect: 'follow', 
    //         referrerPolicy: 'no-referrer',
    //         body : JSON.stringify({
    //             "user": {
    //                email,
    //                password
    //             }
    //         })
    //     })
    //     .then(res => {
    //         if(!res.ok) {
    //             return res.json().then(({errors}) => {
    //                 this.setState({errors})
    //                 return Promise.reject(errors);
    //             })
    //         }
    //         return res.json();
    //     })
    //     .then((userInfo) => {
    //         this.setState({
    //             email : "",
    //             password : ""
    //         })
    //         // console.log(this.props)
    //         this.props.history.push('/')
    //         console.log("User successfully logged in", userInfo);
    //         localStorage.setItem(localStorageKey, userInfo.user.token)
    //     })
    //     .catch(err => this.setState({errors}))
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        
        // this.login();

        let url = BaseUrl + "users/login"
        // console.log(url)
        let {email, password, errors} = this.state;
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
            if(!res.ok) {
                return res.json().then(({errors}) => {
                    
                    return Promise.reject(errors);
                })
            }
            return res.json();
        })
        .then(({user}) => {
            this.props.updateUser(user)
            this.setState({
                email : "",
                password : ""
            })
            // console.log(this.props)
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
        // console.log(password)
        return (
            <>
              <section>
                  <div className="container">
                      <div className="form_div flex align_center center">
                        <form  onSubmit={this.handleSubmit }>
                            <h2 className="form_heading">Log In</h2>
                            <label htmlFor="email">Email</label>
                            <input onChange={this.handleChange} name="email" value={email}  type="email" placeholder="Enter your email"  />
                            <p className="error">{errors.email}</p>
                            <label htmlFor="password">Password</label>
                            <input onChange={this.handleChange} name="password" value={password} type="password" placeholder="Enter your Password"  />
                            <p className="error">{errors.password}</p>
                            <input disabled={errors.email || errors.password} type="submit" value="Log in" className="input_btn"  /> 
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

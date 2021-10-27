import React from 'react'
import { Link } from 'react-router-dom'
import { BaseUrl } from './utils/constant';
import validate from './utils/validate';
import {withRouter} from "react-router"

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : "",
            email : "",
            password : "",
            errors : {
                username : "",
                email : "",
                password : "",
            }
        }
    }

    handleChange = ({target}) => {
        let {name, value} = target;
        let errors = {...this.state.errors};

        validate(errors, name, value);


        this.setState({
            [name] : value,
            errors,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let url = BaseUrl + "users"
        let {username, email, password} = this.state;
        fetch(url, {
            method : "POST",
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify({
                "user": {
                    username,
                    email,
                    password
                }
            })
        })
        .then(res => {
            if(!res.ok) {
               return res.json().then(({errors}) => {
                    return Promise.reject(errors)
                })
            }
            return res.json()
        })
        .then(({user}) => {
            this.props.updateUser(user);
            this.setState({
                username : "",
                email : "",
                password : ""
            })
            this.props.history.push('/signin');
            console.log("User successfully register", user);

        })
        .catch(errors => this.setState({errors}))
    }

    render() {
        let {username, email, password, errors} = this.state;
        return (
            <>
              <section>
                  <div className="container">
                      <div className="form_div flex align_center center">
                        <form className="form" onSubmit={this.handleSubmit}>
                        <h2 className="form_heading">Sign Up</h2>
                            <label className="label" htmlFor="username">Username</label>
                            <input className="input"  name="username" value={username} onChange={this.handleChange} type="username" placeholder="Enter your username"  />
                            <p className="error">{errors.username}</p>
                            <label className="label"  htmlFor="email">Email</label>
                            <input className="input"  name="email" value={email} onChange={this.handleChange} type="email" placeholder="Enter your email"  />
                            <p className="error">{errors.email}</p>
                            <label className="label"  htmlFor="password">Password</label>
                            <input className="input"   name="password" value={password} onChange={this.handleChange} type="password" placeholder="Enter your Password"  />
                            <p className="error">{errors.password}</p>
                            <input disabled={errors.username || errors.email || errors.password} type="submit" value="Signup" className="input_btn input"  />
                            <Link to="/signin">
                                <button className="form_btn">Login</button>
                            </Link>
                        </form>
                      </div>
                  </div>
              </section>
            </>
        )
    }
}

export default withRouter(SignUp)

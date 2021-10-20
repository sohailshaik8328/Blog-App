import React from 'react'
import { Link } from 'react-router-dom'
import validate from './utils/validate';

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

    render() {
        let {username, email, password, errors} = this.state;
        return (
            <>
              <section>
                  <div className="container">
                      <div className="form_div flex align_center center">
                        <form action="" onSubmit={this.handleSubmit}>
                            <label htmlFor="username">Username</label>
                            <input name="username" value={username} onChange={this.handleChange} type="username" placeholder="Enter your username"  />
                            <p className="error">{errors.username}</p>
                            <label htmlFor="email">Email</label>
                            <input name="email" value={email} onChange={this.handleChange} type="email" placeholder="Enter your email"  />
                            <p className="error">{errors.email}</p>
                            <label htmlFor="password">Password</label>
                            <input name="password" value={password} onChange={this.handleChange} type="password" placeholder="Enter your Password"  />
                            <p className="error">{errors.password}</p>
                            <input disabled={errors.username || errors.email || errors.password} type="submit" value="Signup" className="input_btn"  />
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

export default SignUp

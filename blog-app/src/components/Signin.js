import React from 'react'
import { Link } from 'react-router-dom'
import validate from './utils/validate';


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

    handleSubmit = (event) => {
        event.preventDefault()
    }

    render() {
        let {email, password, errors} = this.state;
        // console.log(password)
        return (
            <>
              <section>
                  <div className="container">
                      <div className="form_div flex align_center center">
                        <form action="" onSubmit={this.handleSubmit}>
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

export default Signin

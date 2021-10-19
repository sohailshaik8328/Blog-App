import React from 'react'
import { Link } from 'react-router-dom'


class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password : ""
        }
    }
    render() {
        return (
            <>
              <section>
                  <div className="container">
                      <div className="form_div flex align_center center">
                        <form action="">
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder="Enter your email"  />
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder="Enter your Password"  />
                            <input type="submit" value="Log in" className="input_btn"  />
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

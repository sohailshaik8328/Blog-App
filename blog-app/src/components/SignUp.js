import React from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <>
          <section>
              <div className="container">
                  <div className="form_div flex align_center center">
                    <form action="">
                        <label htmlFor="username">Username</label>
                        <input type="username" placeholder="Enter your username"  />
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter your email"  />
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter your Password"  />
                        <input type="submit" value="Signup" className="input_btn"  />
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

export default SignUp

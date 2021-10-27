import React from 'react'
import { BaseUrl, localStorageKey } from './utils/constant';
import validate from './utils/validate';
import { withRouter } from 'react-router';

class Settings extends React.Component {
    state = {
        username : "",
        image : "",
        bio : "",
        email : "",
        password : "",
        errors : {
            username : "",
            image : "",
            bio : "",
            email : "",
            password : "",
        }
    }
    handleChange = ({target}) => {
        let {name, value} = target;
        let errors = {...this.state.errors};
        validate(errors, name, value)
        this.setState({
            [name] : value,
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let key = localStorage[localStorageKey];
        let url = BaseUrl + "user";
        let {username, image, bio, email, password} = this.state;
        if(key) {
        fetch(url, {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                authorization : `Token ${key}`
            },
            body : JSON.stringify({
                user : {
                    username,
                    image,
                    bio,
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
            return res.json();
        })
        .then(({user}) => {
            this.setState({
                username,
                image,
                bio,
                email,
                password
            })
            this.props.updateUser({user})
            this.props.history.push('/profile')
        })
       }
        
    }
   render() {
       let {username, image, bio, email, password, errors} = this.state;
    return (
        <>
        <section>
            <div className="my_container">
                <section className="article_form_section flex center align_center">
                    <form className="article_form" onSubmit={this.handleSubmit}>
                        <h2 className="write_art_heading">Update Your Profile</h2>
                        <div className="flex between">
                            <div className=" art_inp_field flex-48">
                                <label className="art_label" htmlFor="username">username</label>
                                <input onChange={this.handleChange} value={username}    type="text" name="username" className="art_inp" id="" />
                            </div>
                            <div className="flex-48 art_inp_field">
                                <label className="art_label" htmlFor="image">Url of Profile Picture</label>
                                <input onChange={this.handleChange} value={image}  type="text" name="image" className="art_inp" id="" />
                            </div>
                        </div>

                       <div className=" art_inp_field">
                            <label className="art_label" htmlFor="bio">Bio</label>
                            <textarea onChange={this.handleChange} value={bio}  name="bio" id="" className="art_inp art_textarea"></textarea>
                       </div>
                        <div className=" art_inp_field">
                            <label className="art_label" htmlFor="email">Email</label>
                            <input onChange={this.handleChange}  value={email}  type="text" name="email" className="art_inp" id="" />
                            <h2 className="error new_art_error">{errors.email}</h2>
                        </div>
                        <div className=" art_inp_field">
                            <label className="art_label" htmlFor="password">New Password</label>
                            <input onChange={this.handleChange}  value={password} type="text" name="password" className="art_inp" id="" />
                        </div>
                        <div className="art_form_btn">
                            <button className="form_btn add_art_btn">Update</button>
                        </div>
                    </form>
                </section>
            </div>
        </section>
    </>
    )
   }
}

export default withRouter(Settings)

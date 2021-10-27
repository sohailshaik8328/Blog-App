import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { ArticlesUrl, localStorageKey } from './utils/constant';
const moment = require('moment');



 class Comments extends Component {
     state = {
        comment : []
     }
     handleChange = ({target}) => {
        let {name, value} = target;

        this.setState({
            [name] : value,
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let {comment} = this.state;
        let slug = this.props.slug;
        let key = localStorage[localStorageKey];
        let url = ArticlesUrl + `/${slug}/comments`;
       if(key) {
        fetch(url, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                authorization : `Token ${key}`
            },
            body : JSON.stringify({
                comment : {
                    body : comment
                }
            })
        })
        .then (res => {
            if(!res.ok) {
                throw new Error("Not able to post comments")
            }
            return res.json();
        })
        .then(comment => {
            console.log(comment)
            this.setState({
                comment : ""
            }, this.props.getComments, this.handleDeleteComment)
            this.props.history.push(`/article/${slug}`)
        })
       }
    }

    handleDeleteComment = (id) => {
        let slug = this.props.slug;
        let url = ArticlesUrl + `/${slug}/comments/${id}`;
        let key = localStorage[localStorageKey];
        fetch(url, {
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Token ${key}`
            }
        })
        .then(res => {
            if(!res.ok) {
                return res.json().then(({errors}) => {
                    return Promise.reject(errors)
                })
            }
            this.props.getComments();
        })
        .catch(err => this.setState({err}))

    }


    render() {
        let {comment} = this.state
        let allComments = this.props.allComments;
        return (
            <>
               <section className="total_comment_section">
                <div className="my_container">
                        <section className="flex align_center center">
                            <form className="article_form" onSubmit={this.handleSubmit} >
                                <h2 className="write_art_heading">Add Comments</h2>

                                <div className=" art_inp_field">
                                        <label className="art_label" htmlFor="comment">Add Comment</label>
                                        <textarea onChange={this.handleChange} value={comment} placeholder="Write a comment..."   name="comment" id="" className="art_inp art_textarea comment_textarea"></textarea>
                                </div>
                                <div className="art_form_btn">
                                    <button className="form_btn add_art_btn">Add Comment</button>
                                </div>
                            </form>
                        </section>


                        <section className="comments_section">
                                {
                                    allComments.map((eachComment) => (
                                        <div className="comment_card" key={eachComment.id}>
                                            <div>
                                                 <h2 className="comment_body">{eachComment.body}</h2>
                                            </div>
                                        
                                            <div className="comment_author_info flex align_center between">
                                                <article className="flex align_center  ">
                                                   <img className="author_img" src={eachComment.author.image} alt={eachComment.author.image} />
                                                   <h2 className="author_name">{eachComment.author.username}</h2>
                                                   <h3 className="comment_date">{moment(eachComment.createdAt).add(1, 'day').format('LLL')}</h3>
                                                </article>
                                                <article>
                                                    <img onClick={() => this.handleDeleteComment(eachComment.id)} className="delete_gif" src="/images/delete.gif" alt="" />
                                                </article>
                                            </div>
                                        </div>
                                    ))
                                }
                        </section>
                    </div>
               </section>

            </>
        )
    }
}

export default withRouter(Comments)

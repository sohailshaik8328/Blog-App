import React, { Component } from 'react'
import { ArticlesUrl, localStorageKey } from './utils/constant';
import { withRouter } from 'react-router';


 class UpdateArticle extends Component {
    state = {
        title : "",
        description : "",
        body : "",
        tagList : "",
        errors : {
            title : "",
            description : "",
            body : "",
            tagList : "",
        }
    }
    componentDidMount() {
        let {slug} = this.props.match.params;
        let url = ArticlesUrl + `/${slug}`
        fetch(url).then(res => res.json()).then(data => {
            this.setState({
                title : data.article.title,
                description : data.article.description,
                body : data.article.body,
                tagList : data.article.tagList
            })
        })
    }

    handleChange = ({target}) => {
        let {name, value} = target;
        let errors = this.state.errors;

        switch (name) {
            case "title":
                errors.title = value.length === 0 ? "*title is required!" : ""
                break;
            case "description":
                errors.description = value.length === 0 ? "*description is required!" : ""
                break;
            case "body":
                errors.body = value.length === 0 ? "*body is required!" : ""
                break;
            case "tagList":
                errors.tagList = value.length === 0 ? "*tags are required!" : ""
                break;
        
            default:
                break;
        }

        this.setState({
            [name] : value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let key = localStorage[localStorageKey];
        let {slug} = this.props.match.params;
        let url = ArticlesUrl + `/${slug}`
        let {title, description, body, tagList} = this.state;
        if(key ) {
            fetch(url, {
                method : "PUT",
                headers : {
                    "Content-Type" : "application/json",
                    authorization : `Token ${key}`
                },
                body : JSON.stringify({
                    article : {
                        title,
                        description,
                        body,
                        tagList
                    }
                })
            })
            .then((res) => {
                if(!res.ok) {
                    return res.json().then((errors) => {
                        return Promise.reject(errors);
                    })
                }
                return res.json();
            })
            .then((article) => {
                this.setState({
                    title : "",
                    description : "",
                    body : "",
                    tagList  :""
                })
                this.props.history.push(`/article/${article.article.slug}`)

            })
            .catch((errors) => {
                this.setState({errors})
            })
        }
        
    }
   render() {
       let {title, description, body, tagList, errors} = this.state;
    return (
        <>
            <section>
                <div className="my_container">
                    <section className="article_form_section flex center align_center">
                        <form className="article_form" onSubmit={this.handleSubmit}>
                            <h2 className="write_art_heading">Update Aritlce</h2>
                            <div className="flex between">
                                <div className=" art_inp_field flex-48">
                                    <label className="art_label" htmlFor="title">Title</label>
                                    <input onChange={this.handleChange} required={true} value={title}  type="text" name="title" className="art_inp" id="" />
                                    <h2 className="error new_art_error">{errors.title}</h2>
                                </div>
                                <div className="flex-48 art_inp_field">
                                    <label className="art_label" htmlFor="description">What's this article about?</label>
                                    <input onChange={this.handleChange} required={true} value={description} type="text" name="description" className="art_inp" id="" />
                                    <h2 className="error new_art_error">{errors.description}</h2>
                                </div>
                            </div>

                           <div className=" art_inp_field">
                                <label className="art_label" htmlFor="body">Write your article</label>
                                <textarea onChange={this.handleChange} required={true} value={body} name="body" id="" className="art_inp art_textarea"></textarea>
                                <h2 className="error new_art_error">{errors.body}</h2>
                           </div>
                            <div className=" art_inp_field">
                                <label className="art_label" htmlFor="tagList">Enter tags</label>
                                <input onChange={this.handleChange} required={true} value={tagList} type="text" name="tagList" className="art_inp" id="" />
                                <h2 className="error new_art_error">{errors.tagList}</h2>
                            </div>
                            <div className="art_form_btn">
                                <button className="form_btn add_art_btn">Update Article</button>
                            </div>
                        </form>
                    </section>
                </div>
            </section>
        </>
    )
   }
}

export default withRouter(UpdateArticle)

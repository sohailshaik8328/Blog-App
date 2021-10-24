import React from 'react'
import { withRouter } from 'react-router';
import Comments from './Comments';
import Loader from './Loader';
import { ArticlesUrl, localStorageKey } from './utils/constant';
const moment = require('moment')

class SingleArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleArticle : [],
            allComments : [],
            key : localStorage[localStorageKey]
        }

    }

    componentDidMount() {
        let slug = this.props.match.params.slug;

        fetch(ArticlesUrl + `/${slug}`)
        .then(res => res.json())
        .then(data => this.setState({
            singleArticle : data
        }))
        this.getComments() 
    }

    getComments = () => {
        let slug = this.props.match.params.slug;
        let url = ArticlesUrl + `/${slug}/comments`;
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText)
            }
            return res.json();
        })
        .then(comments => {
            // console.log(comments.comments);
            this.setState({
                allComments : comments.comments
            })
        })
    }

    render() {
        let {singleArticle, allComments, key} = this.state;
        // console.log(key)
       let user = this.props.user
    //    console.log(user.token)
        if(singleArticle.length < 1) {
            return <Loader />
        }
        return (
            <>
            
             {
                 key ? <AuthenticatedSingleArticle {...this.state} user={user} slug = {this.props.match.params.slug} getComments = {this.getComments} singleArticle = {singleArticle} allComments={allComments} /> : <UnAuthenticatedSingleArticle singleArticle={singleArticle} allComments={allComments} />
             }
            </>
        )
    }
}

function AuthenticatedSingleArticle(props) {
    // console.log(props)

    let key = localStorage[localStorageKey]
    let {singleArticle, allComments, getComments, slug, user} = props
    console.log(key, "this is key")
    console.log(user.token, "this is token")
    
    return (
        <>
             <section>
                 <div className="my_container">
                    <section className="single_author_info">
                        <img className="single_author_image" src={singleArticle?.article?.author.image} alt="" />
                        <h2 className="single_author_name" >{singleArticle?.article?.author.username}</h2>
                        <p className="single_author_bio">{singleArticle?.article?.author.bio}</p>
                    </section>

                    <section className="single_article_details">
                        <h2 className="single_article_heading">Article Details</h2>
                        <h2 className="single_article_title">{singleArticle?.article?.title}</h2>
                        <h3 className="single_article_desc">{singleArticle?.article?.description}</h3>
                        <p className="single_article_body">{singleArticle?.article?.body}</p>
                        <p className="single_article_create">created at :  {moment(singleArticle?.article?.createdAt).add(1,   'day').format('LLL')}</p>
                        <p className="single_article_update">updated at :  {moment(singleArticle?.article?.updatedAt).add(1,   'day').format('LLL')}</p>
                    </section>
                    
                   {
                       key !== user.token ?  "" : <button>Edit</button>
                   }

                    <div className="line comment_line"></div>
                    <section className=" flex center align_center">
                        <Comments slug={slug} getComments={getComments} allComments={allComments}/>
                    </section>
                    <section>

                    </section>
                 </div>
             </section>
        </>
    )
}

function UnAuthenticatedSingleArticle(props) {
    let singleArticle = props.singleArticle;
    return (
        <>
             <section>
                 <div className="my_container">
                    <section className="single_author_info">
                        <img className="single_author_image" src={singleArticle?.article?.author.image} alt="" />
                        <h2 className="single_author_name" >{singleArticle?.article?.author.username}</h2>
                        <p className="single_author_bio">{singleArticle?.article?.author.bio}</p>
                    </section>

                    <section className="single_article_details">
                        <h2 className="single_article_heading">Article Details</h2>
                        <h2 className="single_article_title">{singleArticle?.article?.title}</h2>
                        <h3 className="single_article_desc">{singleArticle?.article?.description}</h3>
                        <p className="single_article_body">{singleArticle?.article?.body}</p>
                        <p className="single_article_create">created at :  {moment(singleArticle?.article?.createdAt).add(1,   'day').format('LLL')}</p>
                        <p className="single_article_update">updated at :  {moment(singleArticle?.article?.updatedAt).add(1,   'day').format('LLL')}</p>
                    </section>
                    {/* <div className="line comment_line"></div>
                    <section className=" flex center align_center">
                        <Comments slug={this.props.match.params.slug} getComments={this.getComments} allComments={allComments}/>
                    </section> */}
                    <section>
                        {/* <h2>Login to add comments</h2> */}
                    </section>
                 </div>
             </section>
        </>
    )
}

export default withRouter(SingleArticle)

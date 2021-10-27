import React, { Component } from 'react'
import { ArticlesUrl, localStorageKey } from './utils/constant'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import NewLoader from './NewLoader'
import { withRouter } from 'react-router'

 class Profile extends Component {
     state = {
         myArticles : [],
         favoriteArticles : [],
         activeTab : "myarticles",
         deleteArticle : ""

     }
     componentDidMount() {
        this.state.activeTab === "myarticles" ? this.fetchMyArticles() : this.fetchFavoritedArticles()
        // this.handleDeleteArticle()
     }

     fetchMyArticles = () => {
        let {user} = this.props;
        let username = user.username
        // console.log(username)
         let url = ArticlesUrl + `?author=${username}`
        //  console.log(url)
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw new Error('Error while fetching my articles');
            }
            return res.json();
        })
        .then(data => {
            // console.log(data.articles)
            this.setState({
                myArticles : data.articles,
                activeTab : "myarticles"
            })
        })
     }



     fetchFavoritedArticles = () => {
        let {user} = this.props;
        let username = user.username
        // console.log(username)
         let url = ArticlesUrl + `?favorited=${username}`
        //  console.log(url)
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw new Error('Error while fetching my articles');
            }
            return res.json();
        })
        .then(data => {
            // console.log(data.articles)
            this.setState({
                favoriteArticles : data.articles,
                activeTab : "favorited"
            })
        })
     }

        handleActive = (value) => {
            value === "myarticles" ? this.fetchMyArticles() : this.fetchFavoritedArticles()
        }

    handleDeleteArticle = (slug) => {
        let url = ArticlesUrl + `/${slug}`;
        let key = localStorage[localStorageKey]
        // console.log(url)
        if(key) {
            fetch(url, {
                method : "DELETE",
                headers : {
                    authorization : `Token ${key}`
                }
            })
           .then(res => {
               if(!res.ok) {
                   return res.json().then(({errors}) => {
                       return Promise.reject(errors)
                   })
               }
               this.fetchMyArticles()
           })
           .catch(err => console.log(err))
        }
    }

    render() {
        let {user} = this.props;
        let{activeTab, myArticles, favoriteArticles} = this.state;
        
        return (
            <>
                <section>
                    <div className="my_container">
                        <div>
                            <article className="banner_profile">
                                <img className="vector_image" src="/images/keyboard_banner.gif" alt="" />
                                <article className="profile_card">
                                    <img className="profile_image" src={user.image} alt="" />
                                    <h2 className="profile_username" >{user.username}</h2>
                                    <p className="profile_bio">{user.bio}</p>
                                </article>
                            </article>  
                        </div>

                        <section className = "profile_articles_section flex">
                            <h2 className={`global_feed_heading ${activeTab === "myarticles" ? "active_tag_heading" : ""}`} onClick={() => this.handleActive('myarticles')}>My Articles</h2>
                            <h2 className={`global_feed_heading ${activeTab === "favorited" ? "active_tag_heading" : ""}`} onClick={() => this.handleActive('favorited')}>Favorite Articles</h2>
                        </section>

                        <section>
                            {
                                activeTab === "myarticles" ? <MyArticles {...this.state} handleDeleteArticle={this.handleDeleteArticle} myArticles = {myArticles} /> : <FavoritedArticles {...this.state} favoriteArticles={favoriteArticles} />
                            }
                        </section>

                    </div>
                </section> 
            </>
        )
    }
}

function MyArticles(props) {
    let data = props.myArticles;
    // console.log(data, "myarticles")
    // if(props.myArticles.length < 1) {
    //     return <h2>No articles found</h2>
    // }
    if(!data.length) {
        return <NewLoader />
    }
    return (
        <>
             <div className="my_articles">
                 {
                    data.map((article) =>  (
                        <article key={article.slug} className="article profile_article">
                           <div className="flex between">
                                <div className="article_data">
                                    <h2 className="article_title">{article.title}</h2>
                                    <p className="article_desc">{article.description}</p>
                                </div> 
                                <div className=" flex align_center center">
                                    <Link to={`article/${article.slug}/update`}>
                                         <img className="edit_gif " src="/images/edit.png" alt="" />
                                    </Link>
                                    <img onClick={() => props.handleDeleteArticle(article.slug)} className="delete_gif" src="/images/delete.gif" alt="" />
                                </div>
                           </div>
                   
                           {
                                <Link to={`/article/${article.slug}`}>
                                     <button className="form_btn article_btn">Read More...</button>
                                </Link>
                           }
                            <div className="article_author_data flex align_center">
                            <Link to={`/profiles/${article.author.username}`}>
                                    <img className="author_img" src={article.author.image} alt="" />
                                </Link>
                                <Link to={`/profiles/${article.author.username}`}>
                                     <h3 className="author_name">{article.author.username}</h3>
                                </Link>
                            </div>
                        </article>
                    ))
                }
                        
            </div>
        </>
    )
}

function FavoritedArticles(props) {
    let data = props.favoriteArticles;
    // console.log(data , "favorite")
    if(!data.length) {
        return <NewLoader />
    }
    return (
        <>
             <div className="my_articles">
                 {
                    data.map((article) =>  (
                        <article key={article.slug} className="article profile_article">
                           <div className="flex between">
                                <div className="article_data">
                                    <h2 className="article_title">{article.title}</h2>
                                    <p className="article_desc">{article.description}</p>
                                </div> 
                                {/* <div className=" flex align_center center">
                                    <Link to={`article/${article.slug}/update`}>
                                         <img className="edit_gif " src="/images/edit.png" alt="" />
                                    </Link>
                                    <img onClick={() => props.handleDeleteArticle(article.slug)} className="delete_gif" src="/images/delete.gif" alt="" />
                                </div> */}
                           </div>
                   
                           {
                                <Link to={`/article/${article.slug}`}>
                                     <button className="form_btn article_btn">Read More...</button>
                                </Link>
                           }
                            <div className="article_author_data flex align_center">
                            <Link to={`/profiles/${article.author.username}`}>
                                    <img className="author_img" src={article.author.image} alt="" />
                                </Link>
                                <Link to={`/profiles/${article.author.username}`}>
                                     <h3 className="author_name">{article.author.username}</h3>
                                </Link>
                            </div>
                        </article>
                    ))
                }
                        
            </div>
        </>
    )
}


export default withRouter(Profile);

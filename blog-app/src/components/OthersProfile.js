import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ArticlesUrl, BaseUrl, localStorageKey } from './utils/constant';
import { withRouter } from 'react-router';
import NewLoader from './NewLoader';


class OthersProfile extends Component {
    state = {
        profiles : "",
        myArticles : [],
        favoriteArticles : [],
        activeTab : "myarticles",
        followUser : "follow",
    }

    componentDidMount() {
        
        
        let username = this.props.match.params.username
        let url = BaseUrl + `profiles/${username}`
        fetch(url)
        .then(res => res.json())
        .then(profiles => {
            this.setState({
                profiles : profiles.profile
            })
        })
        this.state.activeTab === "myarticles" ? this.fetchMyArticles() : this.fetchFavoritedArticles()
    }

    fetchMyArticles = () => {
        let username = this.props.match.params.username
         let url = ArticlesUrl + `?author=${username}`
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw new Error('Error while fetching my articles');
            }
            return res.json();
        })
        .then(data => {
            this.setState({
                myArticles : data.articles,
                activeTab : "myarticles"
            })
        })
     }



     fetchFavoritedArticles = () => {
        let username = this.props.match.params.username
        console.log(username)
         let url = ArticlesUrl + `?favorited=${username}`
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw new Error('Error while fetching my articles');
            }
            return res.json();
        })
        .then(data => {
            this.setState({
                favoriteArticles : data.articles,
                activeTab : "favorited"
            })
        })
     }

    handleActive = (value) => {
        value === "myarticles" ? this.fetchMyArticles() : this.fetchFavoritedArticles()
    }

    handleFollow = () => {
        let username = this.props.match.params.username
        let url = BaseUrl + `profiles/${username}/follow`;
        let key = localStorage[localStorageKey];
        if(key) {
            fetch(url, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Token ${key}`
                }
            })
            .then(res => res.json())
            .then(followUserProfile => {
                console.log(followUserProfile, "followed one");
                this.setState({
                    followUser : "follow",
                })
            })
        }
    }

    handleUnFollow = () => {
        let username = this.props.match.params.username
        let url = BaseUrl + `profiles/${username}/follow`;
        let key = localStorage[localStorageKey];
        if(key) {
            fetch(url, {
                method : "DELETE",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Token ${key}`
                }
            })
            .then(res => res.json())
            .then(unFollowUserProfile => {
                console.log(unFollowUserProfile, "un follow one ");
                this.setState({
                    followUser : "unfollow",
                })
            })
        }
    }

    
    render() {
        let {profiles, activeTab, myArticles, favoriteArticles, followUser} = this.state;
        let myUsername = this.props.user.username;
        let propsUsername = this.props.match.params.username;
        return (
            <section>
                <div className="my_container">
                    <article className="banner_profile">
                        <img className="vector_image" src="/images/other_profile_banner.gif" alt="" />
                        <article className="profile_card">
                            <img className="profile_image" src={profiles.image} alt="" />
                            <h2 className="profile_username" >{profiles.username}</h2>
                            <p className="profile_bio">{profiles.bio}</p>

                           {
                               myUsername !== propsUsername ? 
                                <div className="flex align_center center">
                                    <h2 onClick={this.handleFollow} className="follow_btn">{followUser === "follow" ? "Following" : "Follow"}</h2> |    
                                    <h2 onClick={this.handleUnFollow} className="follow_btn">{followUser === "unfollow" ? "Follow" : "Un Follow"}</h2>
                                </div> : ""
                           }
                        </article>
                    </article>  

                    <section className = "profile_articles_section flex">
                        <h2 className={`global_feed_heading ${activeTab === "myarticles" ? "active_tag_heading" : ""}`} onClick={() => this.handleActive('myarticles')}>My Articles</h2>
                        <h2 className={`global_feed_heading ${activeTab === "favorited" ? "active_tag_heading" : ""}`} onClick={() => this.handleActive('favorited')}>Favorite Articles</h2>
                    </section>

                    <section>
                        {
                            activeTab === "myarticles" ? <MyArticles {...this.state} myArticles = {myArticles} /> : <FavoritedArticles {...this.state} favoriteArticles={favoriteArticles} />
                        }
                    </section>


                </div>
            </section>
        )
    }
}

function MyArticles(props) {
    let data = props.myArticles;
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

export default withRouter(OthersProfile)

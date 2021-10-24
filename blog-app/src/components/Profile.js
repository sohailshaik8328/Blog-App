import React, { Component } from 'react'
import { ArticlesUrl } from './utils/constant'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import NewLoader from './NewLoader'

 class Profile extends Component {
     state = {
         articles : [],
         activeTab : "author"
     }
     componentDidMount() {
        this.fetchData()
     }

     fetchData = () => {
        let {user} = this.props;
        let username = user.username
        // console.log(username)
         let url = ArticlesUrl + `?${this.state.activeTab}=${username}`
        //  console.log(url)
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw new Error('Error while fetching users articles');
            }
            return res.json();
        })
        .then(data => {
            // console.log(data.articles)
            this.setState({
                articles : data.articles,
            })
        })
     }
        handleActive = (value) => {
        this.setState({activeTab : value}, () => {
            this.fetchData()
        })
    }
    render() {
        let {user} = this.props;
        let{activeTab, articles} = this.state;
        
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
                            <h2 className={`global_feed_heading ${activeTab === "author" ? "active_tag_heading" : ""}`} onClick={() => this.handleActive("author")}>My Articles</h2>
                            <h2 className={`global_feed_heading ${activeTab === "favorited" ? "active_tag_heading" : ""}`} onClick={() => this.handleActive('favorited')}>Favorite Articles</h2>
                        </section>

                        <section>
                            <MyArticles articles = {articles} />
                        </section>

                    </div>
                </section> 
            </>
        )
    }
}

function MyArticles(props) {
    let data = props.articles;
    if(!data.length) {
        return <NewLoader />
    }
    return (
        <>
             <div className="my_articles">
                 {
                    data.map((article) =>  (
                        <article key={article.slug} className="article profile_article">
                            <div className="article_data">
                                <h2 className="article_title">{article.title}</h2>
                                <p className="article_desc">{article.description}</p>
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



export default Profile;

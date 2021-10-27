import { data } from 'autoprefixer';
import React, { Component } from 'react'
import {Link} from "react-router-dom";
import { ArticlesUrl, localStorageKey, TagsUrl} from './utils/constant';
import AllArticles from './AllArticles';
import Loader from './Loader';
import Pagination from './Pagination';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            tags:[],
            activeTag : "",
            articlesCount : 0,
            articlesPerPage : 10,
            activePageIndex : 1,
            error : "",
            personalFeed : []
        }
    }
    emptyTab = () => {
        this.setState({activeTag : ""})
    }

    componentDidMount() {
        this.handleOnload();
    }
    componentDidUpdate(_prevProps, prevState ) {
        if(prevState.activePageIndex !== this.state.activePageIndex || prevState.activeTag !== this.state.activeTag ) {
            this.handleOnload();
            // this.handlePersonalFeed()
        } 
       
    }

    updateCurrentPageIndex = (index) => {
        this.setState({
            activePageIndex : index,
        }, this.handleOnload, this.handlePersonalFeed)
    }
    handleOnload = () =>{
        let limit = this.state.articlesPerPage;
        let offset = (this.state.activePageIndex - 1) * limit;
        let tag = this.state.activeTag
        fetch(ArticlesUrl + `/?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`))
        .then(res => {
            if(!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json()
        })
        .then(data => {
            // console.log(data)
            this.setState({
                data : data.articles,
                error : "",
                articlesCount : data.articlesCount,
            })
        })
        .catch((err) => {
            this.setState({error : "Not able to fetch Data"})
        })
        
        
        fetch(TagsUrl).then(res => res.json())
        .then(data => this.setState({
            tags : data
        }))
    }

    addTab = (value) => {
        this.setState({activeTag : value})
    }

    handlePersonalFeed = () => {
        let limit = this.state.articlesPerPage;
        let offset = (this.state.activePageIndex - 1) * limit;
        let tag = this.state.activeTag

        // let url = ArticlesUrl + `/feed?offset=${offset}&limit=${limit} `
        let url = ArticlesUrl + `/feed?offset=${offset}&limit=${limit}` + (tag && `&tag=${tag}`)
        let key = localStorage[localStorageKey];
        if(key) {
            fetch(url, {
                method : "GET",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Token ${key}`
                }
            })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                this.setState({
                    personalFeed : data.articles,
                    activeTag : "Personal Feed",
                    articlesCount : data.articlesCount
                })
            })
        }
    }

    render() {
        let key = localStorage[localStorageKey];
        let {data,tags, activeTag, error, articlesCount, articlesPerPage, activePageIndex, personalFeed} = this.state;
        // console.log(personalFeed)
        // console.log(tags?.tags?.forEach(each => console.log(each)))
        if(error) {
            return <p className="data_fetch_error">{error}</p>
        }
        if(!activePageIndex) {
            return <Loader />
        }
        if(!data) {
            return <Loader />
        }
        if(data.length < 1 && personalFeed.length < 1) {
            return <h2 className="article_not_found">No Articles Found!</h2>
        }

        // if(personalFeed.length < 1) {
        //     return <h2 className="article_not_found">No Articles Found!</h2>

        // }
        return (
           <>
             <section className="hero_section">
                <div className="my_container">
                    <section className="hero flex between medium_wrap">
                        <article className="hero_left flex-60 flex center align_center">
                            <h1 className="hero_heading     ">
                            <div className="hashnode_heading">Hashnode a shortened version of weblog</div> It is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject. There are many reasons to start a blog for personal use and only a handful of strong ones for business blogging. Blogging for business, projects, or anything else that might bring you money has a very straightforward.
                            </h1>
                        </article>
                        <article className="hero_right flex-40">
                                <img className="undraw" src="/images/lotte.gif" alt="" />
                        </article>
                    </section>
                </div>
            </section>

            <div className="my_container">
                <div className="line"></div>
            </div>
            <section className="my_container ">
                <div className="flex ">
                    <Link onClick={this.emptyTab} className={`global_feed_heading ${activeTag === "" && "active_tag_heading"}`} to="/">
                        <h2 >Global Feed</h2>

                    </Link>
                    {
                        key && 
                        <Link onClick={this.handlePersonalFeed} className={`global_feed_heading ${activeTag === "Personal Feed" && "active_tag_heading"}`} to="/">
                            <h2 >Personal Feed</h2>
                        </Link>
                    }

                {
                    activeTag && (
                        <Link className={`global_feed_heading ${activeTag && "active_tag_heading"}`} to="/">
                            <h2 >{`${activeTag}`}</h2>
                        </Link>
                    )
                }
                </div>
            </section>
            <section className="total_section">
                <div className="my_container">
                   <div className="articles_tags_section flex between medium_wrap ">
                        <section className="articles_section flex-65 flex between wrap">                         
                                <Link to="/">
                                    <AllArticles data={data} personalFeed={personalFeed} />
                                </Link>
                        </section>
                    
                        
                        <section className="tags_section flex-35 ">
                            <h2 className="popular_tags_heading">Popular Tags</h2>
                            {
                            tags?.tags?.map((eachTag)=>(
                                eachTag === "" ? "" :  <button key={eachTag} className="tag_btn" value={eachTag} onClick={() => this.addTab(eachTag)}>{eachTag}</button>
                                ))
                            }
                        
                        </section>

                   </div>

                   <section className="pagination_section">
                    <Pagination updateCurrentPageIndex={this.updateCurrentPageIndex} activePageIndex = {activePageIndex} articlesCount = {articlesCount} articlesPerPage = {articlesPerPage} />
                   </section>
                </div>
            </section>
           </>
        )
    }
}

export default Home;

import { data } from 'autoprefixer';
import React, { Component } from 'react'
import {Link} from "react-router-dom"
import AllArticles from './AllArticles';

class Hero extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            tags:[],
            clicked:"global",
            activeTag : ""
        }
    }
    handleOnload = () =>{
        if(this.state.clicked=="global"){
            fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles`)
        .then(res => res.json())
        .then(data => this.setState({
            data : data.articles
        })) 
        fetch('https://mighty-oasis-08080.herokuapp.com/api/tags').then(res => res.json())
        .then(data => this.setState({
            tags : data
        }))
        }
    }
    componentDidMount() {
        // if global feed 
      this.handleOnload();        
     
    }
    handleTags = (eachTag) => {
        fetch(`https://mighty-oasis-08080.herokuapp.com/api/articles?tag=${eachTag?.target?.value}`)
        .then(res => res.json())
        .then(data => this.setState({
            data : data.articles,
            clicked:"tags",
            activeTag : "#" + eachTag?.target?.value
        })) 
    }

      

    render() {
      
        let {data,tags, activeTag} = this.state;
        // console.log(tags?.tags?.forEach(each => console.log(each)))
     
        return (
           <>
             <section className="hero_section">
                <div className="container">
                    <section className="hero flex between">
                        <article className="hero_left flex-60 flex center align_center">
                            <h1 className="hero_heading     ">
                            <div className="hashnode_heading">Hashnode a shortened version of weblog</div> It is an online journal or informational website displaying information in reverse chronological order, with the latest posts appearing first, at the top. It is a platform where a writer or a group of writers share their views on an individual subject. There are many reasons to start a blog for personal use and only a handful of strong ones for business blogging. Blogging for business, projects, or anything else that might bring you money has a very straightforward.
                            </h1>
                        </article>
                        <article className="hero_right flex-45">
                                <img className="undraw" src="/images/lotte.gif" alt="" />
                        </article>
                    </section>
                </div>
            </section>

            <div className="container">
                <div className="line"></div>
            </div>
            <section className="container">
                <div className="flex">
                <h2 className="global_feed_heading">Global Feed</h2>
                {
                    <span className="global_feed_heading active_tag_heading">{`${activeTag}`}</span>
                }
                </div>
            </section>
            <section className="total_section">
                <div className="container">
                   <div className="articles_tags_section flex between ">
                        <section className="articles_section flex-65 flex between wrap">                         
                                <Link to="/">
                                    <AllArticles data={data} />
                                </Link>
                        </section>
                    
                        
                        <section className="tags_section flex-35 ">
                            {
                            tags?.tags?.map((eachTag)=>(
                                //    console.log(eachTag)
                                eachTag === "" ? "" :  <button className="tag_btn" value={eachTag} onClick={(eachTag) => this.handleTags(eachTag)}>{eachTag}</button>
                            ))
                            }
                        
                        </section>

                   </div>
                </div>
            </section>
           </>
        )
    }
}

export default Hero;

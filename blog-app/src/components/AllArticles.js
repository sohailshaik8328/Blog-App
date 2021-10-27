import React from 'react';
import {Link} from "react-router-dom"
import { withRouter } from 'react-router';


function AllArticles(props) {
  let {data, personalFeed} = props
//   console.log(personalFeed)
//   if(data.length < 1) {
//       return <h2>No articles found</h2>
//   }
        return (
            <div className="flex wrap between">
                 {
                    data.map((article) =>  (
                        <article key={article.slug} className="article flex-40">
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
                                     <h3  className="author_name">{article.author.username}</h3>
                                </Link>
                            </div>
                        </article>
                    ))

                    
                }

            {
                    personalFeed.map((article) =>  (
                        <article key={article.slug} className="article flex-40">
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
                                     <h3  className="author_name">{article.author.username}</h3>
                                </Link>
                            </div>
                        </article>
                    ))

                    
                }

               
            </div>
        )

    }

export default withRouter(AllArticles)

import React from 'react'
import Loader from './Loader';
import { ArticlesUrl } from './utils/constant';

class SingleArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            singleArticle : []
        }

    }

    componentDidMount() {
        let slug = this.props.match.params.slug;

        fetch(ArticlesUrl + `/${slug}`)
        .then(res => res.json())
        .then(data => this.setState({
            singleArticle : data
        })) 
    }

    render() {
        let {singleArticle} = this.state;
        // // console.log(singleArticle?.article?.slug)
        if(singleArticle.length < 1) {
            return <Loader />
        }
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
                        <p className="single_article_create">created at :  {singleArticle?.article?.createdAt}</p>
                        <p className="single_article_update">updated at :  {singleArticle?.article?.updatedAt}</p>
                    </section>
                 </div>
             </section>
            </>
        )
    }
}

export default SingleArticle

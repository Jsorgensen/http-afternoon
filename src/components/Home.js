import React, { Component } from 'react';
import Hero from './subcomponents/Hero';
import BlogThumb from './subcomponents/BlogThumb';

import axios from 'axios'

class Home extends Component{
    constructor(){
        super();
        this.state = {
            index: 0,
            posts: [{title: "Loading...",image: 'https://unsplash.it/900/400/?random'}]
        }
    }

    componentWillMount(){
        axios.get('/api/featured/').then(res => {
            if(res.status === 200){
                this.setState({
                    index: (~~(Math.random() * res.data.length) + 0),
                    posts: res.data
                })
            }else{
                var error = 'error';
            }
        }).catch((e)=>{
            var error = e;
        })
    }

    render(){
        const posts = this.state.posts.map(post => <BlogThumb blog={post} />);

        return(
            <div className="content" >
                <Hero blog={this.state.posts[this.state.index]} />
                <hr/>
                <div className="blog-grid">
                    {posts}
                </div>
            </div>
        )
    }
}

export default Home;
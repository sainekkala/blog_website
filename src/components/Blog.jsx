import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { selectUserInput,setBlogData } from "../slice/UserSlice";
import "../styles/blog.css";


function Blog () {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const searchInput = useSelector(selectUserInput);
    //apikey = b33a68b2b0852e806c8b9573dc114829
    
   const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=b33a68b2b0852e806c8b9573dc114829`;

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(blog_url)
        .then((res) => {
            dispatch(setBlogData(res.data));
            setBlogs(res.data);
            setLoading(false);
            console.log(blogs)
        })
        .catch((error) => console.log (error))
    },[searchInput])
    return (
        <>
         <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading ? <h1 className="loading">Loading...</h1> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a className="blog" target="_blank" href={blog.url}>
            <img src={blog.image} />
            <div> 
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}

        {blogs?.totalArticles == 0 && (
          <h1 className="no__blogs">
            No blogs available 😞. Search something else to read blogs on the
            greatest platform.
          </h1>
        )}
      </div>
    </div>
        </>
    )
};

export default Blog;
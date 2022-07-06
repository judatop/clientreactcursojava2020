import React, { useState, useEffect } from 'react';
import { PUBLIC_POSTS_ENDPOINT } from '../helpers/endpoints';
import Axios from 'axios';
import { Jumbotron} from 'react-bootstrap';
import Post from '../components/post/Post';
import Placeholder from '../components/utils/Placeholder';
import NoPosts from '../components/utils/NoPosts';

export default function Posts() {

  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    Axios.get(PUBLIC_POSTS_ENDPOINT).then(response => {
      setPosts(response.data);
      setFetching(false);
    }).catch(e => {
      console.error(e);
      setFetching(false);
    }) 
  }, []);

  return (
    <div>

      <Jumbotron>
        <h1>Ultimos posts publicos</h1>
      </Jumbotron>
      { fetching && <Placeholder></Placeholder>}

      { !fetching && posts.length === 0 && <NoPosts text="No hay post públicos disponibles"></NoPosts>}

      
      
      <div>
        {posts.map(post => <Post key="{post.postId}" post={post} renderControls={false}>


        </Post>)}

      </div>


    </div>
  )


}

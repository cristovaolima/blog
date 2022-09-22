import React, { useState, useEffect } from 'react';
import { ApiService } from '../../api';
import * as M from '@mui/material';

const PAGE = 5;

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [initialPosts, setInitialPosts] = useState([]);
  const [prepage, setPrepage] = useState(PAGE); 
  const [load, setLoad] = useState(true);   

  useEffect(() => {
    document.title = "Posts | Blog";
    loadPosts();    
  }, []);   

  async function loadPosts(){
    const responseJson = await ApiService.posts.list();   
    console.log(responseJson);
    if(responseJson.error){
      setLoad(false);
      alert(responseJson.message);            
      return;
    }else{
      var _posts = responseJson;
      _posts.reverse();
      setInitialPosts(_posts);
      setPosts(_posts.slice(0,prepage));
      setLoad(false);
      return;
    }
  }
  
  async function loadMore(){
    var _page = prepage + PAGE;
    var morePosts = initialPosts.slice(prepage, _page);
    setPrepage(prepage + PAGE);
    setPosts([...posts, ...morePosts]);
  }

  return (
    <main>
      <M.Box>
        <M.Container maxWidth="sm">
          <M.Typography variant="h2" align="center">
          Posts
          </M.Typography>
          <M.Grid item xs={12} sm={12}>
            {load ? (
              <M.Box xs={12} align="center"> 
                <M.CircularProgress />
              </M.Box>) :
                posts.map(post => (
                  <M.Card xs={12} key={post.id}>
                    <M.CardContent>
                      <M.Typography gutterBottom variant="h5" component="div">
                        {post.title}
                      </M.Typography>
                      <M.Typography variant="body2" color="text.secondary">
                        {post.body.substring(25) + "..."}
                      </M.Typography>
                    </M.CardContent>
                    <M.Link href={'/post/' + post.id}>
                      <M.CardActions>
                        <M.Button size="large">Leia mais >></M.Button>
                      </M.CardActions>
                    </M.Link>                
                  </M.Card>
            ))}            
          </M.Grid>
          <M.Stack spacing={20} align="center">
            <M.Button
              variant="contained" 
              onClick={loadMore}
              disabled={load || posts.length == initialPosts.length}>
                Carregar mais
            </M.Button>
          </M.Stack>
          <M.Card variant="outlined"></M.Card>
        </M.Container>
      </M.Box>
    </main>
  );
}
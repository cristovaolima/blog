import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as M from '@mui/material';
import { ApiService } from '../../api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Post() {
  const id = useParams();
  const [post, setPost] = useState([]);
  const [userPost, setUserPost] = useState([]);
  const [postsUser, setPostsUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Carregando... | Blog";
    loadPost();   
  }, []);

  useEffect(() => {
    if(post.userId){
      loadUserPost();
      loadPostsUser();
    }    
  }, [post]);

  async function loadPost(){
    const responseJson = await ApiService.posts.show(id?.id);   
    console.log(responseJson);
    if(responseJson.error){
      alert(responseJson.message);            
      return;
    }else{
        document.title = responseJson.title + " | Blog";
        setPost(responseJson);
        return;
    }
  }

  async function loadUserPost(){
    const responseJson = await ApiService.posts.showUser(post?.userId);   
    console.log(responseJson);
    if(responseJson.error){
      alert(responseJson.message);            
      return;
    }else{
        setUserPost(responseJson);
        return;
    }
  }

  async function loadPostsUser(){
    const responseJson = await ApiService.posts.listPostsUser(post?.userId);   
    console.log(responseJson);
    if(responseJson.error){
      alert(responseJson.message);            
      return;
    }else{
      setPostsUser(responseJson.slice(0,5));
      return;
    }
  }

  async function deletePost(){
    const responseJson = await ApiService.posts.delete(id?.id) 
    
    if(responseJson.error){
        alert(responseJson.message);            
        return;
    }else{
        alert("Post apagado com sucesso!");
        navigate('/');
        return;
    }
  }

  function buttonDelete(){
    var confirmado = window.confirm(`Apagar "${post?.title}"?`);
    if(confirmado){
    	deletePost();
    }
  }

  return (
    <main>
      <M.Box>
        <M.Container maxWidth="sm">
          <M.Grid item xs={12} sm={12}>
            <M.Card xs={12}>
              <M.CardContent>
                <M.Typography gutterBottom variant="h5" component="div">
                  {post?.title}
                </M.Typography>
                <M.CardActions disableSpacing>
                  <M.IconButton>
                    <M.Link href={'/edit/' + post.id}>
                      <EditIcon />
                    </M.Link>                                
                  </M.IconButton>
                  <M.IconButton onClick={buttonDelete}>
                    <M.Link>
                      <DeleteIcon />
                    </M.Link>                            
                  </M.IconButton>
                </M.CardActions>
                <M.Divider/>
                <M.Typography variant="body2" color="text.secondary">
                  {post?.body}
                </M.Typography>
              </M.CardContent>             
            </M.Card>         
          </M.Grid>
          <M.Card xs={12}>
            <M.CardHeader title={userPost?.name} subheader={userPost?.email}/>
              {postsUser.map(post => (
                <M.ListItemButton component="a" href={'/post/' + post.id}>
                  <M.ListItemText primary={post?.title}/>
                </M.ListItemButton>
              ))}
          </M.Card>
        </M.Container>
      </M.Box>
    </main>
  );
}
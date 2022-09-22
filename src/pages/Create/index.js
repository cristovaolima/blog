import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as M from '@mui/material';
import { ApiService } from '../../api';

export default function Create() {
    const id = useParams();
    const [postId] = useState(id?.id);
    const [title, setTitle] = useState(postId ? "Carregando..." : "");
    const [text, setText] = useState(postId ? "Carregando..." : "");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Novo Post | Blog";
        if(postId){
            document.title = "Editar post | Blog";
            loadPost();    
        }         
    }, []);

    async function loadPost(){
        setLoading(true);
        const responseJson = await ApiService.posts.show(id?.id);   
        console.log(responseJson);
        if(responseJson.error){
            setLoading(false);
            alert(responseJson.message);            
            return;
        }else{
            setTitle(responseJson?.title);
            setText(responseJson?.body);
            setUserId(responseJson?.userId);
            setLoading(false);
            return;
        }
    }

    async function update(){
        setLoading(true);
        const responseJson = await ApiService.posts.update(title, text, userId, postId);

        if(responseJson.error){
            setLoading(false);
            alert(responseJson.message);            
            return;
        }else{
            alert("Atualizado com sucesso!");
            setLoading(false);
            navigate('/');
            return;
        }
    }

    async function save(){
        setLoading(true);
        const responseJson = await ApiService.posts.create(title, text, 1);

        if(responseJson.error){
            setLoading(false);
            alert(responseJson.message);            
            return;
        }else{
            alert("Salvo e publicado com sucesso!");
            setLoading(false);
            navigate('/');
            return;
        }
    }

    function validate(){
        var _title = false;
        var _text = false;

        if(title !== "")
            _title = true;

        if(text !== "")
            _text = true;

        return _title && _text;
    }

    function submit(e){
        e.preventDefault();
        if(validate){
            if(postId){
                update();
            } else {
                save();
            }
        }
    }

    return (
        <main>
            <M.Box>
                <M.Container maxWidth="sm">
                    <M.Typography variant="h2" align="center">
                    {postId ? "Editar Post" : "Novo Post"}
                    </M.Typography>
                    <M.Grid item xs={12} sm={12}>
                        <M.Box component="form" noValidate autoComplete="off">
                        <input type="hidden" value={postId}/>
                        <div>
                            <M.TextField
                              label="Titulo"
                              value={title}
                              fullWidth
                              margin="dense"
                              onChange={(e) => setTitle(e.target.value)}
                              disabled={loading}
                              required
                            />
                        </div>
                        <div>
                            <M.TextField
                              label="Texto"
                              multiline
                              rows={12}
                              value={text}
                              fullWidth
                              margin="dense"
                              onChange={(e) => setText(e.target.value)}
                              disabled={loading}
                              required
                            />
                        </div>      
                    </M.Box>
                    </M.Grid>
                    <M.Stack spacing={20} align="center">
                        <M.Button variant="contained" disabled={loading} onClick={submit}>
                        Salvar e publicar
                        </M.Button>
                    </M.Stack>
                </M.Container>
            </M.Box>
        </main>
    );
}
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Post from './pages/Post';

export default function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/create" element={<Create/>}/>
                <Route exact path="/post/:id" element={<Post/>}/>
            </Routes>            
        </Router>
    )
}
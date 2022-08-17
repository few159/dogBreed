import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import List from '../pages/List/List';
import Register from '../pages/Register/Register';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <Register />
                } />
                <Route path="/List" element={
                    <List />
                } />
            </Routes>
        </BrowserRouter>
    )
}
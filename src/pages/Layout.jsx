import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
    return (
        <div>
            <Toaster />
            <Navbar />
            <Outlet />
        </div>
    );
};

export default Layout;

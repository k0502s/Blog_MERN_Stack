import React, { useState } from 'react';
import SideBar from './SideBar/Sidebar';
import Content from './Content/Content';

const Router = () => {
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

    return (
        <div className="App wrapper">
            <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
            <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
        </div>
    );
};

export default Router;

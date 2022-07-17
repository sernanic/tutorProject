import React, { useState } from "react";
import * as mdIcons from 'react-icons/md';
import * as ioIcons from 'react-icons/io';
import * as faIcons from 'react-icons/fa';
import * as aiIcons from 'react-icons/ai';




export const sideBarData =[
    {
        title:'Home',
        path:'/',
        icon:  <aiIcons.AiFillHome/>,
        cName: "nav-text"
    },
    {
        title:'Students',
        path:'/students',
        icon:  <aiIcons.AiFillHome/>,
        cName: "nav-text"
    },
    {
        title:'Reports',
        path:'/reports',
        icon:  <aiIcons.AiFillHome/>,
        cName: "nav-text"
    },
    {
        title:'Settings',
        path:'/settings',
        icon:  <aiIcons.AiFillHome/>,
        cName: "nav-text"
    },
    
]
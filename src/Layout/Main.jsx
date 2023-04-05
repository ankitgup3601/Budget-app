import React from 'react'
import { Outlet, useLoaderData } from 'react-router-dom';
import { fetchData } from '../helper'
import img from "../assets/wave.svg"
import '.././index.css'
import Navbar from '../Components/Navbar';

export function mainLoader(){
  const userName = fetchData('userName');
  return {userName }
}

const Main = () => {
  const {userName} = useLoaderData();
  return (
    <div className='layout'>
      <Navbar userName = {userName}/>
      <main>
        <Outlet/>
      </main>
     <img src={img}/> 
    </div>
  )
}

export default Main
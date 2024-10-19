import React from 'react';
import logo from '@assets/img/logo.svg';
import { useState } from 'react';
import HomePage from './menu/HomePage';
import Navbar from './menu/Navbar';
import TrashPage from './menu/TrashPage';


export default function Popup(): JSX.Element {
  const [currentPage, setCurrentPage] = useState("Home");

  let currPage: React.ReactNode | null = null

  if (currentPage == "Home") {
    currPage = <HomePage />
  }
  else if (currentPage == "Trash") {
    currPage = <TrashPage />
  }
  else if (currentPage == "Organize") {
    currPage = <HomePage />
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-full p-4 pt-2">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        {currPage}
    </div>
  )
}

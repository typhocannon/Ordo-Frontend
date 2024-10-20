import React from 'react';
import logo from '@assets/img/logo.svg';
import { useState } from 'react';
import HomePage from './menu/HomePage';
import Navbar from './menu/Navbar';
import TrashPage from './menu/TrashPage';
import { useContext } from 'react';
import { PageContext } from './context/PageProvider';
import OrganizePage from './menu/OrganizePage';

export default function Popup(): JSX.Element {
  const {currentPage} = useContext(PageContext);

  let currPage: React.ReactNode | null = null

  if (currentPage == "Home") {
    currPage = <HomePage/>
  }
  else if (currentPage == "Trash") {
    currPage = <TrashPage />
  }
  else if (currentPage == "Organize") {
    currPage = <OrganizePage />
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 h-full p-4 pt-2">
      <Navbar/>
        {currPage}
    </div>
  )
}

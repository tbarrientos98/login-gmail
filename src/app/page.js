"use client"
import Page from './home/page'
import Login from './login/page'
import { AuthProvider } from '@/app/context/contextAuth'
import { contextAuth } from "../app/context/contextAuth";
import { useContext, useEffect } from 'react';

export default function Home() {

  const { userExist, handleLogout } = useContext(contextAuth) || {};

  return (
    <AuthProvider>
      {userExist ? <Page /> : <Login />}
    </AuthProvider>

  )
}

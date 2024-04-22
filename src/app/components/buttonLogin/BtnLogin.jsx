"use client"
// import { Button } from "@nextui-org/button";
// import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { contextAuth } from "@/app/context/contextAuth";
import ButtonGoogle from "./ButtonGoogle";
import 'animate.css';

export default function BtnLogin() {

    // const { handleLogin } = useContext(contextAuth) || {}

    return (
        <>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <h1 className="titulo animate__animated animate__fadeIn">MEGATROLON</h1>
            <div className="btnYText">
                <h2 className="animate__animated animate__fadeIn">Podes ser puto, pero mejor ser Megatrolon</h2>
                <h3>Lorem ipsum dolor Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam sit enim placeat.</h3>
                <ButtonGoogle />
            </div>
        </>
    )
}

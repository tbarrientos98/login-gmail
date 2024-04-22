"use client"
import React, { useContext } from "react";
import Image from "next/image";
import BtnLogin from './../components/buttonLogin/BtnLogin';
import BtnLogout from "../components/buttonLogout/BtnLogout";
import { contextAuth } from "@/app/context/contextAuth";

export default function Login() {

    // const { userExist } = useContext(contextAuth);
    const { userExist } = useContext(contextAuth) || {};
    console.log(userExist);

    return (
        <div className="contenedorLogin">
            {
                userExist == false
                ?
                <BtnLogin />
                :
                <BtnLogout />
            }
        </div>
    )
}
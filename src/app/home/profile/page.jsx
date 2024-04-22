"use client"
import { useContext, useEffect } from "react";
import { contextAuth } from "../../context/contextAuth";
import BtnLogout from "../../components/buttonLogout/BtnLogout";

export default function Perfil() {

    const { userExist, dataUser } = useContext(contextAuth);

    // console.log(dataUser);

    useEffect(() => {
        userExist ? console.log(dataUser) : console.log('no llego');
    }, [dataUser, userExist])

    return (
        <>
            {userExist && dataUser && <p>Bienvenido/a, {dataUser.displayName}</p>}
            {userExist && dataUser && <p>Correo electrónico: {dataUser.email}</p>}

            {userExist && <BtnLogout />}
            {userExist && <p>Hola!</p>}
        </>
    )
}
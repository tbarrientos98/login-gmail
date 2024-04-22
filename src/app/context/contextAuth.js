"use client"
import React, { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { redirect, useRouter } from 'next/navigation';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';

export const contextAuth = createContext();

export const AuthProvider = ({ children }) => {

    const provider = new GoogleAuthProvider();
    const firebaseConfig = {
        apiKey: "AIzaSyCjMVzLiryaABg_Yc1Wco5cvrzp67DoUWw",
        authDomain: "ranking-peluqueriapp.firebaseapp.com",
        projectId: "ranking-peluqueriapp",
        storageBucket: "ranking-peluqueriapp.appspot.com",
        messagingSenderId: "850437328091",
        appId: "1:850437328091:web:dcae914475c8405e60d0fe",
        measurementId: "G-J543N4YJ60"
    };
    const app = initializeApp(firebaseConfig);
    // const analytics = getAnalytics(app);
    const auth = getAuth();
    const [userExist, setUserExist] = useState(false)
    const [dataUser, setDataUser] = useState([])
    const router = useRouter()


    const handleLogout = async () => {
        signOut(auth).then(() => {
            setUserExist(false)
            toast.success(`Gacias vuelvas prontos!`)
            
            router.push('/')
            console.log('Estas deslogueado')
        }).catch((error) => { });
    }

    const handleLogin = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                setUserExist(true) // ESTE ESTADO LO USO PARA SWITCHEAR EL BOTON DE INGRESAR MAIL CON EL DE CERRAR SESION
                setDataUser(user) // EN ESTE ESTADO MUESTRO DATA DEL USUARIO
                toast.success(`Bienvenido/a! ${result.user.displayName}`)
                // IdP data available using getAdditionalUserInfo(result)
                // Redirigir a la página principal
                // router.push('/inicio')

                console.log('Me loguee')
                console.log(user)

                // ...
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
               // const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    useEffect(() => {
        userExist && redirect('/home')
    }, [userExist])


    return (
        <contextAuth.Provider value={{
            handleLogin,
            handleLogout,
            userExist,
            setUserExist,
            dataUser,
            setDataUser,
            auth
        }}>
            {children}
        </contextAuth.Provider>
    );
};

export const UserAuth = () => {
    return useContext(contextAuth)
}
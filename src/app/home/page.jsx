'use client'
import React, { useState, useEffect, useContext } from "react";
import { AvatarIcon, Button, Flex, Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import { CiHome, CiUser } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaBell } from "react-icons/fa6";
import { GrConfigure } from "react-icons/gr";
import { FaHome } from "react-icons/fa";
import { Divider } from "@nextui-org/react";
import { FaMapPin } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import data from "../mock.json";
import Map from '../components/Map/Map'
import barrios from '../barrios.json'
import BtnLogout from "../components/buttonLogout/BtnLogout";
import { contextAuth } from "../context/contextAuth";
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";


const Page = () => {
    const { userExist, dataUser } = useContext(contextAuth) || {};
    const [ubicacion, setUbicacion] = useState("");
    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState("cafeteria");

    /* CONTEXT LOGOUT */

    console.log("usuario existe?", userExist, dataUser);

    /* CONTEXT LOGOUT */

    useEffect(() => {
        const filteredSuggestions = data.filter((item) =>
            item.localidad.toLowerCase().includes(search.toLowerCase())
        ).slice(0, 5);
        setSuggestions(filteredSuggestions);
    }, [search]);

    const handleInputChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Esta es la ubicacion', ubicacion);
    };

    const handleSelectChange = (value) => {
        setUbicacion(value.target.value); // Actualiza el estado con el valor seleccionado del Select
    };


    console.log(search, "esto es search")

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="text-center mb-4">
                <Image src="/logo2.png" width={200} height={200} alt={'Logo'} />
            </div>
            <a className="bg-light" href="mailto:tomas_barrientos@solutionbox.com.ar">mandar</a>

            <div className="flex-1 text-center mb-4">
                {/* <h1>Donde busco?</h1> */}
                <form onSubmit={handleSubmit} className='flex w-full'>
                    <Select
                        label="¿Donde te queres cortar?"
                        placeholder="Selecciona una opcion"
                        value={ubicacion}
                        onChange={handleSelectChange}
                        style={{ width: '250px' }}
                    >
                        {barrios.map((barrio) => (
                            <SelectItem key={barrio.nombre} value={barrio.nombre} >
                                {barrio.nombre}
                            </SelectItem>
                        ))}
                    </Select>

                </form>
                {/* <BtnLogout /> */}
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />



            </div>

            {ubicacion && (
                <Map ubicacion={ubicacion} zoom={20} setUbicacion={setUbicacion} />
            )}
            <div className="fixed bottom-0 w-full bg-gray-900 text-white p-2">
                <div className="flex justify-around max-w-screen-lg mx-auto p-2">
                    {/* Los íconos fijos en la parte inferior */}
                    <div className="menuButton">
                        <FaHome style={{ color: '#ff006e' }} size={'2.5em'} />
                    </div>
                    <div className="menuButton">
                        <FaRegStar style={{ color: '#ff006e' }} size={'2.5em'} />
                    </div>
                    <div className="menuButton">
                        <FaBell style={{ color: '#ff006e' }} size={'2.5em'} />
                    </div>
                    <div className="menuButton">
                        <FaRegUserCircle style={{ color: '#ff006e' }} size={'2.5em'} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Page;

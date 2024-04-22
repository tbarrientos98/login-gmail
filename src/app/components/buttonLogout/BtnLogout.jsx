"use client"
import { contextAuth } from "@/app/context/contextAuth";
import { Button } from "@nextui-org/button";
import { useContext } from "react";

export default function BtnLogout() {

    const { handleLogout } = useContext(contextAuth)|| {};

    return (
        <Button onClick={handleLogout} color="danger">
            Cerrar sesión
        </Button>
    )
}
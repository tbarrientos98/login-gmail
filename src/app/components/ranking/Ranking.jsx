'use client'
import React, { useEffect, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Divider } from '@nextui-org/divider';
import { Link } from '@nextui-org/link';
//import { StarFilled, StarOutlined } from '@nextui-org/icon';
import { GoStarFill } from "react-icons/go";
import { IoIosStarOutline } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";


const Ranking = ({ ubicacion }) => {
    const [places, setPlaces] = useState([]);
    const [peluquerias, setPeluquerias] = useState('')

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyBJMwJ_1KdlLq9nRW6_mb8_42GPjdZlw-8',
        libraries: ['places']
    });

    const [barrios] = useState({
        belgrano: { lat: -34.5621, lng: -58.4567 },
        almagro: { lat: -34.6037, lng: -58.4208 },
    });

    const ubicacionValida = barrios[ubicacion] ? ubicacion : 'belgrano';

    useEffect(() => {
        if (isLoaded && !loadError) {
            const service = new window.google.maps.places.PlacesService(document.createElement('div'));

            service.nearbySearch(
                {
                    location: barrios[ubicacionValida],
                    radius: 150,
                    type: 'hair_care'
                },
                (results, status) => {

                    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                        console.log('Estos son los results', results)
                        const placesNames = results.map(place => place.name);
                        setPlaces(results);
                        console.log('Nombres de lugares:', placesNames);
                    }
                }
            );
        }
    }, [barrios, isLoaded, loadError, ubicacionValida]);

    console.log(places)

    if (loadError) {
        return <div>Error al cargar los lugares</div>;
    }

    return (
        <div className='p-3'>
            <h2 style={{ color: 'white', textAlign: 'center' }} className='mb-5'>Lugares cercanos:</h2>
            <ul>
                {places.map((place, index) => (
                    <Card key={index} className="max-w-[400px] mb-6 bg-dark p-1" style={{
                        border: '2px solid #f20089'
                    }}>
                        <CardHeader className="flex gap-3 justify-around">
                            <Image
                                alt="nextui logo"
                                height={40}
                                radius="sm"
                                src='/logo2.png'
                                width={40}
                            />
                            <div className="flex flex-col">
                                <p className="text-md" style={{
                                    color: '#fff',
                                    fontWeight: 'bold'
                                }}>{place.name}</p>
                            </div>
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i}>
                                    {i < Math.round(place.rating) ? (
                                        <GoStarFill color="#ff006e" />
                                    ) : (
                                        <IoIosStarOutline color="#ff006e" />
                                    )}
                                </span>
                            ))}
                            <span className="ml-2" style={{
                                color: '#fff'
                            }}>{place.rating}</span>
                        </CardHeader>
                        <Divider />
                        <CardBody>
                            <p style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                textDecoration: 'underline'
                            }}>Domicilio:  <span style={{
                                color: '#7fc8f8'
                            }}>{place.vicinity}</span></p>

                        </CardBody>
                        <Divider />
                        <CardFooter>
                            <div className='flex gap-3 justify-center '>
                                <FaInstagram size={'1.5em'} color='#3f729b ' />
                                <CiTwitter size={'1.5em'} color='#1DA1F2' />
                                <FaWhatsapp size={'1.5em'} color='#25D366' />
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </ul>
        </div>
    );
};

export default Ranking;

import { CiBellOn, CiHome, CiUser } from 'react-icons/ci'
import { AiOutlineMenuUnfold } from 'react-icons/ai'
import Link from 'next/link'
import { FaHome } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

export default function Layout({ children }) {
    return (
        <>
            {children}
            <div className="fixed bottom-0 w-full bg-gray-800 text-white p-2">
                <div className="flex justify-around max-w-screen-lg mx-auto">
                    {/* Los íconos fijos en la parte inferior */}
                    <div className="menuButton">
                        <Link href={'/home'}>
                            <FaHome style={{ color: '#ff006e' }} size={'2.5em'} />
                        </Link>
                    </div>
                    <div className="menuButton">
                        <Link href={'/ranking'}>
                            <FaRegStar style={{ color: '#ff006e' }} size={'2.5em'} />
                        </Link>
                    </div>
                    <div className="menuButton">
                        <Link href={'/home'}>
                            <FaBell style={{ color: '#ff006e' }} size={'2.5em'} />
                        </Link>
                    </div>
                    <div className="menuButton">
                        <Link href={'/home/profile'}>
                            <FaRegUserCircle style={{ color: '#ff006e' }} size={'2.5em'} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
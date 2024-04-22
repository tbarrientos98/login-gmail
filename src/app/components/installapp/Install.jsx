'use client'
import React, { useEffect, useState } from "react";
import styles from './Install.module.css';

const Install = () => {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        setShowBanner(!isStandalone && !window.localStorage.getItem('appInstalled'));

        // Registrando el evento de instalación de PWA
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault();
            const installPrompt = event;
            setShowBanner(true);

            installPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    setShowBanner(false);
                    window.localStorage.setItem('appInstalled', 'true');
                } else {
                    setShowBanner(false);
                }
            });
        });

    }, []);

    const handleInstallClick = () => {
        if (window.promptToInstall) {
            window.promptToInstall().then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    setShowBanner(false);
                    window.localStorage.setItem('appInstalled', 'true');
                } else {
                    setShowBanner(false);
                }
            });
        } else {
            // Fallback message or link to installation instructions
        }
    };

    return (
        showBanner && (
            <div className={styles.installBanner}>
                <button onClick={handleInstallClick}>Instalar aplicacion</button>
            </div>
        )
    );
};

export default Install;
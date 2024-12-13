// Importing Dependencies //
import React from "react";
import Image from 'next/image';

// TYPE WRITER EFFECT
import Typewriter from 'typewriter-effect';

// Importing Images SRC


export function Loader() {;

  return (
    <section className="loader" id="loader">
        <h1 className="loader-title">{/*STUDIO HAQUIN © FILMMAKER & SOUNDDESIGNER*/}
        <Typewriter
          options={{
            strings: ['STUDIO HAQUIN ©', 'FILMMAKER & SOUND DESIGNER'],
            autoStart: true,
            loop: false,
            delay: 70, // Réduit le délai pour l'apparition de chaque caractère
            deleteSpeed: 35, // Réduit la vitesse de suppression des caractères
            pauseFor: 700, // Réduit la pause entre les phrases
          }}
        />
        </h1> {/* HI, WELCOME! */}
        {/*<Image className="loader-logo" alt="blurblur Logo Chrome" src={blurblurLogo}/>*/}
    </section>
  );
}

export default Loader;
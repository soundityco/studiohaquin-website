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
              //strings: ['designer graphique ?', 'designer web ?', 'vidéaste ?', 'cadreur vidéo ?', 'monteur vidéo ?', ],
              strings: ['STUDIO HAQUIN ©' ], // 'FILMAKER', 'SOUND DESIGNER', 'WELCOME'
              autoStart: true,
              loop: true,
              
            }}
          />  
        </h1> {/* HI, WELCOME! */}
        {/*<Image className="loader-logo" alt="blurblur Logo Chrome" src={blurblurLogo}/>*/}
    </section>
  );
}

export default Loader;
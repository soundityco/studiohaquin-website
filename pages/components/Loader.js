// Importing Dependencies //
import React from "react";
import Image from 'next/image';

// Importing Images SRC
import blurblurLogo from '../../content/images/logos/blurblur-logo-chrome.webp';

export function Loader() {;

  return (
    <section className="loader" id="loader">
      <h1>STUDIO HAQUIN *</h1>
        {/*<Image className="loader-logo" alt="blurblur Logo Chrome" src={blurblurLogo}/>*/}
    </section>
  );
}

export default Loader;
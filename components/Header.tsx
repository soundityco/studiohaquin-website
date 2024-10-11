import React, { forwardRef } from 'react';

// Importing Icons
import { WebsiteIcon } from "./Images";

const Header = forwardRef<HTMLElement>((props, ref) => {
  return (
    <>
      {/* HEADER PART */}
      <header ref={ref}> {/* Ajout de la ref ici */}
        <div className="header-container container">
          <a href="/" className="header-logo">
            <WebsiteIcon className="header-menu-icon"/>
            <p>Studio Haquin</p>
          </a>
          <a className="button-contact" href="mailto:andy@studiohaquin.com">👉 Me contacter</a>
        </div>
      </header>
    </>
  );
});

export default Header;

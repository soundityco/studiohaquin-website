import React, { forwardRef } from 'react';

// Importing Icons
import { WebsiteIcon, NewLinkIcon } from "./Images";

const Header = forwardRef<HTMLElement>((props, ref) => {
  return (
    <>

      <header className="header" ref={ref}>
        <div className="header-container container">
          <a href="/" className="header-logo">
            <WebsiteIcon className="header-menu-icon"/>
            <p>Studio Haquin</p>
          </a>
          <div className="header-button">
            <a className="button-contact hover-sound-contact" href="mailto:mailto:andy@studiohaquin.com?subject=J'ai un super projet à vous te proposer ! 😎&body=Hello Andy ! (très beau prénom), J'ai pour projet de…">Me contacter</a>{/*👉 */}
            <a className="button-contact-img" href="https://instagram.com/studiohaquin" target="_blank"><NewLinkIcon/></a>
          </div>
          {/*<span>
            <a className="button-contact" href="mailto:andy@studiohaquin.com">👉 Me contacter</a>
            <div>
              <NewLinkIcon className=" "/>
            </div>
          </span>*/}
        </div>
      </header>
    </>
  );
});

export default Header;

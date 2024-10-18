// Importing Dependencies
import React, { useState, useEffect, useRef } from 'react';

// Importing Icons
import { WebDesignIcon, GraphicDesignIcon, ContactIcon, VideoIcon } from "@/components/Images";

export function Menu() {

  return (
    <section className="menu">
        <nav className="hero-list-container">
            <ul className="hero-list-block">
                {/*<li>
                    <span className="button">
                    <GraphicDesignIcon className="button-icon"/>
                    Freelance disponible à Angers et alentours
                    </span>
                </li>*/}
                <li>
                    <span className="button">
                    <WebDesignIcon className="button-icon"/>
                    Freelance disponible à Angers et alentours
                    </span>
                </li>
                {/*<li>
                    <span className="button">
                    <ContactIcon className="button-icon"/>
                    Andy
                    </span>
                </li>*/}
            </ul>
        </nav>
    </section>
  );
}

export default Menu;
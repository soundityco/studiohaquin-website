// Importing Dependencies //
import React from "react";

// Importing Logos
import { DecathlonLogo } from "@/components/Images";
import { OrangeBleueLogo } from "@/components/Images";
import { GaleriesLafayetteLogo } from "@/components/Images";
import { PolyphoniaLogo } from "@/components/Images";
import { DorisOppenlanderLogo } from "@/components/Images";

export function Clients() {;

  return (
    <section className="clients" id="clients">
      <div className="clients-container container">
        <div class="clients-container-block">
          <div class="clients-container-block-slider">
            <div class="inner">
              <div className="client-logo-block">
                <DecathlonLogo className="client-logo" alt="Decathlon Logo" draggable="false"/>
              </div>
              <div className="client-logo-block">
                <PolyphoniaLogo className="client-logo" alt="Polyphonia Logo" draggable="false"/>
              </div>
              <div className="client-logo-block">
                <OrangeBleueLogo className="client-logo" alt="Orange Bleue Logo" draggable="false"/>
              </div>
              <div className="client-logo-block">
                <DorisOppenlanderLogo className="client-logo" alt="Doris Oppenlander Logo" draggable="false"/>
              </div>
              <div className="client-logo-block">
                <GaleriesLafayetteLogo className="client-logo" alt="Galeries Lafayette Logo" draggable="false"/>
              </div>


              <div className="client-logo-block">
                <DecathlonLogo className="client-logo" alt="Decathlon Logo" draggable="false"/>
              </div>
              <div className="client-logo-block">
                <PolyphoniaLogo className="client-logo" alt="Polyphonia Logo" draggable="false"/>
              </div>
              <div className="client-logo-block">
                <OrangeBleueLogo className="client-logo" alt="Orange Bleue Logo" draggable="false"/>
              </div>
              <div className="client-logo-block">
                <DorisOppenlanderLogo className="client-logo" alt="Doris Oppenlander Logo" draggable="false"/>
              </div>
              <div className="client-logo-block">
                <GaleriesLafayetteLogo className="client-logo" alt="Galeries Lafayette Logo" draggable="false"/>
              </div>
            </div>
          </div>
          <div class="fade"></div>
        </div>
      </div>
    </section>
  );
}

export default Clients;
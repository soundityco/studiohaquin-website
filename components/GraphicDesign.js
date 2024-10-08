// Importing Dependencies //
import React from "react";
import Image from 'next/image';

export function GraphicDesign() {;

  return (
    <section className="graphic-design" id="graphic-design">
      <h2>Et si c'était votre film ?</h2>
      <div className="graphic-design-container container">
        <video class="graphic-design-video" autoplay="yes" muted="yes" playsinline="" loop="yes" preload="auto" poster="">
          <source src="/showreel.mp4" type="video/mp4"/>
        </video>

      </div>
    </section>
  );
}

export default GraphicDesign;
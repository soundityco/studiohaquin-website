// Importing Dependencies //
import React from "react";

export function GraphicDesign() {;

  return (
    <section className="graphic-design" id="graphic-design">
      <div className="graphic-design-container container">
        <video class="graphic-design-video" autoplay="yes" muted="yes" playsinline="" loop="yes" preload="auto" poster="">
          <source src="/showreel.mp4" type="video/mp4"/>
        </video>
      </div>
    </section>
  );
}

export default GraphicDesign;

{/*import React from "react";

export function GraphicDesign() {;

  return (
    <section className="graphic-design" id="graphic-design">
      <div className="graphic-design-container container">
        <iframe
          src="https://player.vimeo.com/video/1013987784?autoplay=1&loop=1&background=1&muted=1"
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ pointerEvents: 'none' }}
        ></iframe>
      </div>
    </section>
  );
}

export default GraphicDesign;*/}
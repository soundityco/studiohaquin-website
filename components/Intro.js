import React, { useRef, useEffect } from "react";

function Intro() {

  return (
    <section className="intro" id="intro" >
      <div className="intro-container container">
        <div className="intro-container-item">
          <h3 className="intro-container-title">01. ABOUT</h3>
          <p className="intro-container-text">
            <span>Filmmaker, sound designer & compositeur, basé à Angers.</span>
            <br />
            <span>
              De la prise de vue au montage, en passant par la conception sonore et graphique, j’apporte une attention
              particulière aux détails pour vous offrir des créations qui reflètent votre identité, afin de raconter
              votre histoire de façon authentique et impactante.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Intro;



{/*import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Intro() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    function getScrollAmount() {
      const containerWidth = container.scrollWidth;
      return -(containerWidth - window.innerWidth);
    }

    const tween = gsap.to(container, {
      x: getScrollAmount,
      ease: "none",
      duration: 3,
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${Math.abs(getScrollAmount())}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
      markers: true,
    });

    // Assure un rafraîchissement après chargement
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Écoute l'événement resize
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    // Écoute l'événement load
    window.addEventListener("load", ScrollTrigger.refresh);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", ScrollTrigger.refresh);
      tween.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="intro" id="intro" ref={sectionRef}>
      <div className="intro-container" ref={containerRef}>
        <div className="intro-container-item">
          <h3 className="intro-container-title">01. ABOUT</h3>
          <p className="intro-container-text">
            <span>Filmmaker, sound designer & compositeur, basé à Angers.</span>
            <br />
            <span>
              De la prise de vue au montage, en passant par la conception sonore et graphique, j’apporte une attention
              particulière aux détails pour vous offrir des créations qui reflètent votre identité, afin de raconter
              votre histoire de façon authentique et impactante.
            </span>
          </p>
        </div>

        <div className="intro-container-item">
          <h3 className="intro-container-title">02. PROJECTS</h3>
          <p className="intro-container-text">
            <span>Filmmaker, sound designer & compositeur, basé à Angers.</span>
            <br />
            <span>
              De la prise de vue au montage, en passant par la conception sonore et graphique, j’apporte une attention
              particulière aux détails pour vous offrir des créations qui reflètent votre identité, afin de raconter
              votre histoire de façon authentique et impactante.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Intro;*/}
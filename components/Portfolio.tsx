import React, { useState, useEffect, useRef } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./Images";

interface Project {
  name: string;
  description: string;
  date: string;
  content: {
    videos?: string[];
    photos?: string[];
    iframes?: string[];
    text?: {
      title?: string;
      subtitle?: string;
      description: string;
      links?: { label: string; url: string }[];
    };
  };
}

export function Portfolio() {
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isLeftPressed, setIsLeftPressed] = useState(false);
  const [isRightPressed, setIsRightPressed] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const projects: Project[] = [
    {
      name: "Decathlon",
      description: "Série de 11 vidéos réussites",
      date: "2024",
      content: {
        videos: ["https://youtube.com/embed/playlist?list=PL1-Jamab2g2v-dF1sXsxNcdRR-MkTwz6A&si=wQ7tZ55a7Uz4E4zx?rel=0&controls=1&modestbranding=1&showinfo=0&autoplay=0"],
        iframes: [],
        photos: [],
        text: {
          description: "Réalisation d'une série de vidéos promotionnelles et divertissantes destinées aux réseaux sociaux pour Decathlon Les Ponts-de-Cé.",
        },
      },
    },
    {
      name: "Galeries Lafayette",
      description: "Vidéo réseaux sociaux",
      date: "2024",
      content: {
        videos: ["https://www.youtube.com/embed/J2JJ-yZ2ujk"],
        iframes: [],
        photos: [],
        text: {
          description: "Réalisation d'une vidéo promotionnelle pour l'évènement 'Mère et Fille' 2024 des Galeries Lafayette d'Angers.",
        },
      },
    },
    {
      name: "L'Orange Bleue",
      description: "Pub + Interviews",
      date: "2024",
      content: {
        videos: ["https://www.youtube.com/embed/p5dpBF0kLKU?rel=0&controls=1&modestbranding=1&showinfo=0&autoplay=0"],
        iframes: [],
        photos: [],
        text: {
          description: "Réalisation d'une vidéo promotionnelle et d'interviews pour L'Orange Bleue d'Angers.",
        },
      },
    },
    /*{
      name: "Polyphonia",
      description: "Web design + développement",
      date: "2024",
      content: {
        iframes: ["https://polyphoniamusic.com"],
        videos: [],
        photos: [],
        text: {
          description: "Réalisation, conception et développement web du site web du label POLYPHONIA.",
        },
      },
    },*/
    {
      name: "La Cour",
      description: "Rénovation restaurant La Cour",
      date: "2024",
      content: {
        videos: ["https://www.youtube.com/embed/P4d_1Tb2uAw"],
        iframes: [],
        photos: [],
        text: {
          description: "Réalisation d'une vidéo promotionnelle pour la rénovation du bar & restaurant 'La Cour', situé à Angers.",
        },
      },
    },
    /*{
      name: "Airval Studio",
      description: "Web design + développement",
      date: "2024",
      content: {
        iframes: ["https://airvalstudio.com"],
        videos: [],
        photos: [],
        text: {
          description: "Réalisation, conception et développement web du site web d'Airval Studio.",
        },
      },
    },*/
    /*{
      name: "blurblur",
      description: "Web design + développement",
      date: "2024",
      content: {
        iframes: ["https://blurblurmusic.com"],
        videos: [],
        photos: [],
        text: {
          description: "Réalisation, conception et développement web du site web de l'artiste blurblur.",
        },
      },
    },*/
    {
      name: "Doris Oppenlander",
      description: "Série de vidéos YouTube",
      date: "2023 — 2024",
      content: {
        videos: [
          "https://youtube.com/embed/playlist?list=PL1-Jamab2g2uz7au8Hi8UXNLgjkbdpQL6&si=h90Iz0ylvObE9soB?rel=0&controls=1&modestbranding=1&showinfo=0&autoplay=0",
        ],
        iframes: [],
        photos: [],
        text: {
          description: "Réalisation d'une série de vidéos YouTube sur le divertissement et la vulgarisation de la technique vocale pour la professeur de chant Doris Oppenlander.",
        },
      },
    },
    /*{
      name: "Soundity",
      description: "Web design + développement",
      date: "2023",
      content: {
        iframes: ["https://soundity-website.vercel.app"],
        videos: [],
        photos: [],
        text: {
          description: "Réalisation, conception et développement web du site web de Soundity.",
        },
      },
    },*/
    {
      name: "Faux Raccords Prod",
      description: "Court métrage L'ERMITE",
      date: "2023",
      content: {
        iframes: [],
        videos: [
          "https://www.youtube.com/embed/JmFNhAO9LEs?si=ZxiMIDiWsEbhnfzs?rel=0&controls=1&modestbranding=1&showinfo=0&autoplay=0"
        ],
        photos: [],
        text: {
          description: "Conception et création de contenu graphique et vidéos pour les réseaux sociaux et le site web de la banque en ligne Noelse.",
        },
      },
    },
    /*{
      name: "Noelse",
      description: "Création graphique + motion design + 3D",
      date: "2021 — 2023",
      content: {
        iframes: [],
        videos: [],
        photos: [],
        text: {
          description: "Conception et création de contenu graphique et vidéos pour les réseaux sociaux et le site web de la banque en ligne Noelse.",
        },
      },
    },*/
    /*{
      name: "Anuit' Anjou (Fictif)",
      description: "Création graphique + motion design",
      date: "2021",
      content: {
        iframes: [],
        videos: [],
        photos: [],
        text: {
          description: "Web design pour le site web et l'application de Anuit' Anjou (projet étudiant fictif).",
        },
      },
    },*/
  ];

  const handleClick = (index: number) => {
    setActiveProjectIndex(index);
  };

  const handleClosePopup = () => {
    setIsClosing(true);
    setTimeout(() => {
      setActiveProjectIndex(null);
      setIsClosing(false);
    }, 300);
  };

  const handleNextProject = () => {
    setActiveProjectIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return prevIndex === projects.length - 1 ? 0 : prevIndex + 1;
    });
  };

  const handlePrevProject = () => {
    setActiveProjectIndex((prevIndex) => {
      if (prevIndex === null) return projects.length - 1;
      return prevIndex === 0 ? projects.length - 1 : prevIndex - 1;
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleClosePopup();
    } else if (activeProjectIndex !== null) {
      if (e.key === "ArrowRight") {
        setIsRightPressed(true);
        handleNextProject();
      } else if (e.key === "ArrowLeft") {
        setIsLeftPressed(true);
        handlePrevProject();
      }
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setIsRightPressed(false);
    } else if (e.key === "ArrowLeft") {
      setIsLeftPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeProjectIndex]);

  const handleOutsideClick = (e: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      handleClosePopup();
    }
  };

  useEffect(() => {
    if (activeProjectIndex !== null) {
      window.addEventListener("mousedown", handleOutsideClick);
    } else {
      window.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeProjectIndex]);

  useEffect(() => {
    if (activeProjectIndex !== null) {
      const timer = setTimeout(() => setIsPopupActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsPopupActive(false);
    }
  }, [activeProjectIndex]);

  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null;

  return (
    <section className="portfolio" id="portfolio">
      <div className="portfolio-container container">
        <nav>
          <ul>
            <li>Crédits</li>
            <li>Projets</li>
            <li>Date</li>
          </ul>
        </nav>
        <div>
          {projects.map((project, index) => (
            <a
              key={project.name}
              className="div-to-click show-me"
              onClick={() => handleClick(index)}
            >
              <span>{project.name}</span>
              <span>{project.description}</span>
              <span>{project.date}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Popup Section */}
      {activeProject && (
        <div className={`portfolio-popup ${isPopupActive ? 'active' : ''} ${isClosing ? 'closing' : ''}`}>
          <div className={`portfolio-popup-container ${isPopupActive ? 'active' : ''} ${isClosing ? 'closing' : ''}`} ref={popupRef}>
            <div className="portfolio-popup-content">
              <div className="portfolio-popup-content-header">
                <div>
                  <div className="portfolio-popup-content-header-block">
                    <h2>{activeProject.name}</h2>
                    <div>
                      <h3>{activeProject.description}</h3>
                      <p>{activeProject.date}</p>
                    </div>
                  </div>
                  <div className="portfolio-popup-content-header-block">
                    <span onClick={handleClosePopup}>
                      <CloseIcon className="portfolio-icon" />
                    </span>
                    <div>
                      <span onClick={handlePrevProject}>
                        <ArrowLeftIcon className={`portfolio-icon ${isLeftPressed ? 'pressed' : ''}`} />
                      </span>
                      <span onClick={handleNextProject}>
                        <ArrowRightIcon className={`portfolio-icon ${isRightPressed ? 'pressed' : ''}`} />
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                    {activeProject.content.text && (
                      <>
                        {activeProject.content.text.title && (
                          <h3>{activeProject.content.text.title}</h3>
                        )}
                        {activeProject.content.text.subtitle && (
                          <h4>{activeProject.content.text.subtitle}</h4>
                        )}
                        {activeProject.content.text.description && (
                          <p>{activeProject.content.text.description}</p>
                        )}
                        {activeProject.content.text.links?.map((link, i) => (
                          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.label}
                          </a>
                        ))}
                      </>
                    )}
                  </div>
              </div>

              {/* Dynamic content */}
              <div className="portfolio-popup-dynamic-content">
                {/*{activeProject.content.text && (
                  <div>
                    {activeProject.content.text.title && (
                      <h3>{activeProject.content.text.title}</h3>
                    )}
                    {activeProject.content.text.subtitle && (
                      <h4>{activeProject.content.text.subtitle}</h4>
                    )}
                    {activeProject.content.text.description && (
                      <p>{activeProject.content.text.description}</p>
                    )}
                    {activeProject.content.text.links?.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}*/}

                {/* Video Content */}
                {activeProject.content.videos?.map((videoUrl, i) => (
                  <iframe
                    key={i}
                    width="560"
                    height="315"
                    src={videoUrl}
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}

                {/* Photo Content */}
                {activeProject.content.photos?.map((photoUrl, i) => (
                  <img key={i} src={photoUrl} alt={`Project ${activeProject.name}`} />
                ))}

                {/* Iframe Content */}
                {activeProject.content.iframes?.map((iframeUrl, i) => (
                  <iframe
                    key={i}
                    src={iframeUrl}
                    title="Project Iframe"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
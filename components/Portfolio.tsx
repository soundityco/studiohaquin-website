import React, { useState, useEffect, useRef, Fragment } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "./Images";

interface Project {
  name: string;
  description: string;
  date: string;
  content?: {
    videos?: string[];
    photos?: string[];
    iframes?: string[];
    text?: {
      title?: string;
      subtitle?: string;  // subtitle est maintenant facultatif
      description?: string;  // description est maintenant facultatif
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
        description: "Série de vidéos réseaux sociaux",
        date: "2024",
        content: {
            videos: ["https://player.vimeo.com/video/993371219?h=18665354fd"],
            //photos: ["/images/decathlon-photo1.jpg", "/images/decathlon-photo2.jpg"],
            text: {
                //title: "Décathlon Project",
                //subtitle: "Social Media Series",
                description: "Réalisation d'une série de vidéos promotionnelles et divertissantes destinées aux réseaux sociaux pour Decathlon Les Ponts-de-Cé.",
                /*links: [
                    { label: "Website", url: "https://decathlon.com" },
                    { label: "Instagram", url: "https://instagram.com/decathlon" },
                ],*/
            },
        },
    },
    {
        name: "Galeries Lafayette",
        description: "Vidéo réseaux sociaux",
        date: "2024",
        content: {
            videos: ["https://player.vimeo.com/video/1013996537?h=83d93ee44b"],
            //photos: ["/images/la-cour-photo1.jpg"],
            text: {
                //title: "La Cour Project",
                //subtitle: "Social Media Video",
                description: "Réalisation d'une vidéo promotionnelle pour l'évènement 'Mère et Fille' 2024 des Galeries Lafayette d'Angers.",
            },
        },
    },
    {
        name: "L'Orange Bleue",
        description: "Interviews + pub",
        date: "2024",
        content: {
            videos: ["https://player.vimeo.com/video/1006129673"],
            text: {
                //title: "L'Orange Bleue",
                //subtitle: "Fitness Interviews",
                description: "Réalisation d'une vidéo promotionnelle et d'interviews pour L'Orange Bleue d'Angers.",
            },
        },
    },
    {
        name: "Polyphonia",
        description: "Web design + développement",
        date: "2024",
        content: {
            iframes: ["https://polyphoniamusic.com"],
            text: {
                //title: "Polyphonia Website",
                //subtitle: "Web Design",
                description: "Réalisation, concepetion et developpement web du site web du label POLYPHONIA.",
            },
        },
    },
    {
        name: "La Cour",
        description: "Vidéo réseaux sociaux",
        date: "2024",
        content: {
            videos: ["https://player.vimeo.com/video/1012720397"],
            //photos: ["/images/la-cour-photo1.jpg"],
            text: {
                //title: "La Cour Project",
                //subtitle: "Social Media Video",
                description: "Réalisation d'une vidéo promotionnelle pour la rénovation du bar & restaurant 'La Cour', situé à Angers.",
            },
        },
    },
    {
        name: "Airval Studio",
        description: "Web design + développement",
        date: "2024",
        content: {
          iframes: ["https://airvalstudio.com"],
            //photos: ["/images/airval-photo1.jpg"],
            text: {
                //title: "Site Web pour Airval Studio",
                //subtitle: "Web Design & Development",
                description: "Réalisation, concepetion et developpement web du site web d'Airval Studio.",
            },
        },
    },
    {
        name: "blurblur",
        description: "Web design + développement",
        date: "2024",
        content: {
            iframes: ["https://blurblurmusic.com"],
            //videos: ["https://www.youtube.com/embed/UcdPqI6maG4"],
            text: {
                //title: "Blurblur Project",
                //subtitle: "Web Design",
                description: "Réalisation, concepetion et developpement web du site web de l'artiste blurblur",
            },
        },
    },
    {
        name: "Doris Oppenlander",
        description: "Série de vidéos YouTube",
        date: "2023 — 2024",
        content: {
            videos: ["https://www.youtube.com/embed/QTpHOYt04QU", "https://www.youtube.com/embed/DhnqP_J-MoQ", "https://www.youtube.com/embed/ZbT4yy6ZU6I"],
            text: {
                //title: "Doris Oppenlander Series",
                //subtitle: "YouTube Series",
                description: "Réalisation d'une série de vidéos YouTube sur le divertissement et la vulgarisation de la technique vocale pour la professeur de chant Doris Oppenlander.",
            },
        },
    },
    {
        name: "Soundity",
        description: "Web design + développement",
        date: "2023",
        content: {
            iframes: ["https://soundity-website.vercel.app"],
            //photos: ["/images/soundity-photo1.jpg"],
            text: {
                //title: "Soundity",
                //subtitle: "Web Design & Development",
                description: "Réalisation, concepetion et developpement web du site web d'Airval Studio.",
            },
        },
    },
    {
        name: "Noelse",
        description: "Création graphique + motion design + 3D",
        date: "2021 — 2023",
        content: {
            text: {
                //title: "Noelse",
                //subtitle: "Graphic Design & Motion",
                description: "Conception et création de contenu graphiques et vidéos pour les réseaux sociaux et le site web de la banque en ligne Noelse.",
            },
        },
    },
    {
        name: "Anuit' Anjou (Fictif)",
        description: "Création graphique + motion design",
        date: "2021",
        content: {
            text: {
                //title: "Anuit' Anjou",
                //subtitle: "Graphic Design",
                description: "Web design pour le site web et l'application de Anuit' Anjou (projet étudiant fictif).",
            },
        },
    },
    /*{
        name: "ESA",
        description: "Création graphique + 3D",
        date: "2021",
        content: {
            text: {
                title: "ESA Project",
                subtitle: "Graphic Design & 3D",
                description: "Graphic design and 3D work for ESA.",
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
      {activeProjectIndex !== null && projects[activeProjectIndex]?.content && (
        <div className={`portfolio-popup ${isPopupActive ? 'active' : ''} ${isClosing ? 'closing' : ''}`}>
          <div className={`portfolio-popup-container ${isPopupActive ? 'active' : ''} ${isClosing ? 'closing' : ''}`} ref={popupRef}>
            <div className="portfolio-popup-content">
              <div className="portfolio-popup-content-header">
                <div className="portfolio-popup-content-header-block">
                  <h2>{projects[activeProjectIndex]?.name}</h2>
                  <p>{projects[activeProjectIndex]?.description}</p>
                  <p>{projects[activeProjectIndex]?.date}</p>
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

              {/* Dynamic content */}
              <div className="portfolio-popup-dynamic-content">
                {/*{projects[activeProjectIndex].content.text && (
                  <div>
                    {projects[activeProjectIndex].content.text.title && (
                      <h3>{projects[activeProjectIndex].content.text.title}</h3>
                    )}
                    {projects[activeProjectIndex].content.text.subtitle && (
                      <h4>{projects[activeProjectIndex].content.text.subtitle}</h4>
                    )}
                    {projects[activeProjectIndex].content.text.description && (
                      <p>{projects[activeProjectIndex].content.text.description}</p>
                    )}
                    {projects[activeProjectIndex].content.text.links?.map((link, i) => (
                      <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}*/}

                {/* Video Content */}
                {/*{projects[activeProjectIndex].content.videos?.map((videoUrl, i) => (
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
                ))}*/}

                {/* Photo Content */}
                {/*{projects[activeProjectIndex].content.photos?.map((photoUrl, i) => (
                  <img key={i} src={photoUrl} alt={`Project ${projects[activeProjectIndex]?.name}`} />
                ))}*/}

                {/* Iframe Content */}
                {/*{projects[activeProjectIndex].content.iframes?.map((iframeUrl, i) => (
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
                ))}*/}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
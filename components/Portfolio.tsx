import React, { useState, useEffect, useRef } from "react";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayerPlayButton,
} from "./Images";

interface Project {
  name: string;
  description: string;
  date: string;
  content: {
    videoIds?: string[];
    iframes?: string[];
    text?: {
      title?: string;
      subtitle?: string;
      tags?: string[]; // Modification ici : un tableau de chaînes de caractères
      description: string;
      links?: { label: string; url: string }[];
    };
  };
}

export function Portfolio() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hiddenThumbnails, setHiddenThumbnails] = useState<string[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);



  const popupRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0); // Pour mesurer la distance du drag

  const projects: Project[] = [
    {
      name: "Decathlon",
      description: "Mini série 'Réussites' & Vidéos promotionnelles",
      date: "2024",
      content: {
        videoIds: [
          "FIpooQI-Qko",
          "u3qvu__U6Wc",
          "0NhUkX7_qSA",
          "qr16wv-Dhdg",
        ],
        iframes: [],
        text: {
          description:
            "Réalisation d'une série de 11 vidéos sur les réussites du magasin des Ponts-de-Cé sur l'année 2024 & vidéos promotionnelles.",
          tags: ['Films institutionnels', 'Interviews', 'Vidéo Promotionnelles', 'Réseaux sociaux'],
        },
      },
    },
    {
      name: "Doris Oppenlander",
      description: "Série de vidéos YouTube",
      date: "2023 — 2024",
      content: {
        videoIds: [
          "H6wkoTE8oyo",
          "IFKT_fekZw4",
          "QTpHOYt04QU",
          "DhnqP_J-MoQ",
          "YB3SCKTtBLM",
          "ZbT4yy6ZU6I",
          "Dwnl_BvyhdY"
        ],
        iframes: [],
        text: {
          description: "Réalisation d'une série de vidéos YouTube sur le divertissement et la vulgarisation du chant par Doris Oppenlander.",
          tags: ['Divertissement', 'Vulgarisation', 'Tutoriels', 'Réseaux sociaux'],
        },
      },
    },
    {
      name: "Galeries Lafayette",
      description: "Évènement 'Mère Fille'",
      date: "2024",
      content: {
        videoIds: [
          "J2JJ-yZ2ujk",
          "-AWQqfOAuQo"
        ],
        iframes: [],
        text: {
          description:
            "Réalisation d'une vidéo promotionnelle pour l'évènement 'Mère et Fille' 2024 des Galeries Lafayette d'Angers.",
            tags: ['Évènementiel', 'Réseaux sociaux'],
          },
        },
      },
    {
      name: "L'Orange Bleue",
      description: "Pub + Interviews",
      date: "2024",
      content: {
        videoIds: [
          "p5dpBF0kLKU",
          "s5xjV93gEQY"
        ],
        iframes: [],
        text: {
          description: "Réalisation d'une vidéo promotionnelle et d'interviews pour L'Orange Bleue d'Angers.",
          tags: ["Publicité", 'Interviews', 'Réseaux sociaux'],
        },
      },
    },
    {
      name: "La Cour",
      description: "Rénovation du restaurant",
      date: "2024",
      content: {
        videoIds: [
          "P4d_1Tb2uAw"
        ],
        iframes: [],
        text: {
          description: "Réalisation d'une vidéo promotionnelle pour la rénovation du bar & restaurant 'La Cour', situé à Angers.",
          tags: ["Vidéo promotionnelle", 'Réseaux sociaux'],
        },
      },
    },
    {
      name: "Faux Raccords Prod",
      description: "Court métrage 'L'ERMITE'",
      date: "2023",
      content: {
        videoIds: [
          "JmFNhAO9LEs"
        ],
        iframes: [],
        text: {
          description: "Réalisation, captation, montage et sound design du court métrage 'L'ERMITE'.",
          tags: ["Réalisation", "Court-métrage"],
        },
      },
    },
    {
      name: "blurblur",
      description: "Composition & sound design",
      date: "Depuis 2018",
      content: {
        videoIds: [
          "07ajNa0HyOM",
          "AyXlc-wf31U",
          "MAySC0NqGdI",
          "UcdPqI6maG4",
          "vE2-2ohxaT0",
          "aGkHU2nwyqU",
          "f59vXG2g5iQ",
          "Wlwl-Fdsmss",
        ],
        iframes: [],
        text: {
          description: "blurblur est mon projet d'artiste ou j'exerce composition, écriture, enregistrement, mixage et mastering. Clips réalisés par Josic Jegu.",
          tags: ["Composition", "chant", "mixage", "mastering", "sound-design"],
        },
      },
    },
  ];

  const handleClick = (index: number) => {
    setActiveProjectIndex(index);
    setHoveredProjectIndex(null); // S'assurer que le clic désactive le hover temporaire
  };

  const handleMouseEnter = (index: number) => {
    setHoveredProjectIndex(index);
  
    // Réinitialiser les vidéos actives et les miniatures
    setHiddenThumbnails([]);
    setActiveVideoId(null);
  };

  const handleMouseLeave = () => {
    setHoveredProjectIndex(null);
  };

  const handleNextProject = () => {
    setActiveProjectIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevProject = () => {
    setActiveProjectIndex((prevIndex) =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (activeProjectIndex !== null) {
      const timer = setTimeout(() => setIsPopupActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsPopupActive(false);
    }
  }, [activeProjectIndex]);

  useEffect(() => {
    if (activeProjectIndex !== null) {
      setHiddenThumbnails([]);
      setActiveVideoId(null);
    }
  }, [activeProjectIndex]);

  const handleThumbnailClick = (videoId: string) => {
    if (dragDistance.current > 5) {
      // Ignorer les clics si un drag a été détecté
      return;
    }

    if (activeVideoId === videoId) return;

    setHiddenThumbnails((prev) => {
      const updatedThumbnails = prev.filter((id) => id !== activeVideoId);
      updatedThumbnails.push(videoId);
      return updatedThumbnails;
    });

    setActiveVideoId(videoId);
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragDistance.current = 0; // Réinitialiser la distance au début du drag
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX.current) * 1.5; // Multiplier pour ajuster la vitesse
    dragDistance.current += Math.abs(x - startX.current); // Calculer la distance parcourue
    scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  const activeProject: Project | null =
  hoveredProjectIndex !== null && hoveredProjectIndex >= 0 && hoveredProjectIndex < projects.length
    ? projects[hoveredProjectIndex]
    : activeProjectIndex !== null && activeProjectIndex >= 0 && activeProjectIndex < projects.length
    ? projects[activeProjectIndex]
    : null;
    
    return (
      <section className="portfolio" id="portfolio" data-scroll-container="true">
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
                className={`div-to-click show-me hover-click-sound ${
                  activeProjectIndex === index ? "activeProject" : ""
                }`}
                onClick={() => handleClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <span>{project.name}</span>
                <span>{project.description}</span>
                <span>{project.date}</span>
              </a>
            ))}
          </div>
        </div>
  
        {activeProject && (
          <div
            className={`portfolio-popup-container ${
              isPopupActive ? "active" : ""
            } ${isClosing ? "closing" : ""}`}
            ref={popupRef}
          >
            <div className="portfolio-popup-container-overlay"></div>
            <div className="portfolio-popup-content">
              <div className="portfolio-popup-content-header">
                <div className="portfolio-popup-content-header-block">
                  <h2>{activeProject.name}</h2>
                  <div className="portfolio-popuselection-block">
                    <span onClick={handlePrevProject}>
                      <ArrowLeftIcon className="portfolio-icon" />
                    </span>
                    <span onClick={handleNextProject}>
                      <ArrowRightIcon className="portfolio-icon" />
                    </span>
                  </div>
                </div>
                <div className="portfolio-popup-content-header-block">
                  <h3>
                    {activeProject.description} • {activeProject.date}
                  </h3>
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
                      <div className="portfolio-project-tags">
                        {activeProject.content.text.tags?.map((tag, index) => (
                            <span key={index} className="portfolio-project-tag">
                              {tag}
                            </span>
                        ))}
                      </div>
                      {activeProject.content.text.links?.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ))}
                    </>
                  )}
                </div>
              </div>
              <div
                className="portfolio-popup-dynamic-content horizontal-scroll"
                ref={scrollContainerRef}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={handleDragEnd}
              >
                {activeProject.content.videoIds?.map((videoId, i) => (
                  <div
                    key={i}
                    className={`portfolio-popup-dynamic-content-video ${
                      hoveredVideoId && hoveredVideoId !== videoId ? 'darkened' : ''
                    }`}
                    onMouseEnter={() => setHoveredVideoId(videoId)}
                    onMouseLeave={() => setHoveredVideoId(null)}
                  >
                    {!hiddenThumbnails.includes(videoId) && (
                      <div className="portfolio-popup-dynamic-content-thumbnail-block">
                        <PlayerPlayButton className="portfolio-video-play-button" />
                        <img
                          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={`Thumbnail for Video ${i + 1}`}
                          onClick={() => handleThumbnailClick(videoId)}
                          draggable="false"
                        />
                      </div>
                    )}
                    {activeVideoId === videoId && (
                      <iframe
                        src={`https://www.youtube.com/embed/${videoId}?rel=0&controls=1&modestbranding=1&autoplay=1`}
                        title={`Video ${i + 1}`}
                        width="100%"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      ></iframe>
                    )}
                  </div>
                ))}
              </div>

              <p className="portfolio-scroll">
                (&nbsp;SCROLL&nbsp;<ArrowRightIcon />&nbsp;)
              </p>
            </div>
          </div>
        )}
      </section>
    );
  }
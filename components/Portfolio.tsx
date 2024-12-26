import React, { useState, useEffect, useRef } from "react";

// Import Utils Components
import HoverableGroup from "@/components/utils/HoverableGroup";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayerPlayButton,
} from "./Images";

const allAvailableTags = [
 'Composition',
 'Court-métrage',
 'Covers',
 'Divertissement',
 'Films institutionnels',
 'Interviews',
 'Lyrics Video',
 'Publicité',
 'Réalisation',
 'Réseaux sociaux',
 'Tutoriels',
 'Vidéo Promotionnelles',
 'Vidéo promotionnelle',
 'Vulgarisation',
 'chant',
 'mastering',
 'mixage',
 'Évènementiel',
];

interface Project {
  name: string;
  description: string;
  date: string;
  content: {
    videoIds?: string[];
    videoTags?: { [key: string]: string[] };  // Définition de videoTags
    text: {
      description: string;
      tags?: string[];
      videoTags?: { [key: string]: string[] }; // Si tu veux aussi ici
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

  const [activeTag, setActiveTag] = useState<string | null>(null);


  const popupRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0); // Pour mesurer la distance du drag

  const projects: Project[] = [
    {
      name: "Decathlon",
      description: "Mini série & vidéos promotionnelles",
      date: "2024",
      content: {
        videoIds: ["FIpooQI-Qko", "u3qvu__U6Wc", "0NhUkX7_qSA", "qr16wv-Dhdg"],
        videoTags: {
          "FIpooQI-Qko": ["Films institutionnels", "Interviews"],
          "u3qvu__U6Wc": ["Films institutionnels", "Interviews"],
          "0NhUkX7_qSA": ["Films institutionnels", "Interviews"],
          "qr16wv-Dhdg": ["Réseaux sociaux", "Vidéo Promotionnelles"],
        },
        text: {
          description: "Réalisation d'une série de 11 vidéos sur les réussites du magasin des Ponts-de-Cé sur l'année 2024 & vidéos promotionnelles.",
          tags: allAvailableTags,
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
        videoTags: {
          "H6wkoTE8oyo": ["Divertissement", "Covers"],
          "IFKT_fekZw4": ["Vulgarisation", "Tutoriels"],
          "QTpHOYt04QU": ["Divertissement", "Covers"],
          "DhnqP_J-MoQ": ["Vulgarisation", "Tutoriels"],
          "YB3SCKTtBLM": ["Divertissement", "Covers"],
          "ZbT4yy6ZU6I": ["Vulgarisation", "Tutoriels"],
          "Dwnl_BvyhdY": ["Divertissement"],
        },
        text: {
          description: "Réalisation d'une série de vidéos YouTube sur le divertissement et la vulgarisation du chant par Doris Oppenlander.",
          tags: allAvailableTags,
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
        videoTags: {
          "J2JJ-yZ2ujk": ["Évènementiel", "Réseaux sociaux"],
          "-AWQqfOAuQo": ["Évènementiel", "Réseaux sociaux"],
        },
        text: {
          description:
            "Réalisation d'une vidéo promotionnelle pour l'évènement 'Mère et Fille' 2024 des Galeries Lafayette d'Angers.",
            tags: allAvailableTags,
          },
        },
      },
      {
        name: "L'Orange Bleue",
        description: "Publicité + Interviews",
        date: "2024",
        content: {
          videoIds: [
            "p5dpBF0kLKU",
            "s5xjV93gEQY"
          ],
          videoTags: {
            "p5dpBF0kLKU": ["Publicité", "Réseaux sociaux"],
            "s5xjV93gEQY": ["Interviews", "Réseaux sociaux"],
          },
          text: {
            description: "Réalisation d'une mini publicité et d'interviews pour L'Orange Bleue d'Angers.",
            tags: allAvailableTags,
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
          videoTags: {
            "P4d_1Tb2uAw": ["Vidéo promotionnelle", "Réseaux sociaux"],
          },
          text: {
            description: "Réalisation d'une vidéo promotionnelle pour la rénovation du bar & restaurant 'La Cour', situé à Angers.",
            tags: allAvailableTags,
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
          videoTags: {
            "JmFNhAO9LEs": ["Réalisation", "Court-métrage"],
          },
          text: {
            description: "Réalisation, captation, montage et sound design du court métrage 'L'ERMITE'.",
            tags: allAvailableTags,
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
          videoTags: {
            "07ajNa0HyOM": ["Composition", "chant", "mixage", "mastering"],
            "AyXlc-wf31U": ["Composition", "chant", "mixage", "mastering"],
            "MAySC0NqGdI": ["Composition", "chant", "mixage", "mastering", "Lyrics Video"],
            "UcdPqI6maG4": ["Composition", "chant", "mixage", "mastering"],
            "vE2-2ohxaT0": ["Composition", "chant", "mixage", "mastering"],
            "aGkHU2nwyqU": ["Composition", "chant", "mixage", "mastering"],
            "f59vXG2g5iQ": ["Composition", "chant", "mixage", "mastering"],
            "Wlwl-Fdsmss": ["Composition", "chant", "mixage", "mastering"],
          },
          text: {
            description: "blurblur est mon projet d'artiste ou j'exerce composition, écriture, enregistrement, mixage et mastering.",
            tags: allAvailableTags,
          },
        },
      },
  ];

  const handleClick = (index: number) => {
    setActiveProjectIndex(index);
    setHoveredProjectIndex(null); // S'assurer que le clic désactive le hover temporaire
    setActiveTag("All");  // Réinitialiser le filtre lorsqu'un projet est sélectionné
  };

  const handleMouseEnter = (index: number) => {
    setHoveredProjectIndex(index);
    
    // Réinitialiser les vidéos actives et les miniatures
    setHiddenThumbnails([]);
    setActiveVideoId(null);
    
    setActiveTag("All");  // Réinitialiser le filtre lorsqu'un projet est survolé
  };

  const handleMouseLeave = () => {
    setHoveredProjectIndex(null);
  };

  const handleNextProject = () => {
    setActiveTag(null); // Réinitialiser le tag actif
    setActiveProjectIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handlePrevProject = () => {
    setActiveTag(null); // Réinitialiser le tag actif
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

  const handleTagClick = (tag: string) => {
    // Réinitialiser la vidéo en cours et les miniatures
    setActiveVideoId(null);
    setHiddenThumbnails([]);  // Réinitialiser toutes les miniatures visibles
  
    if (tag === activeTag) {
      setActiveTag("All");  // Si le tag sélectionné est déjà actif, on annule le filtre
    } else {
      setActiveTag(tag);
    }
  };

  const activeProject: Project | null =
  hoveredProjectIndex !== null && hoveredProjectIndex >= 0 && hoveredProjectIndex < projects.length
    ? projects[hoveredProjectIndex]
    : activeProjectIndex !== null && activeProjectIndex >= 0 && activeProjectIndex < projects.length
    ? projects[activeProjectIndex]
    : null;

    const filteredVideos = activeTag
    ? activeProject?.content?.videoIds?.filter((videoId) => {
        const videoTags = activeProject?.content?.videoTags?.[videoId] || [];
        return videoTags.includes(activeTag) || activeTag === "All";
      })
    : activeProject?.content?.videoIds;
    
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
                    <button className="clickable" onClick={handlePrevProject}>
                      <ArrowLeftIcon className="portfolio-icon" />
                    </button>
                    <button className="clickable" onClick={handleNextProject}>
                      <ArrowRightIcon className="portfolio-icon" />
                    </button>
                  </div>
                </div>
                <div className="portfolio-popup-content-header-block">
                  <h3>
                    {activeProject.description} • {activeProject.date}
                  </h3>
                  <p>{activeProject.content.text.description}</p>

                  {/* Affichage des tags correspondant aux vidéos du projet */}
                  {activeProject.content.text && (
                    <>
                      <div className="portfolio-project-tags">
                        <HoverableGroup hoverClass="darkened">
                          {/* Extraire les tags associés aux vidéos du projet */}
                          {activeProject.content.videoIds?.reduce((uniqueTags: string[], videoId) => {
                            const videoTagList = activeProject.content.videoTags?.[videoId] || [];
                            videoTagList.forEach(tag => {
                              if (!uniqueTags.includes(tag)) {
                                uniqueTags.push(tag);
                              }
                            });
                            return uniqueTags;
                          }, []).map((tag, index) => (
                            <button
                              key={index}
                              className={`portfolio-project-tag ${activeTag === tag ? "active" : ""}`}
                              onClick={() => handleTagClick(tag)}
                            >
                              {tag}
                              {activeTag === tag && <span className="close-icon">✕</span>}
                            </button>
                          ))}
                        </HoverableGroup>
                      </div>

                      {/* Affichage des liens supplémentaires */}
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
                <HoverableGroup hoverClass="darkened">
                  {filteredVideos?.map((videoId, i) => (
                    <div key={i} className={`portfolio-popup-dynamic-content-video`}>
                      {!hiddenThumbnails.includes(videoId) && (
                        <div className="portfolio-popup-dynamic-content-thumbnail-block">
                          <PlayerPlayButton className="portfolio-video-play-button" />
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
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
                </HoverableGroup>
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
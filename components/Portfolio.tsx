import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

// Import Utils Components
import HoverableGroup from "@/components/utils/HoverableGroup";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayerPlayIcon,
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
 'Design Graphique',
 'Motion Design',
 '3D',
];

interface Project {
  name: string;
  description: string;
  date: string;
  content: {
    videoIds?: string[];
    imageUrls?: string[]; // Ajout pour les images
    projectTags?: { [key: string]: string[] };
    text: {
      description: string;
      tags?: string[];
      projectTags?: { [key: string]: string[] };
      links?: { label: string; url: string }[];
    };
  };
}

export function Portfolio() {

  const projects: Project[] = [
    {
      name: "Decathlon",
      description: "Mini série & vidéos promotionnelles",
      date: "2024",
      content: {
        videoIds: ["FIpooQI-Qko", "u3qvu__U6Wc", "0NhUkX7_qSA", "qr16wv-Dhdg"],
        imageUrls: [
          
        ],
        projectTags: {
          // Tags associés aux vidéos
          "FIpooQI-Qko": ["Films institutionnels", "Interviews"],
          "u3qvu__U6Wc": ["Films institutionnels", "Interviews"],
          "0NhUkX7_qSA": ["Films institutionnels", "Interviews"],
          "qr16wv-Dhdg": ["Réseaux sociaux", "Vidéos Promotionnelles"],
        },
        text: {
          description: "Réalisation de 11 vidéos sur les réussites 2024 du magasin des Ponts-de-Cé & vidéos promotionnelles, collaboration Super35.",
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
        imageUrls: [],
        projectTags: {
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
        videoIds: ["J2JJ-yZ2ujk", "-AWQqfOAuQo"],
        imageUrls: [],
        projectTags: {
          "J2JJ-yZ2ujk": ["Évènementiel", "Réseaux sociaux"],
          "-AWQqfOAuQo": ["Évènementiel", "Réseaux sociaux"],
        },
        text: {
          description: "Réalisation d'une vidéo récap' pour l'évènement 'Mère et Fille' 2024 des Galeries Lafayette d'Angers, collaboration Super35.",
          tags: allAvailableTags,
        },
      },
    },
    {
      name: "L'Orange Bleue",
      description: "Publicité + Interviews",
      date: "2024",
      content: {
        videoIds: ["p5dpBF0kLKU", "s5xjV93gEQY"],
        imageUrls: [],
        projectTags: {
          "p5dpBF0kLKU": ["Publicité", "Réseaux sociaux"],
          "s5xjV93gEQY": ["Interviews", "Réseaux sociaux"],
        },
        text: {
          description: "Réalisation d'une mini publicité et d'interviews pour L'Orange Bleue d'Angers, collaboration Super35.",
          tags: allAvailableTags,
        },
      },
    },
    {
      name: "La Cour",
      description: "Rénovation du restaurant",
      date: "2024",
      content: {
        videoIds: ["P4d_1Tb2uAw"],
        imageUrls: [],
        projectTags: {
          "P4d_1Tb2uAw": ["Vidéo promotionnelle", "Réseaux sociaux"],
        },
        text: {
          description: "Réalisation d'une vidéo pour la rénovation du bar & restaurant 'La Cour', situé à Angers, collaboration Super35.",
          tags: allAvailableTags,
        },
      },
    },
    {
      name: "Noelse",
      description: "Design graphique et motion + 3D",
      date: "2021 — 2023",
      content: {
        videoIds: [
          "4M0I_Xca63A",
          "CE05st8HUwc",
          "OJJZDq-cCFk",
        ],
        imageUrls: [
          "/assets/images/projets/noelse/noelse-app-major-update.webp",
          "/assets/images/projets/noelse/noelse-couts-virements.webp",
          "/assets/images/projets/noelse/noelse-card.webp",
          "/assets/images/projets/noelse/noelse-3d-frozen-card.webp",
        ],
        projectTags: {
          "4M0I_Xca63A": ["Motion Design"],
          "CE05st8HUwc": ["Motion Design", "3D"],
          "OJJZDq-cCFk": ["Motion Design", "3D"],
          "/assets/images/projets/noelse/noelse-app-major-update.webp": ["Design Graphique"],
          "/assets/images/projets/noelse/noelse-couts-virements.webp": ["Design Graphique"],
          "/assets/images/projets/noelse/noelse-card.webp": ["Design Graphique"],
          "/assets/images/projets/noelse/noelse-3d-frozen-card.webp": ["Design Graphique", "3D"],
        },
        text: {
          description: "Diverses réalisations de design graphique et motion design pour la banque en ligne Noelse",
          tags: allAvailableTags,
        },
      },
    },
    {
      name: "Faux Raccords Prod",
      description: "Court métrage 'L'ERMITE'",
      date: "2023",
      content: {
        videoIds: ["JmFNhAO9LEs"],
        imageUrls: [],
        projectTags: {
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
          "Wlwl-Fdsmss"
        ],
        imageUrls: [],
        projectTags: {
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
          description: "blurblur est mon projet d'artiste où j'exerce composition, écriture, enregistrement, mixage et mastering.",
          tags: allAvailableTags,
        },
      },
    },
  ];

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [hoveredProjectIndex, setHoveredProjectIndex] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const dragDistance = useRef(0); // Pour mesurer la distance du drag
  const [isMediaPopupOpen, setIsMediaPopupOpen] = useState(false);
  const [activeMediaIndex, setActiveMediaIndex] = useState<number | null>(null);

  // POP UP MEDIA
  const handleVideoClick = (index: number) => {
    setActiveMediaIndex(index);
    setIsMediaPopupOpen(true);
    setActiveVideoId(filteredVideos?.[index] || null); // Lance la vidéo uniquement au premier clic
  };
  
  const handleImageClick = (index: number) => {
    setActiveMediaIndex(index);
    setIsMediaPopupOpen(true);
    setActiveVideoId(null); // Désactive la lecture vidéo
  };

  const handleNextMedia = () => {
    if (!activeProject || activeMediaIndex === null) return;
    const mediaLength =
      (filteredVideos?.length || 0) + (filteredImages?.length || 0);
    const nextIndex = (activeMediaIndex + 1) % mediaLength;
    setActiveMediaIndex(nextIndex);
    setActiveVideoId(
      nextIndex < (filteredVideos?.length || 0) ? filteredVideos?.[nextIndex] || null : null
    ); // Ne lance la vidéo que si elle est active
  };
  
  const handlePrevMedia = () => {
    if (!activeProject || activeMediaIndex === null) return;
    const mediaLength =
      (filteredVideos?.length || 0) + (filteredImages?.length || 0);
    const prevIndex =
      (activeMediaIndex - 1 + mediaLength) % mediaLength; // Gérer boucle arrière
    setActiveMediaIndex(prevIndex);
    setActiveVideoId(
      prevIndex < (filteredVideos?.length || 0) ? filteredVideos?.[prevIndex] || null : null
    ); // Ne lance la vidéo que si elle est active
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isMediaPopupOpen) return;
  
      switch (event.key) {
        case "ArrowRight":
          handleNextMedia();
          break;
        case "ArrowLeft":
          handlePrevMedia();
          break;
        case "Escape":
          setIsMediaPopupOpen(false);
          break;
        default:
          break;
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMediaPopupOpen, handleNextMedia, handlePrevMedia]);

  /* END OF MEDIA POPUP */

  const handleClick = (index: number) => {
    setActiveProjectIndex(index);
    setHoveredProjectIndex(null); // S'assurer que le clic désactive le hover temporaire
    setActiveTag("All");  // Réinitialiser le filtre lorsqu'un projet est sélectionné
  };

  const handleMouseEnter = (index: number) => {
    setHoveredProjectIndex(index);
    
    // Réinitialiser les vidéos actives et les miniatures
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
      const timer = setTimeout(() => {}, 10); // Garde le timer au cas où il est nécessaire ailleurs
      return () => clearTimeout(timer);
    }
  }, [activeProjectIndex]);

  useEffect(() => {
    if (activeProjectIndex !== null) {
      setActiveVideoId(null);
    }
  }, [activeProjectIndex]);

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
        const projectTags = activeProject?.content?.projectTags?.[videoId] || [];
        return projectTags.includes(activeTag) || activeTag === "All";
      })
    : activeProject?.content?.videoIds;

    const filteredImages = activeTag
    ? activeProject?.content?.imageUrls?.filter((imageUrl) => {
        const projectTags = activeProject?.content?.projectTags?.[imageUrl] || [];
        return projectTags.includes(activeTag) || activeTag === "All";
      })
    : activeProject?.content?.imageUrls;
    
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
            className="portfolio-popup-container"
            ref={popupRef}
          >
            <div className="portfolio-popup-container-overlay"></div>
            <div className="portfolio-popup-content container">
              <div className="portfolio-popup-content-header">
                <div className="portfolio-popup-content-header-block">
                  <h2>{activeProject.name}</h2>
                  <div className="portfolio-popup-selection-block">
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
                    <span>{activeProject.description}</span> <span>•</span>{" "}
                    <span>{activeProject.date}</span>
                  </h3>
                  <p>{activeProject.content.text.description}</p>

                  {/* Tags combinés pour vidéos et images */}
                  {activeProject.content.projectTags && (
                    <div className="portfolio-project-tags">
                      <HoverableGroup hoverClass="darkened">
                        {Object.values(activeProject.content.projectTags)
                          .flat() // Combine tous les tags en un seul tableau
                          .filter((tag, index, self) => self.indexOf(tag) === index) // Évite les doublons
                          .sort((a, b) => a.localeCompare(b)) // Trie alphabétiquement
                          .map((tag, index) => (
                            <button
                              key={index}
                              className={`portfolio-project-tag ${
                                activeTag === tag ? "active" : ""
                              }`}
                              onClick={() => handleTagClick(tag)}
                            >
                              {tag}
                              {activeTag === tag && (
                                <span className="close-icon">✕</span>
                              )}
                            </button>
                          ))}
                      </HoverableGroup>
                    </div>
                  )}

                  {/* Liens supplémentaires */}
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
                  {/* Vidéos */}
                  {filteredVideos?.map((videoId, i) => (
                    <div
                      key={`video-${i}`}
                      className="portfolio-popup-dynamic-content-video"
                      onClick={() => handleVideoClick(i)}
                    >
                      <div className="portfolio-popup-dynamic-content-thumbnail-block">
                        <PlayerPlayIcon className="portfolio-video-play-button" />
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                          alt={`Thumbnail for Video ${i + 1}`}
                          draggable="false"
                        />
                      </div>
                    </div>
                  ))}


                  {/* Images */}
                  {filteredImages?.map((imageUrl, i) => (
                    <div
                      key={`image-${i}`}
                      className="portfolio-popup-dynamic-content-image"
                      onClick={() =>
                        handleImageClick(i + (filteredVideos?.length || 0))
                      }
                    >
                      <img
                        src={imageUrl}
                        alt={`Image ${i + 1}`}
                        className="portfolio-image"
                        draggable="false"
                      />
                    </div>
                  ))}
                </HoverableGroup>
              </div>

              <p className="portfolio-scroll">
                DRAG OR SCROLL&nbsp;<ArrowRightIcon />
              </p>
            </div>
          </div>
        )}

        {isMediaPopupOpen && (
          <div className="media-popup">
            {/*<div className="media-popup-overlay" onClick={() => setIsMediaPopupOpen(false)}>*/}
              <div className="media-popup-content-nav">
                <button
                  className="media-popup-close"
                  onClick={() => setIsMediaPopupOpen(false)}
                >
                  [FERMER]
                </button>
              </div>
              <div className="media-popup-content container">
                <div className="media-popup-content-block">
                  <button className="media-popup-prev" onClick={handlePrevMedia}>
                    <ArrowLeftIcon className=""/>
                  </button>
                  {activeMediaIndex !== null &&
                    activeMediaIndex < (filteredVideos?.length || 0) && (
                      <div className="media-popup-block">
                        <iframe
                          src={`https://www.youtube.com/embed/${filteredVideos?.[activeMediaIndex]}?rel=0&controls=1&modestbranding=1&autoplay=${activeVideoId === filteredVideos?.[activeMediaIndex] ? 1 : 0}`}
                          title={`Video ${activeMediaIndex + 1}`}
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        ></iframe>
                      </div>
                    )}
                  {activeMediaIndex !== null &&
                    activeMediaIndex >= (filteredVideos?.length || 0) && (
                      <div className="media-popup-block">
                        <img
                          src={filteredImages?.[activeMediaIndex - (filteredVideos?.length || 0)]}
                          alt={`Image ${activeMediaIndex + 1}`}
                        />
                      </div>
                    )}
                    <button className="media-popup-next" onClick={handleNextMedia}>
                      <ArrowRightIcon />
                    </button>
                  </div>
              </div>
            {/*</div>*/}
          </div>
        )}
      </section>
    );
  }
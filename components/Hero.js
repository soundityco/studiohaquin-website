import React, { useRef, useState, useEffect } from "react";

// Import Components
import Header from "./Header";

import {
  PlayerPlayButton,
  PlayerPauseButton,
  PlayerVolume1Button,
  PlayerVolume2Button,
  PlayerVolume3Button,
  PlayerFullscreenButton,
} from "@/components/Images";

export function Hero() {
  // Référence de la vidéo
  const videoRef = useRef(null);
  const containerRef = useRef(null); // Référence pour le conteneur principal

  // États pour la vidéo
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previousVolume, setPreviousVolume] = useState(1); // Sauvegarde du volume précédent

  // Fonction pour jouer ou mettre en pause la vidéo
  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Fonction pour changer le volume
  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    if (isMuted) {
      setIsMuted(false); // Réactive le son si le slider est déplacé alors que le son est muet
      videoRef.current.volume = newVolume;
    }
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  // Fonction pour basculer entre muet et non-muet
  const toggleMute = () => {
    if (isMuted) {
      // Restaurer le volume précédent lorsqu'on "unmute"
      setIsMuted(false);
      videoRef.current.volume = previousVolume; // Utiliser le volume précédent
      setVolume(previousVolume);
    } else {
      // Sauvegarder le volume actuel avant de muter
      setPreviousVolume(volume);
      setIsMuted(true);
      videoRef.current.volume = 0; // Réinitialise à 0 lorsqu'on mute
      setVolume(0);
    }
  };

  // Fonction pour mettre à jour la progression de la vidéo
  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    setProgress(newProgress);
    videoRef.current.currentTime = (newProgress / 100) * duration;
  };

  // Fonction pour mettre à jour l'état de la progression de la vidéo
  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const totalDuration = videoRef.current.duration;
    setProgress((current / totalDuration) * 100);
    setDuration(totalDuration);
  };

  // Fonction pour gérer le mode plein écran
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  // Fonction pour gérer les événements clavier
  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // Empêche le défilement de la page
      togglePlayPause();
    } else if (event.code === "KeyF") {
      toggleFullScreen();
    }
  };

  // Fonction pour déterminer l'icône du volume
  const getVolumeIcon = () => {
    if (isMuted || volume <= 0) {
      return <PlayerVolume1Button className="player-icon" />;
    } else if (volume <= 0.5) {
      return <PlayerVolume2Button className="player-icon" />;
    } else {
      return <PlayerVolume3Button className="player-icon" />;
    }
  };

  // Écouteurs d'événements pour la touche espace, F, et la mise à jour de la vidéo
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <section className="graphic-design" id="graphic-design">
      <Header />
      <div
        className="graphic-design-container container"
        ref={containerRef} // Référence pour le conteneur principal
      >
        {/* Vidéo */}
        <video
          ref={videoRef}
          className="graphic-design-video"
          playsInline
          preload="auto"
          poster="/showreel-thumbnail.webp"
          onClick={togglePlayPause} // Clic sur la vidéo pour play/pause
        >
          {/*<source src="/showreel.mp4" type="video/mp4" />*/}
          <source src="https://res.cloudinary.com/dqrkeb9bz/video/upload/q_auto:good/v1734103518/SHOWREEL_2024_STUDIOHAQUIN_FHD_jxennm.mp4" type="video/mp4" />
          
        </video>

        {/* Contrôles vidéo personnalisés */}
        <div className="video-controls">
          {/* Barre de progression */}
          <div className="progress-container">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="progress-bar"
              style={{
                background: `linear-gradient(to right, red, #ff00cb ${progress}%, #ffffff80 ${progress}%)`,
              }}
            />
          </div>

          <div className="player-controls">
            {/* Bouton Play/Pause */}
            <button onClick={togglePlayPause} className="player-btn">
              {isPlaying ? (
                <PlayerPauseButton className="player-icon" />
              ) : (
                <PlayerPlayButton className="player-icon" />
              )}
            </button>

            {/* Bouton Mute/Unmute */}
            <button onClick={toggleMute} className="player-btn">
              {isMuted ? (
                <PlayerVolume1Button className="player-icon" />
              ) : (
                <>{getVolumeIcon()}</>
              )}
            </button>

            {/* Slider de volume */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume} // Si muet, la valeur est 0
              onChange={handleVolumeChange}
              className="volume-slider"
              style={{
                background: `linear-gradient(to right, white ${volume * 100}%, #ffffff80 ${volume * 100}%)`,
              }}
            />

            {/* Bouton Plein écran */}
            <button onClick={toggleFullScreen} className="player-btn">
              <PlayerFullscreenButton className="player-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;



      {/*<div className="hero-container container">
        <div className="hero-subcontainer-block">
          <div className="hero-intro-container">
              <h1 className="hero-title">
                <div className="hero-title-line">
                  <div className="hero-title-line-content hero-title-line-content-1">
                    <span>studio</span>&nbsp;Haquin&nbsp;<span className="hero-title-special">©</span>
                  </div>
                </div>
                <div className="hero-title-line">
                  <div className="hero-title-line-content hero-title-line-content-2">
                    Design&nbsp;<span className="hero-title-special-2">Graphique,</span>
                  </div>
                </div>
                <div className="hero-title-line">
                  <div className="hero-title-line-content hero-title-line-content-3">
                  &nbsp;web<span className="hero-title-special">&nbsp;<span className="hero-title-special-4">&</span>&nbsp;</span><span className="hero-title-special-3">vidéo</span>
                  </div>
                </div>
              </h1>
              <Image className="hero-picture" alt="Hero Picture" draggable="false" src={HeroPicture}/>
          </div>
        </div>
      </div>*/}
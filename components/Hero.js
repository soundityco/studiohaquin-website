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
  const [isMuted, setIsMuted] = useState(false); // Ajouter un état pour mute
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
      setIsMuted(false); // Désactive le mute si l'utilisateur modifie le slider
      videoRef.current.muted = false; // Désactive le mute
      setPreviousVolume(newVolume); // Sauvegarde le volume actuel
    }
    setVolume(newVolume); // Met à jour l'état du volume
    videoRef.current.volume = newVolume; // Applique le volume à la vidéo
  };

  // Fonction pour basculer le son entre muet et non-muet
  const toggleMute = () => {
    if (videoRef.current.muted) {
      // Si la vidéo est déjà muette, on la démut
      videoRef.current.muted = false;
      videoRef.current.volume = previousVolume; // Restaure le volume précédent
      setVolume(previousVolume); // Met à jour l'état du volume
      setIsMuted(false); // On met l'état à false
    } else {
      // Si la vidéo n'est pas muette, on la met en muet
      setPreviousVolume(volume); // Sauvegarde le volume actuel avant de le mettre à 0
      videoRef.current.muted = true;
      videoRef.current.volume = 0; // On met le volume à 0
      setVolume(0); // Met à jour l'état du volume pour le slider
      setIsMuted(true); // On met l'état à true
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
    if (event.key === " " || event.key === "Spacebar") {
      event.preventDefault(); // Empêche le défilement de la page
      togglePlayPause();
    } else if (event.key === "f" || event.key === "F") {
      toggleFullScreen();
    } else if (event.key === "ArrowUp") {
      // Augmenter le volume avec une grande step
      setVolume((prevVolume) => {
        const newVolume = Math.min(prevVolume + 0.1, 1); // Cap à 1
        videoRef.current.volume = newVolume;
        return newVolume;
      });
    } else if (event.key === "ArrowDown") {
      // Diminuer le volume avec une grande step
      setVolume((prevVolume) => {
        const newVolume = Math.max(prevVolume - 0.1, 0); // Cap à 0
        videoRef.current.volume = newVolume;
        return newVolume;
      });
    } else if (event.key === "ArrowRight") {
      // Avancer de 5s dans la vidéo
      videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, videoRef.current.duration);
    } else if (event.key === "ArrowLeft") {
      // Reculer de 5s dans la vidéo
      videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0);
    } else if (event.key === "m" || event.key === "M" || event.key === ";") {
      // Toggle mute/unmute avec la touche M (ou ; selon le clavier)
      toggleMute(); // Appel de la fonction pour basculer entre muet et non-muet
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

    // Ajouter l'écouteur pour le double-clic
    video.addEventListener("dblclick", toggleFullScreen);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("dblclick", toggleFullScreen); // Nettoyage
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
            <div>
              <button onClick={togglePlayPause} className="player-btn">
                {isPlaying ? (
                  <PlayerPauseButton className="player-icon" />
                ) : (
                  <PlayerPlayButton className="player-icon" />
                )}
              </button>

              {/* Bouton Mute/Unmute */}
              <button onClick={toggleMute} className="player-btn">
                {getVolumeIcon()}
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
            </div>

            <div>
              {/* Bouton Plein écran */}
              <button onClick={toggleFullScreen} className="player-btn">
                <PlayerFullscreenButton className="player-icon" />
              </button>
            </div>
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
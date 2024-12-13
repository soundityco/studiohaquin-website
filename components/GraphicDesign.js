import React, { useRef, useState, useEffect } from "react";

import { PlayerPlayButton, PlayerPauseButton, PlayerVolume1Button, PlayerVolume2Button, PlayerVolume3Button } from "@/components/Images";

export function GraphicDesign() {
  // Référence de la vidéo
  const videoRef = useRef(null);

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

  // Fonction pour gérer l'appui sur la barre d'espace
  const handleKeyPress = (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // Empêche le défilement de la page
      togglePlayPause();
    }
  };

  // Fonction pour mettre à jour l'état de la progression de la vidéo
  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const totalDuration = videoRef.current.duration;
    setProgress((current / totalDuration) * 100);
    setDuration(totalDuration);
  };

  // Fonction pour déterminer l'icône du volume
  const getVolumeIcon = () => {
    if (isMuted || volume <= 0) {
      return <PlayerVolume1Button className="player-icon" />;
    } else if (volume <= 0.6) {
      return <PlayerVolume2Button className="player-icon" />;
    } else {
      return <PlayerVolume3Button className="player-icon" />;
    }
  };

  // Écouteurs d'événements pour la touche espace et la mise à jour de la vidéo
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
      <div className="graphic-design-container container">
        {/* Vidéo */}
        <video
          ref={videoRef}
          className="graphic-design-video"
          autoplay="yes"
          playsInline
          //loop
          preload="auto"
          poster="/showreel.jpg"
          onClick={togglePlayPause} // Clic sur la vidéo pour play/pause
        >
          <source src="/showreel.mp4" type="video/mp4" />
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
            <button onClick={togglePlayPause} className="play-pause-btn">
              {isPlaying ? <PlayerPlayButton className="player-icon" /> : <PlayerPauseButton className="player-icon" />}
            </button>

            {/* Bouton Mute/Unmute */}
            <button onClick={toggleMute} className="mute-btn">
              {isMuted ? <PlayerVolume1Button className="player-icon" /> : <>{getVolumeIcon()}</>}
            </button>

            {/* Slider de volume */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume} // Si muet, la valeur est 0
              onChange={handleVolumeChange}
              className="volume-slider"
              style={{
                background: `linear-gradient(to right, white ${volume * 100}%, #ffffff80 ${volume * 100}%)`,
              }}
            />
          </div>
        </div>
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
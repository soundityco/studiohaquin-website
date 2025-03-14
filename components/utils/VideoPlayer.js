import React, { useRef, useState, useEffect } from "react";

import {
  PlayerPlayButton,
  PlayerPauseButton,
  PlayerVolume1Button,
  PlayerVolume2Button,
  PlayerVolume3Button,
  PlayerFullscreenButton,
} from "@/components/Images";

const VideoPlayer = ({ videoSrc, posterSrc }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(0); // Volume initial à 0 (muet)
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [isMouseActive, setIsMouseActive] = useState(false);
  let inactivityTimeout = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
  
    const playVideoWithDelay = async () => {
      try {
        // Attendre 6 secondes avant de jouer la vidéo
        await new Promise((resolve) => setTimeout(resolve, 6000));
        await video.play();
        setIsPlaying(true); // Mettre à jour l'état pour indiquer que la vidéo est en lecture
      } catch (error) {
        //console.error("La lecture différée a échoué :", error);
        setIsPlaying(false); // Mettre à jour l'état en cas d'échec
      }
    };
  
    // S'assurer que la vidéo commence en sourdine
    video.muted = true;
    video.volume = 0; // Volume initial
    setVolume(0); // Mettre l'état local à jour
  
    playVideoWithDelay();
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener("playing", handlePlaying);
    video.addEventListener("pause", handlePause);

    // S'assurer que l'état initial est bien pris en compte
    video.muted = true;
    video.volume = 0;
    setIsPlaying(!video.paused);

    return () => {
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        containerRef.current.classList.add("full-screen");
        setIsFullScreen(true);
      } else {
        containerRef.current.classList.remove("full-screen");
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseMove = () => {
      setIsMouseActive(true);
      clearTimeout(inactivityTimeout.current);
      inactivityTimeout.current = setTimeout(() => {
        setIsMouseActive(false);
      }, 1000);
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(inactivityTimeout.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const video = videoRef.current;

      switch (event.key) {
        case " ":
        case "k":
          event.preventDefault();
          togglePlayPause();
          break;
        case "ArrowRight":
          event.preventDefault();
          video.currentTime = Math.min(video.currentTime + 5, duration);
          break;
        case "ArrowLeft":
          event.preventDefault();
          video.currentTime = Math.max(video.currentTime - 5, 0);
          break;
        case "m":
          event.preventDefault();
          toggleMute();
          break;
        case "f":
          toggleFullScreen();
          break;
        case "ArrowUp":
          event.preventDefault();
          adjustVolume(0.1);
          break;
        case "ArrowDown":
          event.preventDefault();
          adjustVolume(-0.1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [duration, volume, isMuted]);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);

    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }

    videoRef.current.volume = newVolume;
    videoRef.current.muted = newVolume === 0;
  };

  const adjustVolume = (delta) => {
    let newVolume = Math.min(1, Math.max(0, volume + delta));
    setVolume(newVolume);

    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
      setPreviousVolume(newVolume);
    }

    videoRef.current.volume = newVolume;
    videoRef.current.muted = newVolume === 0;
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = previousVolume;
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleProgressChange = (event) => {
    const newProgress = parseFloat(event.target.value);
    setProgress(newProgress);

    if (videoRef.current && !isNaN(duration) && duration > 0) {
      videoRef.current.currentTime = (newProgress / 100) * duration;
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const totalDuration = videoRef.current.duration;
    setProgress((current / totalDuration) * 100);
    setDuration(totalDuration);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return <PlayerVolume1Button className="player-icon" />;
    } else if (volume <= 0.6) {
      return <PlayerVolume2Button className="player-icon" />;
    } else {
      return <PlayerVolume3Button className="player-icon" />;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("dblclick", toggleFullScreen);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("dblclick", toggleFullScreen);
    };
  }, []);

  return (
    <div ref={containerRef}> {/* className="video-player-container" */}
      <video
        ref={videoRef}
        className={`video-player ${isFullScreen ? "fullscreen-video" : ""}`}
        playsInline
        preload="auto"
        poster={posterSrc}
        onClick={togglePlayPause}
        autoPlay
        muted
        loop
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className={`video-controls ${isMouseActive ? "visible" : "hidden"}`}>
        <div className="progress-container">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar"
            style={{
              background: `linear-gradient(to right, #ccff00 ${progress}%, #ffffff80 ${progress}%)`,
            }}
          />
        </div>

        <div className="player-controls">
          <div>
            <button onClick={togglePlayPause} className="player-btn">
              {isPlaying ? (
                <PlayerPauseButton className="player-icon" />
              ) : (
                <PlayerPlayButton className="player-icon" />
              )}
            </button>

            <button onClick={toggleMute} className="player-btn">
              {getVolumeIcon()}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              style={{
                background: `linear-gradient(to right, white ${
                  volume * 100
                }%, #ffffff80 ${volume * 100}%)`,
              }}
            />
          </div>

          <div>
            <button onClick={toggleFullScreen} className="player-btn">
              <PlayerFullscreenButton className="player-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;




/*import React, { useRef, useState, useEffect } from "react";

import {
  PlayerPlayButton,
  PlayerPauseButton,
  PlayerVolume1Button,
  PlayerVolume2Button,
  PlayerVolume3Button,
  PlayerFullscreenButton,
} from "@/components/Images";

const VideoPlayer = ({ videoSrc, posterSrc }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isMouseActive, setIsMouseActive] = useState(false);
  let inactivityTimeout = useRef(null);

  useEffect(() => {
    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        containerRef.current.classList.add("full-screen");
        setIsFullScreen(true);
      } else {
        containerRef.current.classList.remove("full-screen");
        setIsFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;

    const handleMouseMove = () => {
      setIsMouseActive(true);
      clearTimeout(inactivityTimeout.current);
      inactivityTimeout.current = setTimeout(() => {
        setIsMouseActive(false);
      }, 1000);
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(inactivityTimeout.current);
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event) => {
    const newVolume = event.target.value;
    if (isMuted) {
      setIsMuted(false);
      videoRef.current.muted = false;
      setPreviousVolume(newVolume);
    }
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
  };

  const toggleMute = () => {
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      videoRef.current.volume = previousVolume;
      setVolume(previousVolume);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      videoRef.current.muted = true;
      videoRef.current.volume = 0;
      setVolume(0);
      setIsMuted(true);
    }
  };

  const handleProgressChange = (event) => {
    const newProgress = event.target.value;
    setProgress(newProgress);
  
    // Vérification : ne modifie le currentTime que si la durée est définie et valide
    if (videoRef.current && !isNaN(duration) && duration > 0) {
      videoRef.current.currentTime = (newProgress / 100) * duration;
    }
  };

  const handleTimeUpdate = () => {
    const current = videoRef.current.currentTime;
    const totalDuration = videoRef.current.duration;
    setProgress((current / totalDuration) * 100);
    setDuration(totalDuration);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume <= 0) {
      return <PlayerVolume1Button className="player-icon" />;
    } else if (volume <= 0.6) {
      return <PlayerVolume2Button className="player-icon" />;
    } else {
      return <PlayerVolume3Button className="player-icon" />;
    }
  };

  /*useEffect(() => {
    const video = videoRef.current;
  
    // Gestion des événements
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("dblclick", toggleFullScreen);
  
    // Ajout de l'événement pour réinitialiser la vidéo à la fin
    const handleVideoEnd = () => {
      setIsPlaying(false); // Mettre à jour l'état
      video.pause(); // Arrêter la lecture
      video.currentTime = 0; // Revenir au début
      // Petite astuce : forcer le poster à se réafficher
      video.load(); // Recharge la vidéo localement pour forcer l'affichage du poster
    };
    video.addEventListener("ended", handleVideoEnd);
  
    // Nettoyage des événements
    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("dblclick", toggleFullScreen);
      video.removeEventListener("ended", handleVideoEnd);
    };
  }, []);*/

  /*useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("dblclick", toggleFullScreen);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("dblclick", toggleFullScreen);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase(); // Normaliser la clé pour ignorer la casse
      
      // Ajouter la classe visible aux contrôles
      setIsMouseActive(true);
      clearTimeout(inactivityTimeout.current);
      inactivityTimeout.current = setTimeout(() => {
        setIsMouseActive(false);
      }, 1000);
  
      switch (key) {
        case "m": // "M" sur AZERTY ou QWERTY
        case "ù": // Parfois "ù" sur AZERTY (selon la configuration)
          toggleMute();
          break;
  
        case "f": // Plein écran
          toggleFullScreen();
          break;
  
        case "arrowright": // Avancer de 10 secondes
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(
              videoRef.current.currentTime + 3,
              videoRef.current.duration
            );
          }
          break;
  
        case "arrowleft": // Reculer de 10 secondes
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(
              videoRef.current.currentTime - 3,
              0
            );
          }
          break;
  
        case " ": // Lecture/Pause
          event.preventDefault();
          togglePlayPause();
          break;
  
        case "arrowup": // Augmenter le volume
          event.preventDefault();
          setVolume((prevVolume) => {
            const newVolume = Math.min(prevVolume + 0.1, 1);
            if (videoRef.current) videoRef.current.volume = newVolume;
            return newVolume;
          });
          break;
  
        case "arrowdown": // Diminuer le volume
          event.preventDefault();
          setVolume((prevVolume) => {
            const newVolume = Math.max(prevVolume - 0.1, 0);
            if (videoRef.current) videoRef.current.volume = newVolume;
            return newVolume;
          });
          break;
  
        default:
          break;
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [togglePlayPause, toggleFullScreen, toggleMute, setVolume]);
  

  return (
    <div ref={containerRef} className="video-player-container">
      <video
        ref={videoRef}
        className={`video-player ${isFullScreen ? "fullscreen-video" : ""}`}
        playsInline
        preload="auto"
        poster={posterSrc}
        onClick={togglePlayPause}
        autoPlay
        muted
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className={`video-controls ${isMouseActive ? "visible" : "hidden"}`}>
        <div className="progress-container">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar"
            style={{
              background: `linear-gradient(to right, #7526ff ${progress}%, #ffffff80 ${progress}%)`,
            }}
          />
        </div>

        <div className="player-controls">
            <div>   
                <button onClick={togglePlayPause} className="player-btn">
                    {isPlaying ? (
                    <PlayerPauseButton className="player-icon" />
                    ) : (
                    <PlayerPlayButton className="player-icon" />
                    )}
                </button>

                <button onClick={toggleMute} className="player-btn">
                    {getVolumeIcon()}
                </button>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                    style={{
                    background: `linear-gradient(to right, white ${volume * 100}%, #ffffff80 ${volume * 100}%)`,
                    }}
                />
            </div>

            <div>   
                <button onClick={toggleFullScreen} className="player-btn">
                    <PlayerFullscreenButton className="player-icon" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;*/
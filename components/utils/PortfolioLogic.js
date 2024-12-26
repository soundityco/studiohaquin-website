import { useState, useRef, useEffect } from "react";

export function useProjectHandlers({ setActiveProjectIndex, setHoveredProjectIndex }) {
  const handleClick = (index) => {
    setActiveProjectIndex(index);
    setHoveredProjectIndex(null);
  };

  const handleMouseEnter = (index) => {
    setHoveredProjectIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredProjectIndex(null);
  };

  const handleNextProject = () => {
    setActiveProjectIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevProject = () => {
    setActiveProjectIndex((prevIndex) => prevIndex - 1);
  };

  return {
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    handleNextProject,
    handlePrevProject,
  };
}

export function useDragHandlers() {
  const scrollContainerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
  };

  const handleDragMove = (e) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    scrollContainerRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  const handleDragEnd = () => {
    isDragging.current = false;
  };

  return { scrollContainerRef, handleDragStart, handleDragMove, handleDragEnd };
}

export function usePopupLogic(activeProjectIndex) {
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [hiddenThumbnails, setHiddenThumbnails] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);

  const popupRef = useRef(null);

  useEffect(() => {
    if (activeProjectIndex !== null) {
      const timer = setTimeout(() => setIsPopupActive(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsPopupActive(false);
    }
  }, [activeProjectIndex]);

  return { isPopupActive, isClosing, hiddenThumbnails, activeVideoId, setActiveVideoId, popupRef };
}
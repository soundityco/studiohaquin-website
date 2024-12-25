import React, { useState, useEffect } from 'react';

interface HoverableGroupProps {
  children: React.ReactNode;
  hoverClass: string;
}

const HoverableGroup: React.FC<HoverableGroupProps> = ({ children, hoverClass }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [delayedIndex, setDelayedIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setDelayedIndex(null);
  };

  const handleMouseLeave = (index: number) => {
    setTimeout(() => {
      if (hoveredIndex !== index) {
        setDelayedIndex(index);
      }
    }, 300);
    setHoveredIndex(null);
  };

  useEffect(() => {
    if (hoveredIndex !== null) {
      setDelayedIndex(null);
    }
  }, [hoveredIndex]);

  return (
    <div className="hoverable-group">
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null; // Ignore les éléments invalides
        }

        const isDarkened =
          hoveredIndex !== null && hoveredIndex !== index && delayedIndex !== index;

          return React.cloneElement(child as React.ReactElement<any>, {
          onMouseEnter: () => handleMouseEnter(index),
          onMouseLeave: () => handleMouseLeave(index),
          className: `${child.props.className || ''} ${isDarkened ? hoverClass : ''}`,
        });
      })}
    </div>
  );
};

export default HoverableGroup;

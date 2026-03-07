import React, { useState, useRef } from "react";
import "./FlipCard.css";

interface FlipCardProps {
  title: string;
  description: string;
  icon?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ title, description, icon }) => {
  const [flipped, setFlipped] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isMobile = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    isMobile.current = true;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = Math.abs(e.changedTouches[0].clientX - touchStartX.current);
    const deltaY = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (deltaX < 10 && deltaY < 10) {
      setFlipped(prev => !prev);
    }
  };

  return (
    <div
      className={`flip-card ${isMobile.current ? "is-mobile" : ""} ${flipped ? "touched" : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="card">
        <div className="content">
          <div className="back">
            <div className="back-content">
              <p className="back-description">{description}</p>
            </div>
          </div>
          <div className="front">
            {icon && <img src={icon} alt={title} className="front-image" />}
            <div className="front-overlay"></div>
            <div className="front-content">
              <div className="title-overlay">
                <strong>{title}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
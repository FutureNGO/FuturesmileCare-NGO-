import React from "react";
import "./FlipCard.css";

interface FlipCardProps {
  title: string;
  description: string;
  icon?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ title, description, icon }) => {
  return (
    <div className="flip-card">
      <div className="card">
        <div className="content">
          <div className="back">
            <div className="back-content">
              <p className="back-description">{description}</p>
            </div>
          </div>
          <div className="front">
            {icon && (
              <img src={icon} alt={title} className="front-image" />
            )}
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


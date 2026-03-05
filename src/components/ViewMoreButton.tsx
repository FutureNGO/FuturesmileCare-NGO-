import React from "react";
import "./ViewMoreButton.css";

interface ViewMoreButtonProps {
  href?: string;
  onClick?: () => void;
}

const ViewMoreButton: React.FC<ViewMoreButtonProps> = ({ href = "#", onClick }) => {
  return (
    <a href={href} onClick={onClick} className="fancy-button">
      <span className="button__text">
        <span style={{"--index":0} as any}>A</span>
        <span style={{"--index":1} as any}>W</span>
        <span style={{"--index":2} as any}>E</span>
        <span style={{"--index":3} as any}>S</span>
        <span style={{"--index":4} as any}>O</span>
        <span style={{"--index":5} as any}>M</span>
        <span style={{"--index":6} as any}>E</span>
        <span style={{"--index":7} as any}> </span>
        <span style={{"--index":8} as any}>C</span>
        <span style={{"--index":9} as any}>S</span>
        <span style={{"--index":10} as any}>S</span>
        <span style={{"--index":11} as any}> </span>
        <span style={{"--index":12} as any}>B</span>
        <span style={{"--index":13} as any}>U</span>
        <span style={{"--index":14} as any}>T</span>
        <span style={{"--index":15} as any}>T</span>
        <span style={{"--index":16} as any}>O</span>
        <span style={{"--index":17} as any}>N</span>
      </span>
      <div className="button__circle">
        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon" width={14}>
          <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 14 15" fill="none" width={14} xmlns="http://www.w3.org/2000/svg" className="button__icon button__icon--copy">
          <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
        </svg>
      </div>
    </a>
  );
};

export default ViewMoreButton;

interface TopArrowProps {
    className?: string;
    color?: string;
    size?: string
  }
  
  export const TopArrow = ({ 
    className = "", 
    color = "#000000",
    size = "2rem"
  }: TopArrowProps) => {
    return (
      <div className={`${className}`}>
        <svg 
          style={{ width: size, height: size, color }}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M7 14L12 9L17 14" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  };
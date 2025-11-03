import React from 'react';

interface NoImageProps {
  width?: number;
  height?: number;
  className?: string;
}

const NoImage: React.FC<NoImageProps> = ({
  width = 200,
  height = 200,
  className = ''
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="100%" height="100%" fill="#ddd" />
      <text
        x="50%"
        y="50%"
        fontSize="18"
        fill="#999"
        textAnchor="middle"
        dy=".3em"
      >
        No Image
      </text>
    </svg>
  );
};

export default NoImage;
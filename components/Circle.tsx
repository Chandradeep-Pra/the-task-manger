import React from "react";

interface CircleProps {
  radius: number;
  className?: string;
}

const Circle: React.FC<CircleProps> = ({ radius, className }) => {
  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {/* Outer Circle */}
      <div
        className="absolute border border-primary rounded-full"
        style={{ width: radius * 2, height: radius * 2 }}
      />

      {/* Middle Circle (30% Smaller) */}
      <div
        className="absolute border border-primary rounded-full"
        style={{
          width: (radius * 1.4), // 30% smaller than outer (70% of original)
          height: (radius * 1.4),
        }}
      />

      {/* Inner Circle (50% Smaller) */}
      <div
        className="absolute border border-primary rounded-full"
        style={{
          width: (radius * 1.0), // 50% smaller than outer (50% of original)
          height: (radius * 1.0),
        }}
      />
    </div>
  );
};

export default Circle;

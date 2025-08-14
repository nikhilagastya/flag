import React from "react";

interface FlowerPetalsProps {
  isActive: boolean;
}

const FlowerPetals: React.FC<FlowerPetalsProps> = ({ isActive }) => {
  if (!isActive) return null;

  // Only warm color schemes now
  const colors = [
    { petal: "from-yellow-300 to-orange-500", center: "bg-yellow-400" }, // sunflower
    { petal: "from-orange-300 to-red-500", center: "bg-orange-400" }, // marigold variant
    { petal: "from-yellow-400 to-red-400", center: "bg-yellow-500" }, // mixed warm
    { petal: "from-orange-400 to-yellow-500", center: "bg-orange-300" }, // softer marigold
  ];

  const flowers = Array.from({ length: 20 }, (_, i) => {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const petalsCount = 5 + Math.floor(Math.random() * 4); // 5–8 petals
    return {
      id: i,
      petalsCount,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      left: Math.random() * 100,
      rotation: Math.random() * 360,
      size: 0.4 + Math.random() * 0.3,
      color,
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute animate-fall-sway"
          style={{
            left: `${flower.left}%`,
            animationDelay: `${flower.delay}s`,
            animationDuration: `${flower.duration}s`,
            transform: `rotate(${flower.rotation}deg) scale(${flower.size})`,
          }}
        >
          {/* Flower */}
          <div className="relative w-6 h-6">
            {Array.from({ length: flower.petalsCount }).map((_, idx) => (
              <div
                key={idx}
                className={`absolute w-3 h-5 bg-gradient-to-br ${flower.color.petal} rounded-full opacity-90 shadow-sm`}
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${idx * (360 / flower.petalsCount) + (Math.random() * 10 - 5)}deg) translateY(-50%) scale(${0.9 + Math.random() * 0.2})`,
                  transformOrigin: "center",
                }}
              ></div>
            ))}
            {/* Warm center only */}
            <div
              className={`absolute w-3 h-3 ${flower.color.center} rounded-full shadow-sm`}
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            ></div>
          </div>
        </div>
      ))}

      {/* Custom animations */}
      <style>{`
        @keyframes fall-sway {
          0% {
            transform: translateY(-10%) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) translateX(10px) rotate(180deg);
            opacity: 0.9;
          }
          100% {
            transform: translateY(110vh) translateX(-10px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall-sway {
          animation-name: fall-sway;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default FlowerPetals;

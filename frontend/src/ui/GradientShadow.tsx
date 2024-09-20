import React from 'react';

function GradientShadow({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative  bg-gray-800 rounded-lg">
      <div className="absolute top-6 bottom-6 -left-10 -right-10 -z-10 before:content-[''] before:absolute before:top-0 before:bottom-0 before:w-full before:h-full before:bg-gradient-to-r before:from-purple-700 before:via-indigo-500 before:to-teal-300 blur-2xl"></div>
      {children}
    </div>
  );
}

export default GradientShadow;

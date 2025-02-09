"use client";

import React from 'react'
import Chicken from './Chicken'

const Background = () => {
  const chickens = Array.from({ length: 3 }).map((_, index) => ({
    id: index,
    randomY: Math.floor(Math.random() * 2000) + 50, // ✅ Randomize Y between 50px and 250px
  }));

  return (
    <div className="relative h-screen bg-blue-100 overflow-hidden">
      <h1 className="text-center text-2xl font-bold p-6">🐔 Randomized Running Chickens!</h1>

      {/* Render multiple chickens */}
      {chickens.map(({ id, randomY }) => (
        <Chicken key={id} randomY={randomY} />
      ))}
    </div>
  );
}

export default Background;

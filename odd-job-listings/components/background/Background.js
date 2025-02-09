"use client";

import React from 'react'
import Chicken from './Chicken'

const Background = () => {
  const pageHeight = document.documentElement.scrollHeight;

  const chickens = Array.from({ length: 3 }).map((_, index) => ({
    id: index,
    randomY: Math.floor(Math.random() * (pageHeight-50)) + 50, // ✅ Randomize Y between 50px and 250px
    // randomY: 100
  }));

  console.log("chickens:", chickens);

  return (
    <div className="">
      {/* Render multiple chickens */}
      {chickens.map(({ id, randomY }) => (
        <Chicken key={id} randomY={randomY} />
      ))}
    </div>
  );
}

export default Background;

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// Tumbleweed SVG (Hand-drawn look)
const TumbleweedSVG = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="40" stroke="brown" strokeWidth="4" fill="transparent" />
    <path d="M30 50 Q50 20 70 50 Q50 80 30 50" stroke="brown" strokeWidth="2" fill="transparent" />
  </svg>
);

export default function Tumbleweed() {
  const tumbleweedRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, ease: "power1.inOut" });

    tl.to(tumbleweedRef.current, {
      x: "100vw", // Moves across the screen
      rotation: 360, // Rotates fully
      duration: 8,
      ease: "linear",
    })
      .to(tumbleweedRef.current, {
        y: "+=20", // Small bounce
        duration: 0.3,
        repeat: 5,
        yoyo: true,
        ease: "power1.inOut",
      }, "-=7"); // Overlaps with rolling motion

  }, []);

  return (
    <div ref={tumbleweedRef} className="absolute left-0 bottom-10">
      <TumbleweedSVG />
    </div>
  );
}

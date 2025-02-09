
"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

// 🎨 Define Chicken Animation Frames
const chickenRunFrames = ["/tumbleweed.png"];
// const chickenJumpFrame = "/chicken/jump.png"; // Special frame for jumping

export default function Tumbleweed( {randomY }) {
  const chickenRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [aRandomY, setRandomY] = useState(randomY);
  useEffect(() => {
    const chicken = chickenRef.current;
    const screenWidth = window.innerWidth;
    const pageHeight = document.documentElement.scrollHeight;
    const randomDelay = Math.random() * 3; // ✅ Random delay between 0-3 seconds

    

    // 🏃 Running Across the Screen
    // Create the timeline once when the component mounts
    const runTimeline = gsap.fromTo(
      chicken,
      { x: screenWidth + 100, rotate: 0 }, // Start off-screen on the right
      {
        x: -150,               // End off-screen on the left
        duration: Math.floor(Math.random() * (5)) + 5,
        ease: "linear",
        repeat: -1,            // Infinite looping
        // delay: randomDelay,    // Random delay
        onRepeat: () => {
          let rand = Math.floor(Math.random() * (pageHeight*6)) + 50
          setRandomY(rand);
          console.log("randomY", rand);
          gsap.set(chicken, { x: screenWidth + 100})
        }, // Reset to the right edge
      }
    );
    gsap.to(chicken, {
      rotate: -360, // Full spin
      duration: Math.floor(Math.random() * (5)) + 5, // Rotates every 2s
      repeat: -1,
      ease: "linear",
    });
    gsap.to(chicken, {
      y: "+=30", // Moves up by 20px
      duration: 1,
      yoyo: true, // Moves up and down
      repeat: -1,
      ease: "sine.inOut",
    });
   

    return () => {
      runTimeline.kill();
    };
  }, []); // Removed 'jumping' from dependencies so the effect runs only once

  return (
    <div ref={chickenRef} className="" 
      style={{
        position: "absolute",
        top: `${aRandomY}px`
      }}>
      <Image
        // If you want to show a different frame while jumping, you could conditionally render here.
        // For now, we're just cycling through the run frames.
        src={chickenRunFrames[currentFrame]}
        alt="Running Chicken"
        width={100}
        height={80}
        priority
        

      />
    </div>
  );
}
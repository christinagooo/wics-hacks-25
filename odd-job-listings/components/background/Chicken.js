
"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

// 🎨 Define Chicken Animation Frames
const chickenRunFrames = ["/chicken/chikn1.png", "/chicken/chikn2.png", "/chicken/chikn3.png"];
// const chickenJumpFrame = "/chicken/jump.png"; // Special frame for jumping

export default function RunningChicken( {randomY} ) {
  const chickenRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [jumping, setJumping] = useState(false);

  useEffect(() => {
    const chicken = chickenRef.current;
    const screenWidth = window.innerWidth;

    // 🏃 Running Across the Screen
    // Create the timeline once when the component mounts
    const runTimeline = gsap.fromTo(
      chicken,
      { x: screenWidth + 100 }, // Start off-screen on the right
      {
        x: -150,               // End off-screen on the left
        duration: 5,
        ease: "linear",
        repeat: -1,            // Infinite looping
        onRepeat: () => gsap.set(chicken, { x: screenWidth + 100 }), // Reset to the right edge
      }
    );

    // 🏃‍♂️ Frame Cycling (Switch Frames Every 100ms)
    const frameInterval = setInterval(() => {
      if (!jumping) {
        setCurrentFrame((prev) => (prev + 1) % chickenRunFrames.length);
      }
    }, 100);

    // 🎮 Handle Jumping with Arrow Key
    const handleKeyPress = (event) => {
      if (event.key === "ArrowUp" && !jumping) {
        setJumping(true);
        gsap.to(chicken, {
          y: "-50px",
          duration: 0.3,
          ease: "power1.out",
          yoyo: true,
          repeat: 1,
          overwrite: "none", // Prevent this tween from affecting the x tween
          onComplete: () => setJumping(false),
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(frameInterval);
      runTimeline.kill();
    };
  }, []); // Removed 'jumping' from dependencies so the effect runs only once

  return (
    <div ref={chickenRef} className="" style={{bottom: randomY}}>
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
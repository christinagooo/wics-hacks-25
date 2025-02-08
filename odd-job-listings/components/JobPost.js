"use client"; // Required for Next.js App Router

import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Button } from '@mui/material';

const JobPost = ({ title, reward, description }) => {
  const router = useRouter();

  return (
    <Card 
      sx={{
        width: 280,
        height: 360,
        border: "4px solid black",
        backgroundColor: "#f5deb3", // Old paper color
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Adds an aged look
        textAlign: "center",
        fontFamily: "serif",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.05)" },
      }}
      onClick={() => router.push(`/job-detail?title=${encodeURIComponent(title)}&reward=${encodeURIComponent(reward)}&description=${encodeURIComponent(description)}`)}
    >
      <CardContent>
        <Typography variant="h4" sx={{ color: "darkred", fontWeight: "bold", letterSpacing: 2 }}>
          WANTED
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic", mt: 1 }}>
          Reward: ${reward}
        </Typography>
        <Button variant="contained" color="error" sx={{ mt: 3 }}>
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobPost;

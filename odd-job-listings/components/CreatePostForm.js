"use client"; 

import { FormControl, FormLabel, TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreatePostForm = () => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [compensation, setCompensation] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handlePost = async (e) => {
    e.stopPropagation(); // prevent the card's onClick (if any) from firing
    setIsPosting(true);
    try {
      const res = await fetch('/api/add-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: 1, title: jobTitle, reward: compensation, description: jobDescription}),
      });
      if (res.ok) {
        alert('Job accepted!');
        // Optionally, refresh the page or remove the job from local state
        // e.g., router.refresh() if using Next.js 13 App Router.
      } else {
        const data = await res.json();
        alert('Error accepting job: ' + data.error);
      }
    } catch (error) {
      console.log("catch error")
      console.error(error);
      alert(error.message);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1>CreatePost</h1>
      <Box
        sx={{
          // display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          padding: 8,
        }}
      >
        <FormControl fullWidth>
          <FormLabel>Job title</FormLabel>
          <TextField
            placeholder="IKEA furniture builder"
            autoFocus
            required
            onChange={(e) => setJobTitle(e.target.value)}  
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Compensation</FormLabel>
          <TextField
            placeholder="$10/hr"
            autoFocus
            required
            onChange={(e) => setCompensation(e.target.value)}  
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Job description</FormLabel>
          <TextField
            placeholder="I need a guy who can build me some cabinets"
            autoFocus
            required
            onChange={(e) => setJobDescription(e.target.value)}  
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Image</FormLabel>
          <TextField
            placeholder="an-image-url.com"
            autoFocus
            required
            onChange={(e) => setImageUrl(e.target.value)}  
          />
        </FormControl>
        
        {imageUrl ? (
          <img src={imageUrl} 
            alt="Dynamic Image" 
            className="w-32 h-32" />
        ) : (
          <p>No image available</p>
        )}

        <Button 
            type = "submit"
            variant="contained" 
            sx={{ 
              marginTop: 2, 
              padding: 1, 
              backgroundColor: "#697268",
              color: "#fff", 
              fontWeight: "bold",
              fontFamily: "DM Sans",
              marginBottom: 2
            }}
            onClick={handlePost} // TODO: create post
          >
            Create Post
          </Button>
      </Box>
    </div>
  );
};

export default CreatePostForm;

/*
"use client"; // JobPost is a client component

import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useState } from 'react';

const JobPost = ({ id, title, reward, description }) => {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = async (e) => {
    e.stopPropagation(); // prevent the card's onClick (if any) from firing
    setIsAccepting(true);
    try {
      const res = await fetch('/api/accept-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId: id }),
      });
      if (res.ok) {
        alert('Job accepted and removed!');
        // Optionally, refresh the page or remove the job from local state
        // e.g., router.refresh() if using Next.js 13 App Router.
      } else {
        const data = await res.json();
        alert('Error accepting job: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsAccepting(false);
    }
  };

  return (
    <Card
      sx={{
        width: 280,
        height: 360,
        border: "4px solid black",
        backgroundColor: "#f5deb3",
        boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)",
        textAlign: "center",
        fontFamily: "serif",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "scale(1.05)" },
      }}
      onClick={() =>
        router.push(
          `/job-detail?title=${encodeURIComponent(title)}&reward=${encodeURIComponent(reward)}&description=${encodeURIComponent(description)}`
        )
      }
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
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleAccept}
          disabled={isAccepting}
        >
          {isAccepting ? "Accepting..." : "Accept"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobPost;*/

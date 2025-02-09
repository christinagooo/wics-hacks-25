"use client";
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, CardMedia, Chip } from '@mui/material';
import { useRouter } from 'next/navigation';

const JobPostDetails = ({
  id,
  title,
  reward,
  description,
  imageUrl,
  hirer,
  skillset,
  city,
  isAccepting,
  setIsAccepting,
  isAccepted,
  setIsAccepted
}) => {
  const router = useRouter();

  // Helper function that returns a specific color based on the skillset category
  const getChipColor = (category) => {
    switch (category.toLowerCase()) {
      case 'art':
        return '#FFB6C1'; // Light Pink
      case 'coding':
        return '#87CEFA'; // Light Blue
      case 'music':
        return '#FFD700'; // Gold
      case 'cooking':
        return '#FFA07A'; // Light Salmon
      case 'hunting':
        return '#836953'; // pastel brown
      // Add more cases as needed for other categories
      default:
        return '#888888'; // Default Gray
    }
  };

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
        // Refresh the page to update the list after accepting the job
        setIsAccepted(true);
        alert('You\'ve successfully accepted this job!');
        router.refresh();
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
    <>
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white shadow-lg p-6 rounded-lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 280*1.85,
          height: 360*1.85,
          border: '4px solid black',
          // A fallback background color in case the image fails to load:
          backgroundColor: '#f5deb3',
          // Paper texture background image:
          backgroundImage: `url("https://lh5.googleusercontent.com/proxy/qGNdaFF6IZyw7tmekZuzCPixFa1VntC_0O8jklVahcxIC1vb5PZgy6dmXuMyN2mQ_2NUhM6BZNtNA20F6SfispoivKpkxrReGcCPnnezeodN542dH_1WMV5srF_NEayj1IdTPWt0")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
        }}
      
      >
        <Card className="shadow-md"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            src={imageUrl}
            alt={title}
            sx={{
              height: "50%", // Adjust image size dynamically
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            {/* Job Title */}
            <Typography id="job-title" variant="h5" className="font-bold text-gray-900" sx={{
              fontFamily: "Courier New, monospace",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#ff7a5c",
              textAlign: "left",
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}>
              {title}
            </Typography>

            {/* Job Description */}
            <Typography variant="body2" className="mt-2 text-gray-700" sx={{
              fontFamily: "Courier New, monospace",
              fontSize: "1rem",
              color: "black",
              textAlign: "left",
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}>
              {description}
            </Typography>

            {/* Compensation */}
            <Typography variant="body2" className="mt-3 font-semibold text-blue-500" sx={{
              fontFamily: "Courier New, monospace",
              fontSize: "1.2rem",
              color: "black",
              mt: 2,
              textAlign: "left",
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}>
              ${reward}
            </Typography>

            {/* Skillset */}
            <Typography variant="body2" className="mt-3 font-semibold text-blue-500" sx={{
              fontFamily: "Courier New, monospace",
              fontSize: ".8rem",
              color: "black",
              mt: 1,
              textAlign: "left",
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}>
              📋 {skillset}
            </Typography>

            {/* City */}
            <Typography variant="body2" className="mt-3 font-semibold text-blue-500" sx={{
              fontFamily: "Courier New, monospace",
              fontSize: ".8rem",
              color: "black",
              mt: 1,
              textAlign: "left",
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}>
              📍 {city}
            </Typography>

            {/* Hirer */}
            <Typography variant="body2" className="mt-3 font-semibold text-blue-500" sx={{
              fontFamily: "Courier New, monospace",
              fontSize: ".8rem",
              color: "black",
              mt: 1,
              textAlign: "left",
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}>
              🤠 {hirer}
            </Typography>

          {/* Accept Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ 
              mt: 2,
              borderRadius: "50px", // ✅ Makes the button rounder
              fontFamily: "Courier New, monospace", // ✅ Custom font
              fontSize: "1.2rem", // ✅ Larger font
              backgroundColor: "#ff7a5c", // ✅ Custom color (orange-red)
              color: "white", // ✅ Text color
              padding: "10px 20px", // ✅ Adjust padding
              "&:hover": {
                backgroundColor: "#FF5733", // ✅ Custom color (orange-red)
              },
              transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}
            onClick={handleAccept}
            disabled={isAccepting || isAccepted}  // Use logical OR for proper boolean evaluation
          >
            {isAccepting ? "Accepting..." : isAccepted ? "Accepted" : "Accept"}
          </Button>
        </CardContent>
      </Card>
    </Box>
    </>
  );
};

export default JobPostDetails;

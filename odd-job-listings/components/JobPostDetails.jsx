"use client";
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, Chip } from '@mui/material';
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
        
        >
          <CardContent>
            <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
          </CardContent>
          <CardContent>
            {/* Job Title */}
            <Typography id="job-title" variant="h5" className="font-bold text-gray-900">
              {title}
            </Typography>

          {/* Job Description */}
          <Typography variant="body2" className="mt-2 text-gray-700">
            {description}
          </Typography>

          {/* Reward */}
          <Typography variant="body2" className="mt-3 font-semibold text-blue-500">
            💰 Reward: ${reward}
          </Typography>

          {/* Accept Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAccept}
            disabled={isAccepting || isAccepted}  // Use logical OR for proper boolean evaluation
          >
            {isAccepting ? "Accepting..." : isAccepted ? "Accepted" : "Accept"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobPostDetails;

"use client"
import {React, useState} from 'react'
import { Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material'

const JobPostDetails = ({id, title, reward, description, imageUrl, isAccepting, setIsAccepting, isAccepted, setIsAccepted}) => {
  // const [isAccepting, setIsAccepting] = useState(false);
  // const [isAccepted, setIsAccepted] = useState(false);

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
      setIsAccepted(true);
    }
  };


  return (
    <>
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white shadow-lg p-6 rounded-lg"
      >
        <Card className="shadow-md">
          {/* Job Image */}
          {/* <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={title}
            className="object-cover"
          /> */}
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

            {/* Compensation */}
            <Typography variant="body2" className="mt-3 font-semibold text-blue-500">
              💰 Reward: ${reward}
            </Typography>

            {/* Close Button
            <Button onClick={onClose} variant="contained" className="mt-4 bg-blue-600 hover:bg-blue-700">
              Close
            </Button> */}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleAccept}
            disabled={isAccepting | isAccepted }
          >
              {isAccepting ? "Accepting..." : (isAccepted ? "Accepted" : "Accept")}
          </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}

export default JobPostDetails
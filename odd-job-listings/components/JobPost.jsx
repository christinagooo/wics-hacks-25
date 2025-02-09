"use client"; // JobPost is a client component

import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Button, Modal } from '@mui/material';
import { useState } from 'react';
import JobPostDetails from './JobPostDetails';

const JobPost = ({ id, title, reward, description, imageUrl }) => {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  const [openCardModal, setOpenCardModal] = useState(false);

  // const handleOpenCardModal = () => setOpenCardModal(true);
  // const handleCloseCardModal = () => setOpenCardModal(false);

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
        setOpenCardModal(true)
        // router.push(
        //   `/job-detail?title=${encodeURIComponent(title)}&reward=${encodeURIComponent(reward)}&description=${encodeURIComponent(description)}`
        // )
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
          disabled={isAccepting | isAccepted }
        >
          {isAccepting ? "Accepting..." : (isAccepted ? "Accepted" : "Accept")}
        </Button>
      </CardContent>
    </Card>
    <Modal
      open={openCardModal}
      onClose={() => setOpenCardModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <JobPostDetails
        id={id}
        title={title}
        reward={reward}
        description={description}
        imageUrl={imageUrl}
        isAccepting={isAccepting}
        setIsAccepting={setIsAccepting}
        isAccepted={isAccepted}
        setIsAccepted={setIsAccepted}
        // handleAccept={handleAccept}
      />
    </Modal>
  </>

  );
};

export default JobPost;

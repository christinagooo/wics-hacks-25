"use client"; // JobPost is a client component

import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Button, Modal } from '@mui/material';
import { useState } from 'react';
import JobPostDetails from './JobPostDetails';

// In your JobPost component or a global layout file
import { Smokum } from 'next/font/google';

const smokum = Smokum({
  weight: '400',
  subsets: ['latin'],
});


const JobPost = ({ id, title, reward, description, imageUrl, hirer, skillset, city }) => {
  const router = useRouter();
  const [isAccepting, setIsAccepting] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [openCardModal, setOpenCardModal] = useState(false);

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
      <Card
        className={smokum.className}
        sx={{
          width: 280,
          height: 360,
          border: '1px solid black',
          // A fallback background color in case the image fails to load:
          backgroundColor: '#f5deb3',
          // Paper texture background image:
          // backgroundImage: `url("https://lh5.googleusercontent.com/proxy/qGNdaFF6IZyw7tmekZuzCPixFa1VntC_0O8jklVahcxIC1vb5PZgy6dmXuMyN2mQ_2NUhM6BZNtNA20F6SfispoivKpkxrReGcCPnnezeodN542dH_1WMV5srF_NEayj1IdTPWt0")`,
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'scale(1.05)' },
          opacity: isAccepted ? 0.5 : 1,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpenCardModal(true)}
      >
      <img 
        src={`/frames/frame${id.charCodeAt(0) % 3 + 1}.png`}
        width={280*.97}
        height={360*.97}
        style={{
          position: 'absolute',
        }}
      />
       <CardContent
          sx={{
            position: 'relative',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          
          {/* <Typography
              variant="h4"
              sx={{ color: 'darkred', fontWeight: 'bold', letterSpacing: 2, fontFamily: smokum.style.fontFamily, }}
            >
            WANTED
          </Typography> */}
        <Typography variant="h5" sx={{ fontWeight: "bold", mt: `${360-120}px` }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic", mt: '3px'}}>
          Reward: ${reward}
        </Typography>
        {/* <Button variant="contained" color="error" sx={{ mt: 3 }}>
          View Details
        </Button> */}

        <Button
          variant="contained"
          // color="primary"
          onClick={handleAccept}
          sx={{
            mt: 2,
            position: "absolute",
            // bottom: "10px",
            opacity: hovered ? 1 : 0, // Start hidden
            // visibility: hovered ? "visible" : "hidden", // ✅ Prevents interaction when hidden
            transform: hovered ? "translateY(0)" : "translateY(10px)", // ✅ Move up when appearing
            transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out, visibility 0.3s", // ✅ Smooth transition
          }}
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
        hirer={hirer}
        skillset={skillset}
        city={city}
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

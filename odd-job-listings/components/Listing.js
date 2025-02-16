/**
 * list of jobs you listed or that you booked
 */

"use client"; // Required for Next.js App Router

import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { PostType } from '@/lib/enum';

const Listing = ({ id, title, reward, buttonType }) => {
  const router = useRouter();

  const handleDone = async (id) => {
    return;
  };

  const handleCancel = async (id) => {};

  const renderButton = () => {
    // console.log("buttonType in switch is", buttonType, "type is", typeof buttonType);
    switch (buttonType.buttonType) {
      case 2:
        // console.log("active-hirer");
        return (
          <Button variant="outlined" color="primary" onClick={handleDone}>
            Done
          </Button>
        );
      case 3:
        return (
          <Button variant="contained" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        );
      case 1:
        return null; // No button for active hiree

      default:
        console.log("Invalid buttonType", buttonType);
        return null;
    }
  };

 

  return (
    <div className="w-full flex justify-center p-4">
      <Card className="w-full max-w-screen-lg shadow-lg">
        {/* {imageUrl && (
          <CardMedia component="img" height="250" image={imageUrl} alt={title} />
        )} */}
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            hello
          </Typography>
          
          {renderButton()}
        </CardContent>
      </Card>
    </div>
  );
  //   <Card 
  //     sx={{
  //       width: "100%",
  //       height: 100,
  //       border: "4px solid black",
  //       backgroundColor: "#f5deb3", // Old paper color
  //       boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.3)", // Adds an aged look
  //       textAlign: "center",
  //       fontFamily: "serif",
  //       cursor: "pointer",
  //       transition: "transform 0.2s ease-in-out",
  //       "&:hover": { transform: "scale(1.05)" },
  //     }}
  //     // onClick={() => router.push(`/job-detail?title=${encodeURIComponent(title)}&reward=${encodeURIComponent(reward)}&description=${encodeURIComponent(description)}`)}
  //   >
  //     <CardContent>
  //       <Typography variant="h4" sx={{ color: "darkred", fontWeight: "bold", letterSpacing: 2 }}>
  //         WANTED
  //       </Typography>
  //       <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
  //         {title}
  //       </Typography>
  //       <Typography variant="body1" sx={{ fontStyle: "italic", mt: 1 }}>
  //         Reward: ${reward}
  //       </Typography>
  //       <Button variant="contained" color="error" sx={{ mt: 3 }}>
  //         Done
  //       </Button>
  //     </CardContent>
  //   </Card>
  // // );
};

export default Listing;

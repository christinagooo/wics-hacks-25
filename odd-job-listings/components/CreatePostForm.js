"use client"; 

import { 
  FormControl, 
  FormLabel, 
  TextField, 
  Box, 
  Button, 
  Select, 
  MenuItem 
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
// Import the USERNAME constant to auto-populate the hirer field
import { USERNAME } from "@/data/user";  // Adjust the import path as needed

const CreatePostForm = () => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [compensation, setCompensation] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  // New state fields:
  const [skillset, setSkillset] = useState("");
  const [city, setCity] = useState("");

  const handlePost = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsPosting(true);
    try {
      const res = await fetch('/api/add-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobId: crypto.randomUUID(), 
          title: jobTitle, 
          reward: compensation, 
          description: jobDescription, 
          imageUrl: imageUrl,
          hirer: USERNAME,   // Auto-populated hirer
          skillset: skillset, 
          city: city 
        }),
      });
      if (res.ok) {
        // Redirect to the home page after successful post.
        router.push('/');
      } else {
        const data = await res.json();
        alert('Error posting job: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsPosting(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1>Create Post</h1>
      <Box
        component="form"
        onSubmit={handlePost}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <FormControl fullWidth>
          <FormLabel>Job Title</FormLabel>
          <TextField
            placeholder="IKEA furniture builder"
            required
            onChange={(e) => setJobTitle(e.target.value)}  
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Compensation</FormLabel>
          <TextField
            placeholder="$10"
            required
            onChange={(e) => setCompensation(e.target.value)}  
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Job Description</FormLabel>
          <TextField
            placeholder="I need a guy who can build me some cabinets"
            required
            onChange={(e) => setJobDescription(e.target.value)}  
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Image URL</FormLabel>
          <TextField
            placeholder="an-image-url.com"
            required
            onChange={(e) => setImageUrl(e.target.value)}  
          />
        </FormControl>

        {/* New: Skillset Dropdown */}
        <FormControl fullWidth>
          <FormLabel>Skillset</FormLabel>
          <Select
            value={skillset}
            onChange={(e) => setSkillset(e.target.value)}
            displayEmpty
            required
          >
            <MenuItem value=""><em>Select a category</em></MenuItem>
            <MenuItem value="art">Art</MenuItem>
            <MenuItem value="coding">Coding</MenuItem>
            <MenuItem value="music">Music</MenuItem>
            <MenuItem value="cooking">Cooking</MenuItem>
            <MenuItem value="hunting">Hunting</MenuItem>
          </Select>
        </FormControl>

        {/* New: City TextField */}
        <FormControl fullWidth>
          <FormLabel>City</FormLabel>
          <TextField
            placeholder="City"
            required
            onChange={(e) => setCity(e.target.value)}  
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
          type="submit"
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
          disabled={isPosting}
        >
          Create Post
        </Button>
      </Box>
    </div>
  );
};

export default CreatePostForm;

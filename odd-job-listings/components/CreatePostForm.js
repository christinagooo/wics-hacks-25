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
import { Typography } from "@mui/material";
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
        alert('Job accepted!');
        // Optionally, refresh the page or remove the job from local state
        // e.g., router.refresh() if using Next.js 13 App Router.
        router.push('/')
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
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      {/* Form Card */}
      <Box
        component="form"
        onSubmit={handlePost}
        sx={{
          maxWidth: 500,
          width: "100%",
          backgroundColor: "#fff",
          padding: 6,
          borderRadius: 3,
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <h1
          style={{
            fontFamily: "Courier New, monospace",
            color: "#ff7a5c",
            fontWeight: "bold",
            fontSize: "2rem",
            marginBottom: "10px",
          }}
        >
          Yeehire someone
        </h1>

        {/* Job Title */}
        <FormControl fullWidth>
          <FormLabel sx={{ fontWeight: "bold", fontFamily: "Courier New, monospace",
            color: "#ff7a5c", mb: 1 }}>Job title</FormLabel>
          <TextField
            placeholder="IKEA furniture builder"
            variant="outlined"
            required
            onChange={(e) => setJobTitle(e.target.value)}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
        </FormControl>

        {/* Compensation */}
        <FormControl fullWidth>
          <FormLabel sx={{ fontWeight: "bold", fontFamily: "Courier New, monospace",
            color: "#ff7a5c", mb: 1 }}>Compensation</FormLabel>
          <TextField
            placeholder="$10/hr"
            variant="outlined"
            required
            onChange={(e) => setCompensation(e.target.value)}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
        </FormControl>

        {/* Job Description */}
        <FormControl fullWidth>
          <FormLabel sx={{ fontWeight: "bold", fontFamily: "Courier New, monospace",
            color: "#ff7a5c", mb: 1 }}>Job description</FormLabel>
          <TextField
            placeholder="I need a guy who can build me some cabinets"
            variant="outlined"
            multiline
            rows={3}
            required
            onChange={(e) => setJobDescription(e.target.value)}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
        </FormControl>

        {/* Image URL */}
        <FormControl fullWidth>
          <FormLabel sx={{ fontWeight: "bold", fontFamily: "Courier New, monospace",
            color: "#ff7a5c", mb: 1 }}>Image</FormLabel>
          <TextField
            placeholder="an-image-url.com"
            variant="outlined"
            required
            onChange={(e) => setImageUrl(e.target.value)}
            sx={{ backgroundColor: "#f9f9f9", borderRadius: 1 }}
          />
        </FormControl>

        {/* New: Skillset Dropdown */}
        <FormControl fullWidth>
          <FormLabel sx={{ 
            fontWeight: "bold", 
            fontFamily: "Courier New, monospace",
            color: "#ff7a5c",
            mb: 1,
            "&.Mui-focused": { color: "#ff7a5c" },
          }}>Skillset</FormLabel>
          <Select
            value={skillset}
            onChange={(e) => setSkillset(e.target.value)}
            sx={{
              "& .MuiSelect-select": {color: "#ff7a5c", fontStyle: "normal"},
            }}
            displayEmpty
            required
          >
            <MenuItem value="" sx={{backgroundColor: "#f9f9f9", color: "#ff7a5c"}}>Select a category</MenuItem>
            <MenuItem value="mechanics">Art</MenuItem>
            <MenuItem value="cleaning">Coding</MenuItem>
            <MenuItem value="animals">Music</MenuItem>
            <MenuItem value="art">Cooking</MenuItem>
            <MenuItem value="hunting">Hunting</MenuItem>
          </Select>
        </FormControl>

        {/* New: City TextField */}
        <FormControl fullWidth>
        <FormLabel sx={{ fontWeight: "bold", fontFamily: "Courier New, monospace",
            color: "#ff7a5c", mb: 1 }}>City</FormLabel>
          <TextField
            placeholder="City"
            required
            onChange={(e) => setCity(e.target.value)}  
            sx={{ backgroundColor: "#f9f9f9"}}
          />
        </FormControl>

        {/* Image Preview */}
        {imageUrl ? (
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src={imageUrl}
              alt="Job Preview"
              className="w-full h-full object-cover"
            />
          </Box>
        ) : (
          <Typography variant="body2" sx={{ color: "#777" }}>
            No image available
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            marginTop: 2,
            padding: "12px 24px",
            backgroundColor: "#FF5733",
            color: "#fff",
            fontWeight: "bold",
            textTransform: "uppercase",
            borderRadius: 2,
            transition: "0.3s",
            "&:hover": {
              backgroundColor: "#E64A19",
              transform: "scale(1.05)",
            },
            
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

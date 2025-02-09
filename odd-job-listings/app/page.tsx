"use client";

import JobPost from '@/components/JobPost';
import { Container, Grid, Typography } from '@mui/material';
import { getJobsFromGoogleSheet } from '@/lib/sheets';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

// Define the Job type
type Job = {
  id: string;
  title: string;
  reward: string; // or number, depending on your implementation
  description: string;
  imageurl: string;
  hirer: string;
  skillset: string;
  city: string;
};

export default function Home() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  // Poll for changes every second
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const freshJobs = await getJobsFromGoogleSheet();
        setJobs(freshJobs);
      } catch (err) {
        console.error(err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* <h1>hello</h1> */}
    
    <Container sx={{ paddingY: 8 }}>
      {/* <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: 4, textAlign: 'center' }}
      >
        Western West Job Board
      </Typography> */}
      {/* <img
        src="/yeehire.png"
        alt="Yeehire"
        width="200px"
      /> */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src="/yeehire.png"
          alt="Yeehire"
          style={{ width: "400px", height: "auto", marginBottom: "10px" }} // ✅ Increase size & keep aspect ratio
        />
      </div>


      <Grid container spacing={2} justifyContent="center">
        {jobs.map((job) => (
          <Grid item key={job.id || job.title} xs={12} sm={6} md={5} lg={4}>
            <JobPost
              id={job.id}
              title={job.title}
              reward={Number(job.reward)}
              description={job.description}
              imageUrl={job.imageurl}
              hirer={job.hirer}
              skillset={job.skillset}
              city={job.city}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
      <div>
        {/* <Background /> */}
      </div>
    
    </div>
  );
}

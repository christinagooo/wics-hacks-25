// app/page.tsx
import JobPost from '@/components/JobPost';
import { Container, Grid, Typography } from '@mui/material';
import { getJobsFromGoogleSheet } from '@/lib/sheets';

export default async function Home() {
  // Fetch jobs from the Google Sheet
  const jobs = await getJobsFromGoogleSheet();

  return (
    <Container sx={{ paddingY: 8 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginBottom: 4, textAlign: 'center' }}
      >
        Western West Job Board
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {jobs.map((job) => (
          <Grid item key={job.id || job.title} xs={12} sm={6} md={4} lg={3}>
            <JobPost
              title={job.title}
              reward={Number(job.reward)} // Convert reward to a number if needed
              description={job.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// I am a hirer for these jobs that have not yet been hired for

"use client"; // Required for Next.js App Router

import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Listings from '@/components/Listings';

const PendingJobsHirer = () => {
  return (
    <div>
      <div>PendingJobsHirer</div>
      <Listings />
    </div>
  )
}

export default PendingJobsHirer
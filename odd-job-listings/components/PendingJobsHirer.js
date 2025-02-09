// I am a hirer for these jobs that have not yet been hired for

"use client"; // Required for Next.js App Router

import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Listings from '@/components/Listings';
import { PostType } from '@/lib/enum';

const PendingJobsHirer = () => {
  return (
    <div>
      <div>PendingJobsHirer</div>
      <Listings buttonType={3}/>
    </div>
  )
}

export default PendingJobsHirer
// I am a hirer for these ongoing jobs

"use client"; // Required for Next.js App Router

import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import Listings from '@/components/Listings';

const ActiveJobsHirer = () => {
  return (
    <div>
      <div>ActiveJobsHirer</div>
      <Listings />
    </div>
  )
}

export default ActiveJobsHirer
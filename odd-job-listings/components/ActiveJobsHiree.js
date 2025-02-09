// I am a hiree for these ongoing jobs

"use client"; // Required for Next.js App Router

import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

import { jobs } from '@/data/jobs';
import Listing from '@/components/Listing';
import { PostType } from '@/lib/enum';
import Listings from '@/components/Listings';

const ActiveJobsHiree = () => {
  return (
    <div className="flex flex-col">
      <div>ActiveJobsHiree</div>
      <Listings buttonType={1}/>
    </div>
    
  )
}

export default ActiveJobsHiree
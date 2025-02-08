"use client"; // Required for Next.js App Router

import { useRouter } from 'next/navigation';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

import { jobs } from '@/data/jobs';
import Listing from '@/components/Listing';

const Listings = () => {
  return (
    <div>
      <div className="w-full">
          {jobs.map(job => (
            <Listing key={job.id} title={job.title} reward={job.reward} />
          ))}
      </div>
    </div>
    
  )
}

export default Listings


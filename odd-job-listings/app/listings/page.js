"use client"; // Needed because we are using useSearchParams()

import { useSearchParams } from 'next/navigation';
import PendingJobsHirer from '../../components/PendingJobsHirer';
import ActiveJobsHiree from '../../components/ActiveJobsHiree';
import ActiveJobsHirer from '../../components/ActiveJobsHirer';

const Listings = () => {

  return (
    <div className="w-full bg-[#f7e395] items-center p-8">
      <ActiveJobsHiree />
      <ActiveJobsHirer />
      <PendingJobsHirer />
      
      
    </div>
  );

};

export default Listings;

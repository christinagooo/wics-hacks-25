"use client"; // Needed because we are using useSearchParams()

import { useSearchParams } from 'next/navigation';
import PendingJobsHirer from '../../components/PendingJobsHirer';
import ActiveJobsHiree from '../../components/ActiveJobsHiree';
import ActiveJobsHirer from '../../components/ActiveJobsHirer';
import { useState, useEffect  } from 'react';
import { USERNAME } from '../../data/user'

const Listings = () => {

  const [activeJobsHiree, setActiveJobsHiree] = useState(null);

  useEffect(() => {
    async function fetchActiveJobsHiree() {
      const response = await fetch(`/api/get-active-hiree?username=${USERNAME}`);
      console.log("result of fetch:", response);
      const data = await response.json();
      console.log("result of fetch, jsonified:", data);
      setActiveJobsHiree(data);
    }
    fetchActiveJobsHiree();
  }, []);
  
  // const activeJobsHiree = 
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ username: USERNAME}),
  // });

  console.log(activeJobsHiree);

  // const activeJobsHirer = await fetch('/api/get-active-hirer', {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ username: USERNAME}),
  // });

  // const pendingJobsHirer = await fetch('/api/get-pending-hirer', {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ username: USERNAME}),
  // });


  return (
    <div className="w-full bg-[#f7e395] items-center p-8">
      <ActiveJobsHiree />
      <ActiveJobsHirer />
      <PendingJobsHirer />
    </div>
  );

};

export default Listings;

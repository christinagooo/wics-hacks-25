import JobPost from '@/components/JobPost';

export default function Home() {
  const jobs = [
    { id: 1, title: "Lost Horse", reward: 500 },
    { id: 2, title: "Gold Miner Needed", reward: 750 },
    { id: 3, title: "Sheriff Assistant", reward: 1000 },
    { id: 4, title: "Bandit Bounty", reward: 2000 },
  ];

  return (
    <div className="min-h-screen bg-[#f3e5ab] flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">Western West Job Board</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map(job => (
          <JobPost key={job.id} title={job.title} reward={job.reward} />
        ))}
      </div>
    </div>
  );
}

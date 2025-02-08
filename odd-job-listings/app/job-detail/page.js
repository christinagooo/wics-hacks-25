"use client"; // Needed because we are using useSearchParams()

import { useSearchParams } from 'next/navigation';

const JobDetail = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Unknown Job";
  const reward = searchParams.get("reward") || "0";
  const description = searchParams.get("description") || "No details available.";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h2 className="text-3xl font-bold text-red-700 tracking-widest">WANTED</h2>
      <p className="text-xl font-bold">{title}</p>
      <p className="text-lg italic">Reward: ${reward}</p>
      <p className="text-sm mt-2">{description}</p>
      <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md" onClick={() => window.history.back()}>
        Back
      </button>
    </div>
  );
};

export default JobDetail;

import JobPost from '@/components/JobPost';
import { jobs } from '../data/jobs';
export default function Home() {
  

  return (
    <div className="bg-[#f3e5ab] flex flex-col items-center p-8">
      <h1 className="text-4xl font-bold mb-8 text-black">Western West Job Board</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {jobs.map(job => (
          <JobPost key={job.id} title={job.title} reward={job.reward} />
        ))}
      </div>
    </div>
  );
}

import React from 'react'
import { useEffect, useState } from 'react';
import JobListings from './JobListings';
import Spinner from './Spinner';

const JobListing = ({ isHome = false }) => {

  const [jobs, setjobs] = useState([]);
  const [loading, setloading] = useState(true);


  useEffect(() => {
    const fetchjobs = async () => {
      const ApiUrl = isHome ? 
      '/api/jobs/?_limit=3'
      :'/api/jobs';
      try {
        const res = await fetch(  ApiUrl);
        const data = await res.json();
        setjobs(data);
      } catch (error) {
        console.log('Error Fetching data', error);
      }
      finally { 
        setloading(false);
      }
    }
    fetchjobs();
  }
    , [])

  return (
    <section class="bg-blue-50 px-4 py-10">
      <div class="container-xl lg:container m-auto">
        <h2 class="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        <>{loading ? (<Spinner loading={loading}/>) :
          (<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListings key={job.id} job={job} ></JobListings>
            ))}
          </div>)}</>
      </div>
    </section>

  )
}

export default JobListing
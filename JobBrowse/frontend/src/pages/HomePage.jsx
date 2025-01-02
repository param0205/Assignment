import React from 'react';
import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import JobListing from '../components/JobListing';
import ViewAll from '../components/ViewAll';

const HomePage = () => {
  return (
     <>
     <Hero title={'React developer'} subtitle={'Start Learning'}></Hero>
      <HomeCards/>
      <JobListing isHome={true}/>
      <ViewAll></ViewAll>
     </>
  )
}

export default HomePage
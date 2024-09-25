import React from 'react'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobPages from './pages/JobPages';
import Notfound from './pages/Notfound';
import SingleJobPage, { jobLoader } from './pages/SingleJobPage';
import AddjobPage from './pages/AddjobPage';
import EditjobPage from './pages/EditjobPage';




const App = () => {


  // add job
  const addJob = async (newJob) => {
    // console.log("Hello");
    // console.log(newJob);
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'applicatin/json'
      },
      body: JSON.stringify(newJob),
    });
    return;
  }


  // delete job

  const deletejob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
    console.log("delete", id);
  }


  // Update JOb 
  const updateJob = async (job) => {

    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job),
    });
    return;


  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/jobs' element={< JobPages />} />
        <Route path='/add-job' element={< AddjobPage addJobSubmit={addJob} />} />
        <Route path='/edit-job/:id' element={< EditjobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
        <Route path='/jobs/:id' element={< SingleJobPage deletejob={deletejob} />} loader={jobLoader} />
        <Route path='/Linkdd-job' element={< Notfound />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />

};

export default App
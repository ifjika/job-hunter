import React, { useState, useEffect } from "react";
import axios from "axios";

const JobRecommendation = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/recommendations"
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching job recommendations", error);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div>
      <h2>Job Recommendations</h2>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {jobs.title} - {job.company}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobRecommendation;

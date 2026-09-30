import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const SavedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.get("/saved-jobs")
      .then((response) => {
        if (active) setJobs(response.data.savedJobs || []);
      })
      .catch((requestError) => {
        if (active) {
          setError(
            requestError.response?.data?.message ||
              "Saved jobs could not be loaded. Please try again."
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="saved-jobs-page">
      <style>{`
        .saved-jobs-page {
          min-height: 100svh;
          padding: 48px 24px;
          background: #f5f4ec;
        }
        .saved-jobs-inner {
          width: min(100%, 960px);
          margin: 0 auto;
        }
        .saved-jobs-header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }
        .saved-jobs-header h1 {
          margin: 0;
          font-size: 38px;
        }
        .saved-jobs-header p,
        .saved-job p {
          color: #69736d;
        }
        .saved-jobs-back {
          color: #a63d29;
          font-weight: 700;
          white-space: nowrap;
        }
        .saved-jobs-list {
          display: grid;
          gap: 10px;
        }
        .saved-job {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 20px;
          border: 1px solid #d9ded5;
          border-radius: 4px;
          background: #fffefa;
        }
        .saved-job h2 {
          margin: 0 0 5px;
          font-size: 20px;
        }
        .saved-job p { margin: 3px 0; }
        .saved-job-link {
          color: #a63d29;
          font-weight: 700;
          white-space: nowrap;
        }
        .saved-jobs-message {
          padding: 22px;
          border: 1px solid #d9ded5;
          background: #fffefa;
        }
        .saved-jobs-loading {
          display: flex;
          justify-content: center;
          padding: 28px;
          border: 1px solid #d9ded5;
          background: #fffefa;
        }
        @media (max-width: 600px) {
          .saved-jobs-page { padding: 30px 16px; }
          .saved-jobs-header { align-items: flex-start; flex-direction: column; }
          .saved-jobs-header h1 { font-size: 31px; }
          .saved-job { align-items: flex-start; flex-direction: column; gap: 12px; }
        }
      `}</style>
      <div className="saved-jobs-inner">
        <header className="saved-jobs-header">
          <div>
            <h1>My Saved Jobs</h1>
            <p>Roles you have bookmarked for later.</p>
          </div>
          <Link className="saved-jobs-back" to="/candidate-dashboard">
            Browse jobs
          </Link>
        </header>

        {loading && (
          <div className="saved-jobs-loading">
            <LoadingSpinner label="Loading saved jobs" />
          </div>
        )}
        {!loading && error && <p className="saved-jobs-message">{error}</p>}
        {!loading && !error && jobs.length === 0 && (
          <p className="saved-jobs-message">You have not saved any jobs yet.</p>
        )}
        {!loading && !error && jobs.length > 0 && (
          <div className="saved-jobs-list">
            {jobs.map((item) => item.job && (
              <article className="saved-job" key={item._id}>
                <div>
                  <h2>{item.job.title}</h2>
                  <p>{item.job.company}</p>
                  <p>{item.job.location}</p>
                </div>
                <Link className="saved-job-link" to={`/jobs/${item.job._id}`}>
                  View role
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default SavedJobs;
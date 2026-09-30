
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

const CreateJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    discription: "",
    location: "",
    salary: "",
    skills: "",
    jobType: "Full Time",
    experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

      const response = await api.post("/jobs", {
        title: formData.title,
        company: formData.company,
        discription: formData.discription,
        location: formData.location,
        salary: formData.salary,
        skills: skillsArray,
        jobType: formData.jobType,
        experience: formData.experience,
      });

      if (response.data.success) {
        setSuccess("Job created successfully!");

        setTimeout(() => {
          navigate("/recruiter-dashboard");
        }, 1000);
      }
    } catch (error) {
      console.error("CREATE JOB ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to create job."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        .create-job-page {
          min-height: 100vh;
          background: #DFE9DF;
          padding-bottom: 50px;
        }

        /* Navbar */

        .create-job-navbar {
          height: 70px;
          background: #FFFEFA;
          border-bottom: 1px solid #DFE3DC;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 7%;
        }

        .create-job-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #D75B3E;
        }

        .create-job-brand-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #D75B3E 0%, #202824 100%);
          color: #FFFEFA;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 16px;
          box-shadow: 0 8px 18px rgba(215, 91, 62, 0.18);
        }

        .create-job-brand-text {
          margin: 0;
          color: #202824;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .back-dashboard-btn {
          padding: 10px 18px;

          border: none;
          border-radius: 7px;

          background: #D75B3E;
          color: #FFFEFA;

          font-size: 14px;
          font-weight: 600;

          cursor: pointer;
          transition: 0.2s;
        }

        .back-dashboard-btn:hover {
          background: #202824;
        }

        /* Container */

        .create-job-container {
          width: 90%;
          max-width: 850px;

          margin: 40px auto;
        }

        .create-job-container h1 {
          text-align: center;
          margin-bottom: 30px;

          color: #202824;
          font-size: 32px;
        }

        /* Form */

        .create-job-form {
          background: #FFFEFA;

          padding: 35px;

          border-radius: 12px;

          box-shadow:
            0 4px 15px rgba(215, 91, 62, 0.144);
        }

        /* Form group */

        .form-group {
          margin-bottom: 22px;
        }

        .form-group label {
          display: block;

          margin-bottom: 8px;

          color: #D75B3E;

          font-size: 15px;
          font-weight: 600;
        }

        /* Inputs */

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;

          padding: 12px 14px;

          border: 1px solid #DFE3DC;
          border-radius: 7px;

          font-size: 15px;

          outline: none;

          transition: 0.2s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          border-color: #D75B3E;

          box-shadow:
            0 0 0 3px rgba(215, 91, 62, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 130px;
        }

        /* Small text */

        .form-group small {
          display: block;

          margin-top: 6px;

          color: #69736D;

          font-size: 13px;
        }

        /* Submit button */

        .create-job-btn {
          width: 100%;

          padding: 13px;

          border: none;
          border-radius: 7px;

          background: #D75B3E;
          color: #FFFEFA;

          font-size: 16px;
          font-weight: 600;

          cursor: pointer;

          transition: 0.2s;
        }

        .create-job-btn:hover {
          background: #202824;
        }

        .create-job-btn:disabled {
          background: #DFE3DC;
          cursor: not-allowed;
        }

        /* Error */

        .form-error {
          padding: 12px;

          margin-bottom: 20px;

          border-radius: 7px;

          background: #fee2e2;
          color: #b91c1c;

          font-size: 14px;
        }

        /* Success */

        .form-success {
          padding: 12px;

          margin-bottom: 20px;

          border-radius: 7px;

          background: #dcfce7;
          color: #15803d;

          font-size: 14px;
        }

        /* Mobile */

        @media (max-width: 600px) {
          .create-job-navbar {
            padding: 0 20px;
          }

          .create-job-navbar h2 {
            font-size: 19px;
          }

          .create-job-container {
            width: 94%;
            margin-top: 25px;
          }

          .create-job-form {
            padding: 22px;
          }

          .create-job-container h1 {
            font-size: 26px;
          }
        }
      `}</style>

      <div className="create-job-page">

        {/* Navbar */}

        <nav className="create-job-navbar">
          <Link to="/recruiter-dashboard" className="create-job-brand" aria-label="Career Hub home">
            <span className="create-job-brand-icon">CH</span>
            <span className="create-job-brand-text">Career Hub</span>
          </Link>

          <button
            className="back-dashboard-btn"
            type="button"
            onClick={() =>
              navigate("/recruiter-dashboard")
            }
          >
            Back to Dashboard
          </button>
        </nav>

        {/* Main */}

        <main className="create-job-container">

          <h1>Create New Job</h1>

          <form
            className="create-job-form"
            onSubmit={handleSubmit}
          >

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="form-success">
                {success}
              </div>
            )}

            <div className="form-group">
              <label>Job Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Associate Software Developer"
                required
              />
            </div>

            <div className="form-group">
              <label>Company</label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                required
              />
            </div>

            <div className="form-group">
              <label>Job Discription</label>

              <textarea
                name="discription"
                value={formData.discription}
                onChange={handleChange}
                placeholder="Enter detailed job description"
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Lucknow / Remote"
                required
              />
            </div>

            <div className="form-group">
              <label>Salary</label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 60000"
                required
              />
            </div>

            <div className="form-group">
              <label>Skills</label>

              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB"
                required
              />

              <small>
                Separate multiple skills using commas.
              </small>
            </div>

            <div className="form-group">
              <label>Job Type</label>

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="Full Time">
                  Full Time
                </option>

                <option value="Part Time">
                  Part Time
                </option>

                <option value="Internship">
                  Internship
                </option>

                <option value="Contract">
                  Contract
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>Experience</label>

              <input
                type="text"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="e.g. 0-2 years"
                required
              />
            </div>

            <button
              className="create-job-btn"
              type="submit"
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? <LoadingSpinner size={18} label="Creating job" /> : "Create Job"}
            </button>

          </form>

        </main>
      </div>
    </>
  );
};

export default CreateJob;


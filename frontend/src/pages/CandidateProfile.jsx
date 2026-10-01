
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const CandidateProfile = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);
  const [application, setApplication] = useState(null);
  const [job, setJob] = useState(null);

  const [showResumePreview, setShowResumePreview] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // BACKEND URL
  // ========================================

  const BACKEND_URL = "https://career-hub-ege3.onrender.com/";

  // ========================================
  // FETCH CANDIDATE PROFILE
  // ========================================

  const fetchCandidateProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/applications/${applicationId}/candidate`
      );

      if (!response.data.success) {
        setError(
          response.data.message ||
            "Failed to load candidate profile."
        );
        return;
      }

      setCandidate(response.data.candidate);
      setApplication(response.data.application);
      setJob(response.data.job);
    } catch (error) {
      console.error(
        "GET CANDIDATE PROFILE ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load candidate profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD PROFILE
  // ========================================

  useEffect(() => {
    if (applicationId) {
      fetchCandidateProfile();
    }
  }, [applicationId]);

  // ========================================
  // HELPERS
  // ========================================

  const getInitial = () => {
    if (candidate?.name) {
      return candidate.name
        .charAt(0)
        .toUpperCase();
    }

    return "C";
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "status-applied";

      case "Shortlisted":
        return "status-shortlisted";

      case "Interview":
        return "status-interview";

      case "Selected":
        return "status-selected";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-default";
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const formatSalary = (salary) => {
    if (
      salary === undefined ||
      salary === null ||
      salary === ""
    ) {
      return "Not specified";
    }

    const numericSalary = Number(salary);

    if (Number.isNaN(numericSalary)) {
      return salary;
    }

    return `₹${numericSalary.toLocaleString(
      "en-IN"
    )}`;
  };

  // ========================================
  // RESUME
  // ========================================

  /*
    Priority:

    1. Application resume
    2. Candidate profile resume
    3. No resume
  */

  const resumePath =
    application?.resume ||
    candidate?.resume ||
    null;

  const resumeUrl = resumePath
    ? `${BACKEND_URL}${resumePath}`
    : null;

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <>
        <style>{`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #DFE9DF;
          }

          .candidate-loading-page {
            min-height: 100vh;

            display: flex;
            flex-direction: column;

            justify-content: center;
            align-items: center;

            background: #DFE9DF;
            color: #D75B3E;
          }

          .candidate-loader {
            width: 45px;
            height: 45px;

            border: 4px solid #DFE3DC;
            border-top: 4px solid #D75B3E;

            border-radius: 50%;

            animation: candidateSpin 0.8s linear infinite;

            margin-bottom: 18px;
          }

          @keyframes candidateSpin {
            to {
              transform: rotate(360deg);
            }
          }

          .candidate-loading-page h2 {
            margin: 0;
            font-size: 20px;
          }
        `}</style>

        <div
          className="candidate-loading-page"
          role="status"
          aria-label="Loading candidate profile"
        >
          <div className="candidate-loader"></div>
        </div>
      </>
    );
  }

  // ========================================
  // ERROR
  // ========================================

  if (error) {
    return (
      <>
        <style>{`
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            font-family: Arial, Helvetica, sans-serif;
            background: #DFE9DF;
          }

          .candidate-error-page {
            min-height: 100vh;

            display: flex;
            flex-direction: column;

            justify-content: center;
            align-items: center;

            padding: 30px;

            background: #DFE9DF;
          }

          .candidate-error-card {
            width: 100%;
            max-width: 500px;

            background: #FFFEFA;

            padding: 35px;

            border-radius: 12px;

            text-align: center;

            box-shadow:
              0 5px 20px rgba(215, 91, 62, 0.144);
          }

          .candidate-error-icon {
            font-size: 45px;
            margin-bottom: 15px;
          }

          .candidate-error-card h2 {
            margin: 0 0 10px;
            color: #202824;
          }

          .candidate-error-card p {
            margin: 0 0 25px;
            color: #69736D;
          }

          .candidate-error-btn {
            border: none;

            padding: 11px 20px;

            border-radius: 7px;

            background: #D75B3E;
            color: #FFFEFA;

            font-size: 14px;
            font-weight: 600;

            cursor: pointer;
          }

          .candidate-error-btn:hover {
            background: #202824;
          }
        `}</style>

        <div className="candidate-error-page">
          <div className="candidate-error-card">

            <div className="candidate-error-icon">
              ⚠️
            </div>

            <h2>
              Unable to Load Profile
            </h2>

            <p>
              {error}
            </p>

            <button
              type="button"
              className="candidate-error-btn"
              onClick={() =>
                navigate(
                  "/recruiter-applicants"
                )
              }
            >
              Back to Applicants
            </button>

          </div>
        </div>
      </>
    );
  }

  // ========================================
  // MAIN UI
  // ========================================

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: #DFE9DF;
          color: #202824;
        }

        /* ========================================
           PAGE
        ======================================== */

        .candidate-profile-page {
          min-height: 100vh;
          background: #DFE9DF;
          padding-bottom: 60px;
        }

        /* ========================================
           NAVBAR
        ======================================== */

        .candidate-profile-navbar {
          height: 70px;

          background: #FFFEFA;

          border-bottom: 1px solid #DFE3DC;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 7%;

          position: sticky;
          top: 0;
          z-index: 100;
        }

        .candidate-profile-navbar h2 {
          margin: 0;

          color: #D75B3E;

          font-size: 23px;
        }

        .back-applicants-btn {
          border: none;

          padding: 10px 18px;

          border-radius: 7px;

          background: #D75B3E;
          color: #FFFEFA;

          font-size: 14px;
          font-weight: 600;

          cursor: pointer;

          transition: 0.2s;
        }

        .back-applicants-btn:hover {
          background: #202824;
        }

        /* ========================================
           CONTAINER
        ======================================== */

        .candidate-profile-container {
          width: 92%;
          max-width: 1100px;

          margin: 35px auto;
        }

        /* ========================================
           PROFILE HEADER
        ======================================== */

        .candidate-header {
          background: #FFFEFA;

          border-radius: 14px;

          padding: 30px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 25px;

          box-shadow:
            0 4px 18px rgba(215, 91, 62, 0.108);

          margin-bottom: 25px;
        }

        .candidate-header-left {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .candidate-avatar {
          width: 90px;
          height: 90px;

          border-radius: 50%;

          object-fit: cover;

          border: 3px solid #DFE9DF;

          flex-shrink: 0;
        }

        .candidate-avatar-fallback {
          width: 90px;
          height: 90px;

          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #DFE9DF;
          color: #D75B3E;

          font-size: 34px;
          font-weight: 700;

          border: 3px solid #DFE3DC;

          flex-shrink: 0;
        }

        .candidate-header-info h1 {
          margin: 0 0 7px;

          font-size: 28px;
          color: #202824;
        }

        .candidate-header-info p {
          margin: 4px 0;

          color: #69736D;

          font-size: 14px;
        }

        .candidate-header-info
        .candidate-email {
          color: #D75B3E;
        }

        /* ========================================
           STATUS
        ======================================== */

        .candidate-status-container {
          text-align: right;
        }

        .status-label {
          display: block;

          color: #69736D;

          font-size: 12px;

          margin-bottom: 7px;
        }

        .status-badge {
          display: inline-block;

          padding: 8px 15px;

          border-radius: 20px;

          font-size: 13px;
          font-weight: 700;
        }

        .status-applied {
          background: #DFE9DF;
          color: #202824;
        }

        .status-shortlisted {
          background: #fef3c7;
          color: #b45309;
        }

        .status-interview {
          background: #DFE9DF;
          color: #202824;
        }

        .status-selected {
          background: #dcfce7;
          color: #15803d;
        }

        .status-rejected {
          background: #fee2e2;
          color: #b91c1c;
        }

        .status-default {
          background: #DFE9DF;
          color: #D75B3E;
        }

        /* ========================================
           GRID
        ======================================== */

        .candidate-profile-grid {
          display: grid;

          grid-template-columns: 2fr 1fr;

          gap: 25px;

          align-items: start;
        }

        /* ========================================
           CARD
        ======================================== */

        .profile-card {
          background: #FFFEFA;

          border-radius: 12px;

          padding: 25px;

          box-shadow:
            0 4px 15px rgba(215, 91, 62, 0.09);

          margin-bottom: 25px;
        }

        .profile-card:last-child {
          margin-bottom: 0;
        }

        .profile-card h2 {
          margin: 0 0 20px;

          font-size: 19px;

          color: #202824;

          padding-bottom: 13px;

          border-bottom: 1px solid #DFE3DC;
        }

        /* ========================================
           ABOUT
        ======================================== */

        .about-text {
          margin: 0;

          color: #D75B3E;

          font-size: 15px;

          line-height: 1.7;

          white-space: pre-wrap;
        }

        .empty-text {
          color: #69736D;

          font-size: 14px;

          margin: 0;
        }

        /* ========================================
           SKILLS
        ======================================== */

        .skills-container {
          display: flex;

          flex-wrap: wrap;

          gap: 9px;
        }

        .skill-tag {
          padding: 7px 12px;

          background: #DFE9DF;

          color: #202824;

          border: 1px solid #DFE9DF;

          border-radius: 20px;

          font-size: 13px;

          font-weight: 600;
        }

        /* ========================================
           INFORMATION ROW
        ======================================== */

        .info-row {
          display: flex;

          justify-content: space-between;

          gap: 20px;

          padding: 12px 0;

          border-bottom: 1px solid #DFE9DF;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #69736D;

          font-size: 14px;

          font-weight: 600;
        }

        .info-value {
          color: #202824;

          font-size: 14px;

          text-align: right;

          word-break: break-word;
        }

        /* ========================================
           LINKS
        ======================================== */

        .profile-links {
          display: flex;

          flex-direction: column;

          gap: 10px;
        }

        .profile-link {
          display: block;

          padding: 11px 14px;

          border: 1px solid #DFE3DC;

          border-radius: 7px;

          color: #D75B3E;

          text-decoration: none;

          font-size: 14px;

          font-weight: 600;

          transition: 0.2s;

          word-break: break-all;
        }

        .profile-link:hover {
          background: #DFE9DF;

          border-color: #DFE3DC;
        }

        /* ========================================
           RESUME CARD
        ======================================== */

        .resume-card {
          border: 1px solid #DFE9DF;

          background: #FFFEFA;
        }

        .resume-header {
          display: flex;

          align-items: center;

          gap: 14px;

          margin-bottom: 18px;
        }

        .resume-icon {
          width: 48px;
          height: 48px;

          border-radius: 10px;

          background: #DFE9DF;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 23px;
        }

        .resume-header-text h3 {
          margin: 0 0 4px;

          font-size: 16px;

          color: #202824;
        }

        .resume-header-text p {
          margin: 0;

          font-size: 13px;

          color: #69736D;
        }

        .resume-buttons {
          display: flex;

          gap: 10px;

          flex-wrap: wrap;
        }

        .resume-view-btn,
        .resume-secondary-btn,
        .resume-download-btn {
          display: inline-flex;

          align-items: center;
          justify-content: center;

          gap: 7px;

          padding: 11px 16px;

          border-radius: 7px;

          text-decoration: none;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.2s;
        }

        /* Preview Button */

        .resume-view-btn {
          border: none;

          background: #D75B3E;
          color: #FFFEFA;
        }

        .resume-view-btn:hover {
          background: #202824;
        }

        /* Open Button */

        .resume-secondary-btn {
          background: #FFFEFA;

          color: #D75B3E;

          border: 1px solid #DFE3DC;
        }

        .resume-secondary-btn:hover {
          background: #DFE9DF;
        }

        /* Download Button */

        .resume-download-btn {
          background: #FFFEFA;

          color: #D75B3E;

          border: 1px solid #DFE3DC;
        }

        .resume-download-btn:hover {
          background: #DFE9DF;
        }

        .resume-missing {
          padding: 15px;

          border-radius: 8px;

          background: #DFE9DF;

          border: 1px solid #DFE3DC;

          color: #69736D;

          font-size: 14px;
        }

        /* ========================================
           RESUME PREVIEW MODAL
        ======================================== */

        .resume-modal-overlay {
          position: fixed;

          inset: 0;

          background: rgba(215, 91, 62, 0.4);

          display: flex;

          align-items: center;
          justify-content: center;

          padding: 25px;

          z-index: 1000;
        }

        .resume-modal {
          width: 100%;

          max-width: 1100px;

          height: 95vh;

          background: #FFFEFA;

          border-radius: 12px;

          overflow: hidden;

          display: flex;

          flex-direction: column;

          box-shadow:
            0 15px 50px rgba(215, 91, 62, 0.4);
        }

        .resume-modal-header {
          height: 60px;

          padding: 0 20px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          border-bottom: 1px solid #DFE3DC;

          background: #FFFEFA;

          flex-shrink: 0;
        }

        .resume-modal-header h2 {
          margin: 0;

          padding: 0;

          border: none;

          font-size: 18px;

          color: #202824;
        }

        .resume-close-btn {
          width: 36px;
          height: 36px;

          border: none;

          border-radius: 50%;

          background: #DFE9DF;

          color: #D75B3E;

          font-size: 16px;

          cursor: pointer;

          transition: 0.2s;
        }

        .resume-close-btn:hover {
          background: #DFE3DC;
        }

        .resume-preview-container {
          flex: 1;

          min-height: 0;

          background: #69736D;
        }

        .resume-preview-frame {
          width: 100%;

          height: 100%;

          border: none;

          display: block;
        }

        .resume-modal-footer {
          min-height: 65px;

          padding: 10px 20px;

          display: flex;

          align-items: center;

          justify-content: flex-end;

          gap: 10px;

          border-top: 1px solid #DFE3DC;

          background: #FFFEFA;

          flex-shrink: 0;
        }

        /* ========================================
           APPLICATION CARD
        ======================================== */

        .application-status-large {
          margin-bottom: 18px;
        }

        .application-date {
          color: #69736D;

          font-size: 13px;

          margin-top: 5px;
        }

        /* ========================================
           JOB CARD
        ======================================== */

        .job-title {
          margin: 0 0 7px;

          color: #202824;

          font-size: 18px;
        }

        .job-company {
          color: #D75B3E;

          font-weight: 600;

          font-size: 14px;

          margin-bottom: 18px;
        }

        .job-info-list {
          display: flex;

          flex-direction: column;

          gap: 12px;
        }

        .job-info-item {
          display: flex;

          align-items: flex-start;

          gap: 10px;

          color: #D75B3E;

          font-size: 14px;
        }

        .job-info-icon {
          width: 22px;

          flex-shrink: 0;
        }

        /* ========================================
           ACTION
        ======================================== */

        .back-full-btn {
          width: 100%;

          padding: 12px;

          border: none;

          border-radius: 7px;

          background: #D75B3E;

          color: #FFFEFA;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.2s;
        }

        .back-full-btn:hover {
          background: #202824;
        }

        /* ========================================
           RESPONSIVE
        ======================================== */

        @media (max-width: 850px) {
          .candidate-profile-grid {
            grid-template-columns: 1fr;
          }

          .candidate-header {
            align-items: flex-start;

            flex-direction: column;
          }

          .candidate-status-container {
            text-align: left;
          }
        }

        @media (max-width: 600px) {
          .candidate-profile-navbar {
            padding: 0 20px;
          }

          .candidate-profile-navbar h2 {
            font-size: 18px;
          }

          .back-applicants-btn {
            padding: 9px 11px;

            font-size: 12px;
          }

          .candidate-profile-container {
            width: 94%;

            margin-top: 20px;
          }

          .candidate-header {
            padding: 22px;
          }

          .candidate-header-left {
            align-items: flex-start;
          }

          .candidate-avatar,
          .candidate-avatar-fallback {
            width: 70px;
            height: 70px;
          }

          .candidate-header-info h1 {
            font-size: 22px;
          }

          .profile-card {
            padding: 20px;
          }

          .info-row {
            flex-direction: column;

            gap: 5px;
          }

          .info-value {
            text-align: left;
          }

          .resume-buttons {
            flex-direction: column;
          }

          .resume-view-btn,
          .resume-secondary-btn,
          .resume-download-btn {
            width: 100%;
          }

          /* Mobile Modal */

          .resume-modal-overlay {
            padding: 10px;
          }

          .resume-modal {
            height: 96vh;
          }

          .resume-modal-footer {
            flex-direction: column;

            padding: 10px;
          }

          .resume-modal-footer a {
            width: 100%;
          }
        }
      `}</style>

      <div className="candidate-profile-page">

        {/* ========================================
            NAVBAR
        ======================================== */}

        <nav className="candidate-profile-navbar">

          <h2>
            Career Hub - Recruiter
          </h2>

          <button
            type="button"
            className="back-applicants-btn"
            onClick={() =>
              navigate("/recruiter-applicants")
            }
          >
            ← Back to Applicants
          </button>

        </nav>

        {/* ========================================
            MAIN CONTAINER
        ======================================== */}

        <main className="candidate-profile-container">

          {/* ========================================
              PROFILE HEADER
          ======================================== */}

          <section className="candidate-header">

            <div className="candidate-header-left">

              {candidate?.profilePicture ? (
                <img
                  src={`${BACKEND_URL}${candidate.profilePicture}`}
                  alt={`${candidate.name || "Candidate"} profile`}
                  className="candidate-avatar"
                />
              ) : (
                <div className="candidate-avatar-fallback">
                  {getInitial()}
                </div>
              )}

              <div className="candidate-header-info">

                <h1>
                  {candidate?.name || "Candidate"}
                </h1>

                <p className="candidate-email">
                  {candidate?.email ||
                    "Email not available"}
                </p>

                {candidate?.location && (
                  <p>
                    📍 {candidate.location}
                  </p>
                )}

                {candidate?.phone && (
                  <p>
                    📞 {candidate.phone}
                  </p>
                )}

              </div>

            </div>

            <div className="candidate-status-container">

              <span className="status-label">
                Application Status
              </span>

              <span
                className={`status-badge ${getStatusClass(
                  application?.status
                )}`}
              >
                {application?.status ||
                  "Applied"}
              </span>

            </div>

          </section>

          {/* ========================================
              CONTENT GRID
          ======================================== */}

          <div className="candidate-profile-grid">

            {/* ======================================
                LEFT COLUMN
            ====================================== */}

            <div>

              {/* ABOUT */}

              <section className="profile-card">

                <h2>
                  About Candidate
                </h2>

                {candidate?.bio ? (
                  <p className="about-text">
                    {candidate.bio}
                  </p>
                ) : (
                  <p className="empty-text">
                    No bio information provided.
                  </p>
                )}

              </section>

              {/* SKILLS */}

              <section className="profile-card">

                <h2>
                  Skills
                </h2>

                {Array.isArray(
                  candidate?.skills
                ) &&
                candidate.skills.length > 0 ? (
                  <div className="skills-container">

                    {candidate.skills.map(
                      (skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="skill-tag"
                        >
                          {skill}
                        </span>
                      )
                    )}

                  </div>
                ) : (
                  <p className="empty-text">
                    No skills added.
                  </p>
                )}

              </section>

              {/* EDUCATION */}

              <section className="profile-card">

                <h2>
                  Education
                </h2>

                {candidate?.education ? (
                  <>
                    <div className="info-row">

                      <span className="info-label">
                        Degree
                      </span>

                      <span className="info-value">
                        {candidate.education.degree ||
                          "Not specified"}
                      </span>

                    </div>

                    <div className="info-row">

                      <span className="info-label">
                        College
                      </span>

                      <span className="info-value">
                        {candidate.education.college ||
                          "Not specified"}
                      </span>

                    </div>

                    <div className="info-row">

                      <span className="info-label">
                        Graduation Year
                      </span>

                      <span className="info-value">
                        {candidate.education
                          .graduationYear ||
                          "Not specified"}
                      </span>

                    </div>
                  </>
                ) : (
                  <p className="empty-text">
                    Education information not provided.
                  </p>
                )}

              </section>

              {/* EXPERIENCE */}

              <section className="profile-card">

                <h2>
                  Experience
                </h2>

                {candidate?.experience ? (
                  <p className="about-text">
                    {candidate.experience}
                  </p>
                ) : (
                  <p className="empty-text">
                    No experience information provided.
                  </p>
                )}

              </section>

              {/* CONTACT */}

              <section className="profile-card">

                <h2>
                  Contact Information
                </h2>

                <div className="info-row">

                  <span className="info-label">
                    Email
                  </span>

                  <span className="info-value">
                    {candidate?.email ||
                      "Not available"}
                  </span>

                </div>

                <div className="info-row">

                  <span className="info-label">
                    Phone
                  </span>

                  <span className="info-value">
                    {candidate?.phone ||
                      "Not available"}
                  </span>

                </div>

                <div className="info-row">

                  <span className="info-label">
                    Location
                  </span>

                  <span className="info-value">
                    {candidate?.location ||
                      "Not available"}
                  </span>

                </div>

              </section>

            </div>

            {/* ======================================
                RIGHT COLUMN
            ====================================== */}

            <div>

              {/* RESUME */}

              <section className="profile-card resume-card">

                <h2>
                  Resume
                </h2>

                {resumeUrl ? (
                  <>
                    <div className="resume-header">

                      <div className="resume-icon">
                        📄
                      </div>

                      <div className="resume-header-text">

                        <h3>
                          Candidate Resume
                        </h3>

                        <p>
                          Resume available for review
                        </p>

                      </div>

                    </div>

                    <div className="resume-buttons">

                      {/* PREVIEW */}

                      <button
                        type="button"
                        className="resume-view-btn"
                        onClick={() =>
                          setShowResumePreview(true)
                        }
                      >
                        👁 Preview Resume
                      </button>

                      {/* NEW TAB */}

                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-secondary-btn"
                      >
                        ↗ Open
                      </a>

                      {/* DOWNLOAD */}

                      <a
                        href={resumeUrl}
                        download
                        className="resume-download-btn"
                      >
                        ⬇ Download
                      </a>

                    </div>
                  </>
                ) : (
                  <div className="resume-missing">
                    📄 Resume not uploaded by this candidate.
                  </div>
                )}

              </section>

              {/* APPLICATION */}

              <section className="profile-card">

                <h2>
                  Application
                </h2>

                <div className="application-status-large">

                  <span className="status-label">
                    Current Status
                  </span>

                  <span
                    className={`status-badge ${getStatusClass(
                      application?.status
                    )}`}
                  >
                    {application?.status ||
                      "Applied"}
                  </span>

                </div>

                <div className="info-row">

                  <span className="info-label">
                    Applied On
                  </span>

                  <span className="info-value">
                    {formatDate(
                      application?.createdAt
                    )}
                  </span>

                </div>

                <div className="info-row">

                  <span className="info-label">
                    Last Updated
                  </span>

                  <span className="info-value">
                    {formatDate(
                      application?.updatedAt
                    )}
                  </span>

                </div>

              </section>

              {/* JOB DETAILS */}

              <section className="profile-card">

                <h2>
                  Applied Job
                </h2>

                <h3 className="job-title">
                  {job?.title || "Job"}
                </h3>

                <div className="job-company">
                  {job?.company || "Company"}
                </div>

                <div className="job-info-list">

                  <div className="job-info-item">

                    <span className="job-info-icon">
                      📍
                    </span>

                    <span>
                      {job?.location ||
                        "Location not specified"}
                    </span>

                  </div>

                  <div className="job-info-item">

                    <span className="job-info-icon">
                      💰
                    </span>

                    <span>
                      {formatSalary(
                        job?.salary
                      )}
                    </span>

                  </div>

                  <div className="job-info-item">

                    <span className="job-info-icon">
        CH                    </span>

                    <span>
                      {job?.jobType ||
                        "Job type not specified"}
                    </span>

                  </div>

                  <div className="job-info-item">

                    <span className="job-info-icon">
                      🎯
                    </span>

                    <span>
                      {job?.experience ||
                        "Experience not specified"}
                    </span>

                  </div>

                </div>

              </section>

              {/* SOCIAL LINKS */}

              <section className="profile-card">

                <h2>
                  Professional Links
                </h2>

                <div className="profile-links">

                  {candidate?.linkedin ? (
                    <a
                      href={candidate.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-link"
                    >
                      🔗 LinkedIn Profile
                    </a>
                  ) : null}

                  {candidate?.github ? (
                    <a
                      href={candidate.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="profile-link"
                    >
                      💻 GitHub Profile
                    </a>
                  ) : null}

                  {!candidate?.linkedin &&
                    !candidate?.github && (
                      <p className="empty-text">
                        No professional links provided.
                      </p>
                    )}

                </div>

              </section>

              {/* BACK BUTTON */}

              <button
                type="button"
                className="back-full-btn"
                onClick={() =>
                  navigate(
                    "/recruiter-applicants"
                  )
                }
              >
                ← Back to Applicants
              </button>

            </div>

          </div>

        </main>

        {/* ========================================
            RESUME PREVIEW MODAL
        ======================================== */}

        {showResumePreview && resumeUrl && (
          <div
            className="resume-modal-overlay"
            onClick={() =>
              setShowResumePreview(false)
            }
          >

            <div
              className="resume-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* MODAL HEADER */}

              <div className="resume-modal-header">

                <h2>
                  Candidate Resume
                </h2>

                <button
                  type="button"
                  className="resume-close-btn"
                  onClick={() =>
                    setShowResumePreview(false)
                  }
                >
                  ✕
                </button>

              </div>

              {/* RESUME PREVIEW */}

              <div className="resume-preview-container">

                <iframe
                  src={resumeUrl}
                  title="Candidate Resume Preview"
                  className="resume-preview-frame"
                />

              </div>

              {/* MODAL FOOTER */}

              <div className="resume-modal-footer">

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-secondary-btn"
                >
                  ↗ Open in New Tab
                </a>

                <a
                  href={resumeUrl}
                  download
                  className="resume-download-btn"
                >
                  ⬇ Download Resume
                </a>

              </div>

            </div>

          </div>
        )}

      </div>
    </>
  );
};

export default CandidateProfile;


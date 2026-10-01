import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const resumeInputRef = useRef(null);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    skills: [],
    experience: "",
    linkedin: "",
    github: "",
    education: {
      degree: "",
      college: "",
      graduationYear: "",
    },
    resume: "",
  });

  const [skillsInput, setSkillsInput] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // Fetch Profile
  // ==========================================
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/profile/me");

      const data = response.data.user;

      setProfile({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        location: data.location || "",
        bio: data.bio || "",
        skills: data.skills || [],
        experience: data.experience || "",
        linkedin: data.linkedin || "",
        github: data.github || "",
        education: {
          degree: data.education?.degree || "",
          college: data.education?.college || "",
          graduationYear:
            data.education?.graduationYear || "",
        },
        resume: data.resume || "",
      });

      setSkillsInput(
        (data.skills || []).join(", ")
      );
    } catch (error) {
      console.error("FETCH PROFILE ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================================
  // Handle Input
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // Handle Education
  // ==========================================
  const handleEducationChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [name]: value,
      },
    }));
  };

  // ==========================================
  // Save Profile
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const skills = skillsInput
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const response = await api.put("/profile/me", {
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
        skills,
        experience: profile.experience,
        linkedin: profile.linkedin,
        github: profile.github,
        degree: profile.education.degree,
        college: profile.education.college,
        graduationYear:
          profile.education.graduationYear,
      });

      const updatedUser = response.data.user;

      setProfile((prev) => ({
        ...prev,
        name: updatedUser.name || "",
        phone: updatedUser.phone || "",
        location: updatedUser.location || "",
        bio: updatedUser.bio || "",
        skills: updatedUser.skills || [],
        experience: updatedUser.experience || "",
        linkedin: updatedUser.linkedin || "",
        github: updatedUser.github || "",
        education: {
          degree:
            updatedUser.education?.degree || "",
          college:
            updatedUser.education?.college || "",
          graduationYear:
            updatedUser.education?.graduationYear || "",
        },
      }));

      setSkillsInput(
        (updatedUser.skills || []).join(", ")
      );

      setSuccess("Profile updated successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // Upload Resume
  // ==========================================
  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    // PDF validation
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Only PDF resumes are allowed.");

      e.target.value = "";
      return;
    }

    // 5 MB validation
    if (file.size > 5 * 1024 * 1024) {
      setError("Resume size must be less than 5 MB.");

      e.target.value = "";
      return;
    }

    try {
      setUploadingResume(true);

      const formData = new FormData();

      formData.append("resume", file);

      const response = await api.post(
        "/profile/resume",
        formData
      );

      const updatedUser = response.data.user;

      setProfile((prev) => ({
        ...prev,
        resume: updatedUser.resume || "",
      }));

      setSuccess("Resume uploaded successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (error) {
      console.error("UPLOAD RESUME ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to upload resume"
      );
    } finally {
      setUploadingResume(false);

      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    }
  };

  // ==========================================
  // Profile Completeness
  // ==========================================
  const profileCompletion = useMemo(() => {
    const fields = [
      profile.name,
      profile.phone,
      profile.location,
      profile.bio,
      profile.skills.length > 0,
      profile.experience,
      profile.education.degree,
      profile.education.college,
      profile.education.graduationYear,
      profile.linkedin,
      profile.github,
      profile.resume,
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  }, [profile]);

  // ==========================================
  // Resume URL
  // ==========================================
  const resumeUrl = profile.resume
    ? `https://career-hub-ege3.onrender.com${profile.resume}`
    : "";

  // ==========================================
  // Loading State (Themed to prevent white flash)
  // ==========================================
  if (loading) {
    return (
      <div
        className="profile-loading-page"
        role="status"
        aria-label="Loading your profile"
      >
        <div className="spinner" aria-hidden="true"></div>
        <p style={{ marginTop: "12px", fontFamily: "inherit", fontWeight: 600, fontSize: "14px", color: "#69736D" }}>Loading profile...</p>
        <style>{`
          body {
            margin: 0;
            background: #F6F6F1;
            font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          }
          .profile-loading-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: #F6F6F1;
            color: #202824;
          }
          .spinner {
            width: 38px;
            height: 38px;
            border: 3px solid #DFE3DC;
            border-top-color: #D75B3E;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="profile-page">

      {/* ======================================
          NAVBAR
      ====================================== */}
      <nav className="navbar">

        <Link
          to="/candidate-dashboard"
          className="logo"
          aria-label="Career Hub home"
        >
          <span className="logo-badge">CH</span>
          <span className="logo-text">Career Hub</span>
        </Link>

        <div className="navbar-right">

          <Link
            to="/candidate-dashboard"
            className="nav-link"
          >
            Find Jobs
          </Link>

          <Link
            to="/my-applications"
            className="nav-link"
          >
            My Applications
          </Link>

          <span className="welcome-text">
            Hi, {profile.name || user?.name || "Candidate"} 👋
          </span>

          <button
            onClick={logout}
            className="logout-btn"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* ======================================
          MAIN
      ====================================== */}
      <main className="profile-container">

        {/* HEADER */}
        <div className="profile-header">

          <div>
            <Link
              to="/candidate-dashboard"
              className="back-link"
            >
              ← Back to Dashboard
            </Link>

            <h1>My Profile</h1>

            <p>
              Keep your profile updated to improve your
              chances of getting hired.
            </p>
          </div>

        </div>

        {/* MESSAGES */}
        {success && (
          <div className="success-message">
            ✓ {success}
          </div>
        )}

        {error && (
          <div className="error-message">
            ⚠ {error}

            <button
              onClick={() => setError("")}
            >
              ×
            </button>
          </div>
        )}

        <div className="profile-layout">

          {/* ======================================
              LEFT COLUMN
          ====================================== */}
          <aside className="profile-sidebar">

            {/* PROFILE AVATAR */}
            <div className="profile-card">

              <div className="profile-avatar">
                {profile.name
                  ?.charAt(0)
                  ?.toUpperCase() || "C"}
              </div>

              <h2>
                {profile.name || "Your Name"}
              </h2>

              <p className="profile-email">
                {profile.email}
              </p>

              <span className="candidate-badge">
                Candidate
              </span>

            </div>

            {/* COMPLETION */}
            <div className="completion-card">

              <div className="completion-header">
                <span>
                  Profile Completion
                </span>

                <strong>
                  {profileCompletion}%
                </strong>
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                ></div>
              </div>

              <p>
                {profileCompletion === 100
                  ? "Your profile is complete! 🎉"
                  : "Complete your profile to stand out to recruiters."}
              </p>

            </div>

            {/* RESUME */}
            <div className="resume-card">

              <div className="resume-icon">
                📄
              </div>

              <h3>
                Resume
              </h3>

              {profile.resume ? (
                <>
                  <p>
                    Your resume is uploaded.
                  </p>

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="view-resume-btn"
                  >
                    View Resume
                  </a>
                </>
              ) : (
                <p>
                  Upload your resume to apply for jobs.
                </p>
              )}

              <label className="upload-resume-btn">

                {uploadingResume ? (
                  <LoadingSpinner size={18} label="Uploading resume" />
                ) : profile.resume
                  ? "Update Resume"
                  : "Upload Resume"}

                <input
                  ref={resumeInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleResumeUpload}
                  disabled={uploadingResume}
                  hidden
                />

              </label>

              <small>
                PDF only • Maximum 5 MB
              </small>

            </div>

          </aside>

          {/* ======================================
              RIGHT COLUMN
          ====================================== */}
          <section className="profile-form-card">

            <form onSubmit={handleSubmit}>

              {/* BASIC INFORMATION */}
              <div className="form-section">

                <div className="section-title">
                  <h2>Personal Information</h2>

                  <p>
                    Basic information about you.
                  </p>
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Email
                    </label>

                    <input
                      type="email"
                      value={profile.email}
                      disabled
                    />

                    <small>
                      Email cannot be changed here.
                    </small>
                  </div>

                  <div className="form-group">
                    <label>
                      Phone
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Enter phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      placeholder="e.g. Lucknow, Uttar Pradesh"
                    />
                  </div>

                </div>

                <div className="form-group">

                  <label>
                    Bio
                  </label>

                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Write a short professional introduction..."
                    maxLength={500}
                    rows={5}
                  />

                  <small>
                    {profile.bio.length}/500 characters
                  </small>

                </div>

              </div>

              {/* SKILLS */}
              <div className="form-section">

                <div className="section-title">
                  <h2>Skills</h2>

                  <p>
                    Add technologies and skills you know.
                  </p>
                </div>

                <div className="form-group">

                  <label>
                    Skills
                  </label>

                  <input
                    type="text"
                    value={skillsInput}
                    onChange={(e) =>
                      setSkillsInput(e.target.value)
                    }
                    placeholder="JavaScript, React, Node.js, MongoDB"
                  />

                  <small>
                    Separate skills using commas.
                  </small>

                </div>

                {skillsInput && (
                  <div className="skill-preview">

                    {skillsInput
                      .split(",")
                      .map((skill) => skill.trim())
                      .filter(Boolean)
                      .map((skill, index) => (
                        <span
                          key={index}
                          className="skill-tag"
                        >
                          {skill}
                        </span>
                      ))}

                  </div>
                )}

              </div>

              {/* EDUCATION */}
              <div className="form-section">

                <div className="section-title">
                  <h2>Education</h2>

                  <p>
                    Add your educational qualification.
                  </p>
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>
                      Degree
                    </label>

                    <input
                      type="text"
                      name="degree"
                      value={
                        profile.education.degree
                      }
                      onChange={handleEducationChange}
                      placeholder="B.Tech Computer Science"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      College / University
                    </label>

                    <input
                      type="text"
                      name="college"
                      value={
                        profile.education.college
                      }
                      onChange={handleEducationChange}
                      placeholder="Enter college name"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Graduation Year
                    </label>

                    <input
                      type="text"
                      name="graduationYear"
                      value={
                        profile.education.graduationYear
                      }
                      onChange={handleEducationChange}
                      placeholder="2026"
                    />
                  </div>

                </div>

              </div>

              {/* EXPERIENCE */}
              <div className="form-section">

                <div className="section-title">
                  <h2>Experience</h2>

                  <p>
                    Tell recruiters about your experience.
                  </p>
                </div>

                <div className="form-group">

                  <label>
                    Experience
                  </label>

                  <textarea
                    name="experience"
                    value={profile.experience}
                    onChange={handleChange}
                    placeholder="e.g. Fresher / 6 months internship / 1 year experience..."
                    rows={4}
                  />

                </div>

              </div>

              {/* SOCIAL LINKS */}
              <div className="form-section">

                <div className="section-title">
                  <h2>Professional Links</h2>

                  <p>
                    Add links recruiters can use to learn
                    more about you.
                  </p>
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>
                      LinkedIn
                    </label>

                    <input
                      type="url"
                      name="linkedin"
                      value={profile.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/yourname"
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      GitHub
                    </label>

                    <input
                      type="url"
                      name="github"
                      value={profile.github}
                      onChange={handleChange}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>

                </div>

              </div>

              {/* SAVE BUTTON */}
              <div className="form-actions">

                <button
                  type="button"
                  onClick={() =>
                    navigate("/candidate-dashboard")
                  }
                  className="cancel-btn"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                  aria-busy={saving}
                  aria-label={saving ? "Saving profile" : undefined}
                >
                  {saving ? <LoadingSpinner size={18} label="Saving profile" /> : "Save Profile"}
                </button>

              </div>

            </form>

          </section>

        </div>

      </main>

      {/* ======================================
          STYLES
      ====================================== */}
      <style>{`

        * {
          box-sizing: border-box;
        }

        .profile-page {
          min-height: 100vh;
          background: #F6F6F1;
          color: #202824;
        }

        /* NAVBAR */

        .navbar {
          height: 72px;
          padding: 0 6%;
          background: #FFFEFA;
          border-bottom: 1px solid #DFE3DC;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #D75B3E;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .logo-badge {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          background: linear-gradient(135deg, #D75B3E 0%, #202824 100%);
          color: #FFFEFA;
          font-size: 16px;
          font-weight: 800;
          box-shadow: 0 8px 18px rgba(215, 91, 62, 0.18);
        }

        .logo-text {
          color: #202824;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .nav-link {
          text-decoration: none;
          color: #69736D;
          font-size: 14px;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .nav-link:hover {
          color: #D75B3E;
        }

        .welcome-text {
          color: #202824;
          font-size: 14px;
          font-weight: 600;
        }

        .logout-btn {
          border: 1px solid #DFE3DC;
          background: #FFFEFA;
          color: #D75B3E;
          padding: 9px 14px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .logout-btn:hover {
          background: #DFE9DF;
        }

        /* CONTAINER */

        .profile-container {
          width: 90%;
          max-width: 1200px;
          margin: auto;
          padding: 40px 0 70px;
        }

        .profile-header {
          margin-bottom: 25px;
        }

        .back-link {
          text-decoration: none;
          color: #D75B3E;
          font-size: 13px;
          font-weight: 700;
        }

        .profile-header h1 {
          margin: 15px 0 7px;
          font-size: 32px;
          color: #202824;
        }

        .profile-header p {
          margin: 0;
          color: #69736D;
        }

        /* MESSAGES */

        .success-message,
        .error-message {
          padding: 13px 16px;
          border-radius: 9px;
          margin-bottom: 20px;
          font-size: 14px;
          font-weight: 600;
        }

        .success-message {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #047857;
        }

        .error-message {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .error-message button {
          margin-left: auto;
          border: none;
          background: transparent;
          color: inherit;
          font-size: 20px;
          cursor: pointer;
        }

        /* LAYOUT */

        .profile-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 25px;
          align-items: start;
        }

        /* SIDEBAR */

        .profile-card,
        .completion-card,
        .resume-card,
        .profile-form-card {
          background: #FFFEFA;
          border: 1px solid #DFE3DC;
          border-radius: 15px;
        }

        .profile-card {
          padding: 25px;
          text-align: center;
          margin-bottom: 18px;
        }

        .profile-avatar {
          width: 82px;
          height: 82px;
          margin: 0 auto 15px;
          border-radius: 50%;
          background: #DFE9DF;
          color: #202824;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          font-weight: 800;
        }

        .profile-card h2 {
          margin: 0 0 7px;
          font-size: 20px;
          color: #202824;
        }

        .profile-email {
          color: #69736D;
          font-size: 13px;
          margin: 0 0 12px;
          word-break: break-word;
        }

        .candidate-badge {
          display: inline-block;
          padding: 6px 11px;
          background: #DFE9DF;
          color: #202824;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
        }

        /* COMPLETION */

        .completion-card {
          padding: 20px;
          margin-bottom: 18px;
        }

        .completion-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 13px;
          font-weight: 700;
          color: #202824;
        }

        .completion-header strong {
          color: #D75B3E;
        }

        .progress-bar {
          width: 100%;
          height: 9px;
          background: #DFE3DC;
          border-radius: 999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #D75B3E;
          border-radius: inherit;
          transition: width 0.3s ease;
        }

        .completion-card p {
          color: #69736D;
          font-size: 12px;
          line-height: 1.5;
          margin: 10px 0 0;
        }

        /* RESUME */

        .resume-card {
          padding: 20px;
          text-align: center;
        }

        .resume-icon {
          font-size: 35px;
          margin-bottom: 8px;
        }

        .resume-card h3 {
          margin: 0 0 7px;
          color: #202824;
        }

        .resume-card p {
          color: #69736D;
          font-size: 12px;
          line-height: 1.5;
        }

        .view-resume-btn,
        .upload-resume-btn {
          display: block;
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          margin-top: 9px;
        }

        .view-resume-btn {
          background: #DFE9DF;
          color: #D75B3E;
        }

        .upload-resume-btn {
          background: #D75B3E;
          color: #FFFEFA;
        }

        .upload-resume-btn:hover {
          background: #202824;
        }

        .resume-card small {
          display: block;
          color: #69736D;
          margin-top: 9px;
          font-size: 10px;
        }

        /* FORM */

        .profile-form-card {
          padding: 30px;
        }

        .form-section {
          padding-bottom: 28px;
          margin-bottom: 28px;
          border-bottom: 1px solid #DFE3DC;
        }

        .form-section:last-of-type {
          border-bottom: none;
          margin-bottom: 0;
        }

        .section-title {
          margin-bottom: 20px;
        }

        .section-title h2 {
          margin: 0 0 5px;
          font-size: 19px;
          color: #202824;
        }

        .section-title p {
          margin: 0;
          color: #69736D;
          font-size: 13px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 18px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 700;
          color: #202824;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          border: 1px solid #DFE3DC;
          border-radius: 8px;
          padding: 11px 12px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          transition: 0.2s;
          background: #FFFEFA;
          color: #202824;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #D75B3E;
          box-shadow: 0 0 0 3px #DFE9DF;
        }

        .form-group input:disabled {
          background: #DFE9DF;
          color: #69736D;
          cursor: not-allowed;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-group small {
          color: #69736D;
          font-size: 11px;
        }

        /* SKILLS */

        .skill-preview {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 10px;
        }

        .skill-tag {
          background: #DFE9DF;
          color: #202824;
          padding: 6px 9px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 700;
        }

        /* ACTIONS */

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          padding-top: 5px;
        }

        .cancel-btn,
        .save-btn {
          padding: 11px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
          font-size: 13px;
        }

        .cancel-btn {
          background: #FFFEFA;
          color: #D75B3E;
          border: 1px solid #DFE3DC;
        }

        .save-btn {
          background: #D75B3E;
          color: #FFFEFA;
          border: 1px solid #D75B3E;
        }

        .save-btn:hover {
          background: #202824;
        }

        .save-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .profile-layout {
            grid-template-columns: 1fr;
          }

          .profile-sidebar {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }

          .profile-card,
          .completion-card,
          .resume-card {
            margin-bottom: 0;
          }
        }

        @media (max-width: 700px) {
          .navbar {
            height: auto;
            padding: 15px 5%;
            gap: 12px;
          }

          .navbar-right {
            flex-wrap: wrap;
            justify-content: flex-end;
            gap: 9px;
          }

          .welcome-text {
            display: none;
          }

          .nav-link {
            font-size: 12px;
          }

          .profile-container {
            width: 94%;
            padding-top: 25px;
          }

          .profile-header h1 {
            font-size: 27px;
          }

          .profile-sidebar {
            grid-template-columns: 1fr;
          }

          .profile-form-card {
            padding: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .logo {
            font-size: 20px;
          }

          .logout-btn {
            padding: 8px 10px;
            font-size: 12px;
          }

          .form-actions {
            flex-direction: column-reverse;
          }

          .cancel-btn,
          .save-btn {
            width: 100%;
          }
        }

      `}</style>
    </div>
  );
};

export default Profile;

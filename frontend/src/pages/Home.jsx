import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const closeMenuOnScroll = () => setMobileMenuOpen(false);
    window.addEventListener("scroll", closeMenuOnScroll, { passive: true });
    return () => window.removeEventListener("scroll", closeMenuOnScroll);
  }, [mobileMenuOpen]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (location.trim()) params.set("location", location.trim());
    const query = params.toString();
    const destination = `/candidate-dashboard${query ? `?${query}` : ""}`;

    if (user) {
      navigate(destination);
    } else {
      navigate(`/login?redirect=${encodeURIComponent(destination)}`);
    }
  };

  const dashboardPath = user?.role === "recruiter" ? "/recruiter-dashboard" : "/candidate-dashboard";
  const profilePath = user?.role === "recruiter" ? "/recruiter-dashboard" : "/profile";

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="home-page">
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          background: #F6F6F1;
          color: #202824;
          overflow-x: hidden;
          width: 100%;
        }

        a {
          text-decoration: none;
        }

        button,
        input {
          font: inherit;
        }

        .home-page {
          min-height: 100vh;
          background: #F6F6F1;
          color: #202824;
          width: 100%;
          overflow-x: hidden;
        }

        /* =====================================================
           NAVBAR
        ===================================================== */

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          height: 74px;
          background: #FFFEFA;
          border-bottom: 1px solid #DFE3DC;
          width: 100%;
        }

        .navbar-container {
          width: min(94%, 1200px);
          height: 100%;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        /* =====================================================
           BRAND
        ===================================================== */

        .brand {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #202824;
          font-size: 20px;
          font-weight: 800;
          flex-shrink: 0;
        }

        .brand-icon {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          color: #FFFEFA;
          font-size: 17px;
          background: #D75B3E;
        }

        /* =====================================================
           NAV LINKS (Desktop)
        ===================================================== */

        .nav-links {
          display: flex;
          align-items: center;
          gap: 34px;
          margin-left: auto;
          margin-right: 30px;
        }

        .nav-links a {
          position: relative;
          color: #69736D;
          font-size: 14px;
          font-weight: 650;
          transition: color 0.2s ease;
        }

        .nav-links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 0;
          height: 2px;
          background: #D75B3E;
          transition: width 0.25s ease;
        }

        .nav-links a:hover {
          color: #D75B3E;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        /* =====================================================
           NAV ACTIONS & HAMBURGER TOGGLE
        ===================================================== */

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
        }

        .login-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 38px;
          padding: 8px 14px;
          color: #202824;
          border: 1px solid transparent;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }

        .login-btn:hover {
          background: #DFE9DF;
          border-color: #DFE9DF;
          transform: translateY(-1px);
        }

        .register-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 38px;
          padding: 8px 14px;
          color: #FFFEFA;
          border: 2px solid #D75B3E;
          border-radius: 8px;
          background: #D75B3E;
          font-size: 13px;
          font-weight: 750;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .register-btn:hover {
          background: #202824;
          border-color: #202824;
          color: #FFFEFA;
        }

        .hamburger-btn {
          display: none;
          background: transparent;
          border: 1px solid #DFE3DC;
          border-radius: 6px;
          cursor: pointer;
          font-size: 20px;
          color: #202824;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          padding: 0;
          flex-shrink: 0;
        }

        /* =====================================================
           HERO
        ===================================================== */

        .hero {
          position: relative;
          min-height: 610px;
          padding: 105px 6vw 80px;
          background: #ECEEE7;
          overflow: hidden;
          width: 100%;
        }

        .hero::after {
          position: absolute;
          top: 12%;
          right: max(6vw, calc((100vw - 1200px) / 2));
          width: 36%;
          height: 76%;
          border-radius: 6px;
          background: url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85') center / cover;
          content: '';
        }

        .hero-container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          text-align: left;
          width: 100%;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          border-radius: 4px;
          color: #355747;
          background: #DFE9DF;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          margin-bottom: 26px;
        }

        .hero h1 {
          max-width: 650px;
          margin: 0;
          font-size: clamp(34px, 5.8vw, 72px);
          line-height: 1.08;
          font-weight: 850;
          color: #202824;
        }

        .hero h1 .gradient-text {
          color: #D75B3E;
        }

        .hero-description {
          max-width: 560px;
          margin: 23px 0 36px;
          color: #69736D;
          font-size: 17px;
          line-height: 1.7;
        }

        /* =====================================================
           SEARCH
        ===================================================== */

        .search-box {
          width: 100%;
          max-width: 620px;
          margin: 0;
          padding: 7px;
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 8px;
          background: #FFFEFA;
          border: 1px solid #DFE3DC;
          border-radius: 10px;
          box-shadow: 0 12px 30px rgba(32, 40, 36, .08);
        }

        .search-input {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 0 16px;
          min-height: 55px;
          border-radius: 6px;
          background: #FFFEFA;
          min-width: 0;
        }

        .search-icon {
          font-size: 19px;
          flex-shrink: 0;
        }

        .search-input input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #202824;
          font-size: 14px;
          min-width: 0;
        }

        .search-input input::placeholder {
          color: #8B938E;
        }

        .search-button {
          min-width: 145px;
          border: none;
          border-radius: 6px;
          color: #FFFEFA;
          cursor: pointer;
          background: #D75B3E;
          font-weight: 700;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .search-button:hover {
          transform: translateY(-1px);
          background: #C44E31;
        }

        .hero-actions {
          margin-top: 26px;
          display: flex;
          justify-content: flex-start;
          gap: 12px;
        }

        .browse-btn {
          padding: 12px 22px;
          border-radius: 6px;
          border: none;
          color: #A63D29;
          background: transparent;
          font-size: 14px;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .browse-btn:hover {
          color: #202824;
        }

        /* =====================================================
           SECTION
        ===================================================== */

        .section {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          padding: 80px 24px;
        }

        .section.opportunities-section {
          width: calc(100% - 48px);
          max-width: 1152px;
          margin: 64px auto;
          padding: 56px;
          background: #323E37;
          border: 1px solid #46534B;
          border-radius: 12px;
        }

        .opportunities-section .section-heading span {
          color: #DFE9DF;
        }

        .opportunities-section .section-heading h2 {
          color: #FFFFFF;
        }

        .opportunities-section .section-heading p {
          color: #D7DED9;
        }

        .section-heading {
          text-align: left;
          margin-bottom: 42px;
        }

        .section-heading span {
          color: #A63D29;
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.4px;
        }

        .section-heading h2 {
          margin: 10px 0;
          color: #202824;
          font-size: 38px;
          letter-spacing: -1px;
        }

        .section-heading p {
          margin: 0;
          max-width: 600px;
          color: #69736D;
          line-height: 1.6;
          font-size: 15px;
        }

        /* =====================================================
           CATEGORIES
        ===================================================== */

        .categories {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
        }

        .category-card {
          padding: 25px 20px;
          border: 1px solid #DFE3DC;
          border-radius: 8px;
          background: #FFFEFA;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: border-color 0.2s ease, transform 0.2s ease;
          cursor: pointer;
          width: 100%;
          min-width: 0;
        }

        .category-card:hover {
          border-color: #D75B3E;
          transform: translateY(-2px);
        }

        .category-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          background: #F8E7DF;
          color: #A63D29;
          font-size: 21px;
          flex-shrink: 0;
        }

        .category-copy {
          flex-grow: 1;
          min-width: 0;
        }

        .category-card h3 {
          margin: 0 0 5px;
          color: #202824;
          font-size: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .category-card p {
          margin: 0;
          color: #69736D;
          font-size: 13px;
        }

        .category-arrow {
          color: #A63D29;
          font-size: 20px;
          flex-shrink: 0;
        }

        /* =====================================================
           FEATURES
        ===================================================== */

        .features-section {
          background: #202824;
          color: #FFFEFA;
          border-top: 1px solid #323E37;
          border-bottom: 1px solid #323E37;
          width: 100%;
        }

        .features-section .section-heading h2 {
          color: #FFFEFA;
        }

        .features-section .section-heading p {
          color: #A8B3AD;
        }

        .features {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          width: 100%;
        }

        .feature-card {
          padding: 30px;
          border: 1px solid #323E37;
          border-radius: 8px;
          background: #28332D;
          transition: border-color 0.2s ease;
          width: 100%;
          min-width: 0;
        }

        .feature-card:hover {
          border-color: #D75B3E;
        }

        .feature-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border-radius: 6px;
          color: #FFFEFA;
          background: #D75B3E;
          font-size: 23px;
        }

        .feature-card h3 {
          margin: 0 0 10px;
          color: #FFFEFA;
          font-size: 18px;
        }

        .feature-card p {
          margin: 0;
          color: #A8B3AD;
          font-size: 14px;
          line-height: 1.7;
        }

        /* =====================================================
           RECRUITER CTA
        ===================================================== */

        .recruiter-section {
          padding: 80px 24px;
          background: #F6F6F1;
          width: 100%;
        }

        .recruiter-card {
          width: 100%;
          max-width: 1152px;
          margin: auto;
          padding: 55px 60px;
          border-radius: 12px;
          color: #FFFEFA;
          background: #202824;
          box-shadow: 0 16px 36px rgba(32, 40, 36, 0.12);
        }

        .recruiter-content {
          max-width: 680px;
          width: 100%;
        }

        .recruiter-card h2 {
          margin: 0 0 14px;
          font-size: 34px;
          letter-spacing: -1px;
          color: #FFFEFA;
        }

        .recruiter-card p {
          margin: 0 0 27px;
          color: rgba(255, 254, 250, 0.82);
          line-height: 1.7;
          font-size: 15px;
        }

        .recruiter-btn {
          display: inline-block;
          padding: 12px 24px;
          border-radius: 6px;
          border: none;
          color: #202824;
          background: #D75B3E;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .recruiter-btn:hover {
          background: #DFE9DF;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .footer {
          border-top: 1px solid #DFE3DC;
          background: #202824;
          color: #FFFEFA;
          width: 100%;
        }

        .footer-container {
          width: 100%;
          max-width: 1200px;
          margin: auto;
          padding: 55px 24px 25px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 50px;
          padding-bottom: 45px;
          width: 100%;
        }

        .footer-brand p {
          max-width: 310px;
          margin-top: 16px;
          color: #A8B3AD;
          font-size: 14px;
          line-height: 1.7;
        }

        .footer-column h4 {
          margin: 4px 0 17px;
          color: #FFFEFA;
          font-size: 14px;
        }

        .footer-column a {
          display: block;
          margin-bottom: 11px;
          color: #A8B3AD;
          font-size: 13px;
          transition: color 0.2s ease;
        }

        .footer-column a:hover {
          color: #D75B3E;
        }

        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 22px;
          border-top: 1px solid #323E37;
          color: #A8B3AD;
          font-size: 12px;
          width: 100%;
        }

        .footer-bottom-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .footer-bottom-links a {
          color: #A8B3AD;
        }

        .footer-bottom-links a:hover {
          color: #D75B3E;
        }

        /* =====================================================
           RESPONSIVE DESIGN & MOBILE HAMBURGER
        ===================================================== */

        @media (max-width: 950px) {
          .hamburger-btn {
            display: flex;
          }

          .nav-links {
            position: fixed;
            top: 74px;
            left: 0;
            width: 100%;
            background: #FFFEFA;
            flex-direction: column;
            align-items: flex-start;
            padding: 24px;
            gap: 20px;
            margin: 0;
            border-bottom: 1px solid #DFE3DC;
            box-shadow: 0 10px 20px rgba(0,0,0,0.05);
            display: none;
            z-index: 999;
          }

          .nav-links.mobile-open {
            display: flex;
          }

          .nav-links a::after {
            display: none;
          }

          .categories {
            grid-template-columns: 1fr;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .footer-top {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 700px) {
          .navbar-container {
            width: 96%;
          }

          .brand {
            font-size: 18px;
            gap: 7px;
          }

          .brand-icon {
            width: 34px;
            height: 34px;
            font-size: 15px;
          }

          .login-btn {
            display: none; /* Hide standard login on very small screens to ensure Register & Hamburger fit perfectly; can still access via mobile menu if desired */
          }

          .hero {
            padding: 55px 16px 55px;
            min-height: auto;
          }

          .hero::after {
            position: relative;
            display: block;
            top: auto;
            right: auto;
            width: 100%;
            height: 200px;
            margin-top: 28px;
          }

          .search-box {
            grid-template-columns: 1fr;
          }

          .recruiter-card {
            padding: 32px 20px;
          }

          .footer-top {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .section {
            padding: 50px 16px;
          }

          .section.opportunities-section {
            width: calc(100% - 32px);
            margin: 40px auto;
            padding: 30px 18px;
          }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-container">
          <Link to="/" className="brand">
            <div className="brand-icon">CH </div>
            <span>Career Hub</span>
          </Link>

          <div className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
            <a href="#discover" onClick={closeMobileMenu}>Discover</a>
            <a href="#how-it-works" onClick={closeMobileMenu}>How it works</a>
            <a href="#employers" onClick={closeMobileMenu}>For employers</a>
            <Link to="/candidate-dashboard" onClick={closeMobileMenu}>Open roles</Link>
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <Link to={dashboardPath} className="login-btn" onClick={closeMobileMenu}>
                  Dashboard
                </Link>
                <Link to={profilePath} className="register-btn" onClick={closeMobileMenu}>
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="login-btn" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link to="/register" className="register-btn" onClick={closeMobileMenu}>
                  Register
                </Link>
              </>
            )}
            <button 
              className="hamburger-btn" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-container">
            <div className="hero-badge">New listings added every week</div>
            <h1>
              Search Roles.
              <br />
              <span className="gradient-text">Apply in Minutes.</span>
            </h1>

            <p className="hero-description">
              Browse open roles by title, skill, or location, track every application in one dashboard, and hear back from recruiters without leaving Career Hub.
            </p>

            <div className="search-box">
              <div className="search-input">
                <span className="search-icon">🔎</span>
                <input
                  type="text"
                  placeholder="Job title, skills or keywords"
                  aria-label="Job title, skills or keywords"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                />
              </div>

              <div className="search-input">
                <span className="search-icon">📍</span>
                <input
                  type="text"
                  placeholder="Location"
                  aria-label="Job location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  onKeyDown={(event) => event.key === "Enter" && handleSearch()}
                />
              </div>

              <button className="search-button" onClick={handleSearch}>
                Search Jobs
              </button>
            </div>

            <div className="hero-actions">
              <Link to="/candidate-dashboard" className="browse-btn">
                Browse All Jobs →
              </Link>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section opportunities-section" id="discover">
          <div className="section-heading">
            <span>Explore Opportunities</span>
            <h2>Popular Job Categories</h2>
            <p>Explore roles across some of the most in-demand career fields.</p>
          </div>

          <div className="categories">
            <Link className="category-card" to="/candidate-dashboard?search=Software%20Development">
              <div className="category-icon">💻</div>
              <div className="category-copy">
                <h3>Software Development</h3>
                <p>Frontend, Backend &amp; Full Stack</p>
              </div>
              <span className="category-arrow" aria-hidden="true">→</span>
            </Link>

            <Link className="category-card" to="/candidate-dashboard?search=AI%20Machine%20Learning">
              <div className="category-icon">🤖</div>
              <div className="category-copy">
                <h3>AI &amp; Machine Learning</h3>
                <p>AI, ML &amp; Data Science</p>
              </div>
              <span className="category-arrow" aria-hidden="true">→</span>
            </Link>

            <Link className="category-card" to="/candidate-dashboard?search=Data%20Analytics">
              <div className="category-icon">📊</div>
              <div className="category-copy">
                <h3>Data &amp; Analytics</h3>
                <p>Analytics, SQL &amp; BI</p>
              </div>
              <span className="category-arrow" aria-hidden="true">→</span>
            </Link>

            <Link className="category-card" to="/candidate-dashboard?search=Design%20Creative">
              <div className="category-icon">🎨</div>
              <div className="category-copy">
                <h3>Design &amp; Creative</h3>
                <p>UI/UX, Graphics &amp; Product</p>
              </div>
              <span className="category-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

        {/* FEATURES */}
        <section className="features-section" id="how-it-works">
          <div className="section">
            <div className="section-heading">
              <span>Why Career Hub</span>
              <h2>Everything You Need to Get Hired</h2>
              <p>Search, apply, and track applications from a single dashboard built for candidates.</p>
            </div>

            <div className="features">
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3>Find Relevant Jobs</h3>
                <p>Search through available opportunities and discover roles that match your skills, experience, and career goals.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Apply Easily</h3>
                <p>Upload your resume and apply to jobs through a simple, streamlined application process.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📈</div>
                <h3>Track Applications</h3>
                <p>Keep track of your applications and monitor their progress from one convenient dashboard.</p>
              </div>
            </div>
          </div>
        </section>

        {/* RECRUITER CTA */}
        <section className="recruiter-section" id="employers">
          <div className="recruiter-card">
            <div className="recruiter-content">
              <h2>Looking for Great Talent?</h2>
              <p>Build your team with talented candidates. Post your job, manage applications, and find the right people for your organization.</p>
              <button className="recruiter-btn" onClick={() => navigate("/register")}>
                Start Hiring →
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <Link to="/" className="brand">
                <div className="brand-icon">💼</div>
                <span>Career Hub</span>
              </Link>
              <p>Connecting talented people with meaningful opportunities and helping companies build great teams.</p>
            </div>

            <div className="footer-column">
              <h4>Platform</h4>
              <Link to="/">Home</Link>
              <Link to="/candidate-dashboard">Find Jobs</Link>
              <a href="#employers">For Employers</a>
            </div>

            <div className="footer-column">
              <h4>For Candidates</h4>
              <Link to="/candidate-dashboard">Browse Jobs</Link>
              <Link to="/my-applications">My Applications</Link>
            </div>

            <div className="footer-column">
              <h4>For Employers</h4>
              <Link to="/register">Post a Job</Link>
              <Link to="/register">Find Candidates</Link>
              <Link to="/register">Hire Talent</Link>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Career Hub. All rights reserved.</span>
            <div className="footer-bottom-links">
              <Link to="/privacy-policy">Privacy</Link>
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

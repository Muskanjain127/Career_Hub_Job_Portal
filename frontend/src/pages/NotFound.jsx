import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-page">
      <style>{`
        * {
          box-sizing: border-box;
        }

        .notfound-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 18px;
          text-align: center;
          padding: 24px;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            Roboto,
            Helvetica,
            Arial,
            sans-serif;
          background: #FFFEFA;
          color: #202824;
        }

        .notfound-code {
          font-size: 96px;
          font-weight: 850;
          letter-spacing: -3px;
          line-height: 1;
          background: linear-gradient(135deg, #D75B3E, #F2A48F);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .notfound-page h1 {
          margin: 0;
          font-size: 26px;
          font-weight: 750;
          color: #202824;
        }

        .notfound-page p {
          max-width: 420px;
          margin: 0;
          color: #69736D;
          font-size: 15px;
          line-height: 1.6;
        }

        .notfound-actions {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .notfound-home {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 10px;
          color: #FFFEFA;
          font-size: 14px;
          font-weight: 700;
          background: linear-gradient(135deg, #D75B3E, #202824);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .notfound-home:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px rgba(215, 91, 62, 0.28);
        }

        .notfound-jobs {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 10px;
          color: #D75B3E;
          font-size: 14px;
          font-weight: 700;
          background: #FFFCD9;
          transition: background 0.2s ease, transform 0.2s ease;
        }

        .notfound-jobs:hover {
          background: #FFF6A8;
          transform: translateY(-1px);
        }
      `}</style>

      <span className="notfound-code">404</span>
      <h1>This page doesn't exist</h1>
      <p>
        The page you're looking for may have been moved, renamed,
        or never existed. Check the URL, or head back to a page
        that does.
      </p>

      <div className="notfound-actions">
        <Link to="/" className="notfound-home">
          Go to Homepage
        </Link>
        <Link to="/candidate-dashboard" className="notfound-jobs">
          Browse Jobs
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

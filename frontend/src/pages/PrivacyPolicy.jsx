import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <style>{`
        .legal-page, .legal-page *, .legal-page *::before, .legal-page *::after {
          box-sizing: border-box;
        }

        .legal-page a {
          text-decoration: none;
        }

        .legal-page {
          min-height: 100vh;
          background: #FFFEFA;
          color: #202824;
          width: 100%;
          overflow-x: hidden;
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .legal-topbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          height: 74px;
          background: #FFFEFA;
          border-bottom: 1px solid #DFE3DC;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .legal-topbar-inner {
          width: min(92%, 860px);
          margin: 0 auto;
          display: flex;
          align-items: center;
        }

        .legal-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #D75B3E;
          font-size: 14px;
          font-weight: 750;
          transition: color 0.2s ease;
        }

        .legal-back:hover {
          color: #202824;
        }

        .legal-container {
          width: min(92%, 960px);
          margin: 40px auto 72px;
          padding: 52px 64px 64px;
          background: #323E37;
          border: 1px solid #46534B;
          border-radius: 14px;
          box-shadow: 0 18px 48px rgba(32, 40, 36, 0.14);
        }

        .legal-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 14px;
          color: #DFE9DF;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .legal-kicker::before {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D75B3E;
          content: "";
        }

        .legal-container h1 {
          font-size: clamp(32px, 5vw, 42px);
          letter-spacing: 0;
          margin: 0 0 10px;
          color: #FFFFFF;
          font-weight: 700;
        }

        .legal-updated {
          color: #D7DED9;
          font-size: 14px;
          margin: 0 0 28px;
        }

        .legal-container h2 {
          font-size: 20px;
          margin: 32px 0 12px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
          font-weight: 750;
        }

        .legal-container p {
          color: #F1F4F2;
          font-size: 15px;
          line-height: 1.75;
          margin: 0 0 16px;
        }

        .legal-container li {
          color: #F1F4F2;
          font-size: 15px;
          line-height: 1.75;
        }

        .legal-container ul {
          margin: 0 0 16px;
          padding-left: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .legal-container a {
          color: #FFFFFF;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .legal-container a:hover {
          color: #DFE9DF;
        }

        @media (max-width: 700px) {
          .legal-topbar {
            height: 64px;
          }

          .legal-container {
            width: calc(100% - 32px);
            margin: 22px auto 40px;
            padding: 30px 22px 38px;
            border-radius: 10px;
          }

          .legal-updated {
            margin-bottom: 24px;
          }

          .legal-container h2 {
            margin-top: 26px;
            padding-top: 16px;
          }
        }
      `}</style>

      <div className="legal-topbar">
        <div className="legal-topbar-inner">
          <Link to="/" className="legal-back">
            ← Back to Career Hub
          </Link>
        </div>
      </div>

      <div className="legal-container">
        <div className="legal-kicker">Your privacy matters</div>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: September 2026</p>

        <p>
          This Privacy Policy explains how Career Hub ("we", "us")
          collects, uses, and protects information when you use
          this platform to search for jobs, apply to roles, or
          post job listings.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>Account details you provide, such as your name, email address, and password.</li>
          <li>Profile information, including resume details, skills, education, and work experience.</li>
          <li>Job listings and applicant data submitted by recruiters.</li>
          <li>Usage data such as pages visited and actions taken within the platform, used to keep the service working correctly.</li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>To create and manage your candidate or recruiter account.</li>
          <li>To match candidates with relevant job listings and let recruiters review applications.</li>
          <li>To send account-related notifications, such as application status updates.</li>
          <li>To maintain the security and reliability of the platform.</li>
        </ul>

        <h2>How we share information</h2>
        <p>
          When you apply to a job, the information in your profile
          and application is shared with the recruiter who posted
          that listing. We do not sell your personal information
          to third parties.
        </p>

        <h2>Data retention</h2>
        <p>
          We retain account and application data for as long as
          your account is active, or as needed to provide the
          service. You can request deletion of your account and
          associated data at any time.
        </p>

        <h2>Your choices</h2>
        <ul>
          <li>You can edit or remove information from your profile at any time.</li>
          <li>You can request a copy or deletion of your data by contacting us.</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:support@Career Hub.example">support@Career Hub.example</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
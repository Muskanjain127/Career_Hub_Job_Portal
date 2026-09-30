import { Link } from "react-router-dom";

const TermsAndConditions = () => {
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
          display: flex;
          align-items: center;
          border-bottom: 1px solid #DFE3DC;
          background: #FFFEFA;
          width: 100%;
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
          margin: 0 0 8px;
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
        <div className="legal-kicker">Clear terms, better hiring</div>
        <h1>Terms and Conditions</h1>
        <p className="legal-updated">Last updated: September 2026</p>

        <p>
          These Terms and Conditions govern your use of Career Hub.
          By creating an account or using the platform, you agree
          to the terms below.
        </p>

        <h2>Accounts</h2>
        <ul>
          <li>You must provide accurate information when creating a candidate or recruiter account.</li>
          <li>You are responsible for keeping your login credentials secure.</li>
          <li>We may suspend accounts used to post fraudulent listings or submit false information.</li>
        </ul>

        <h2>Candidates</h2>
        <ul>
          <li>Applications are sent to recruiters as submitted; review your profile and resume before applying.</li>
          <li>Career Hub does not guarantee interviews, offers, or employment outcomes.</li>
        </ul>

        <h2>Recruiters</h2>
        <ul>
          <li>Job listings must accurately describe the role, requirements, and compensation.</li>
          <li>Recruiters are responsible for how they use candidate information received through applications.</li>
          <li>Discriminatory, misleading, or spam listings may be removed without notice.</li>
        </ul>

        <h2>Acceptable use</h2>
        <p>
          You agree not to misuse the platform, including attempting
          to access other users' accounts, scraping data at scale,
          or interfering with the normal operation of the service.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          Career Hub is provided on an "as is" basis. We are not
          liable for hiring decisions, the accuracy of listings
          submitted by recruiters, or losses arising from use of
          the platform.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued
          use of the platform after changes take effect means you
          accept the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:support@Career Hub.example">support@Career Hub.example</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;

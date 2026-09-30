
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Remove error when user starts typing again
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login(
        formData.email,
        formData.password
      );

      console.log("LOGIN SUCCESS:", response);

      // Redirect according to role
      if (response.user.role === "recruiter") {
        navigate("/recruiter-dashboard");
      } else {
        const redirect = searchParams.get("redirect");
        navigate(
          redirect?.startsWith("/candidate-dashboard")
            ? redirect
            : "/candidate-dashboard"
        );
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Invalid email or password"
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

        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          background:
            radial-gradient(
              circle at top left,
              rgba(215, 91, 62, 0.18),
              transparent 35%
            ),
            radial-gradient(
              circle at bottom right,
              rgba(32, 40, 36, 0.16),
              transparent 35%
            ),
            #DFE9DF;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .login-wrapper {
          width: 100%;
          max-width: 1050px;
          min-height: 620px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          overflow: hidden;
          background: #FFFEFA;
          border: 1px solid #DFE3DC;
          border-radius: 24px;
          box-shadow:
            0 25px 60px rgba(32, 40, 36, 0.192),
            0 8px 20px rgba(32, 40, 36, 0.08);
        }

        /* ---------------- LEFT SIDE ---------------- */

        .login-brand-section {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 55px;
          overflow: hidden;
          background: linear-gradient(
            145deg,
            #D75B3E 0%,
            #D75B3E 50%,
            #202824 100%
          );
          color: #FFFEFA;
        }

        .login-brand-section::before {
          content: "";
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: rgba(255, 254, 250, 0.08);
          top: -100px;
          right: -100px;
        }

        .login-brand-section::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: rgba(255, 254, 250, 0.06);
          bottom: -90px;
          left: -80px;
        }

        .brand-content {
          position: relative;
          z-index: 2;
        }

        .brand-logo {
          width: 58px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
          border-radius: 16px;
          background: rgba(255, 254, 250, 0.16);
          border: 1px solid rgba(255, 254, 250, 0.2);
          font-size: 28px;
          backdrop-filter: blur(10px);
        }

        .brand-title {
          margin: 0 0 16px;
          font-size: 42px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -1px;
        }

        .brand-description {
          max-width: 420px;
          margin: 0 0 35px;
          color: rgba(255, 254, 250, 0.85);
          font-size: 17px;
          line-height: 1.7;
        }

        .brand-features {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .brand-feature {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 254, 250, 0.95);
          font-size: 15px;
        }

        .feature-icon {
          width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: rgba(255, 254, 250, 0.15);
          font-size: 14px;
        }

        /* ---------------- RIGHT SIDE ---------------- */

        .login-form-section {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px;
          background: #FFFEFA;
        }

        .login-form-container {
          width: 100%;
          max-width: 400px;
        }

        .login-heading {
          margin: 0 0 8px;
          color: #202824;
          font-size: 32px;
          font-weight: 950;
          letter-spacing: -0.7px;
          
        }

        .login-subtitle {
          margin: 0 0 30px;
          color: #69736D;
          font-size: 15px;
          line-height: 1.5;
          
        }

        /* ---------------- ERROR ---------------- */

        .login-error {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 20px;
          padding: 13px 14px;
          border: 1px solid #fecaca;
          border-radius: 10px;
          background: #fef2f2;
          color: #b91c1c;
          font-size: 14px;
          line-height: 1.5;
        }

        .error-icon {
          flex-shrink: 0;
          font-weight: 700;
        }

        /* ---------------- FORM ---------------- */

        .form-group {
          margin-bottom: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          color: #D75B3E;
          font-size: 14px;
          font-weight: 600;
        }

        .input-wrapper {
          position: relative;
        }

        .input-icon {
          position: absolute;
          top: 50%;
          left: 15px;
          transform: translateY(-50%);
          color: #69736D;
          font-size: 17px;
          pointer-events: none;
        }

        .login-input {
          width: 100%;
          height: 50px;
          padding: 0 15px 0 44px;
          border: 1px solid #DFE3DC;
          border-radius: 11px;
          outline: none;
          background: #FFFEFA;
          color: #202824;
          font-size: 15px;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .login-input::placeholder {
          color: #69736D;
        }

        .login-input:hover {
          border-color: #69736D;
        }

        .login-input:focus {
          border-color: #D75B3E;
          background: #FFFEFA;
          box-shadow: 0 0 0 4px rgba(215, 91, 62, 0.1);
        }

        .password-input {
          padding-right: 50px;
        }

        .password-toggle {
          position: absolute;
          top: 50%;
          right: 13px;
          transform: translateY(-50%);
          padding: 6px;
          border: none;
          background: transparent;
          color: #69736D;
          cursor: pointer;
          font-size: 16px;
          border-radius: 6px;
        }

        .password-toggle:hover {
          background: #DFE9DF;
          color: #D75B3E;
        }

        .password-toggle:focus-visible {
          outline: 2px solid #D75B3E;
          outline-offset: 2px;
        }

        /* ---------------- LOGIN BUTTON ---------------- */

        .login-button {
          width: 100%;
          height: 50px;
          margin-top: 6px;
          border: none;
          border-radius: 11px;
          background: #D75B3E;
          color: #FFFEFA;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow:
            0 8px 18px rgba(215, 91, 62, 0.22);
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            opacity 0.2s ease;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 12px 25px rgba(215, 91, 62, 0.3);
        }

        .login-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .login-button:focus-visible {
          outline: 3px solid rgba(215, 91, 62, 0.25);
          outline-offset: 3px;
        }

        .login-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
          box-shadow: none;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          width: 17px;
          height: 17px;
          border: 2px solid rgba(255, 254, 250, 0.4);
          border-top-color: #FFFEFA;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ---------------- REGISTER ---------------- */

        .register-section {
          margin-top: 25px;
          padding-top: 22px;
          border-top: 1px solid #DFE3DC;
          text-align: center;
        }

        .register-text {
          margin: 0;
          color: #69736D;
          font-size: 14px;
        }

        .register-link {
          margin-left: 4px;
          color: #D75B3E;
          font-weight: 700;
          text-decoration: none;
        }

        .register-link:hover {
          color: #202824;
          text-decoration: underline;
        }

        .register-link:focus-visible {
          outline: 2px solid #D75B3E;
          outline-offset: 3px;
          border-radius: 3px;
        }

        /* ---------------- RESPONSIVE ---------------- */

        @media (max-width: 850px) {
          .login-wrapper {
            max-width: 500px;
            grid-template-columns: 1fr;
          }

          .login-brand-section {
            padding: 40px;
          }

          .brand-title {
            font-size: 34px;
          }

          .brand-description {
            margin-bottom: 25px;
          }

          .brand-features {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .login-form-section {
            padding: 40px;
          }
        }

        @media (max-width: 520px) {
          .login-page {
            padding: 15px;
            align-items: flex-start;
            padding-top: 25px;
          }

          .login-wrapper {
            border-radius: 18px;
          }

          .login-brand-section {
            padding: 30px 25px;
          }

          .brand-logo {
            width: 50px;
            height: 50px;
            margin-bottom: 20px;
          }

          .brand-title {
            font-size: 29px;
          }

          .brand-description {
            font-size: 15px;
          }

          .brand-features {
            grid-template-columns: 1fr;
            gap: 11px;
          }

          .login-form-section {
            padding: 35px 25px;
          }

          .login-heading {
            font-size: 28px;
          }
        }
      `}</style>

      <style>{`
        .login-page {
          padding: 48px 24px !important;
          background: #eceee7 !important;
          font-family: 'DM Sans', 'Segoe UI', sans-serif !important;
        }

        .login-wrapper {
          max-width: 1080px !important;
          min-height: 620px !important;
          grid-template-columns: 1.05fr .95fr !important;
          border: 1px solid #dfe3dc !important;
          border-radius: 4px !important;
          background: #fffefa !important;
          box-shadow: 0 22px 55px rgba(32, 40, 36, .12) !important;
        }

        .login-brand-section {
          min-height: 620px;
          padding: 54px !important;
          background:
            linear-gradient(150deg, rgba(32, 40, 36, .38), rgba(32, 40, 36, .84)),
            url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85') center / cover !important;
          color: #fffefa !important;
        }

        .login-brand-section::before,
        .login-brand-section::after {
          display: none !important;
        }

        .brand-logo {
          border: 1px solid rgba(255, 254, 250, .35) !important;
          border-radius: 4px !important;
          background: rgba(255, 254, 250, .14) !important;
        }

        .brand-title {
          max-width: 430px;
          font-family: 'DM Serif Display', Georgia, serif !important;
          font-size: 48px !important;
          font-weight: 400 !important;
          letter-spacing: 0 !important;
        }

        .brand-description {
          color: rgba(255, 254, 250, .82) !important;
        }

        .brand-features {
          display: none !important;
        }

        .login-form-section {
          padding: 58px !important;
          background: #fffefa !important;
        }

        .login-heading {
          margin-bottom: 10px !important;
          color: #202824 !important;
          font-family: 'DM Serif Display', Georgia, serif !important;
          font-size: 40px !important;
          font-weight: 400 !important;
          letter-spacing: 0 !important;
        }

        .login-subtitle,
        .register-text {
          color: #69736d !important;
        }

        .form-label {
          color: #202824 !important;
        }

        .login-input {
          height: 54px !important;
          border: 1px solid #dfe3dc !important;
          border-radius: 4px !important;
          background: #fffefa !important;
          color: #202824 !important;
        }

        .login-input:focus {
          border-color: #d75b3e !important;
          box-shadow: 0 0 0 3px rgba(215, 91, 62, .13) !important;
        }

        .login-button {
          height: 54px !important;
          border-radius: 4px !important;
          background: #d75b3e !important;
          box-shadow: none !important;
        }

        .login-button:hover:not(:disabled) {
          background: #a63d29 !important;
          box-shadow: none !important;
        }

        .register-section {
          border-color: #dfe3dc !important;
        }

        .register-link {
          color: #a63d29 !important;
        }

        @media (max-width: 850px) {
          .login-page {
            padding: 32px 20px !important;
          }

          .login-wrapper {
            max-width: 600px !important;
            min-height: 0 !important;
            grid-template-columns: 1fr !important;
          }

          .login-brand-section {
            min-height: 300px;
            padding: 38px !important;
          }

          .brand-title {
            font-size: 42px !important;
          }

          .login-form-section {
            padding: 42px !important;
          }
        }

        @media (max-width: 520px) {
          .login-page {
            padding: 12px !important;
          }

          .login-wrapper {
            width: 100%;
          }

          .login-brand-section {
            min-height: 240px;
            padding: 28px 22px !important;
          }

          .brand-logo {
            width: 48px;
            height: 48px;
            margin-bottom: 18px;
          }

          .brand-title {
            font-size: 34px !important;
          }

          .brand-description {
            margin-bottom: 0;
            font-size: 15px;
          }

          .login-form-section {
            padding: 32px 22px !important;
          }

          .login-heading {
            font-size: 34px !important;
          }
        }
      `}</style>

      <main className="login-page">
        <div className="login-wrapper">

          {/* LEFT BRAND SECTION */}
          <section className="login-brand-section">
            <div className="brand-content">
              <div className="brand-logo" aria-hidden="true">
  CH              </div>

              <h1 className="brand-title">
                Welcome Back!
              </h1>

              <p className="brand-description">
                Find your next opportunity and connect with
                the right companies through our Career Hub.
              </p>

              <div className="brand-features">
                <div className="brand-feature">
                  <span className="feature-icon">✓</span>
                  <span>Discover exciting job opportunities</span>
                </div>

                <div className="brand-feature">
                  <span className="feature-icon">✓</span>
                  <span>Apply to jobs with ease</span>
                </div>

                <div className="brand-feature">
                  <span className="feature-icon">✓</span>
                  <span>Connect with top recruiters</span>
                </div>
              </div>
            </div>
          </section>

          {/* LOGIN FORM */}
          <section className="login-form-section">
            <div className="login-form-container">

              <h2 className="login-heading">
                Sign in
              </h2>

              <p className="login-subtitle">
                Enter your credentials to access your account.
              </p>

              {error && (
                <div
                  className="login-error"
                  role="alert"
                  aria-live="assertive"
                >
                  <span className="error-icon">!</span>
                  <span>{error}</span>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                aria-busy={loading}
              >

                {/* EMAIL */}
                <div className="form-group">
                  <label
                    className="form-label"
                    htmlFor="email"
                  >
                    Email address
                  </label>

                  <div className="input-wrapper">
                    <span
                      className="input-icon"
                      aria-hidden="true"
                    >
                      ✉
                    </span>

                    <input
                      className="login-input"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      required
                      aria-required="true"
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="form-group">
                  <label
                    className="form-label"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <div className="input-wrapper">
                    <span
                      className="input-icon"
                      aria-hidden="true"
                    >
                      🔒
                    </span>

                    <input
                      className="login-input password-input"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                      required
                      aria-required="true"
                    />

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? "🙈" : "👁"}
                    </button>
                  </div>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="login-button"
                  disabled={loading}
                  aria-busy={loading}
                  aria-label={loading ? "Signing in" : undefined}
                >
                  <span className="button-content">
                    {loading && (
                      <span
                        className="spinner"
                        aria-hidden="true"
                      />
                    )}

                    {!loading && "Sign In"}
                  </span>
                </button>
              </form>

              {/* REGISTER */}
              <div className="register-section">
                <p className="register-text">
                  Don't have an account?
                  <Link
                    to="/register"
                    className="register-link"
                  >
                    Create an account
                  </Link>
                </p>
              </div>

            </div>
          </section>

        </div>
      </main>
    </>
  );
};

export default Login;


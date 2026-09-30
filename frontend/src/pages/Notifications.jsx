
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Notifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState(null);

  // ========================================
  // FETCH NOTIFICATIONS
  // ========================================

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/notifications");

      if (response.data.success) {
        setNotifications(response.data.notifications || []);
        setUnreadCount(response.data.unreadCount || 0);
      }
    } catch (error) {
      console.error("FETCH NOTIFICATIONS ERROR:", error);

      setError(
        error.response?.data?.message ||
          "Failed to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD ON PAGE OPEN
  // ========================================

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ========================================
  // MARK ONE AS READ
  // ========================================

  const markAsRead = async (id) => {
    try {
      setProcessingId(id);

      const response = await api.put(
        `/notifications/${id}/read`
      );

      if (response.data.success) {
        setNotifications((previous) =>
          previous.map((notification) =>
            notification._id === id
              ? {
                  ...notification,
                  isRead: true,
                }
              : notification
          )
        );

        setUnreadCount((previous) =>
          previous > 0 ? previous - 1 : 0
        );
      }
    } catch (error) {
      console.error(
        "MARK NOTIFICATION READ ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to mark notification as read."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ========================================
  // MARK ALL AS READ
  // ========================================

  const markAllAsRead = async () => {
    try {
      setProcessingId("all");

      const response = await api.put(
        "/notifications/read-all"
      );

      if (response.data.success) {
        setNotifications((previous) =>
          previous.map((notification) => ({
            ...notification,
            isRead: true,
          }))
        );

        setUnreadCount(0);
      }
    } catch (error) {
      console.error(
        "MARK ALL NOTIFICATIONS ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to mark all notifications as read."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ========================================
  // DELETE NOTIFICATION
  // ========================================

  const deleteNotification = async (id) => {
    try {
      setProcessingId(id);

      const notification = notifications.find(
        (item) => item._id === id
      );

      const response = await api.delete(
        `/notifications/${id}`
      );

      if (response.data.success) {
        setNotifications((previous) =>
          previous.filter(
            (item) => item._id !== id
          )
        );

        if (notification && !notification.isRead) {
          setUnreadCount((previous) =>
            previous > 0 ? previous - 1 : 0
          );
        }
      }
    } catch (error) {
      console.error(
        "DELETE NOTIFICATION ERROR:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete notification."
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ========================================
  // NOTIFICATION ICON
  // ========================================

  const getNotificationIcon = (type) => {
    switch (type) {
      case "shortlisted":
        return "⭐";

      case "interview":
        return "📅";

      case "selected":
        return "🎉";

      case "rejected":
        return "❌";

      case "application":
        return "📄";

      default:
        return "🔔";
    }
  };

  // ========================================
  // NOTIFICATION COLOR
  // ========================================

  const getNotificationClass = (type) => {
    switch (type) {
      case "shortlisted":
        return "notification-shortlisted";

      case "interview":
        return "notification-interview";

      case "selected":
        return "notification-selected";

      case "rejected":
        return "notification-rejected";

      case "application":
        return "notification-application";

      default:
        return "notification-general";
    }
  };

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <>
        <style>{`
          .notification-loading-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #DFE9DF;
            font-family: Arial, Helvetica, sans-serif;
            color: #D75B3E;
          }

          .notification-loader {
            width: 42px;
            height: 42px;
            border: 4px solid #DFE3DC;
            border-top-color: #D75B3E;
            border-radius: 50%;
            animation: notificationSpin 0.8s linear infinite;
            margin-bottom: 15px;
          }

          @keyframes notificationSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <div className="notification-loading-page" role="status" aria-label="Loading notifications">
          <div className="notification-loader"></div>
        </div>
      </>
    );
  }

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

        .notifications-page {
          min-height: 100vh;
          background: #DFE9DF;
          padding-bottom: 50px;
        }

        /* ========================================
           NAVBAR
        ======================================== */

        .notifications-navbar {
          height: 70px;
          background: #FFFEFA;
          border-bottom: 1px solid #DFE3DC;

          display: flex;
          align-items: center;
          justify-content: space-between;

          padding: 0 7%;
        }

        .notifications-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #D75B3E;
        }

        .notifications-brand-icon {
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

        .notifications-brand-text {
          margin: 0;
          color: #202824;
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .notification-back-btn {
          border: none;
          background: #D75B3E;
          color: #FFFEFA;

          padding: 10px 17px;
          border-radius: 7px;

          font-size: 14px;
          font-weight: 600;

          cursor: pointer;
        }

        .notification-back-btn:hover {
          background: #202824;
        }

        /* ========================================
           CONTAINER
        ======================================== */

        .notifications-container {
          width: 92%;
          max-width: 900px;

          margin: 35px auto;
        }

        /* ========================================
           HEADER
        ======================================== */

        .notifications-header {
          background: #FFFEFA;
          border-radius: 12px;

          padding: 25px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          box-shadow:
            0 4px 15px rgba(215, 91, 62, 0.108);

          margin-bottom: 20px;
        }

        .notifications-header-left h1 {
          margin: 0 0 7px;
          color: #202824;
          font-size: 30px;
        }

        .notifications-header-left p {
          margin: 0;
          color: #69736D;
          font-size: 14px;
        }

        .unread-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;

          min-width: 28px;
          height: 28px;

          padding: 0 8px;

          margin-left: 8px;

          border-radius: 20px;

          background: #ef4444;
          color: #FFFEFA;

          font-size: 13px;
          font-weight: 700;
        }

        .mark-all-btn {
          border: none;

          padding: 10px 15px;

          border-radius: 7px;

          background: #DFE9DF;
          color: #D75B3E;

          font-size: 14px;
          font-weight: 600;

          cursor: pointer;
        }

        .mark-all-btn:hover {
          background: #DFE9DF;
        }

        .mark-all-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* ========================================
           ERROR
        ======================================== */

        .notification-error {
          background: #fee2e2;
          border: 1px solid #fecaca;
          color: #b91c1c;

          padding: 12px 15px;

          border-radius: 8px;

          margin-bottom: 20px;

          font-size: 14px;
        }

        /* ========================================
           NOTIFICATION CARD
        ======================================== */

        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .notification-card {
          background: #FFFEFA;

          border-radius: 12px;

          padding: 20px;

          display: flex;
          align-items: flex-start;
          gap: 15px;

          border: 1px solid #DFE3DC;

          box-shadow:
            0 3px 12px rgba(215, 91, 62, 0.09);

          transition: 0.2s;
        }

        .notification-card:hover {
          transform: translateY(-1px);
          box-shadow:
            0 6px 18px rgba(215, 91, 62, 0.144);
        }

        .notification-card.unread {
          border-left: 4px solid #D75B3E;
          background: #FFFEFA;
        }

        .notification-icon {
          width: 46px;
          height: 46px;

          flex-shrink: 0;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: #DFE9DF;

          font-size: 21px;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-content h3 {
          margin: 0 0 7px;

          color: #202824;

          font-size: 16px;
        }

        .notification-message {
          margin: 0 0 8px;

          color: #D75B3E;

          font-size: 14px;

          line-height: 1.5;
        }

        .notification-job {
          margin: 0 0 8px;

          color: #D75B3E;

          font-size: 13px;

          font-weight: 600;
        }

        .notification-date {
          color: #69736D;
          font-size: 12px;
        }

        /* ========================================
           ACTIONS
        ======================================== */

        .notification-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;

          flex-shrink: 0;
        }

        .read-btn,
        .delete-btn {
          border: none;

          padding: 8px 11px;

          border-radius: 6px;

          font-size: 12px;
          font-weight: 600;

          cursor: pointer;

          white-space: nowrap;
        }

        .read-btn {
          background: #DFE9DF;
          color: #D75B3E;
        }

        .read-btn:hover {
          background: #DFE9DF;
        }

        .delete-btn {
          background: #fef2f2;
          color: #dc2626;
        }

        .delete-btn:hover {
          background: #fee2e2;
        }

        .read-btn:disabled,
        .delete-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .read-label {
          color: #16a34a;
          font-size: 12px;
          font-weight: 600;
        }

        /* ========================================
           EMPTY STATE
        ======================================== */

        .empty-notifications {
          background: #FFFEFA;

          border-radius: 12px;

          padding: 60px 20px;

          text-align: center;

          box-shadow:
            0 4px 15px rgba(215, 91, 62, 0.108);
        }

        .empty-icon {
          font-size: 55px;
          margin-bottom: 15px;
        }

        .empty-notifications h2 {
          margin: 0 0 8px;
          color: #202824;
          font-size: 22px;
        }

        .empty-notifications p {
          margin: 0;
          color: #69736D;
          font-size: 14px;
        }

        /* ========================================
           TYPE STYLES
        ======================================== */

        .notification-shortlisted .notification-icon {
          background: #fef3c7;
        }

        .notification-interview .notification-icon {
          background: #DFE9DF;
        }

        .notification-selected .notification-icon {
          background: #dcfce7;
        }

        .notification-rejected .notification-icon {
          background: #fee2e2;
        }

        .notification-application .notification-icon {
          background: #DFE9DF;
        }

        /* ========================================
           RESPONSIVE
        ======================================== */

        @media (max-width: 650px) {
          .notifications-navbar {
            padding: 0 20px;
          }

          .notifications-navbar h2 {
            font-size: 18px;
          }

          .notification-back-btn {
            padding: 8px 11px;
          }

          .notifications-container {
            width: 94%;
            margin-top: 25px;
          }

          .notifications-header {
            padding: 20px;

            align-items: flex-start;
            flex-direction: column;

            gap: 15px;
          }

          .notifications-header-left h1 {
            font-size: 25px;
          }

          .notification-card {
            padding: 16px;
          }

          .notification-actions {
            flex-direction: row;
          }

          .notification-icon {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }
        }
      `}</style>

      <div className="notifications-page">

        {/* ========================================
            NAVBAR
        ======================================== */}

        <nav className="notifications-navbar">
          <Link to="/candidate-dashboard" className="notifications-brand" aria-label="Career Hub home">
            <span className="notifications-brand-icon">CH</span>
            <span className="notifications-brand-text">Career Hub</span>
          </Link>

          <button
            className="notification-back-btn"
            onClick={() =>
              navigate("/candidate-dashboard")
            }
          >
            Back to Dashboard
          </button>
        </nav>

        {/* ========================================
            MAIN
        ======================================== */}

        <main className="notifications-container">

          {/* HEADER */}

          <div className="notifications-header">

            <div className="notifications-header-left">
              <h1>
                Notifications

                {unreadCount > 0 && (
                  <span className="unread-badge">
                    {unreadCount}
                  </span>
                )}
              </h1>

              <p>
                Stay updated with your job applications.
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                className="mark-all-btn"
                onClick={markAllAsRead}
                disabled={processingId === "all"}
              >
                {processingId === "all"
                  ? "Marking..."
                  : "Mark all as read"}
              </button>
            )}

          </div>

          {/* ERROR */}

          {error && (
            <div className="notification-error">
              {error}
            </div>
          )}

          {/* ========================================
              NOTIFICATIONS
          ======================================== */}

          {notifications.length === 0 ? (

            <div className="empty-notifications">

              <div className="empty-icon">
                🔔
              </div>

              <h2>
                No notifications yet
              </h2>

              <p>
                You will see updates about your
                applications here.
              </p>

            </div>

          ) : (

            <div className="notifications-list">

              {notifications.map((notification) => (

                <div
                  key={notification._id}
                  className={`
                    notification-card
                    ${notification.isRead ? "" : "unread"}
                    ${getNotificationClass(
                      notification.type
                    )}
                  `}
                >

                  {/* ICON */}

                  <div className="notification-icon">
                    {getNotificationIcon(
                      notification.type
                    )}
                  </div>

                  {/* CONTENT */}

                  <div className="notification-content">

                    <h3>
                      {notification.type
                        ? notification.type
                            .charAt(0)
                            .toUpperCase() +
                          notification.type.slice(1)
                        : "Notification"}
                    </h3>

                    <p className="notification-message">
                      {notification.message}
                    </p>

                    {notification.job && (
                      <p className="notification-job">
                        {notification.job.title}

                        {notification.job.company
                          ? ` • ${notification.job.company}`
                          : ""}
                      </p>
                    )}

                    <span className="notification-date">
                      {formatDate(
                        notification.createdAt
                      )}
                    </span>

                  </div>

                  {/* ACTIONS */}

                  <div className="notification-actions">

                    {!notification.isRead ? (

                      <button
                        className="read-btn"
                        onClick={() =>
                          markAsRead(notification._id)
                        }
                        disabled={
                          processingId ===
                          notification._id
                        }
                      >
                        {processingId ===
                        notification._id
                          ? "..."
                          : "Mark read"}
                      </button>

                    ) : (

                      <span className="read-label">
                        ✓ Read
                      </span>

                    )}

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteNotification(
                          notification._id
                        )
                      }
                      disabled={
                        processingId ===
                        notification._id
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </main>

      </div>
    </>
  );
};

export default Notifications;


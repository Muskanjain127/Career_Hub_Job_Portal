const LoadingSpinner = ({ size = 40, label = "Loading" }) => (
  <span
    className="ui-loading-spinner"
    role="status"
    aria-label={label}
    style={{ width: size, height: size }}
  />
);

export default LoadingSpinner;
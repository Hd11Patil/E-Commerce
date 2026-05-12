function ReplacementTracking({ status }) {
  const steps = ["pending", "approved"];

  const labels = {
    pending: "Requested",
    approved: "Accepted",
    rejected: "Rejected",
  };

  if (status === "rejected") {
    return (
      <div className="tracking cancelled-tracking">
        <div className="step">
          <div className="circle cancelled active" />
          <p className="cancelled-text">Rejected</p>
        </div>
      </div>
    );
  }

  const safeStatus = steps.includes(status) ? status : "pending";
  const current = steps.indexOf(safeStatus);

  return (
    <div className="tracking">
      <div className="tracking-line"></div>

      {steps.map((step, index) => (
        <div key={step} className="step">
          <div className={`circle ${index <= current ? "active" : ""}`} />
          <p>{labels[step]}</p>
        </div>
      ))}
    </div>
  );
}

export default ReplacementTracking;

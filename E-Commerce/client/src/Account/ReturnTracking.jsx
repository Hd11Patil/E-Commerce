// function ReturnTracking({ status }) {
//   const steps = ["pending", "approved", "completed"];

//   const labels = {
//     pending: "Requested",
//     approved: "Approved",
//     completed: "Refund Completed",
//     rejected: "Rejected"
//   };

//   if (status === "rejected") {
//     return (
//       <div className="tracking cancelled-tracking">
//         <div className="step">
//           <div className="circle cancelled active" />
//           <p className="cancelled-text">Rejected</p>
//         </div>
//       </div>
//     );
//   }

//   const current = steps.indexOf(status);

//   return (
//     <div className="tracking">
//       <div className="tracking-line"></div>

//       {steps.map((step, index) => (
//         <div key={step} className="step">
//           <div className={`circle ${index <= current ? "active" : ""}`} />
//           <p>{labels[step]}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ReturnTracking;

// ------------------------------------------------
function ReturnTracking({ status }) {
  const steps = ["pending", "approved", "completed"];

  const labels = {
    pending: "Requested",
    approved: "Approved",
    completed: "Returned",
    rejected: "Rejected",
  };

  // ✅ HANDLE REJECTED
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

  // ✅ SAFE DEFAULT (VERY IMPORTANT)
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

export default ReturnTracking;

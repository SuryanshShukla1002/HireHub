import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const AddJob = () => {
  const [addData, setAddData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    qualifications: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleAddJob = async (e) => {
    e.preventDefault();

    if (
      !addData.title ||
      !addData.companyName ||
      !addData.location ||
      !addData.jobType ||
      !addData.description ||
      !addData.qualifications
    ) {
      setToastMsg("Please fill all the fields");
      setToastType("danger");
      setShowToast(true);
      return;
    }

    if (Number(addData.salary) < 0) {
      setToastMsg("Salary cannot be less than 0");
      setToastType("danger");
      setShowToast(true);
      return;
    }

    try {
      const res = await fetch(
        "https://hire-hub-backend-pi.vercel.app/api/job",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...addData,
            qualifications: addData.qualifications
              .split(/[\n,\.]+/)
              .map((q) => q.trim())
              .filter((q) => q !== ""),
          }),
        },
      );

      if (!res.ok) {
        setToastMsg("Failed to post job");
        setToastType("danger");
      } else {
        setToastMsg("Job posted successfully!");
        setToastType("success");
        setAddData({
          title: "",
          companyName: "",
          location: "",
          salary: "",
          jobType: "",
          description: "",
          qualifications: "",
        });
      }

      setShowToast(true);
    } catch (error) {
      setToastMsg("Something went wrong");
      setToastType("danger");
      setShowToast(true);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <div className="container">
        <h1 className="pt-3 mb-4">Post a Job</h1>

        <form onSubmit={handleAddJob}>
          <div className="mb-3">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter job title"
              value={addData.title}
              onChange={(e) =>
                setAddData({ ...addData, title: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter company name"
              value={addData.companyName}
              onChange={(e) =>
                setAddData({ ...addData, companyName: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter location"
              value={addData.location}
              onChange={(e) =>
                setAddData({ ...addData, location: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Salary</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter salary"
              value={addData.salary}
              onChange={(e) =>
                setAddData({ ...addData, salary: e.target.value })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Job Type</label>
            <select
              className="form-select"
              value={addData.jobType}
              onChange={(e) =>
                setAddData({ ...addData, jobType: e.target.value })
              }
            >
              <option value="">Select job type</option>
              <option value="Full-time (On-site)">Full-time (On-site)</option>
              <option value="Part-time (On-site)">Part-time (On-site)</option>
              <option value="Full-time (Remote)">Full-time (Remote)</option>
              <option value="Part-time (Remote)">Part-time (Remote)</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Job Description</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Enter job description"
              value={addData.description}
              onChange={(e) =>
                setAddData({ ...addData, description: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Job Qualifications</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Enter qualifications (one per line)"
              value={addData.qualifications}
              onChange={(e) =>
                setAddData({ ...addData, qualifications: e.target.value })
              }
            />
          </div>

          <button type="submit" className="btn btn-primary mb-4">
            Post Job
          </button>
        </form>
      </div>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg={toastType}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastType === "success" ? "Success" : "Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default AddJob;

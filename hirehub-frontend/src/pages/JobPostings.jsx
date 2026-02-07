import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";

const JobPostings = () => {
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedJob, setSelectedJob] = useState("");

  const handleFetchJobPost = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/job", {
        method: "GET",
      });

      if (!res.ok) {
        console.log("Fail to fetch the data");
        return;
      }
      const data = await res.json();
      console.log(data);
      setFilteredJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobType = selectedJob
    ? filteredJobs.filter((jobs) => jobs.jobType == selectedJob)
    : filteredJobs;

  const handleDeleteJobPost = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/job/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFilteredJobs((prev) => prev.filter((prevs) => prevs._id !== id));
        setToastMessage("Job posting deleted successfully!");
        setShowToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchJobPost();
  }, []);

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
    >
      <div className="container py-4">
        <div className="row mb-4">
          <div className="col-md-6">
            <select
              className="form-control form-control-lg"
              onChange={(e) => setSelectedJob(e.target.value)}
            >
              <option value="">Select job type</option>
              <option value="Full-time (On-site)">Full-time (On-site)</option>
              <option value="Part-time (On-site)">Part-time (On-site)</option>
              <option value="Full-time (Remote)">Full-time (Remote)</option>
              <option value="Part-time (Remote)">Part-time (Remote)</option>
            </select>
          </div>
        </div>
        <h2 className="mb-4 fw-bold">All Jobs</h2>
        {loading ? (
          <div className="text-center py-5">
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted fs-5">Loading job postings...</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredJobType.length > 0 ? (
              filteredJobType.map((job) => (
                <div className="col-lg-4 col-md-6" key={job._id}>
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title fw-bold mb-3">{job.title}</h5>
                      <p className="card-text mb-2">
                        <strong>Company name:</strong> {job.companyName}
                      </p>
                      <p className="card-text mb-2">
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p className="card-text mb-4">
                        <strong>Job Type:</strong> {job.jobType}
                      </p>
                      <div className="d-flex gap-2">
                        <Link
                          to={`/job/${job._id}`}
                          className="btn btn-primary flex-fill text-center"
                        >
                          See Details
                        </Link>

                        <button
                          className="btn btn-danger flex-fill"
                          onClick={() => handleDeleteJobPost(job._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <h5 className="text-muted">No Job for the selected type</h5>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default JobPostings;

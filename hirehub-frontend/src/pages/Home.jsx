import { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [jobData, setJobData] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
      setJobData(data);
      setFilteredJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJobPost = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/job/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setJobData((prev) => prev.filter((prevs) => prevs._id !== id));
        setFilteredJobs((prev) => prev.filter((prevs) => prevs._id !== id));
        setToastMessage("Job posting deleted successfully!");
        setShowToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredJobs(jobData);
    } else {
      const filtered = jobData.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredJobs(filtered);
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
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search by job title..."
              value={searchQuery}
              onChange={handleSearch}
            />
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
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
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
              <div className="col-12">
                <div className="alert alert-info text-center" role="alert">
                  No jobs found matching "{searchQuery}"
                </div>
              </div>
            )}
          </div>
        )}
      </div>

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

export default Home;

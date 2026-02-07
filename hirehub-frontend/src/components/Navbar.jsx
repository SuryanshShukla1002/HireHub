import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary ">
        <div className="container">
          <Link to={"/"} className="navbar-brand text-white font-semibold">
            HireHub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item text-white">
                <Link
                  to={"/jobPostings"}
                  className="nav-link text-white"
                  aria-current="page"
                >
                  Job Postings
                </Link>
              </li>
              <li className="nav-item ">
                <Link to={"/addjob"} className="nav-link text-white">
                  Post a Job
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;

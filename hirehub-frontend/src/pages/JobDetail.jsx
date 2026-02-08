import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const { detaildId } = useParams();
  const [eachJobData, setEachJobData] = useState({});

  const handleSpecificData = async () => {
    try {
      const res = await fetch(
        `https://hire-hub-backend-pi.vercel.app/api/job/${detaildId}`,
      );

      if (!res.ok) {
        console.log("Fail to fetch a specific data");
        return;
      }
      const data = await res.json();
      // console.log(data);
      setEachJobData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSpecificData();
  }, []);

  return (
    <>
      <div
        className="container-fluid"
        style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}
      >
        <div className="container">
          <h2 className="pt-3 pb-3">{eachJobData.title}</h2>
          <div className="card p-4" style={{ width: "100%" }}>
            <div className="card-text">
              <p className="card-text">
                <b>Company Name: </b> {eachJobData.companyName}
              </p>
              <p className="card-text">
                <b>Location: </b>
                {eachJobData.location}
              </p>
              <p className="card-text">
                <b>Salary:</b> {eachJobData.salary}
              </p>
              <p className="card-text">
                <b>JobType:</b> {eachJobData.jobType}
              </p>
              <p className="card-text">
                <b>Description:</b> {eachJobData.description}
              </p>
              <div className="card-text">
                <b>Qualifications:</b>
                <ol className="mt-2">
                  {eachJobData.qualifications?.map((q, index) => (
                    <li key={index}>{q}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default JobDetail;

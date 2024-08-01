import DataTitle from "../ui/DataTitle";
import Table from "@mui/joy/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import CircularProgress from "@mui/joy/CircularProgress";

const DataPage = () => {
  const [isLoading, setIsLoading] = useState(true); // Postavi početno stanje na true
  const [emails, setEmails] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      setIsLoading(true); // Počni učitavanje

      const { data, error } = await supabase.from("emails").select();

      if (error) {
        setFetchError("Could not fetch the emails!");
        setEmails(null);
        console.log("fetch error-", error);
      } else {
        setEmails(data);
        setFetchError(null);
      }

      setIsLoading(false); // Završavaj učitavanje
    };

    fetchEmails();
  }, []);

  return (
    <div className="container mx-auto flex flex-col h-[100vh] space-y-6">
      <DataTitle />

      {fetchError && (
        <p style={{ color: "red", textAlign: "center" }}>{fetchError}</p>
      )}

      <div className="overflow-x-auto">
        <Table aria-label="table variants" sx={{ borderCollapse: "collapse" }}>
          <thead
            style={{
              position: "sticky",
              top: 0,
              backgroundColor: "#fff",
              zIndex: 10,
            }}
          >
            <tr
              style={{
                height: "50px",
                verticalAlign: "middle",
                paddingBottom: "10px",
              }}
            >
              <th
                style={{
                  minWidth: "230px",
                  fontSize: "18px",
                  color: "#595656",
                  paddingLeft: "20px",
                }}
              >
                Email:
              </th>
              <th
                style={{
                  minWidth: "80px",
                  fontSize: "18px",
                  color: "#595656",
                }}
              >
                Code:
              </th>
              <th
                style={{
                  minWidth: "70px",
                  fontSize: "18px",
                  color: "#595656",
                }}
              >
                Id:
              </th>

              <th style={{ minWidth: "150px" }}>*Edit data:</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  <CircularProgress
                    color="neutral"
                    variant="solid"
                    sx={{ textAlign: "center" }}
                  />
                </td>
              </tr>
            ) : emails && emails.length > 0 ? (
              emails.map((item, index) => (
                <tr key={index}>
                  <td style={{ paddingLeft: "20px" }}>{item.email}</td>
                  <td>{item.code}</td>
                  <td>{item.id}</td>
                  <td style={{ paddingLeft: "15px" }}>
                    <EditIcon sx={{ paddingRight: "10px", fontSize: "33px" }} />
                    <DeleteIcon />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DataPage;

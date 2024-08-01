import DataTitle from "../ui/DataTitle";
import Table from "@mui/joy/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";

const DataPage = () => {
  const [emails, setEmails] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchEmails = async () => {
      const { data, error } = await supabase.from("emails").select();

      if (error) {
        setFetchError("Could not fetch the emails!");
        setEmails(null);
        console.log("fetch error-", error);
      } else {
        setEmails(data);
        setFetchError(null);
        console.log("data-", data);
      }
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
          <thead>
            <tr
              style={{
                height: "50px",
                verticalAlign: "middle",
                paddingBottom: "10px",
              }}
            >
              <th
                style={{
                  minWidth: "200px",
                  fontSize: "18px",
                  color: "#595656",
                  paddingLeft: "20px",
                }}
              >
                Email:
              </th>
              <th
                style={{
                  minWidth: "100px",
                  fontSize: "18px",
                  color: "#595656",
                }}
              >
                Code:
              </th>
              <th
                style={{
                  minWidth: "100px",
                  fontSize: "18px",
                  color: "#595656",
                }}
              >
                Id:
              </th>
              <th
                style={{
                  minWidth: "150px",
                  fontSize: "18px",
                  color: "#595656",
                }}
              >
                Sent:
              </th>
              <th style={{ minWidth: "150px" }}>*Edit data:</th>
            </tr>
          </thead>
          <tbody>
            {emails && emails.length > 0 ? (
              emails.map((email, index) => (
                <tr key={index} style={{ borderBottom: "2px solid #e6d38a" }}>
                  <td style={{ paddingLeft: "20px" }}>{email.email}</td>
                  <td>{email.code}</td>
                  <td>{email.id}</td>
                  <td>{email.created_at}</td>
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

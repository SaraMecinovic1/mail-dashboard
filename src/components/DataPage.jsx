import DataTitle from "../ui/DataTitle";
import Table from "@mui/joy/Table";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import CircularProgress from "@mui/joy/CircularProgress";
import "../App.css";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [emails, setEmails] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    toast.success(`Welcome back,Sara 💌`);
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

  const handleDelete = async (id) => {
    console.log("Deleting email with id:", id);

    const { data, error } = await supabase.from("emails").delete().eq("id", id);

    if (error) {
      console.log("error from delete function:", error);
    } else {
      console.log("delete data:", data);
      // Osveži listu emailova nakon brisanja
      setEmails(emails.filter((email) => email.id !== id));
      toast.success(`You have successfully deleted the data 🗑️`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd-MM-yyyy HH:mm");
  };

  return (
    <div className="container mx-auto flex flex-col h-[100vh] space-y-6">
      <DataTitle />
      <ToastContainer />

      {fetchError && (
        <p style={{ color: "red", textAlign: "center" }}>{fetchError}</p>
      )}

      <div className="scrollable-table-container">
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
                className="email-column"
                style={{
                  // width: "330px",
                  fontSize: "18px",
                  color: "#595656",
                  paddingLeft: "20px",
                }}
              >
                Email:
              </th>
              <th
                style={{
                  fontSize: "18px",
                  color: "#595656",
                }}
              >
                Code:
              </th>
              <th
                style={{
                  fontSize: "18px",
                  color: "#595656",
                }}
              >
                Created At:
              </th>

              <th>*Edit data:</th>
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
              emails.map((item) => (
                <tr key={item.id}>
                  <td style={{ paddingLeft: "20px" }}>{item.email}</td>
                  <td style={{ paddingLeft: "12px" }}>{item.code}</td>
                  <td>{formatDate(item.created_at)}</td>
                  <td style={{ paddingLeft: "15px" }}>
                    {/* <EditOutlinedIcon
                      sx={{
                        paddingRight: "10px",
                        fontSize: "40px",
                        color: "#e6d38a",
                      }}
                    /> */}
                    <DeleteForeverOutlinedIcon
                      onClick={() => handleDelete(item.id)}
                      sx={{
                        color: "#e6d38a",
                        fontSize: "40px",
                        cursor: "pointer",
                        paddingLeft: "10px",
                      }}
                    />
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

import DataTitle from "../ui/DataTitle";
import Table from "@mui/joy/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DataPage = () => {
  return (
    <div className="container mx-auto flex flex-col h-[100vh] space-y-6">
      <DataTitle />
      <div>
        <Table aria-label="table variants" sx={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th
                style={{
                  width: "35%",
                  fontSize: "18px",
                  color: "#595656",
                  paddingLeft: "20px",
                }}
              >
                Email:
              </th>
              <th style={{ width: "15%", fontSize: "18px", color: "#595656" }}>
                Code:
              </th>
              <th style={{ width: "10%", fontSize: "18px", color: "#595656" }}>
                Id:
              </th>
              <th style={{ width: "25%", fontSize: "18px", color: "#595656" }}>
                Sent:
              </th>
              <th>*Edit data:</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "2px solid #e6d38a" }}>
              <td style={{ paddingLeft: "20px" }}>saramecinovic</td>
              <td>1234</td>
              <td>56</td>
              <td>12 12 2006</td>
              <td style={{ paddingLeft: "15px" }}>
                {" "}
                <EditIcon /> <DeleteIcon />
              </td>
            </tr>
            <tr style={{ borderBottom: "2px solid #e6d38a" }}>
              <td style={{ paddingLeft: "20px" }}>saramecinovic</td>
              <td>1234</td>
              <td>56</td>
              <td>12 12 2006</td>
            </tr>
            <tr style={{ borderBottom: "2px solid #e6d38a" }}>
              <td style={{ paddingLeft: "20px" }}>saramecinovic</td>
              <td>1234</td>
              <td>56</td>
              <td>12 12 2006</td>
            </tr>
            <tr style={{ borderBottom: "2px solid #e6d38a" }}>
              <td style={{ paddingLeft: "20px" }}>saramecinovic</td>
              <td>1234</td>
              <td>56</td>
              <td>12 12 2006</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DataPage;

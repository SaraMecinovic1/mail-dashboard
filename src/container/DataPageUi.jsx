// DataPageUi.jsx
import PropTypes from "prop-types";
import DataTitle from "../components/DataTitle";
import DataForm from "../components/DataForm";

const DataPageUi = ({ setIsAuthenticated }) => {
  return (
    <div className="container mx-auto flex flex-col h-[100vh] space-y-6">
      <DataTitle setIsAuthenticated={setIsAuthenticated} />
      <DataForm />
    </div>
  );
};

DataPageUi.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default DataPageUi;

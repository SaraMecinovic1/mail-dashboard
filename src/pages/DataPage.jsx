import PropTypes from "prop-types";
import DataForm from "../components/DataForm";

const DataPage = ({ setIsAuthenticated }) => {
  return <DataForm setIsAuthenticated={setIsAuthenticated} />;
};
DataPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default DataPage;

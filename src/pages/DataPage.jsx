// DataPage.jsx
import DataPageUi from "../container/DataPageUi";
import PropTypes from "prop-types";

const DataPage = ({ setIsAuthenticated }) => {
  return <DataPageUi setIsAuthenticated={setIsAuthenticated} />;
};
DataPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};
export default DataPage;

import { connect } from "react-redux";
import SearchBarToggles from "../../components/SearchBarToggles";
import {
  setShowNames,
  setShowNumbers,
  updateSearchCriteria
} from "../../actions/filterActions/filterActions";

const mapStateToProps = ({ filters: { showNames, showNumbers, search } }) => ({
  showNames,
  showNumbers,
  search
});

const mapDispatchToProps = {
  setShowNames,
  setShowNumbers,
  updateSearchCriteria
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBarToggles);

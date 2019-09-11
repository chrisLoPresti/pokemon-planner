import { connect } from "react-redux";
import { subscribeToUserCount } from "../../actions/socketActions/socketActions";
import Header from "../../components/Header";
const mapStateToProps = state => ({
  usersOnline: state.users.usersOnline
});

const mapDispatchToProps = {
  subscribeToUserCount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

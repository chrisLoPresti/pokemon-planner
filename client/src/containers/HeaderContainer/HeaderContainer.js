import { connect } from 'react-redux';
import { subscribeToUserCount } from '../../actions/socketActions/socketActions';
import Header from '../../components/Header';
import { getUsersOnline } from '../../selectors/pokemonSelectors';
const mapStateToProps = state => ({
  usersOnline: getUsersOnline(state)
});

const mapDispatchToProps = {
  subscribeToUserCount
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

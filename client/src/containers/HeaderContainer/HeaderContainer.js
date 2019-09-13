import { connect } from 'react-redux';
import Header from '../../components/Header';
import { getUsersOnline } from '../../selectors/pokemonSelectors';

const mapStateToProps = state => ({
  usersOnline: getUsersOnline(state)
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

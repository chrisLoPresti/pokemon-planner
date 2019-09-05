import { connect } from "react-redux";
import SelectedTeam from "../../components/SelectedTeam";
import { updateSelectedTeam } from "../../actions/pokemonListActions/pokemonListActions";

const mapStateToProps = ({
  pokemon: { selectedTeam },
  filters: { shiny }
}) => ({
  selectedTeam,
  shiny
});

const mapDispatchToProps = {
  updateSelectedTeam
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedTeam);

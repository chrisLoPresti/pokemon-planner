export default theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    position: 'relative'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  divider: {
    height: theme.spacing(2)
  },
  underline: {
    '&:after': {
      borderBottom: '2px solid #ef4b4b'
    }
  },
  textField: {
    color: 'ghostwhite'
  },
  flexDisplay: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    color: 'ghostwhite'
  },
  checkDisplay: {
    justifyContent: 'start'
  },
  checkBoxContainer: {
    overflow: 'auto',
    maxHeight: '180px'
  }
});

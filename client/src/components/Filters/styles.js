export default theme => ({
  checkContainer: {
    display: 'flex',
    margin: '5px',
    '&:last-child': {
      borderBottom: 'none'
    },
    borderBottom: '1px solid #212121',
    padding: 10
  },
  typeSymbol: {
    height: '30px'
  },
  filterText: {
    maxWidth: 180,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

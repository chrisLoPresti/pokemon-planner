export default theme => ({
  paper: {
    [theme.breakpoints.up('sm')]: {
      width: '75%'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    },
    backgroundColor: '#525252'
  }
});

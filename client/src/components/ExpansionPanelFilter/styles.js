const drawerWidth = 280;
export default theme => ({
  hide: {
    color: 'transparent'
  },
  icon: {
    color: 'ghostWhite',
    height: 40,
    padding: '5px 20px 5px 0',
    [theme.breakpoints.down('xs')]: {
      height: 30
    },
    marginLeft: 15
  },
  panel: {
    width: drawerWidth,
    margin: 0,
    padding: 0,
    color: 'ghostwhite',
    backgroundColor: '#414141'
  },
  summary: {
    padding: 0,
    backgroundColor: '#414141'
  },
  heading: {
    margin: 'auto 0'
  },
  details: {
    width: '100%',
    display: 'inline-grid',
    padding: 0
  },
  expandButton: {
    margin: 0
  },
  activeFilter: {
    borderBottom: '2px solid #06A10B'
  }
});

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
  iconActive: {
    color: '#ef4b4b'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    overFlow: 'hidden',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 0,
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  paper: {
    backgroundColor: '#414141',
    color: 'ghostwhite'
  },
  filtersLabel: {
    margin: 'auto',
    fontWeight: 'bold'
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
  checkContainer: {
    display: 'flex',
    margin: '5px',
    '&:last-child': {
      borderBottom: 'none'
    },
    borderBottom: '1px solid #212121',
    padding: 10
  },
  expandButton: {
    margin: 0
  },
  activeFilter: {
    borderBottom: '2px solid #06A10B'
  },
  typeSymbol: {
    height: '30px'
  },
  excludeSearch: {
    backgroundColor: 'ghostwhite',
    borderRadius: 10,
    width: '100%',
    padding: 5
  },
  filterText: {
    maxWidth: 180,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

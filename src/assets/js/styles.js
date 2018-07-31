const styles  = {
  container: {
    minHeight: "100vh"
  },
  pane: {
    maxHeight: "100vh",
    minHeight: "100vh",
    overflowX: "hidden"
  },
  flexy:{
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  topNav:{
    position: "absolute",
    top: 0,
    width: "100%",
    justifyContent: "flex-start",
    padding: "1rem"
  },
  box:{
    padding: "1rem 0",
    position: "relative"
  },
  boxTitle:{
      cursor: "pointer"
  },
  favs:{
    position: "absolute",
    bottom: "0.5rem",
    right: "0.5rem",
    display: "none"
  }
}

export default styles
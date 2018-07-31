const styles  = {
  container: {
    minHeight: "100vh"
  },
  pane: {
    overflow: "auto",
    Height: "100vh",
    maxHeight: "100vh",
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
    width: "calc(100% - 2rem)",
    justifyContent: "flex-start",
    padding: "1rem"
  },
  box:{
    padding: "1rem 0",
    position: "relative"
  },
  boxTitle:{
      wordWrap: "wrap-all"
  },
  favs:{
    position: "absolute",
    bottom: "0.5rem",
    right: "0.5rem",
    display: "none"
  }
}

export default styles
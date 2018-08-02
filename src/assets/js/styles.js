const styles  = {
  container: {
    position: "relative",
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
    cursor: "pointer",
    marginBottom: 0
  },
  favs:{
    position: "absolute",
    bottom: "0.5rem",
    right: "0.5rem",
    display: "none"
  },
  shower:{
    position: "absolute",
    top: 0,
    left: 0,
    width: "calc(7*100vw/12)",
    height: "100vh",
    backgroundSize:"320px", 
    backgroundPosition: "center center",
    WebkitBoxshadow: "inset 0px 0px 6rem 4rem #0a0a0a ,  inset 0px 0px 3rem 2rem #0a0a0a",
    MozBoxShadow: "inset 0px 0px 6rem 4rem #0a0a0a ,  inset 0px 0px 3rem 2rem #0a0a0a",
    boxShadow: "inset 0px 0px 6rem 4rem #0a0a0a ,  inset 0px 0px 3rem 2rem #0a0a0a"
  },
  orangeOne:{
    marginTop: "-1.2rem",
    fontFamily: "1rem !important",
    fontSize: "2.5rem" 
  },
  entranceText:{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "1.6rem",
    verticalAlign: "middle"
  },
  fadeIn:{
    animation: "fadeIn 0.3s forwards", 
    WebkitAnimation: "fadeIn 0.3s forwards"
  }
}

export default styles
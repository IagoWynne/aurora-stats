import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  outlet: {
    maxWidth: 1024,
    margin: "auto",
    padding: "1rem",
  },
});

function App() {
  const styles = useStyles();

  return (
    <>
      <Nav />
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </>
  );
}

export default App;

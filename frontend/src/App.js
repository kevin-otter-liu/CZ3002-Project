import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";

// routing
import Routes from "routes";

// defaultTheme
import themes from "themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";

import { getTransactionsAsyn } from "store/Transaction";


// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.main.customization);
  
  // Retrieve the Transaction data

  const dispatch = useDispatch();
  useEffect(() => {
    console.log("GETTING DATA");
    dispatch(getTransactionsAsyn());
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;

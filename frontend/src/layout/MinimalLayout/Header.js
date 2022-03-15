// material-ui
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

import LogoSection from "../MainLayout/LogoSection";

const Header = () => {
  const theme = useTheme();
  return (
    <>
      {/* logo */}
      <Box
        sx={{
          width: 150,
          display: "flex",
          [theme.breakpoints.down("md")]: {
            width: "auto",
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: "none", md: "block" }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
      </Box>
    </>
  );
};

export default Header;
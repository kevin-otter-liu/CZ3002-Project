import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Tooltip, ButtonBase, Modal } from "@mui/material";
import SummarizeIcon from "@mui/icons-material/Summarize";

toast.configure();

const ReportGenerationSection = () => {
  const theme = useTheme();
  const handleGenerateReport = async () => {
    const resp = await fetch("http://172.21.148.163/api/v1/report", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    if (resp.ok) {
      toast("Your spending report has been generated and sent to your email!", {
        autoClose: 750,
      });
    }
  };

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down("md")]: {
            mr: 2,
          },
        }}
      >
        <Tooltip title="Generate Spending Report">
          <ButtonBase
            sx={{ borderRadius: "12px" }}
            onClick={handleGenerateReport}
          >
            <Avatar
              variant="rounded"
              sx={{
                ...theme.typography.commonAvatar,
                ...theme.typography.mediumAvatar,
                transition: "all .2s ease-in-out",
                background: theme.palette.secondary.light,
                color: theme.palette.secondary.dark,
                '&[aria-controls="menu-list-grow"],&:hover': {
                  background: theme.palette.secondary.dark,
                  color: theme.palette.secondary.light,
                },
              }}
              color="inherit"
            >
              <SummarizeIcon stroke={1.5} size="1.3rem" />
            </Avatar>
          </ButtonBase>
        </Tooltip>
      </Box>
    </>
  );
};

export default ReportGenerationSection;

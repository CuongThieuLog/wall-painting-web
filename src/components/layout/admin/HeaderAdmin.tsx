import { Box, Typography, Paper } from "@mui/material";
import React from "react";

const HeaderAdmin = () => {
  return (
    <Paper>
      <Box
        height={100}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box textAlign={"center"}>
          <Typography variant="h2" fontWeight={600}>
            Admin
          </Typography>
          <Typography variant="body1">
            Chào mừng đến với phần mềm quản lý
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default HeaderAdmin;

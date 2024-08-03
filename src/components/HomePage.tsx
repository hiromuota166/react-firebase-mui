import GetUsers from "./GetUsers";
import Orders from "./Orders";
import { Paper } from "@mui/material";

const HomePage = () => {
  return (
    <div>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <Orders />
      </Paper>
    </div>
  );
};

export default HomePage;

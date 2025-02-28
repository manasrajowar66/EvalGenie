import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


const GlobalLoader: React.FC = () => {
  const theme = useTheme();
  const { loading } = useSelector((state: RootState)=> state.globalLoader);
  return (
    <Backdrop sx={{zIndex: theme.zIndex.modal + 1}} open={loading}>
      <CircularProgress />
    </Backdrop>
  );
};

export default GlobalLoader;

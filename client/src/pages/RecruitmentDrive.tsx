import {
  Breadcrumbs,
  Button,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import styles from "./RecruitmentDrive.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { Edit, SquareArrowOutUpRight, Trash } from "lucide-react";
import { getRecruitmentDrives } from "../store/reducers/recruitment-drive";
import { Link, useNavigate } from "react-router-dom";
import { ReverseDriveStatus } from "../types/common-enums";

const RecruitmentDrive: React.FC = () => {
  const { recruitmentDrives } = useSelector(
    (state: RootState) => state.recruitmentDrive
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getRecruitmentDrives());
  }, [dispatch]);
  return (
    <div className={styles["main-container"]}>
      <div role="presentation">
        <Breadcrumbs aria-label="breadcrumb">
          <Typography>EvalGenie</Typography>
          <Typography sx={{ color: "text.primary" }}>
            Recruitment Drives
          </Typography>
        </Breadcrumbs>
      </div>
      <div className={styles["header"]}>
        <Button variant="contained" onClick={() => navigate("create")}>
          Create new drive
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Drive Name</TableCell>
              <TableCell>College</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recruitmentDrives.map((drive) => (
              <TableRow key={drive.id}>
                <TableCell>
                  <Link to={`/recruitment-drive/${drive.id}`}>
                    {drive.name}
                  </Link>
                </TableCell>
                <TableCell>{drive.institute_name}</TableCell>
                <TableCell>{drive.session}</TableCell>
                <TableCell>{ReverseDriveStatus[drive.status]}</TableCell>
                <TableCell>
                  <Tooltip title="Manage Drive">
                    <IconButton
                      sx={{ "&:hover": { color: "black" } }}
                      onClick={() => navigate(`${drive.id}/tests`)}
                    >
                      <SquareArrowOutUpRight size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Drive">
                    <IconButton
                      sx={{ "&:hover": { color: "blue" } }}
                      onClick={() => navigate(`edit/${drive.id}`)}
                    >
                      <Edit size={18} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Drive">
                    <IconButton sx={{ "&:hover": { color: "red" } }}>
                      <Trash size={18} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RecruitmentDrive;

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
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IRecruitmentDrive, ITest } from "../types/common-types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { getRecruitmentDriveById } from "../store/reducers/recruitment-drive";
import { Edit2, Trash } from "lucide-react";

const ViewRecruitmentDrive: React.FC = () => {
  const [driveDetails, setDriveDetails] =
    React.useState<IRecruitmentDrive | null>(null);
  const [tests] = React.useState<ITest[]>([]);

  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const fetchDriveDetails = useCallback(async () => {
    const { id } = params;
    const response = await dispatch(
      getRecruitmentDriveById({ id: id as string })
    );
    if (response && response.meta.requestStatus === "fulfilled") {
      const { data } = response.payload as {
        data: IRecruitmentDrive;
      };
      if (data) {
        setDriveDetails(data);
      }
    } else {
      navigate("/recruiter/recruitment-drive", { replace: true });
    }
  }, [dispatch, params, navigate]);

  useEffect(() => {
    fetchDriveDetails();
  }, [fetchDriveDetails]);

  return (
    <>
      {driveDetails && (
        <div className="flex flex-col">
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography>EvalGenie</Typography>
              <Link to="/recruiter/question-hub" color="inherit">
                Recruitment Drives
              </Link>
              <Typography sx={{ color: "text.primary" }}>
                {driveDetails.name}
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="flex flex-col">
            <Button
              onClick={() => navigate("create")}
              className="max-w-max flex self-end !my-[1rem]"
              variant="contained"
            >
              Create Test
            </Button>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Test Duration</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell>
                        <pre>{test.name}</pre>
                      </TableCell>
                      <TableCell>{test.duration}</TableCell>
                      <TableCell sx={{ width: "15%" }}>
                        <IconButton sx={{ "&:hover": { color: "blue" } }}>
                          <Edit2 size={18} />
                        </IconButton>
                        <IconButton sx={{ "&:hover": { color: "red" } }}>
                          <Trash size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {tests.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={3}>
                        <p className="text-center">No test added</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewRecruitmentDrive;

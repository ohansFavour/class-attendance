import React from "react";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { normalizeArray } from "../../functions";
import { store } from "react-notifications-component";

import "./attendanceHistory.css";
import {
  isLoadingCommitedStudents,
  commitedStudentsSuccess,
  commitedStudentsFailure
} from "../../redux/actions";
import { selectAttendanceProfiles } from "../../redux/selectors";

class AttendanceHistoryComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleClose = () => {
    this.setState({
      ...this.state,
      open: false
    });
  };
  handleCloseSession = public_id => {
    Axios.put(`/attendance/close/${public_id}`)
      .then(response => {
        store.addNotification({
          title: "Success!",
          message: " Attendance session closed",
          width: 300,
          type: "success",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
        window.location.reload(false);
      })
      .catch(error => {
        store.addNotification({
          title: "Error!",
          message: "An error occured",
          width: 300,
          type: "danger",
          insert: "top",
          container: "top-left",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });
      });
  };

  handleOpen = (props, public_id) => {
    const {
      loadCommitedStudents,
      commitedStudentsFailure,
      commitedStudentsSuccess
    } = this.props;

    loadCommitedStudents(public_id);
    Axios.get(`/attendance/student/${public_id}`)
      .then(response => commitedStudentsSuccess(public_id, response.data))
      .catch(error => commitedStudentsFailure(public_id));

    this.setState({
      ...this.state,
      open: true
    });
  };

  render() {
    const { profile, attendanceProfiles } = this.props;
    const { open } = this.state;

    const isLoading = attendanceProfiles[profile.public_id].isLoading;

    const particularAttendance = attendanceProfiles[profile.public_id];
    return (
      <div>
        <div className="attendance-course-details">
          <div className="detail-option">
            <strong>Session: </strong> <span>{profile.session}</span>
          </div>
          <div className="detail-option">
            <strong>Semester: </strong> <span>{profile.semester}</span>
          </div>
          <div className="detail-option">
            <strong>Hash Key: </strong> <span>{profile.hash_key}</span>
          </div>
          <div className="detail-option">
            <strong>Open: </strong> <span>{`${profile.open}`}</span>
            {profile.open ? (
              <span>
                <button
                  id="close-session"
                  onClick={() => this.handleCloseSession(profile.public_id)}
                >
                  Close
                </button>
              </span>
            ) : null}
          </div>
          <div className="detail-option">
            <strong>Created On: </strong> <span>{profile.created_on}</span>
          </div>
        </div>
        <div className="attendance-session-two">
          {!open ? (
            <div>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={props => this.handleOpen(props, profile.public_id)}
                color="rgb(75,139,245)"
                style={{ cursor: "pointer" }}
              />{" "}
              View commits
            </div>
          ) : (
            <FontAwesomeIcon
              icon={faMinus}
              onClick={this.handleClose}
              color="rgb(75,139,245)"
              style={{ cursor: "pointer" }}
            />
          )}
          {!open ? null : (
            <div>
              {isLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <React.Fragment>
                  {!particularAttendance.commitedStudents ? (
                    <p className="no-commited-student">
                      Error loading commited students, please reload.
                    </p>
                  ) : (
                    <React.Fragment>
                      {particularAttendance.commitedStudents.length === 0 ? (
                        <p className="no-commited-student">
                          {" "}
                          No commited student
                        </p>
                      ) : (
                        <div className="commited-students-table">
                          <h6 align="center" style={{ marginTop: "20px" }}>
                            Commited Students
                          </h6>
                          <Table striped bordered hover size="sm">
                            <thead>
                              <tr>
                                <th>S/N</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Level</th>
                                <th>Matric</th>
                              </tr>
                            </thead>
                            <tbody>
                              {particularAttendance.commitedStudents.map(
                                (student, index) => (
                                  <tr>
                                    <td>{`${index + 1}`}</td>
                                    <td>{`${student.first_name +
                                      student.last_name}`}</td>
                                    <td>{student.department}</td>
                                    <td>{student.level}</td>
                                    <td>{student.student_id}</td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  attendanceProfiles: normalizeArray(selectAttendanceProfiles(state))
});

const mapDispatchToProps = dispatch => ({
  loadCommitedStudents: publicId =>
    dispatch(isLoadingCommitedStudents(publicId)),
  commitedStudentsSuccess: (publicId, data) =>
    dispatch(commitedStudentsSuccess(publicId, data)),
  commitedStudentsFailure: publicId =>
    dispatch(commitedStudentsFailure(publicId))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendanceHistoryComponent);

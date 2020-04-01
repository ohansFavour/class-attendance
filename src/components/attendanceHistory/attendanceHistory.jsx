import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import Spinner from "react-bootstrap/Spinner";

import EachAttendance from "./eachAttendanceHistory";

import "./attendanceHistory.css";
import {
  isLoadingAttendanceProfiles,
  attendanceProfilesSuccess,
  attendanceProfilesFailure
} from "../../redux/actions";
import {
  selectAttendanceProfiles,
  selectIsLoadingAttendanceProfiles
} from "../../redux/selectors";

class AttendanceHistory extends React.Component {
  componentDidMount() {
    this.props.loadingProfiles();
    Axios.get(`/course/attendance/${this.props.match.params.id}`)
      .then(response => {
        this.props.attendanceProfileSuccess(response.data);
      })
      .catch(error => {
        this.props.attendanceProfileFailure();
      });
  }
  render() {
    const { isLoading, attendanceProfiles } = this.props;
    console.log(attendanceProfiles);
    return (
      <div className="attendance-history-component">
        <h3 align="center" style={{ marginBottom: "30px" }}>
          Attendance History
        </h3>
        {isLoading ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <div>
            {!!attendanceProfiles ? (
              <React.Fragment>
                {attendanceProfiles.length !== 0 ? (
                  <div>
                    {attendanceProfiles.map(each => (
                      <EachAttendance profile={each} key={each.public_id} />
                    ))}
                  </div>
                ) : (
                  <p>There is no attendance history for this course</p>
                )}
              </React.Fragment>
            ) : (
              <p style={{ color: "red" }}>
                Error Fetching attendance history, please reload page
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  attendanceProfiles: selectAttendanceProfiles(state),
  isLoading: selectIsLoadingAttendanceProfiles(state)
});
const mapDispatchToProps = dispatch => ({
  loadingProfiles: () => dispatch(isLoadingAttendanceProfiles()),
  attendanceProfileSuccess: data => dispatch(attendanceProfilesSuccess(data)),
  attendanceProfileFailure: () => dispatch(attendanceProfilesFailure())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AttendanceHistory));

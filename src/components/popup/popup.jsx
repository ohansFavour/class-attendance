import React from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Axios from "axios";

import "./popup.css";
import { clearAttendance } from "../../redux/actions";
import { store } from "react-notifications-component";

class Pop extends React.Component {
  handleCloseSession = async (courseId, attendanceId) => {
    await Axios.put(`/attendance/close/${attendanceId}`)
      .then(response => {
        this.props.closeSession(courseId);
      })
      .catch(error => {
        const message = "An error occured while deleting attendance";
        store.addNotification({
          title: "Error!",
          message: message,
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
  render() {
    const { array, courseId, attendanceId, courseCode } = this.props;
    if (!array) {
      array = [];
    }
    return (
      <div className="popup-container">
        <div className="close-attendance">
          <Button
            variant="outline-danger"
            onClick={() => {
              this.handleCloseSession(courseId, attendanceId);
            }}
          >
            Close session
          </Button>
          <span>
            <strong>Course Code: </strong>
            {courseCode}
          </span>
        </div>
        <div className="commited-students">
          <h3>Commited Students</h3>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Level</th>
              <th>rf_id</th>
            </tr>
          </thead>
          <tbody>
            {array.map(student => (
              <tr>
                <td>{`${student.last_name}+ " " ${student.first_name}`}</td>
                <td>{`${student.department}`}</td>
                <td>{`${student.level}`}</td>
                <td>{`${student.rf_id}`}</td>
              </tr>
            ))}
            <tr>{array.length === 0 ? "No commited student!" : null}</tr>
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  closeSession: courseId => dispatch(clearAttendance(courseId))
});

export default connect(null, mapDispatchToProps)(Pop);

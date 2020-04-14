import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { store } from "react-notifications-component";

import { addCourseAttendance } from "../../redux/actions";

import "./lecturerCourseAttendance.css";

class LectureCourseAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      session: "",
      semester: "",
      course_code: "",
      lecturer_id: ""
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { session, semester, course_code, lecturer_id } = this.state;
    const courseId = this.props.match.params.id;
    //Create a new Attendance
    await Axios.post(`/attendance/`, {
      session,
      semester,
      course_code,
      lecturer_id
    })
      .then(response => {
        // add attendance history to course object
        // console.log(response.data);
        this.props.addCourseAttendance(response.data, courseId);
        store.addNotification({
          title: "Success!",
          message: "Attendance successfully created",
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

        this.props.history.goBack();
      })
      .catch(error => {
        console.log(error.response.data);
        const message = error.response.data.message
          ? error.response.data.message
          : "An error occured while creating attendance";
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
    this.setState({
      session: "",
      semester: "",
      course_code: "",
      lecturer_id: ""
    });
  };

  render() {
    return (
      <form className="form-container-signUp">
        <h3 className="header-create-attendance">Create New Attendance</h3>
        <div className="form-group">
          <label>Session</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Session"
            name="session"
            onChange={this.handleChange}
            value={this.state.session}
          />
        </div>
        <div className="form-group">
          <label>Semester</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Semester"
            name="semester"
            onChange={this.handleChange}
            value={this.state.semester}
          />
        </div>

        <div className="form-group">
          <label>Course Code</label>
          <input
            type="name"
            className="form-control"
            placeholder="Enter Course Code"
            name="course_code"
            onChange={this.handleChange}
            value={this.state.course_code}
          />
        </div>

        <div className="form-group">
          <label>ID</label>
          <input
            type="name"
            className="form-control"
            name="lecturer_id"
            onChange={this.handleChange}
            value={this.state.lecturer_id}
          />
        </div>

        <button
          type="submit"
          onClick={this.handleSubmit}
          className="btn btn-primary btn-block signin-submit-button"
        >
          Create
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCourseAttendance: (data, courseId) =>
    dispatch(addCourseAttendance(data, courseId))
});

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LectureCourseAttendance));

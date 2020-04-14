import React from "react";
import Form from "react-bootstrap/Form";
import { store } from "react-notifications-component";
import Axios from "axios";

import Button from "react-bootstrap/Button";

import "./markAttendance.css";

class MarkAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash_key: "",
      student_id: ""
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    const { hash_key, student_id } = this.state;
    Axios.put(`/attendance/commit/${hash_key}`, {
      student_id: student_id
    })
      .then(response => {
        store.addNotification({
          title: "Success!",
          message: "You have successfully marked your attendance",
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
      })
      .catch(error => {
        const message = error.response.data.message
          ? error.response.data.message
          : "An error occured while marking attendance";
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
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  render() {
    return (
      <Form className="form-attendance">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Hash Key</Form.Label>
          <Form.Control
            name="hash_key"
            type="name"
            value={this.state.hash_key}
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">
            This is the unique key that differentiates the attendance session
            from others.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            type="name"
            name="student_id"
            placeholder="Enter your ID"
            value={this.state.student_id}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}

export default MarkAttendance;

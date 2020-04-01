import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

import { createAndAddCourse } from "../../redux/actions";
import { selectCurrentUser, selectUserType } from "../../redux/selectors";

import "./createCourse.css";

const options = [
  { value: "technology", label: "Technology" },
  { value: "arts", label: "Arts" },
  { value: "EDM", label: "EDM" },
  { value: "health sciences", label: "Health Sciences" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "education", label: "Education" },
  { value: "science", label: "Science" },
  { value: "law", label: "Law" },
  { value: "social sciences", label: "Social Sciences" }
];

class CreateCourse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      faculty: "",
      course_code: "",
      course_title: "",
      department: "",
      strict: undefined
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleRadioChange = event => {
    const { value } = event.target;
    let bool;
    if (value == "strict") {
      bool = true;
    } else if (value == "general") {
      bool = false;
    }
    this.setState(
      {
        strict: bool
      },
      () => console.log(this.state.strict)
    );
  };

  handleFaculty = faculty => {
    this.setState({
      faculty: faculty
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { mode, currentUser } = this.props;
    let public_id = currentUser.public_id;

    //Create and Add Course
    await this.props.createAndAddCourse(this.state, mode, public_id);

    this.setState({
      faculty: "",
      course_code: "",
      course_title: "",
      department: "",
      strict: undefined
    });
  };
  render() {
    return (
      <div className="create-course-container">
        <form className="form-container-create-course">
          <h3 className="header-signIn">Create New Course</h3>
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter Course Title"
              name="course_title"
              onChange={this.handleChange}
              value={this.state.course_title}
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
          <label>Faculty</label>
          <Select
            value={this.state.faculty}
            onChange={this.handleFaculty}
            options={options}
            placeholder="Select Faculty"
          />
          <br />
          <div className="form-group">
            <label>Department</label>
            <input
              type="name"
              className="form-control"
              placeholder="Enter Department"
              name="department"
              onChange={this.handleChange}
              value={this.state.department}
            />
          </div>
          <input
            type="radio"
            name="human"
            value="strict"
            onChange={this.handleRadioChange}
          />{" "}
          Strict
          <br />
          <input
            type="radio"
            name="human"
            value="general"
            onChange={this.handleRadioChange}
          />{" "}
          General <br />
          <button
            type="submit"
            onClick={this.handleSubmit}
            className="btn btn-primary btn-block create-submit-button"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  mode: selectUserType(state)
});

const mapDispatchToProps = dispatch => ({
  createAndAddCourse: (obj, mode, publicID) =>
    dispatch(createAndAddCourse(obj, mode, publicID))
});
export default connect(mapStateToProps, mapDispatchToProps)(CreateCourse);

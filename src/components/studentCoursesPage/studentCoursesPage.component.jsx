import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";

import {withSpinner} from "../with-spinner/with-spinner.component";
import RegisteredCourses from "../registeredCourses/registeredCourses.component";
import UnregisteredCourses from "../unRegisteredCourses/unRegisteredCourses.component";
import {
  selectCurrentUser,
  selectUserType,
  selectRegisteredCourses,
  selectUnregisteredCourses,
  selectRegisteredCoursesBool,
  selectUnregisteredCoursesBool
} from "../../redux/selectors";
import { getCourses } from "../../redux/actions";

import "./studentCoursesPage.component.css";

const options = [
  { value: "registered", label: "Registered" },
  { value: "unregistered", label: "Unregistered" }
];

const EnhancedRegisteredCourses = withSpinner(RegisteredCourses);
const EnhancedUnregisteredCourses = withSpinner(UnregisteredCourses);

class StudentCoursesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseCategory: {
        value: "registered",
        label: "Registered"
      }
    };
  }

  componentDidMount = () => {
    const { getRegisteredCourses,getUnregisteredCourses, mode, currentUser } = this.props;
    getRegisteredCourses(mode, currentUser, true);
    getUnregisteredCourses(mode, currentUser, false);
  };

  handleCourseCategory = courseCategory => {
    this.setState({
      courseCategory: courseCategory
    });
  };

  render() {
    const {
      registeredCourses,
      unregisteredCourses,
      isLoadingRegisteredCourses,
      isLoadingUnregisteredCourses
    } = this.props;
    const courseCategory = this.state.courseCategory.value;

    return (
      <div className="student-courses-page-container">
        <div className="student-courses-page-category-selector-container">
          <label>Select category</label>
          <Select
            value={this.state.courseCategory}
            onChange={this.handleCourseCategory}
            options={options}
            placeholder="Registered"
          />
        </div>
        {courseCategory === "registered" ? (
          <EnhancedRegisteredCourses
            isLoading={!isLoadingRegisteredCourses}
            list={registeredCourses}
          />
        ) : (
          <EnhancedUnregisteredCourses
            isLoading={!isLoadingUnregisteredCourses}
            list={unregisteredCourses}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getRegisteredCourses: (mode,currentUser, isRegistered) =>
    dispatch(getCourses(mode,currentUser, (isRegistered = true))),
  getUnregisteredCourses: (mode,currentUser, isRegistered) =>
    dispatch(getCourses(mode,currentUser, (isRegistered = false)))
});

const mapStateToProps = state => ({
  currentUser: selectCurrentUser(state),
  mode: selectUserType(state),
  registeredCourses: selectRegisteredCourses(state),
  unregisteredCourses: selectUnregisteredCourses(state),
  isLoadingRegisteredCourses: selectRegisteredCoursesBool(state),
  isLoadingUnregisteredCourses: selectUnregisteredCoursesBool(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentCoursesPage);

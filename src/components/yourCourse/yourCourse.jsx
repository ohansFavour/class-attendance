import React from "react";

import "./yourCourse.css";

class YourCourse extends React.Component {
  render() {
      const {list} = this.props;

    return <div className="registered-courses-container">
        {Array.isArray(list) && list.length ? (
          <table>
            <tr className="table-row-header">
              <th className="table-content-header">Course Title</th>
              <th className="table-content-header">Course Code</th>
              <th></th>
              <th></th>
            </tr>
            {list.map(course => (
              <tr key={course.public_id} className="table-row">
                <td className="table-content-title"> {course.course_title}</td>
                <td className="table-content"> {course.course_code}</td>
                <td className="table-content">
                  <button onClick={() => this.handleView(course)}>View</button>
                </td>
                <td className="table-content">
                  <button
                    onClick={() => this.handleUnregister(course.public_id)}
                  >
                    Unregister
                  </button>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <span className="no-registered-course">No Registered course!</span>
        )}
      </div>
  }
}


export default YourCourse;

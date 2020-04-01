import { createSelector } from "reselect";
import {denormalizeObject} from "../functions";
const selectUser = state => state.user;
const selectRegistered = state => state.registeredCourses;
const selectUnregistered = state => state.unregisteredCourses;
const selectSignup = state => state.signup;
const selectAttendanceReducer = state=> state.attendance;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectUserCreated = createSelector(
  [selectSignup],
  signup => signup.userCreated
);
export const selectAttendanceObject =createSelector(
  [selectAttendanceReducer],
  attendance => attendance
);
export const selectAttendanceProfiles =createSelector(
  [selectAttendanceReducer],
  attendance => denormalizeObject(attendance.attendanceProfiles)
);

export const selectIsLoadingAttendanceProfiles =createSelector(
  [selectAttendanceReducer],
  attendance => attendance.loadingProfiles
);

export const selectAttendanceIsLoading =createSelector(
  [selectAttendanceReducer],
  attendance => attendance.isLoading
);
export const selectIsCreatingUser = createSelector(
  [selectSignup],
  signup => signup.isCreating
);
export const selectIsFetchingUser = createSelector(
  [selectUser],
  user => user.isFetching
);
export const selectDoneFetching = createSelector(
  [selectUser],
  user => user.doneFetching
);
export const selectUserType = createSelector(
  [selectUser],
  user => user.userType
);
export const selectCurrentUserMode = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.mode
);
export const selectCurrentUserID = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.public_id
);

export const selectCourse = createSelector(
  [selectUser],
  user => user.courseView
);

export const selectRegisteredCourses = createSelector(
  [selectRegistered],
  registeredCourses => registeredCourses.courses
);

export const selectRegisteredCoursesError = createSelector(
  [selectRegistered],
  registeredCourses => registeredCourses.errorMessage
);
export const selectIsLoadingAttendanceProfile = createSelector(
  [selectRegistered],
  registeredCourses => registeredCourses.isLoadingAttendance
);
export const selectIsLoadingcommits = createSelector(
  [selectRegistered],
  registeredCourses => registeredCourses.isLoadingCommits
);

export const selectAttendanceProfile = createSelector(
  [selectRegistered],
  registeredCourses => registeredCourses.attendanceProfile
);
export const selectAttendanceCommits = createSelector(
  [selectRegistered],
  registeredCourses => registeredCourses.attendanceCommits
);
export const selectUnregisteredCourses = createSelector(
  [selectUnregistered],
  unregisteredCourses => unregisteredCourses.courses
);

export const selectIsLoadingRegisteredCourses = createSelector(
  [selectRegistered],
  registeredCourses => registeredCourses.isLoading
);

export const selectIsLoadingUnregisteredCourses = createSelector(
  [selectUnregistered],
  unregisteredCourses => unregisteredCourses.isLoading
);

export const selectUnregisteredCoursesError = createSelector(
  [selectUnregistered],
  unregisteredCourses => unregisteredCourses.errorMessage
);
export const selectRegisteredCoursesBool = createSelector(
  [selectRegistered],
  registeredCourses => !!registeredCourses.courses
);

export const selectUnregisteredCoursesBool = createSelector(
  [selectUnregistered],
  unregisteredCourses => !!unregisteredCourses.courses
);

export const selectIsLoadingCurrentUser = createSelector(
  [selectUser],
  user => !!user.currentUser
);

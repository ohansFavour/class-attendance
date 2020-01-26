import {createSelector} from "reselect";

const selectUser = (state)=> state.user;
const selectRegistered = (state)=> state.registeredCourses;
const selectUnregistered = (state)=> state.unregisteredCourses;

export const selectCurrentUser = createSelector(
    [selectUser],
    (user)=>  user.currentUser
)
export const selectCurrentUserMode = createSelector(
    [selectUser],
    (user)=>  user.currentUser.mode
)

export const selectCourse= createSelector(
    [selectUser],
    (user)=> user.courseView
)

export const selectRegisteredCourses = createSelector(
    [selectRegistered],
    (registeredCourses)=> registeredCourses.courses
)

export const selectUnregisteredCourses = createSelector(
    [selectUnregistered],
    (unregisteredCourses)=> unregisteredCourses.courses
)

export const selectIsLoadingRegisteredCourses = createSelector(
    [selectRegistered],
    (registeredCourses)=> registeredCourses.isLoading
)

export const selectIsLoadingUnregisteredCourses = createSelector(
    [selectUnregistered],
    (unregisteredCourses)=> unregisteredCourses.isLoading
)

export const selectRegisteredCoursesBool = createSelector(
    [selectRegistered],
    (registeredCourses)=> !!registeredCourses.courses
)

export const selectUnregisteredCoursesBool = createSelector(
    [selectUnregistered],
    (unregisteredCourses)=> !!unregisteredCourses.courses
)

export const selectIsLoadingCurrentUser = createSelector(
    [selectUser],
    (user)=> !!user.currentUser
)




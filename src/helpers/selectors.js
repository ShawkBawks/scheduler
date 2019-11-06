//Function for Getting Individual Appointments for Each Day
export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const filteredDays = state.days.find(dayCheck => dayCheck.name === day)

  if (!filteredDays) return appointments;

  for (let id of filteredDays.appointments) {

    appointments.push(state.appointments[id])
  }
  return appointments;
}

//Function for Displaying Interviewers Available For Each Day
export function getInterviewersForDay(state, day) {

  const interviewers = [];
  const filteredDay = state.days.find(dayCheck => dayCheck.name === day)
  if (!filteredDay) return interviewers;
  for (let id of filteredDay.interviewers) {


    interviewers.push(state.interviewers[id])
  }
  return interviewers;
}

//Displays Appointment Data With Student and Interviewer Names
export const getInterview = (state, interview) => {
  if (!interview) {
    return null
  } else {
    let student = interview.student
    let interviewer = state.interviewers[interview.interviewer]
    let obj = { student, interviewer }
    return obj
  }
}

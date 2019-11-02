export function getAppointmentsForDay(state, day) {
  const appointments=[];
  const filteredDays = state.days.find(dayCheck => dayCheck.name === day)

  if(!filteredDays) return appointments;
  
  for (let id of filteredDays.appointments) {

    //id-1  because it needs to count from 0 rather than the human ordering starting at 1
    appointments.push(state.appointments[id])
  }
    return appointments;
}


export function getInterviewersForDay(state, day) {

  const interviewers=[];
  const filteredDay = state.days.find(dayCheck => dayCheck.name === day)
  if(!filteredDay) return interviewers;
  for (let id of filteredDay.interviewers) {
  
    
    interviewers.push(state.interviewers[id])
  }
    return interviewers;
}


export const getInterview = (state, interview) => {
  if (!interview){
    // console.log('lolz')
    return null
  } else {
    let student = interview.student
    // console.log(student)
    let interviewer = state.interviewers[interview.interviewer]
    // console.log(interviewer)
    let obj = {student, interviewer}
    return obj
  }
}

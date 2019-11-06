import React from "react";
import Appointment from "components/Appointment/index.js";
import DayList from 'components/DayList.js';
import "components/Application.scss";
import  useApplicationData from "hooks/useApplicationData.js"
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";



export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
const appointments = 
getAppointmentsForDay(state, state.day).map(appointment => {

  return <Appointment
    key={appointment.id}
    id={appointment.id}
    time={appointment.time}
    interview={getInterview(state, appointment.interview)}
    interviewers={getInterviewersForDay(state, state.day)}
    bookInterview={bookInterview}
    cancelInterview={cancelInterview}

  />
})

  
  // const setDays = days => setState({ ...state, days });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      </section>
        {/* appointments object goes below */}
      <section className="schedule">
        <section className="schedule">
       {appointments}
        <Appointment key="last" time="5pm" />
      </section>
      </section>
    </main>
  );
}

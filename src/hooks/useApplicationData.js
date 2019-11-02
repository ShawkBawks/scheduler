import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";


export default function useApplicationData() {
// const SET_DAY = "SET_DAY";
// const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
// const SET_INTERVIEW = "SET_INTERVIEW";

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
    .then((all) => {
      setState(prev => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);
  // function reducer(state, action) {
  //   switch (action.type) {
  //     case SET_DAY:
  //       return {}
  //     case SET_APPLICATION_DATA:
  //       return {}
  //     case SET_INTERVIEW: {
  //       return
  //     }
  //     default: throw new Error(
  //       `Tried to reduce with unsupported action type: ${action.type}`
  //     );
  //   }
  // }
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    console.log(id, interview);
    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
  }
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`api/appointments/${id}`, { interview })
      .then(() => {
        setState({
          ...state,
          appointments
        });
      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}





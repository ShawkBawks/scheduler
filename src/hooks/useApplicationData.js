import React, { useReducer, useEffect } from "react";
import axios from "axios";
import formatSpots from "components/DayListItem.js"
import "components/Application.scss";


const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
};
const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_NULL_INTERVIEW = "SET_NULL_INTERVIEW";
const SUB_SPOT = "SUB_SPOT";
const ADD_SPOT = "ADD_SPOT";

export default function useApplicationData(props) {

  let [state, dispatch] = useReducer(reducer, initialState)
  function reducer(state, action, props) {
    const { day, days, appointments, interviewers, id, interview } = action

    switch (action.type) {
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        )
      case SET_DAY: return { ...state, day }
      case SET_APPLICATION_DATA: return { ...state, days, appointments, interviewers, formatSpots }
      case SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment,
          
          
        }
        return { ...state, appointments, formatSpots  }
      }
      case SET_NULL_INTERVIEW: {
        const appointment = {
          ...state.appointments[id],
          interview: null
        }
        const appointments = {
          ...state.appointments,
          [id]: appointment
        }
        console.log(state.day.spots)
        return  { ...state, appointments, formatSpots }
      }
   
      case ADD_SPOT: {
        const days = state.days.map(r => {
          if (r.name !== state.day) {
            return r;
          }
          return { ...r, spots: r.spots + 1 };
        });
        return { ...state, days };
      }
      case SUB_SPOT: {
        const days = state.days.map(r => {
          if (r.name !== state.day) {
            return r;
          }
          return { ...r, spots: r.spots - 1 };
        });
        return { ...state, days };
      }
    }
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        })
        // console.log("asdasdasd",all[0].data[state.day].spots)
      })
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, day })

  function bookInterview(id, interview) {

    return axios.put(`api/appointments/${id}`, { interview })
      .then(() => {
        let x = state.day
        dispatch({
          type: SET_INTERVIEW,
          id, interview
        });
        dispatch({ type: SUB_SPOT, x });
      
      })
  }
  function cancelInterview(id, interview) {

    return axios.delete(`api/appointments/${id}`, { interview })
      .then(() => {
        let x = state.day;
        dispatch({
          type: SET_NULL_INTERVIEW, id
        });
        dispatch({ type: ADD_SPOT, x });

      })
  }

  return { state, setDay, bookInterview, cancelInterview };
}





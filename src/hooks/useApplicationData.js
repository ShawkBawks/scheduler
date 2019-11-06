import { useReducer, useEffect } from "react";
import axios from "axios";
import formatSpots from "components/DayListItem.js"
import "components/Application.scss";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_NULL_INTERVIEW,
  ADD_SPOT,
  SUB_SPOT
} from "reducers/application";


const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
};
export default function useApplicationData(props) {

  let [state, dispatch] = useReducer(reducer, initialState)

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





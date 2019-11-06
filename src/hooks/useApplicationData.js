import { useReducer, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
//Reducer requirements
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  SET_NULL_INTERVIEW,
  ADD_SPOT,
  SUB_SPOT
} from "reducers/application";

//Initial State Values
const initialState = {
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
};
export default function useApplicationData(props) {
//useReducer variables
  let [state, dispatch] = useReducer(reducer, initialState)
//Gathers data from DB to display
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

  //Variable for SET_DAY action
  const setDay = day => dispatch({ type: SET_DAY, day })
//Function for Booking Interviews
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

  //Function for Cancelling an Interview
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





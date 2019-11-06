import formatSpots from "components/DayListItem.js"





export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SET_NULL_INTERVIEW = "SET_NULL_INTERVIEW";
export const ADD_SPOT = "ADD_SPOT";
export const SUB_SPOT = "SUB_SPOT";


export default function reducer(state, action, props) {
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

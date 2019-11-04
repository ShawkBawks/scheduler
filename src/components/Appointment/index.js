import React, { Fragment } from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js"
import Form from "components/Appointment/Form.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"
import Error from "components/Appointment/Error.js"
import useVisualMode from "hooks/useVisualMode.js"
import { getInterviewersForDay, getInterview } from "helpers/selectors.js"

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  function save(name, interviewer) {
    const interview = {
      student:name,
      interviewer
    }
    transition(SAVING);
    props
    .bookInterview(props.id, interview)
    .then(()=> {transition(SHOW)})
    .catch(error => {transition(ERROR_SAVE, true)})
    
  }
function onDelete(){
  transition(CONFIRM)
}

function onEdit(){
  transition(EDIT)
}

  function cancel(name, interviewer) {
    const interview = {
      student:name,
      interviewer
    }
    transition(DELETE, true);
    props
    .cancelInterview(props.id, interview)
    .then(() => {transition(EMPTY)})
    .catch(error =>{transition(ERROR_DELETE, true)})
   
  }
    
  // const interviewers = getInterviewersForDay(props, props.day);
// console.log(props)
  return (
    <Fragment>
      <article className="appointment"></article>
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && (<Form
       interviewers={props.interviewers}
       onCancel={back}
       onSave={save}
       />
       )}
       {mode === SAVING && (<Status message={"Saving..."}/>)} 
       {mode === CONFIRM && (<Confirm onCancel={back} onConfirm={cancel} />)}
       {mode === DELETE && (<Status message={"Deleting..."}/>)}
       {mode === EDIT && (<Form
       interviewers={props.interviewers}
       interviewer={props.interview.interviewer.id}
       onCancel={back}
       onSave={save}
       name={props.interview.student}
       />)}
       {mode === ERROR_SAVE && <Error  onClose={(back)} message="Save Error"/>}
       {mode === ERROR_DELETE && <Error  onClose={(back)} message="Delete Error" />}
    </Fragment>
  )
};

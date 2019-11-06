import React from "react";
import "components/Appointment/styles.scss"
import Header from "components/Appointment/Header.js"
import Form from "components/Appointment/Form.js"
import Show from "components/Appointment/Show.js"
import Empty from "components/Appointment/Empty.js"
import Status from "components/Appointment/Status.js"
import Confirm from "components/Appointment/Confirm.js"
import Error from "components/Appointment/Error.js"
import useVisualMode from "hooks/useVisualMode.js"

export default function Appointment(props) {
  //Modes
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //Determines which Card Element to Show
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  //Save Function
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => { transition(ERROR_SAVE, true) })

  }
  //Delete Button Function
  function onDelete() {
    transition(CONFIRM)
  }
  //Edit Button Function
  function onEdit() {
    transition(EDIT)
  }
  //Delete Button Functionality Within the Confirm Card
  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(DELETE, true);
    props
      .cancelInterview(props.id, interview)
      .then(() => { transition(EMPTY) })
      .catch(error => { transition(ERROR_DELETE, true) })

  }
  return (
    //Main Page Rendering
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
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
      {mode === SAVING && (<Status message={"Saving..."} />)}
      {mode === CONFIRM && (<Confirm onCancel={back} onConfirm={cancel} />)}
      {mode === DELETE && (<Status message={"Deleting..."} />)}
      {mode === EDIT && (<Form
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onCancel={back}
        onSave={save}
        name={props.interview.student}
      />)}
      {mode === ERROR_SAVE && (<Error onClose={(back)} message="Save Error" />)}
      {mode === ERROR_DELETE && (<Error onClose={(back)} message="Delete Error" />)}
    </article>
  )
};

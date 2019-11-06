import React from "react";
import 'components/InterviewerListItem.scss';

const classNames = require('classnames');
//Interview List Item Form for InterviewList
export default function InterviewerListItem(props) {
  let InterviewerClass = classNames({
  'interviewers__item': true,
  'interviewers__item--selected':props.selected
  });

return (
<li className={InterviewerClass} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
)};
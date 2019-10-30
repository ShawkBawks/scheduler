import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js"
import 'components/InterviewerList.scss';

// const classNames = require('classnames');





export default function InterviewerList(props) {
  // let InterviewerClass = classNames({
  // 'interviewers__header': true,
  // 'interviewers__list':props.selected
  // });
  console.log(props.interviewers)
  const InterviewerListRender = props.interviewers.map(interviewer => {
    return (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={event => props.setInterviewer(interviewer.id)}
      />);
    });
      return <section className='interviewers'>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{InterviewerListRender}</ul>
    </section>
  }






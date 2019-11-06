import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

//Day List Item Forms
export default function DayListItem(props) {
  let dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
    "text--regular": props.name,
    "text--light": props.spots
  });

  function formatSpots(spots) {
    let print;
    if (spots === 0) {
      print = 'no spots remaining'
      return print;


    } else if (spots === 1) {
      print = '1 spot remaining'
      return print;
    } else {
      print = `${spots} spots remaining`
      return print;
    }
  }

  return (
    <li className={dayClass} data-testid="day" onClick={() => props.setDay(props.name)}>
      {/* displays name */}
      <h2 className="text--regular">{props.name}</h2>
      {/* displays spots remaining */}
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

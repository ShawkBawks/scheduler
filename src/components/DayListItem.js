import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');


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

// Create an object called dayClass that applies the day-list__item--selected class
//  name if props.selected is true and the day-list__item--full class name if props.spots is 0.


// let buttonClass = classNames ("button",{
//   "button--confirm": props.confirm,
//   "button--danger": props.danger
// });

// return (<button
// className={buttonClass}
// onClick={props.onClick}
// disabled={props.disabled}
// >{props.children}</button>
// );
// }




//lists use looping pattern
// controlled input pattern for implementation for the appointment form
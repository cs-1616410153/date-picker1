import React, { useEffect, useState } from "react";
import "./App.css";

export default function Calendar(props) {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  let day = selectedMonth.getDate();
  let month = selectedMonth.getMonth();
  let year = selectedMonth.getFullYear();

  const changeMonth = (type) => {
    let m = new Date();
    if (type === "prev")
      m = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() - 1,
        1
      );

    if (type === "next")
      m = new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1
      );
    setSelectedMonth(m);
  };

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

  const this_month = new Date(year, month, 1);
  const next_month = new Date(year, month + 1, 1);

  const first_week_day = this_month.getDay() + 1;
  const days_in_this_month = Math.round(
    (next_month.getTime() - this_month.getTime()) / (1000 * 60 * 60 * 24)
  );

  const updateSelectedDate = (daySl) => {
    let newDl = `${daySl}-${selectedMonth.getMonth()}-${selectedMonth.getFullYear()}`;
    console.log(newDl);
  };

  const getDays = () => {
    let daysTemplate = [];

    let emptyRows = [];
    for (let week_day = 1; week_day < first_week_day; week_day++) {
      emptyRows.push(
        <td style={{ backgroundColor: "9999cc", color: "000000" }}> </td>
      );
    }

    let week_day = first_week_day;

    let rowData = [];
    for (
      let day_counter = 1;
      day_counter <= days_in_this_month;
      day_counter++
    ) {
      week_day %= 7;
      if (emptyRows.length > 0) {
        rowData.push(emptyRows);
        emptyRows = [];
      }

      rowData.push(
        <td
          onClick={() => updateSelectedDate(day_counter)}
          style={{
            backgroundColor: "9999cc",
            color: "000000",
            textAlign: "center",
          }}
        >
          {day_counter}
        </td>
      );
      if (week_day === 0 || day_counter === days_in_this_month) {
        daysTemplate.push(<tr> {rowData}</tr>);
        rowData = [];
      }

      week_day++;
    }
    return <>{daysTemplate}</>;
  };

  let calendar_html = (
    <table><div className='table'>
      <thead>
        <tr><div className='header'>

          <td>
            <button onClick={() => changeMonth("prev")}>Prev</button>
          </td>
          <td
            colSpan="7"
            style={{
              backgroundColor: "9999cc",
              color: "000000",
              textAlign: "center",
            }}
          >
            {months[month]} {year}{" "}
          </td>
          <td>
            <button onClick={() => changeMonth("next")}>Next</button>
          </td>
          </div>
        </tr>
        <tr><div className="week">
          {weekDays.map((d) => (
            <td>{d}</td>
          ))}
        </div>
        </tr>
      </thead>
      <tbody><div className='dates'>{getDays()}</div></tbody>
    </div>
    </table>
  );

  return calendar_html;
}
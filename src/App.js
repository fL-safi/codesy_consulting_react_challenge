import "./App.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useCallback, useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "React JS Interview",
    start: new Date(2022, 7, 5),
    end: new Date(2022, 7, 5),
  },
  {
    title: "Core Team Meeting",
    start: new Date(2022, 7, 10),
    end: new Date(2022, 7, 10),
  },
  {
    title: "Sprint Deadline",
    start: new Date(2022, 7, 23),
    end: new Date(2022, 7, 23),
  },
  {
    title: "Stack Answers",
    start: new Date(2022, 7, 19),
    end: new Date(2022, 7, 19),
  },
  {
    title: "Reply to Scrum Master",
    start: new Date(2022, 7, 14),
    end: new Date(2022, 7, 14),
  },
  {
    title: "React JS Interview",
    start: new Date(2022, 8, 5),
    end: new Date(2022, 8, 5),
  },
  {
    title: "Core Team Meeting",
    start: new Date(2022, 8, 10),
    end: new Date(2022, 8, 10),
  },
  {
    title: "Sprint Deadline",
    start: new Date(2022, 8, 23),
    end: new Date(2022, 8, 23),
  },
  {
    title: "Stack Answers",
    start: new Date(2022, 8, 19),
    end: new Date(2022, 8, 19),
  },
  {
    title: "Reply to Scrum Master",
    start: new Date(2022, 8, 14),
    end: new Date(2022, 8, 14),
  },
];

function App() {
  const [apiEvent, setapiEvent] = useState({})
  const [allSchedule, setAllSchedule] = useState(events);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    start: "",
    end: "",
  });
 


  const fetchEventHandler = useCallback( async () => {
    const response = await fetch('https://private-37dacc-cfcalendar.apiary-mock.com/mentors/1/agenda');
    const data = await response.json()
    
    const transformedEvent = data.calendar.map((m_date) => {
      return m_date.date_time
    });
    setapiEvent(transformedEvent);
  }, [])

  useEffect(() => {
    fetchEventHandler();
  }, [fetchEventHandler])

  const inputScheduleHandler = (event) => {
    setNewSchedule({ ...newSchedule, title: event.target.value });
    
  };
  
  const StartDateHandler = (start) => {
    setNewSchedule({...newSchedule, start})
  };

  const endDateHandler = (end) => {
    setNewSchedule({...newSchedule, end})
  };

  const addScheduleHandler = () => {
    setAllSchedule([...allSchedule, newSchedule]);
  };
  

  

  return (
    <div className="App">
      <h1>Schedule your meetup</h1>
      <h2>Add new Schedule</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newSchedule.title}
          onChange={inputScheduleHandler}
          
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newSchedule.start}
          onChange={StartDateHandler}
          
        />

        <DatePicker
          placeholderText="End Date"
          selected={newSchedule.end}
          onChange={endDateHandler}
        />

        <button style={{ marginTop: "20px" }} onClick={addScheduleHandler} >Add new Schedule</button>

      </div>

      <Calendar
        localizer={localizer}
        events={allSchedule}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default App;

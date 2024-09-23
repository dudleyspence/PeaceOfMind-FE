import { List, ListItem, Card } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SelectCareDayPagination } from "./SelectCareDayPaginiation";
import React from "react";

export function DayList({ patient_id }) {
  const [previous7Days, setPrevious7Days] = useState([]);
  const [active, setActive] = React.useState(1);
  const navigate = useNavigate();

  function getLast7Days() {
    const daysArray = [];

    for (let i = (active - 1) * 7; i < 7 * active; i++) {
      const date = new Date();
      date.setUTCDate(date.getUTCDate() - i);

      const isoDate = date.toISOString();
      const humanReadableDate = date.toDateString();

      daysArray.push({
        isoDate: isoDate,
        humanReadableDate: humanReadableDate,
      });
    }

    if (active === 1) {
      daysArray[0].humanReadableDate = "Today";
    }

    return daysArray;
  }

  useEffect(() => {
    const previos7DaysArray = getLast7Days();
    setPrevious7Days(previos7DaysArray);
  }, [active]);

  function handleDayClick(day) {
    navigate(`/patient/${patient_id}/${day.isoDate}`);
  }

  return (
    <Card className="max-w-30">
      <List>
        <div className="flex flex-row items-center justify-center p-2">
          <SelectCareDayPagination active={active} setActive={setActive} />
        </div>
        {previous7Days.map((day) => (
          <ListItem
            key={day.isoDate}
            onClick={() => {
              handleDayClick(day);
            }}
          >
            {day.humanReadableDate}
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

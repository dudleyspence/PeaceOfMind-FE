import { List, ListItem, Card } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function DayList({ patient_id }) {
  const [previous7Days, setPrevious7Days] = useState([]);
  const navigate = useNavigate();

  function getLast7Days() {
    const daysArray = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const isoDate = date.toISOString();
      const humanReadableDate = date.toDateString();

      daysArray.push({
        isoDate: isoDate,
        humanReadableDate: humanReadableDate,
      });
    }

    daysArray[0].humanReadableDate = "Today";

    return daysArray.reverse();
  }

  useEffect(() => {
    const previos7DaysArray = getLast7Days();
    setPrevious7Days(previos7DaysArray);
  }, []);

  function handleDayClick(day) {
    navigate(`/patient/${patient_id}/${day.isoDate}`);
  }

  return (
    <Card className="max-w-30">
      <List>
        {previous7Days.map((day) => (
          <ListItem
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

import { useEffect, useState } from "react";
import { Typography, Input } from "@material-tailwind/react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { List, ListItem, Card } from "@material-tailwind/react";
import { SelectCareDayPagination } from "./SelectCareDayPaginiation";
import { setChosenDay } from "../../../state/slices/daySlice";
import { useParams } from "react-router-dom";

export default function SelectCareDay() {
  const [previous7Days, setPrevious7Days] = useState([]);
  const [active, setActive] = useState(1);
  const navigate = useNavigate();
  const { patient_id } = useParams();

  function getLast7Days() {
    const daysArray = [];

    for (let i = (active - 1) * 7; i < 7 * active; i++) {
      const date = new Date();
      date.setUTCDate(date.getUTCDate() - i);

      const isoDate = formatISO(date);
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
    navigate(`/patient/${patient_id}/${day}`);
  }

  return (
    <div className="bg-purple-100 p-5 rounded-lg shadow-lg w-full max-w-sm">
      <Card className="max-w-30">
        <List>
          <div className="flex flex-row items-center justify-center p-2">
            <SelectCareDayPagination active={active} setActive={setActive} />
          </div>
          {previous7Days.map((day) => (
            <ListItem
              key={day.isoDate}
              onClick={() => {
                handleDayClick(day.isoDate);
              }}
            >
              {day.humanReadableDate}
            </ListItem>
          ))}
        </List>
      </Card>
      <div className="mt-4 bg-white p-2 rounded-xl">
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-2 text-left font-medium"
        >
          Select a day to review:
        </Typography>
        <ReactDatePicker
          maxDate={new Date()}
          onChange={(selectedDate) => {
            const date = new Date(selectedDate);
            const isoDate = formatISO(date);
            handleDayClick(isoDate);
          }}
          dateFormat="PPPp"
          customInput={
            <Input label="Select Date" style={{ fontSize: "12px" }} />
          }
          popperContainer={({ children }) => (
            <div className="z-[9999]">{children}</div>
          )}
        />
      </div>
    </div>
  );
}

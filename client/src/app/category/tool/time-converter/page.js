"use client";

import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import TimeSlider from "@/components/TimeSlider"; // Adjust the import path as needed

const initialTimes = {
  GMT: { hours: 0, minutes: 0, ampm: "AM" },
};

const convertTimeTo24Hour = ({ hours, minutes, ampm }) => {
  const hours24 = ampm === "PM" ? (hours % 12) + 12 : hours % 12;
  return { hours: hours24, minutes };
};

const convertTimeTo12Hour = ({ hours, minutes }) => {
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 === 0 ? 12 : hours % 12;
  return { hours: displayHours, minutes, ampm };
};

export default function TimeConverter() {
  const [timeZones, setTimeZones] = useState([]);
  const [fromTimeZone, setFromTimeZone] = useState(null);
  const [toTimeZone, setToTimeZone] = useState(null);
  const [timeSliders, setTimeSliders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [convertedTimes, setConvertedTimes] = useState({});

  useEffect(() => {
    // Fetch time zones from Django backend
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/tools/convert-time/timezones/`)
      .then((response) => {
        const fetchedTimeZones = response.data.timezones.map((tz) => ({
          value: tz,
          label: tz,
        }));
        setTimeZones(fetchedTimeZones);

        // Set default time zones
        const defaultFromTimeZone = fetchedTimeZones[0];
        const defaultToTimeZone = fetchedTimeZones[1] || fetchedTimeZones[0];

        setFromTimeZone(defaultFromTimeZone);
        setToTimeZone(defaultToTimeZone);

        const defaultFromTime = initialTimes[defaultFromTimeZone.value] || {
          hours: 0,
          minutes: 0,
          ampm: "AM",
        };
        const defaultToTime = initialTimes[defaultToTimeZone.value] || {
          hours: 0,
          minutes: 0,
          ampm: "AM",
        };

        setTimeSliders([
          {
            id: "from",
            timeZone: defaultFromTimeZone.value,
            time: defaultFromTime,
          },
          {
            id: "to",
            timeZone: defaultToTimeZone.value,
            time: defaultToTime,
          },
        ]);
      })
      .catch((error) => console.error("Error fetching time zones:", error));
  }, []);

  const handleTimezoneChange = (type, selectedOption) => {
    if (type === "from") {
      setFromTimeZone(selectedOption);
      const newFromTime = initialTimes[selectedOption.value] || {
        hours: 0,
        minutes: 0,
        ampm: "AM",
      };
      setTimeSliders(
        timeSliders.map((slider) =>
          slider.id === "from"
            ? { ...slider, time: newFromTime, timeZone: selectedOption.value }
            : slider
        )
      );
    } else {
      setToTimeZone(selectedOption);
      const newToTime = initialTimes[selectedOption.value] || {
        hours: 0,
        minutes: 0,
        ampm: "AM",
      };
      setTimeSliders(
        timeSliders.map((slider) =>
          slider.id === "to"
            ? { ...slider, time: newToTime, timeZone: selectedOption.value }
            : slider
        )
      );
    }
  };

  const handleConvert = () => {
    setIsLoading(true);
    axios
      .post("http://127.0.0.1:5000/tools/convert-time/", {
        from_zone: fromTimeZone.value,
        to_zone: toTimeZone.value,
      })
      .then((response) => {
        //console.log(response.data);
        setConvertedTimes(response.data);
        setIsLoading(false);
        const defaultFromTime = {
          hours: 0,
          minutes: 0,
          ampm: "AM",
        };
        const hours = response.data.time_difference_minutes / 60;
        const minutes = response.data.time_difference_seconds - hours * 60;
        //console.log(hours, minutes);
        const defaultToTime = {
          hours: hours,
          minutes: minutes ? minutes : 0,
          ampm: convertedTimes.time_difference_minutes > 12 ? "AM" : "PM",
        };

        setTimeSliders([
          {
            id: "from",
            timeZone: fromTimeZone,
            time: defaultFromTime,
          },
          {
            id: "to",
            timeZone: toTimeZone,
            time: defaultToTime,
          },
        ]);
      })
      .catch((error) => {
        console.error("Error converting time:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 container">
      <div className="text-left">
        <div className="text-3xl flex gap-3 items-center font-extrabold tracking-tight text-indigo-500 sm:text-4xl">
          <h2 className="text-gray-900">Time Zone Converter</h2>
        </div>
        <p className="mt-3 max-w-md text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl">
          Select time zones and adjust the times using the sliders.
        </p>
      </div>
      <div className="bg-background rounded-lg border p-6 w-full mt-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="w-full mb-6">
            <label
              htmlFor="from-timezone"
              className="block mb-1 text-sm font-medium"
            >
              From Time Zone
            </label>
            <Select
              value={fromTimeZone}
              onChange={(option) => handleTimezoneChange("from", option)}
              options={timeZones}
            />
          </div>
          <div className="w-full mb-6">
            <label
              htmlFor="to-timezone"
              className="block mb-1 text-sm font-medium"
            >
              To Time Zone
            </label>
            <Select
              value={toTimeZone}
              onChange={(option) => handleTimezoneChange("to", option)}
              options={timeZones}
            />
          </div>
          <button
            className="bg-sky-900 text-white px-4 py-2 w-1/5 rounded-md"
            onClick={handleConvert}
            disabled={isLoading}
          >
            {isLoading ? "Converting..." : "Convert"}
          </button>
        </div>
        {timeSliders.map((slider) => (
          <TimeSlider key={slider.id} initialTime={slider.time} />
        ))}
        {convertedTimes.from_zone_datetime &&
          convertedTimes.to_zone_datetime && (
            <div className="mt-6">
              <p>
                <strong>From Time Zone:</strong>{" "}
                {new Date(convertedTimes.from_zone_datetime).toLocaleString()}
              </p>
              <p>
                <strong>To Time Zone:</strong>{" "}
                {new Date(convertedTimes.to_zone_datetime).toLocaleString()}
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

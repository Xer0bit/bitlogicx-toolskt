"use client";

import { useState, useRef, useEffect } from "react";
import { FaGripLinesVertical } from "react-icons/fa";

export default function TimeSlider({ initialTime }) {
  const [dragging, setDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState(initialTime);
  const fieldRef = useRef(null);
  const dragRef = useRef(null);

  useEffect(() => {
    const { hours, minutes } = initialTime;
    const fieldWidth = fieldRef.current?.offsetWidth;
    const partWidth = fieldWidth / 95; // 24 hours * 4 (15-minute intervals per hour)
    const totalParts = hours * 4 + minutes / 15; // 4 parts per hour, 15 minutes per part
    const initialPosition = partWidth * totalParts;

    setDragPosition(initialPosition);
  }, [initialTime]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (dragging && fieldRef.current) {
        const fieldRect = fieldRef.current.getBoundingClientRect();
        let newLeft = event.clientX - fieldRect.left;

        // Ensure the drag position stays within the slider bounds
        const fieldWidth = fieldRect.width;
        if (newLeft < 0) newLeft = 0;
        if (newLeft > fieldWidth) newLeft = fieldWidth;

        setDragPosition(newLeft);

        // Calculate time
        const partWidth = fieldWidth / 96; // 24 hours * 4 (15-minute intervals per hour)
        const totalParts = Math.floor(newLeft / partWidth);
        const newHours = Math.floor(totalParts / 4);
        const newMinutes = (totalParts % 4) * 15;
        let ampm = newHours >= 12 ? "PM" : "AM";
        if (newHours === 24 && ampm === "PM") {
          ampm = "AM";
        }
        const displayHours = newHours % 12 === 0 ? 12 : newHours % 12;
        const newTime = { hours: displayHours, minutes: newMinutes, ampm };
        setCurrentTime(newTime);
      }
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = () => {
    setDragging(true);
  };

  return (
    <div className="m-2 border-2 border-gray-400 bg-background select-none text-foreground rounded-md shadow-lg">
      <div className="px-10 py-5">
        <div className="flex items-center justify-between">
          <p className="text-5xl font-bold text-gray-400">PKT</p>
          <div className="mt-4 text-center border px-16 rounded-md shadow-inner shadow-gray-400 py-4">
            <p className="font-bold text-xl text-gray-400">
              {currentTime.hours}:
              {currentTime.minutes === 0 ? "00" : currentTime.minutes}{" "}
              {currentTime.ampm}
            </p>
          </div>
        </div>
      </div>
      <div className="text-gray-400 flex justify-between items-center px-10">
        <p>Pakistan Standard Time</p>
        <p>GMT +5</p>
        <p>Mon, Jul 29</p>
      </div>
      <div className="px-10 pb-10 pt-3">
        <div
          id="slider-container"
          className="relative flex items-center rounded-md bg-gradient-to-r from-sky-900 via-gray-300 to-sky-900"
          ref={fieldRef}
        >
          <div
            id="drag"
            className="absolute z-10 cursor-pointer rounded-sm bg-gray-300 border w-8 h-8 flex justify-center items-center"
            style={{ left: `${dragPosition - 5}px` }}
            onMouseDown={handleMouseDown}
            ref={dragRef}
          >
            <FaGripLinesVertical className="text-white" />
          </div>
          {/* Time ticks */}
          <div className="border relative border-gray-400 flex items-center py-2 h-full w-full">
            <p className="absolute -bottom-8 text-gray-400 -left-3">12am</p>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1"></div>
          </div>
          <div className="border relative border-gray-400 flex items-center py-2 h-full w-full">
            <p className="absolute -bottom-8 text-gray-400 -left-3">3am</p>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1"></div>
          </div>
          <div className="border relative border-gray-400 flex items-center py-2 h-full w-full">
            <p className="absolute -bottom-8 text-gray-400 -left-3">6am</p>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1"></div>
          </div>
          <div className="border relative border-gray-400 flex items-center py-2 h-full w-full">
            <p className="absolute -bottom-8 text-gray-400 -left-3">9am</p>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1"></div>
          </div>
          <div className="border relative border-gray-400 flex items-center py-2 h-full w-full">
            <p className="absolute -bottom-8 text-gray-400 -left-3">12pm</p>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1"></div>
          </div>
          <div className="border relative border-gray-400 flex items-center py-2 h-full w-full">
            <p className="absolute -bottom-8 text-gray-400 -left-3">3pm</p>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1"></div>
          </div>
          <div className="border relative border-gray-400 flex items-center py-2 h-full w-full">
            <p className="absolute -bottom-8 text-gray-400 -left-3">6pm</p>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1"></div>
          </div>
          <div className="border relative border-gray-400 flex items-center py-2 h-full w-full">
            <p className="absolute -bottom-8 text-gray-400 -left-3">9pm</p>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1 border-r-4"></div>
            <div className="w-full h-1"></div>
          </div>
          {/* Add time ticks as needed */}
        </div>
      </div>
    </div>
  );
}

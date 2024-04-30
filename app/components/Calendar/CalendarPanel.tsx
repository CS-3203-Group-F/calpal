"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState, Fragment, useRef, ReactNode, useEffect } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { EventModal } from "./EventModal";
import { ProgressActivity } from "../Icons";

// const eventExample = [
//   {
//     id: "CalPalplanning-1713828599629",
//     title: "CalPal planning",
//     allDay: false,
//     description: "Planning session for the upcoming CalPal event.",
//     location: "Devon Energy Hall 0270",
//     start: "2024-04-17T10:00:00.000Z",
//     end: "2024-04-17T12:00:00.000Z",
//     category: "Uncategorized",
//   },
// ];

const groupFDataExample = [
  {
    id: "CalPalplanning-1713828599629",
    title: "CalPal planning",
    description: "Planning session for the upcoming CalPal event.",
    location: "Devon Energy Hall 0270",
    start: "2024-04-17T10:00:00.000Z",
    end: "2024-04-17T12:00:00.000Z",
    editable: true,
    classNames: [
      "bg-yellow-200/50 border rounded-lg font-semibold border-yellow-500",
    ],
    textColor: "#713F12",
  },
  {
    id: "CalPalplanning-1713828599630",
    title: "CalPal planning",
    description: "Planning session for the upcoming CalPal event.",
    location: "Devon Energy Hall 0270",
    start: "2024-04-17T14:00:00.000Z",
    allDay: true,
    editable: true,
    classNames: [
      "bg-cyan-200/50 border rounded-lg font-semibold border-cyan-500",
    ],
    textColor: "#06B6D4",
  },
  {
    id: "EarningsReport-1713828599631",
    title: "Earnings Report",
    description: "Review and discussion of quarterly earnings report.",
    location: "CalPal Business Park Building 3, Room 2100",
    start: "2024-04-17T09:00:00.000Z",
    end: "2024-04-17T11:00:00.000Z",
    editable: true,
    classNames: [
      "bg-pink-200/50 border rounded-lg font-semibold border-pink-500",
    ],
    textColor: "#831843",
  },
  {
    id: "Bondingtrip-1713828599632",
    title: "Bonding trip",
    description: "Group bonding trip for members of Group F.",
    date: "2024-04-18T09:00:00",
    location: "Phoenix, Arizona",
    start: "2024-04-18T09:00:00.000Z",
    end: "2024-04-18T17:00:00.000Z",
    editable: true,
    classNames: [
      "bg-red-200/50 border rounded-lg font-semibold border-red-500",
    ],
    textColor: "#EF4444",
  },
  {
    id: "NewEvent1-1713828599633",
    title: "New Event 1",
    description: "Description of new event 1.",
    location: "Location of new event 1",
    start: "2024-04-17T15:00:00.000Z",
    end: "2024-04-17T16:00:00.000Z",
    editable: true,
    classNames: [
      "bg-blue-200/50 border rounded-lg font-semibold border-blue-500",
    ],
    textColor: "#3B82F6",
  },
  {
    id: "NewEvent2-1713828599634",
    title: "New Event 2",
    description: "Description of new event 2.",
    location: "Location of new event 2",
    start: "2024-04-18T13:00:00.000Z",
    end: "2024-04-18T14:00:00.000Z",
    editable: true,
    classNames: [
      "bg-green-200/50 border rounded-lg font-semibold border-green-500",
    ],
    textColor: "#10B981",
  },
];

function Error(props: { message: string }) {
  return (
    <div className="flex flex-col w-screen h-screen overflow-auto relative">
      <div className="flex flex-col justify-center gap-2 items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <span className="text-2xl font-semibold leading-6 text-gray-900">
          An error occured!
        </span>
        <p className="text-base font-normal leading-6 text-gray-500">
          {props.message}
        </p>
      </div>
    </div>
  );
}

// http://35.233.194.137/event/1

export default function CalendarPanel() {
  const [events, setEvents] = useState(groupFDataExample);
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<FullCalendar>(null);
  const [currentEvent, setCurrentEvent] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://35.233.194.137/events/4")
      .then((res) => res.json())
      .then((data: any) => {
        // setEvents(data); // Enable when events are set up
        setLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
      });
  }, []);
  if (isLoading)
    return (
      <div className="mx-auto my-auto animate-spin">
        <ProgressActivity color="#FBBF24" />
      </div>
    );
  if (!events) return <Error message={error} />;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleEventClick(event: any) {
    const currEvent = events.find((arrEvent) => arrEvent.id === event.id);
    setCurrentEvent({ ...currEvent });
    openModal();
  }

  return (
    <div
      className="flex flex-col w-screen h-screen overflow-auto"
      onClick={() => {
        console.log(events);
      }}
    >
      <EventModal
        currentEvent={currentEvent}
        isOpen={isOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
      <CalendarHeader
        calendarRef={calendarRef}
        events={events}
        setEvents={setEvents}
      />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        ref={calendarRef}
        initialView="dayGridMonth"
        events={events}
        eventClassNames={"border rounded font-semibold py-2 px-1 shadow"}
        height={"100%"}
        headerToolbar={false}
        nowIndicator={true}
        eventContent={renderEventContent}
        eventClick={(info) => handleEventClick(info.event)}
      />
    </div>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <div className="flex flex-col h-full justify-between overflow-hidden">
      <p style={{ color: `${eventInfo.event.textColor}` }} className="">
        {eventInfo.event.title}
      </p>
      <p
        style={{ color: `${eventInfo.event.textColor}` }}
        className="font-normal text-xs"
      >
        {eventInfo.timeText}
      </p>
    </div>
  );
}

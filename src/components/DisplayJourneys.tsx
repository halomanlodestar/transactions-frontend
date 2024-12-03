"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Journey } from "../../types";
import { isAfter } from "date-fns";

const DisplayJourneys = () => {
  const { data } = useQuery<Journey[]>({ queryKey: ["journeys"] });

  if (!data) {
    console.log(data);
    return <div></div>;
  }

  return (
    <div className={"space-y-2"}>
      {data.map((journey) => {
        // FIXME: This is not working as expected

        const now = new Date();
        const departure = journey.departure;
        const timeDiff = isAfter(departure, now);
        console.log(now, journey.departure, timeDiff);

        return (
          <div key={journey.journeyId} className={"p-2 border rounded"}>
            <div className={"flex justify-between"}>
              <h2 className={"text-lg"}>
                <span className={"font-semibold"}>{journey.start}</span> to{" "}
                <span className={"font-semibold"}>{journey.end}</span>
              </h2>
              <span>{timeDiff ? "Scheduled" : journey.status}</span>
            </div>
            <p>
              {journey.departure} - {journey.arrival}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayJourneys;

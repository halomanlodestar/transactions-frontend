"use client";

import React, { useState } from "react";
import SelectionInput from "./SelectionInput";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Stop } from "@/../types";
import { QueryClient, useQuery } from "@tanstack/react-query";

const fetchJourneys = async (stop1: Stop, stop2: Stop) => {
  const response = await fetch(
    `http://localhost:8080/journeys/between/${stop1.id}/${stop2.id}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
};

const StopSelection = () => {
  const URL = "http://localhost:8080/stops/like/";

  const queryClient = new QueryClient();

  const [stop1, setStop1] = useState<Stop>();
  const [stop2, setStop2] = useState<Stop>();

  const { data, refetch } = useQuery({
    queryKey: ["journeys"],
    queryFn: () => fetchJourneys(stop1!, stop2!),
  });

  return (
    <div className={"flex space-y-5 flex-col"}>
      <Label>First Stop</Label>
      <SelectionInput
        fetchUrl={URL}
        renderListItem={(item) => <div>{item.name}</div>}
        onSelect={(item) => setStop1(item)}
      />
      <Label>End Stop</Label>
      <SelectionInput
        fetchUrl={URL}
        renderListItem={(item) => <div>{item.name}</div>}
        onSelect={(item) => setStop2(item)}
      />
      <Button
        disabled={!stop1 || !stop2}
        onClick={async () => {
          // console.log(data);
          await refetch();
          await queryClient.invalidateQueries({ queryKey: ["journeys"] });
        }}
      >
        Search Journeys
      </Button>
    </div>
  );
};

export default StopSelection;

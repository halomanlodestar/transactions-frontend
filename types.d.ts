export interface Stop {
  id: number;
  name: string;
}

export interface Journey {
  arrival: string;
  departure: string;
  end: string;
  journeyId: number;
  routeId: number;
  routeName: string;
  start: string;
  status: string;
}

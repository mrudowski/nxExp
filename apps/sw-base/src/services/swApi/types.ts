export interface SWAbstractThing {
  name: string;
  url: string;
}

export interface Character extends SWAbstractThing {
  homeworld: string;
  species: string[];
  vehicles: string[];
}

export interface Planet extends SWAbstractThing {
  population: string; // TODO?
  residents: string[];
}

export interface Vehicle extends SWAbstractThing {
  vehicle_class: string;
  pilots: string[];
}

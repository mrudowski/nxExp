export interface SWAbstractThing {
  name: string;
  url: string;
}

export interface CharacterType extends SWAbstractThing {
  homeworld: string;
  species: string[];
  vehicles: string[];
}

export interface PlanetType extends SWAbstractThing {
  population: string; // TODO?
  residents: string[];
}

export interface VehicleType extends SWAbstractThing {
  vehicle_class: string;
  pilots: string[];
}

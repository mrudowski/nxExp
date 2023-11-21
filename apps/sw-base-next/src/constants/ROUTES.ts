export const ROUTES = {
  characters: 'characters',
  planets: 'planets',
  vehicles: 'vehicles',
} as const;

export const DETAILS_ROUTES = {
  character: `${ROUTES.characters}/:id`,
  planet: `${ROUTES.planets}/:id`,
  vehicle: `${ROUTES.vehicles}/:id`,
} as const;

export const DEFAULT_ROUTE = ROUTES.characters;

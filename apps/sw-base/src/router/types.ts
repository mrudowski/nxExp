import {ROUTES} from './ROUTES.ts';

export type RouteId = keyof typeof ROUTES;

export type DetailPageParams = {
  id: string;
};

import '../styles/index.scss';

import {QueryClient} from '@tanstack/react-query';
import {createBrowserRouter, Navigate} from 'react-router-dom';

import Character from '../routes/character/Character.tsx';
import Characters from '../routes/characters/Characters.tsx';
import ErrorPage from '../routes/ErrorPage.tsx';
import Layout from '../routes/layout/Layout.tsx';
import NotFoundPage from '../routes/NotFoundPage.tsx';
import Planet from '../routes/planet/Planet.tsx';
import Planets from '../routes/planets/Planets.tsx';
import Vehicle from '../routes/vehicle/Vehicle.tsx';
import Vehicles from '../routes/vehicles/Vehicles.tsx';
import {SW_API_URLS} from '../services/swApi/constants.ts';
import {listLoader, thingLoader} from '../services/swApi/loaders/loaders.ts';
import {DEFAULT_ROUTE, DETAILS_ROUTES, ROUTES} from './ROUTES.ts';

const getRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: <Navigate to={DEFAULT_ROUTE} replace={true} />,
            },
            {
              path: ROUTES.characters,
              element: <Characters />,
              loader: listLoader(queryClient, SW_API_URLS.characters),
            },
            {
              path: ROUTES.planets,
              element: <Planets />,
              loader: listLoader(queryClient, SW_API_URLS.planets),
            },
            {
              path: ROUTES.vehicles,
              element: <Vehicles />,
              loader: listLoader(queryClient, SW_API_URLS.vehicles),
            },
            {
              path: DETAILS_ROUTES.character,
              element: <Character />,
              loader: thingLoader(queryClient, SW_API_URLS.characters),
            },
            {
              path: DETAILS_ROUTES.planet,
              element: <Planet />,
              loader: thingLoader(queryClient, SW_API_URLS.planets),
            },
            {
              path: DETAILS_ROUTES.vehicle,
              element: <Vehicle />,
              loader: thingLoader(queryClient, SW_API_URLS.vehicles),
            },
            {
              path: '*',
              element: <NotFoundPage />,
            },
          ],
        },
      ],
    },
  ]);

export default getRouter;

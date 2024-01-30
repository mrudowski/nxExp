import {MantineProvider} from '@mantine/core';
import {Provider} from 'jotai';
import {useHydrateAtoms} from 'jotai/utils';
import {ReactNode} from 'react';

import {selectedPaletteTilesAtom, selectedPaletteTilesInitialValue} from '@/stateAtoms/paletteAtoms.ts';
import {sceneAtom, sceneAtomInitialValue} from '@/stateAtoms/sceneAtoms.ts';

interface HydrateAtomsProps {
  children: ReactNode;
  initialValues: [any, any][];
}

const HydrateAtoms = ({initialValues, children}: HydrateAtomsProps) => {
  useHydrateAtoms(initialValues);
  return children;
};

const JotaiProvider = ({initialValues, children}: HydrateAtomsProps) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

/**
 * atomWithReset is not primarily for testing. Provider is.
 * jotai is based on react context and to isolate state within memory, we need to use <Provider>.
 * https://github.com/pmndrs/jotai/issues/496#issuecomment-847938224
 *
 * but this is not enough...
 * We have to inject initialValue
 * https://jotai.org/docs/guides/testing#injected-values
 */

interface AppWrapperProps {
  children: ReactNode;
}

export const AppWrapper = ({children}: AppWrapperProps) => {
  return (
    <MantineProvider>
      <JotaiProvider
        initialValues={[
          [sceneAtom, sceneAtomInitialValue],
          [selectedPaletteTilesAtom, selectedPaletteTilesInitialValue],
        ]}
      >
        {children}
      </JotaiProvider>
    </MantineProvider>
  );
};

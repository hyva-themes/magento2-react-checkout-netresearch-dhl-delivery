import { useContext } from 'react';

import { LocationModalContext } from '../context';

export default function useLocationFinderModalContext() {
  return useContext(LocationModalContext);
}

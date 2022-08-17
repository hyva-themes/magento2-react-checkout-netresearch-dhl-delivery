import { useAppContext } from '../../../../../hooks';

export default function useDhlAppContext() {
  const { isLoggedIn, setPageLoader, setErrorMessage } = useAppContext();

  return {
    isLoggedIn,
    setPageLoader,
    setErrorMessage,
  };
}

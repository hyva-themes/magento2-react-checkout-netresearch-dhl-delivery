import useAppContext from '../../../../hook/useAppContext';

export default function useDhlAppContext() {
  const { isLoggedIn, setPageLoader, setErrorMessage } = useAppContext();

  return {
    isLoggedIn,
    setPageLoader,
    setErrorMessage,
  };
}

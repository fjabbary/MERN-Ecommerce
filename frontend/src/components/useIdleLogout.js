import { useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';

const useIdleLogout = (timeout, onLogout) => {
  const handleOnIdle = () => {
    onLogout(); // Perform logout
  };

  const { reset } = useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
  });

  useEffect(() => {
    reset(); // Reset the idle timer on component mount
  }, [reset]);

  return reset; // Return the reset function in case you need to manually reset the timer
};

export default useIdleLogout;

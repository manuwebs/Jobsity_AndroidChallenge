import { useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';

const useAPI = apiCall => {
  const data = useRef(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = useMemo(
    () =>
      async (...params) => {
        try {
          setLoading(true);
          const response = await apiCall(...params);
          data.current = response.data;
          setLoading(false);
        } catch (err) {
          if (!err.response) {
            Alert.alert(
              'Connection timeout',
              'Please check your internet conection and try again!',
            );
          }
          data.current = null;
          setLoading(false);
          setError(true);
        }
      },
    [apiCall],
  );

  return { request, data: data.current, error, loading };
};

export default useAPI;

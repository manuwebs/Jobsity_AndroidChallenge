import { useMemo, useState } from 'react';
import { Alert } from 'react-native';

const useAPI = apiCall => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const request = useMemo(
    () =>
      async (...params) => {
        try {
          setLoading(true);
          const response = await apiCall(...params);
          setData(response.data);
          setLoading(false);
        } catch (err) {
          if (!err.response) {
            Alert.alert(
              'Connection timeout',
              'Please check your internet conection and try again!',
            );
          }
          setData(null);
          setLoading(false);
          setError(true);
        }
      },
    [apiCall],
  );

  return { request, data, error, loading, setData };
};

export default useAPI;

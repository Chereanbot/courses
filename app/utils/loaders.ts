import { useNavigation, useRouteLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';

export const usePageLoadingState = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigation.state === 'loading') {
      setIsLoading(true);
    } else {
      const timeout = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [navigation.state]);

  return isLoading;
};

export const useDataLoadingState = () => {
  const navigation = useNavigation();
  return navigation.state === 'loading';
};

export const useActionLoadingState = (formId?: string) => {
  const navigation = useNavigation();
  return navigation.state === 'submitting' && 
    (!formId || navigation.formData?.get('formId') === formId);
};

export const useInitialLoadingState = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsInitialLoad(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return isInitialLoad;
};

export const useDeferredLoadingState = (key: string) => {
  const data = useRouteLoaderData('root');
  return !data || !(key in data);
}; 
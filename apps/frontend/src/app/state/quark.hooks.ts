import { useEffect, useState } from 'react';

import { Quark } from './quark';
import { quarkState } from './quark.state';
import { ListenerType } from './quark.types';

export const useQuarkValue = <T>(key: string): T => {
  const instance: Quark<T> = quarkState.get<T>(key);

  const [innerValue, setInnerValue] = useState<T>(instance.get());

  useEffect(() => {
    const subscription = instance.subscribe(setInnerValue);
    return () => instance.unsubscribe(subscription);
  }, [instance, setInnerValue]);

  return innerValue;
};

export const useQuarkState = <T>(key: string): [T, ListenerType<T>] => {
  const instance: Quark<T> = quarkState.get<T>(key);
  const value = useQuarkValue<T>(key);

  return [value, (newValue: T) => instance.set(newValue)];
};

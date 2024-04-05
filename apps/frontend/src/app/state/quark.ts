import { BehaviorSubject, Subscription } from 'rxjs';

import { ListenerType } from './quark.types';

export class Quark<T> {
  private value: T;
  private listeners: BehaviorSubject<T>;

  constructor(initialValue: T) {
    this.value = initialValue;
    this.listeners = new BehaviorSubject(this.value);
  }

  get(): T {
    return this.value;
  }

  set(newValue: T): void {
    if (this.value !== newValue) {
      this.value = newValue;
      this.listeners.next(this.value);
    }
  }

  subscribe(listener: ListenerType<T>): Subscription {
    return this.listeners.subscribe(listener);
  }

  unsubscribe(subscription: Subscription): void {
    subscription.unsubscribe();
  }
}

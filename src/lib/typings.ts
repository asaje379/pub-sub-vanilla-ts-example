// PubSub
export type PubSubCb<T> = (data: T) => void | Promise<void>; // Peut donc supporter des fonctions async

export interface PubSbubEvent<T> {
  id: number | string;
  callback: PubSubCb<T>;
}

// Friends
export interface Friend {
  name: string;
  age: number;
}

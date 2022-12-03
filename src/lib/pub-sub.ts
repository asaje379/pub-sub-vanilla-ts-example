import { PubSubCb, PubSbubEvent } from "./typings";

export class PubSub<T> {
  private $events: Record<string, PubSbubEvent<T>[]> = {};

  private register(eventName: string, cb: PubSubCb<T>) {
    let id = 1;
    if (!(eventName in this.$events)) {
      this.$events[eventName] = [{ id, callback: cb }];
    } else {
      id = this.$events[eventName].length + 1;
      this.$events[eventName].push({ id, callback: cb });
    }
    return id;
  }

  private removeEvent(eventName: string, id: number | string) {
    this.$events[eventName] = this.$events[eventName].filter(
      (event) => event.id !== id
    );
  }

  subscribe(eventName: string, cb: PubSubCb<T>) {
    const id = this.register(eventName, cb);
    console.log(`New subscription ${eventName}: `, this.$events[eventName]);
    return { unsubscribe: () => this.removeEvent(eventName, id) };
  }

  publish(eventName: string, data: T) {
    console.log(`Value publish to room ${eventName}: `, data);
    if (!(eventName in this.$events)) {
      throw `Invalid event name ${eventName}`;
    }

    for (const event of this.$events[eventName]) {
      event.callback(data);
    }
  }
}

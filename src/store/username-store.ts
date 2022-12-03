import { UserNameEvent } from "../events/events";
import { PubSub } from "../lib/pub-sub";

export class UsernameStore {
  static value: string = "";
  ps = new PubSub<string>();

  constructor() {
    this.ps.subscribe(UserNameEvent.NAME_CHANGED, (value: string) => {
      UsernameStore.value = value;
    });
  }

  setValue(value: string) {
    this.ps.publish(UserNameEvent.NAME_CHANGED, value);
  }
}

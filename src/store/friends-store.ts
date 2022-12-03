import { FriendsEvent } from "../events/events";
import { PubSub } from "../lib/pub-sub";
import { Friend } from "../lib/typings";

export class FriendStore {
  static friends: Friend[] = [];
  ps = new PubSub<Friend>();

  constructor() {
    this.ps.subscribe(FriendsEvent.NEW_FRIEND_ADDED, (value: Friend) => {
      FriendStore.friends.push(value);
    });
  }

  addFriend(friend: Friend) {
    this.ps.publish(FriendsEvent.NEW_FRIEND_ADDED, friend);
  }
}

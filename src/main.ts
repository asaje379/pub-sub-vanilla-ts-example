import { Friend } from "./lib/typings";
import { FriendStore } from "./store/friends-store";
import { UsernameStore } from "./store/username-store";
// Initialisation
const usernameStore = new UsernameStore();
const friendStore = new FriendStore();

// Gerer le username
export const usernameInput = document.querySelector("#username");
console.log(usernameInput);
usernameInput?.addEventListener("input", (e: any) => {
  usernameStore.setValue(e.target.value);
  reRenderUser();
});

// Mettre a jour le user
function reRenderUser() {
  const userSpan = document.querySelector("#user");
  if (userSpan) userSpan.innerHTML = UsernameStore.value;
}

// Recuperer les valeurs du formulaire à la soumission
const form = document.querySelector("form");
form?.addEventListener("submit", (e: any) => {
  e.preventDefault();
  const { name, age } = form.elements as any;
  const friend = { name: name.value, age: age.value };
  friendStore.addFriend(friend);
  reRenderFriends();
  form.reset();
});

function reRenderFriends() {
  const friendCountSpan = document.querySelector("#friends-count");
  if (friendCountSpan)
    friendCountSpan.innerHTML = FriendStore.friends.length + "";

  const friendListTemplate = `
<ul>
  ${FriendStore.friends
    .map(
      (friend: Friend) =>
        "<li>" + friend.name + " - " + friend.age + "ans" + "</li>"
    )
    .join("<br />")}
</ul>  
  `;

  const friendListDiv = document.querySelector("#friends-list");
  console.log(friendListDiv);
  if (friendListDiv) friendListDiv.innerHTML = friendListTemplate;
}

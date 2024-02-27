import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import * as firebase from "firebase/compat/app";
import { Observable } from "rxjs";
import { switchMap, map } from "rxjs/operators";
import jwt_decode from "jwt-decode";
import { ShowProfileUserService } from "../api/showProfileUser/showProfileUser.service";
import { v4 as uuidv4 } from "uuid";
import { AssistantsService } from "../api/assistants/assistants.service";
import { IonContent } from "@ionic/angular";
import { EventService } from "../event/event.service";

export interface User {
  email: string;
  idAssistant: string;
  name: string;
}

export interface Chat {
  createdAt: firebase.default.firestore.FieldValue;
  isGroup: boolean;
  messages: [];
  uid: string;
  users: [];
}
export interface Msg {
  createdAt: Date;
  from: string;
  msg: string;
  seen: boolean;
}

@Injectable({
  providedIn: "root",
})
export class ChatService {
  currentUser: User = null;
  eventName = this.eventSvc.eventName;

  showVideocall = true;

  assistants = [];

  public contNewMsgs = 0;

  public setForNewChat = true;

  constructor(
    private afs: AngularFirestore,
    private showProfileUserService: ShowProfileUserService,
    private assistantsSvc: AssistantsService,
    public eventSvc: EventService
  ) {
    if (this.currentUser === null && localStorage.getItem("selecteduserJWT")) {
      if (
        localStorage.getItem("selecteduserJWT") !== null &&
        localStorage.getItem("selecteduserJWT") !== "null"
      ) {
        this.currentUser = {
          email: jwt_decode(localStorage.getItem("selecteduserJWT"))["email"],
          idAssistant: jwt_decode(localStorage.getItem("selecteduserJWT"))[
            "id"
          ],
          // tslint:disable-next-line: max-line-length
          name:
            jwt_decode(localStorage.getItem("selecteduserJWT"))["name"] +
            " " +
            jwt_decode(localStorage.getItem("selecteduserJWT"))["surnames"],
        };
        this.getAssistants();
      }
    }
  }

  async getAssistants() {
    this.assistants = await this.assistantsSvc
      .getAssistants()
      .then((result) => result.users);
    // this.assistantsSvc.assistants = await this.assistantsSvc
    //   .getAssistants()
    //   .then((result) => result.users);
  }

  async signUp({ email, idAssistant, name }) {
    this.currentUser = { email, idAssistant, name };
    return this.afs.doc(this.eventName + `_users/${idAssistant}`).set({
      email,
      idAssistant,
      name,
      chats: [],
      token: "",
    });
  }

  async signIn({ email, idAssistant, name }) {
    let create = true;
    const users = await firebase.default
      .firestore()
      .collection(this.eventName + "_users")
      .get()
      .then((userData) => {
        const data = [];
        userData.forEach((childData) => {
          data.push(childData.data());
        });
        return data;
      });
    if (users) {
      users.forEach((user) => {
        if (idAssistant === user.idAssistant) {
          this.currentUser = user;
          create = false;
          this.afs
            .collection(this.eventName + "_users")
            .doc(idAssistant)
            .update({
              email,
              name,
            });
        }
      });
      if (create) {
        this.signUp({ email, idAssistant, name });
      }
    }
  }

  signOut() {
    localStorage.setItem("uid", null);
  }

  getUsers() {
    return this.afs
      .collection(this.eventName + "_users")
      .valueChanges({ idField: "idAssistant" }) as Observable<User[]>;
  }

  getUserForMsg(msgFromId, users: User[]): string {
    for (const usr of users) {
      if (usr.idAssistant === msgFromId) {
        return usr.name;
      }
    }
    return "Deleted";
  }

  deleteUser() {
    this.afs
      .doc(this.eventName + `_users/${firebase.default.auth().currentUser.uid}`)
      .delete();
  }

  createChat(listUsers = [], msg?, group = false, nameGroup?) {
    const uid = uuidv4();
    listUsers.push(this.currentUser.idAssistant);
    listUsers.forEach((user) => {
      this.afs
        .collection(this.eventName + "_users")
        .doc(user)
        .update({
          chats: firebase.default.firestore.FieldValue.arrayUnion(uid),
        })
        .catch(() => {
          this.afs.doc(this.eventName + `_users/${user}`).set({
            name: "",
            email: "",
            idAssistant: user,
            chats: firebase.default.firestore.FieldValue.arrayUnion(uid),
          });
        });
    });
    let info = {};
    if (group) {
      info = {
        admins: [this.currentUser.idAssistant],
        isGroup: group,
        name: nameGroup,
        createdBy: this.currentUser.idAssistant,
        createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
        messages: [],
        users: listUsers,
        uid,
      };
    } else {
      info = {
        isGroup: group,
        createdAt: firebase.default.firestore.FieldValue.serverTimestamp(),
        messages: [
          {
            msg,
            from: this.currentUser.idAssistant,
            seen: false,
            createdAt: Date.now(),
          },
        ],
        users: listUsers,
        uid,
      };
    }
    return this.afs
      .doc(this.eventName + `_chats/${uid}`)
      .set(info)
      .then(() => uid);
  }

  async getChat(uid) {
    let chat: any;
    const chats = await firebase.default
      .firestore()
      .collection(this.eventName + "_chats")
      .get()
      .then((userData) => {
        return userData;
      });

    if (chats) {
      chats.forEach((childData) => {
        if (childData.data().uid === uid) {
          chat = childData.data();
        }
      });
      return chat;
    }
  }

  async getNameUserForGroup(uid) {
    const db = firebase.default.firestore();
    const docRef = db.collection(this.eventName + "_users").doc(uid);
    return await docRef.get().then((doc) => {
      return doc.data();
    });
  }

  getAllChats() {
    return this.afs
      .collection(this.eventName + "_chats")
      .valueChanges({ idField: "uid" }) as Observable<Chat[]>;
  }

  getChatMessages(uid, content: IonContent) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .doc(uid)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        if (!chat.isGroup) {
          this.setSeenMessages(uid, chat.messages);
        }

        if (content !== undefined) {
          content.scrollToBottom();
        }
        return chat.messages;
      })
    );
  }

  setSeenMessages(uid, msg) {
    const selectedUser = jwt_decode(localStorage.getItem("selecteduserJWT"))[
      "id"
    ];
    msg.forEach((msg) => {
      if (msg.from !== selectedUser) {
        msg.seen = true;
      }
    });
    // const seenMessages = messages
    //   .filter((message) => !message.seen)
    //   .map((message) => {
    //     message.seen = true;
    //     return message;
    //   });

    this.afs
      .collection(this.eventName + "_chats")
      .doc(uid)
      .update({
        msg,
      })
      .catch((err) => {
        console.log("Error al actualizar", err);
      });
  }

  getUnseenMessages(uid) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .doc(uid)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        let contMsgs = 0;
        chat.messages.forEach((msg) => {
          if (
            !msg.seen &&
            msg.from !==
              jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]
          ) {
            contMsgs++;
          }
        });
        return contMsgs;
      })
    );
  }

  getChatsForUser() {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .valueChanges() as Observable<any>;
      }),
      map((chats) => {
        const chatsforUser = [];
        chats.forEach((chat) => {
          chat.users.forEach((userUid) => {
            if (
              userUid ===
              jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]
            ) {
              chatsforUser.push(chat);
            }
          });
        });
        chatsforUser.sort((a, b) => {
          let first: any;
          let second: any;

          if (a.messages.length === 0) {
            first = a.createdAt.toDate().getTime();
          } else {
            first = a.messages[a.messages.length - 1].createdAt;
          }

          if (b.messages.length === 0) {
            second = b.createdAt.toDate().getTime();
          } else {
            second = b.messages[b.messages.length - 1].createdAt;
          }

          if (first < second) {
            return 1;
          }
          if (first > second) {
            return -1;
          }
          return 0;
        });
        this.contNewMsgs = 0;
        chatsforUser.forEach((chat) => {
          if (!chat.isGroup) {
            chat.messages.forEach((msg) => {
              if (
                !msg.seen &&
                msg.from !==
                  jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]
              ) {
                this.contNewMsgs++;
              }
            });
          }
        });

        if (chatsforUser.length === 0) {
          return null;
        }
        return chatsforUser;
      })
    );
  }

  getLastMessage(uid) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .doc(uid)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        return chat.messages[chat.messages.length - 1].msg;
      })
    );
  }

  isLastMessageMine(uid) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .doc(uid)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        const id = chat.messages[chat.messages.length - 1].from;
        if (id === jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]) {
          return true;
        }
        return false;
      })
    );
  }

  getNameLastMessage(uid) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .doc(uid)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        if (chat.messages.length === 0) {
          return "CHAT.noMessages";
        }
        const lastMsg = chat.messages[chat.messages.length - 1];
        if (
          lastMsg.from ===
          jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]
        ) {
          return "CHAT.me";
        }
        let name = "";
        this.assistants.forEach((assistant) => {
          if (assistant.id === lastMsg.from) {
            if (assistant.surnames !== null) {
              name = assistant.name + " " + assistant.surnames;
            } else {
              name = assistant.name;
            }
          }
        });
        return name + ":";
      })
    );
  }

  getNameUser(uid) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .doc(uid)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        let name = "";
        if (this.assistants.length === 0) {
          this.getAssistants();
        }
        this.assistants.forEach((assistant) => {
          chat.users.forEach((id) => {
            if (
              assistant.id === id &&
              id !== jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]
            ) {
              if (assistant.surnames !== null) {
                name = assistant.name + " " + assistant.surnames;
              } else {
                name = assistant.name;
              }
            }
          });
        });
        return name;
      })
    );
  }

  getUidUserChat(uid) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .doc(uid)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        if (chat.isGroup) {
          return null;
        }
        let selectedUser = "";
        chat.users.forEach((user) => {
          if (
            user !== jwt_decode(localStorage.getItem("selecteduserJWT"))["id"]
          ) {
            selectedUser = user;
          }
        });
        return selectedUser;
      })
    );
  }

  async hasConversation(idAssistant) {
    const id = jwt_decode(localStorage.getItem("selecteduserJWT"))["id"];

    const chats = await firebase.default
      .firestore()
      .collection(this.eventName + "_chats")
      .get()
      .then((userData) => {
        return userData;
      });

    let existedChat = null;
    if (chats) {
      chats.forEach((childData) => {
        let chatMyUser = false;
        let chatOtherUser = false;
        const chat = childData.data();
        if (!chat.isGroup && chat.users.length === 2) {
          chat.users.forEach((user) => {
            if (user === id) {
              chatMyUser = true;
            }
            if (user === idAssistant) {
              chatOtherUser = true;
            }
          });
          if (chatMyUser && chatOtherUser) {
            existedChat = chat.uid;
          }
        }
      });
      return existedChat;
    }
  }

  addMessage(msg, uid) {
    return this.afs
      .collection(this.eventName + "_chats")
      .doc(uid)
      .update({
        messages: firebase.default.firestore.FieldValue.arrayUnion({
          msg,
          from: this.currentUser.idAssistant,
          name: this.currentUser.name,
          seen: false,
          createdAt: Date.now(),
        }),
      });
  }

  addVideocallMessage(uid) {
    return this.afs
      .collection(this.eventName + "_chats")
      .doc(uid)
      .update({
        messages: firebase.default.firestore.FieldValue.arrayUnion({
          msg: "CHAT.enterVideocall",
          videocall: true,
          from: this.currentUser.idAssistant,
          name: this.currentUser.name,
          seen: false,
          createdAt: Date.now(),
        }),
      });
  }

  chatIsGroup(uid) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .doc(uid)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        return chat.isGroup;
      })
    );
  }

  getUsersChat(uid) {
    return this.getAllChats().pipe(
      switchMap(() => {
        return this.afs
          .collection(this.eventName + "_chats", (ref) =>
            ref.orderBy("createdAt")
          )
          .doc(uid)
          .valueChanges() as Observable<any>;
      }),
      map((chat) => {
        const users = [];
        const chatUsers = chat.users;
        // console.log(chat);
        if (this.assistants.length === 0) {
          this.getAssistants();
        }
        this.assistants.forEach((assistant) => {
          chatUsers.forEach((chatUser) => {
            if (assistant.id === chatUser) {
              users.push(assistant);
            }
          });
        });
        users.forEach((user) => {
          user.admin = false;
          if (chat.isGroup) {
            chat.admins.forEach((admin) => {
              if (user.id === admin) {
                user.admin = true;
              }
            });
          }
        });
        // console.log(users);
        return users.sort((a, b) => {
          if (
            this.takeOffAccents(a.name.toUpperCase().trim()) >
            this.takeOffAccents(b.name.toUpperCase().trim())
          ) {
            return 1;
          }
          if (
            this.takeOffAccents(a.name.toUpperCase().trim()) <
            this.takeOffAccents(b.name.toUpperCase().trim())
          ) {
            return -1;
          }
          return 0;
        });
      })
    );
  }

  takeOffAccents(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  addToGroup(idAssistant, uid) {
    this.afs
      .collection(this.eventName + "_users")
      .doc(idAssistant)
      .update({
        chats: firebase.default.firestore.FieldValue.arrayUnion(uid),
      });
    return this.afs
      .collection(this.eventName + "_chats")
      .doc(uid)
      .update({
        users: firebase.default.firestore.FieldValue.arrayUnion(idAssistant),
      });
  }

  setNewNameGroup(name, uid) {
    return this.afs
      .collection(this.eventName + "_chats")
      .doc(uid)
      .update({
        name,
      });
  }

  setAdminGroup(idAssistant, uid) {
    return this.afs
      .collection(this.eventName + "_chats")
      .doc(uid)
      .update({
        admins: firebase.default.firestore.FieldValue.arrayUnion(idAssistant),
      });
  }

  deleteAdminGroup(idAssistant, uid) {
    return this.afs
      .collection(this.eventName + "_chats")
      .doc(uid)
      .update({
        admins: firebase.default.firestore.FieldValue.arrayRemove(idAssistant),
      });
  }

  deleteFromGroup(idAssistant, uid) {
    this.afs
      .collection(this.eventName + "_users")
      .doc(idAssistant)
      .update({
        chats: firebase.default.firestore.FieldValue.arrayRemove(uid),
      });
    return this.afs
      .collection(this.eventName + "_chats")
      .doc(uid)
      .update({
        admins: firebase.default.firestore.FieldValue.arrayRemove(idAssistant),
        users: firebase.default.firestore.FieldValue.arrayRemove(idAssistant),
      });
  }

  showChatMeetButton(userRole) {
    let showButton = false;
    const sub = jwt_decode(localStorage.getItem("selecteduserJWT"))["sub"];
    switch (sub) {
      case "BASIC":
        showButton = false;
        break;
      case "MEDIUM":
        showButton = false;
        break;
      case "PREMIUM":
        showButton = true;
        break;
      case "ADMIN":
        showButton = true;
        break;
      case "EMPLOYEE":
        switch (userRole) {
          case "BASIC":
            showButton = false;
            break;
          case "MEDIUM":
            showButton = false;
            break;
          case "PREMIUM":
            showButton = true;
            break;
          case "ADMIN":
            showButton = true;
            break;
          case "EMPLOYEE":
            showButton = false;
            break;
        }
        break;
    }
    return showButton;
  }
}

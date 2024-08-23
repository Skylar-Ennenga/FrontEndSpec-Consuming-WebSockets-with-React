import { createContext, Dispatch, SetStateAction } from "react";

export interface ChatUser {
  name: string;
}

export const initialUserState: ChatUser = {
  name: "",
};

const UserContext = createContext<{
  chatuser: ChatUser;
  setChatUser: Dispatch<SetStateAction<ChatUser>>;
}>({
  chatuser: initialUserState,
  setChatUser: () => {}, 
});

export default UserContext;
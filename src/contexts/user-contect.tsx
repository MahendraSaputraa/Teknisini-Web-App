"use client";

import { createContext, useContext } from "react";
type UserContextType = {
  user: any;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: undefined,
  isLoading: true,
});

export const useUser = () => useContext(UserContext);

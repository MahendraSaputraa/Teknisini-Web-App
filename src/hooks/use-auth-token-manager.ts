import { auth } from "@/lib/firebaseClient";
import { onIdTokenChanged } from "firebase/auth";
import Cookies from "js-cookie";

export function initTokenRefresh() {
  const unsubscribe = onIdTokenChanged(auth, async (user) => {
    if (user) {
      const freshToken = await user.getIdToken();
      Cookies.set("access_token", freshToken, { path: "/", expires: 7 });
    } else {
      // User logged out atau token invalid
      Cookies.remove("access_token");
      Cookies.remove("role");
    }
  });

  return unsubscribe;
}

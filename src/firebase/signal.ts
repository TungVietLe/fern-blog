import { signal } from "@preact/signals-react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";

export const user = signal<User | null>(null)

onAuthStateChanged(auth, (u)=>{ //automatically login if already logged
    user.value = u
})

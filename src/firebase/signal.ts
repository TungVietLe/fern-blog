import { signal } from "@preact/signals-react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

export const user = signal<User | null>(null)

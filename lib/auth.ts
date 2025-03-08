import { auth } from "./firebase"
import { sendPasswordResetEmail } from "firebase/auth"

export async function sendPasswordReset(email: string) {
  return sendPasswordResetEmail(auth, email)
}


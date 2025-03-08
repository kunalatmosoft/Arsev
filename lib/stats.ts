import { db } from "./firebase"
import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore"

export async function getCommunityStats() {
  const usersSnapshot = await getDocs(collection(db, "users"))
  const postsSnapshot = await getDocs(collection(db, "posts"))

  // Get online users (users active in last 5 minutes)
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
  const onlineUsersQuery = query(collection(db, "users"), where("lastActive", ">=", fiveMinutesAgo))
  const onlineUsersSnapshot = await getDocs(onlineUsersQuery)

  // Sum total likes from all posts
  let totalLikes = 0
  postsSnapshot.forEach((docSnap) => {
    const data = docSnap.data()
    totalLikes += data.likes || 0
  })

  return {
    totalMembers: usersSnapshot.size,
    totalPosts: postsSnapshot.size,
    onlineUsers: onlineUsersSnapshot.size,
    totalLikes,
  }
}

export async function updateUserLastActive(userId: string) {
  const userRef = doc(db, "users", userId)
  await updateDoc(userRef, {
    lastActive: new Date(),
  })
}

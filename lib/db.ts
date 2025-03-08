/*import { db } from "@/lib/firebase"
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  increment,
  serverTimestamp,
  where,
  setDoc,
} from "firebase/firestore"

// ------------------
// Interfaces
// ------------------

export interface CreatePostData {
  title: string;
  content: string;
  imageUrl?: string;
}

export interface Post extends CreatePostData {
  id: string;
  authorId: string;
  createdAt: any; // Consider using Firebase Timestamp if needed
  likes: number;
  comments: number;
  author?: UserProfile;
}

export interface UpdatePostData {
  title?: string;
  content?: string;
  imageUrl?: string;
}

export interface Comment extends CreateCommentData {
  id: string;
  postId: string;
  authorId: string;
  createdAt: any; // Consider using Firebase Timestamp if needed
  likes: number;
  author?: UserProfile;
}

export interface CreateCommentData {
  content: string;
}

export interface UpdateUserProfileData {
  name?: string;
  bio?: string;
  avatarUrl?: string;
  // add any additional profile fields as needed
}

export interface UserProfile {
  id: string;
  name?: string;
  bio?: string;
  avatarUrl?: string;
  posts?: number;
  comments?: number;
  followers?: number;
  following?: number;
  lastActive?: any; // Consider using Firebase Timestamp if needed
}

// ------------------
// Posts
// ------------------

export async function createPost(userId: string, data: CreatePostData): Promise<string> {
  const postData = {
    ...data,
    authorId: userId,
    createdAt: serverTimestamp(),
    likes: 0,
    comments: 0,
  }

  const docRef = await addDoc(collection(db, "posts"), postData)
  await updateDoc(doc(db, "users", userId), { posts: increment(1) })

  return docRef.id
}

export async function getPosts(): Promise<Post[]> {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)

  const posts: Post[] = []
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data()
    const post: Post = { id: docSnap.id, authorId: data.authorId, ...data } as Post
    const author = await getUser(post.authorId)
    posts.push({ ...post, author: author || undefined })
  }

  return posts
}

export async function getPost(postId: string): Promise<Post | null> {
  const docRef = doc(db, "posts", postId)
  const postDoc = await getDoc(docRef)

  if (!postDoc.exists()) return null

  const data = postDoc.data()
  const post: Post = { id: postDoc.id, authorId: data.authorId, ...data } as Post
  const author = await getUser(post.authorId)

  return { ...post, author: author || undefined }
}

// ------------------
// Comments
// ------------------

export async function createComment(postId: string, userId: string, content: string): Promise<string> {
  const commentData = {
    postId,
    authorId: userId,
    content,
    createdAt: serverTimestamp(),
    likes: 0,
  }

  const docRef = await addDoc(collection(db, "comments"), commentData)
  await updateDoc(doc(db, "posts", postId), { comments: increment(1) })
  await updateDoc(doc(db, "users", userId), { comments: increment(1) })

  return docRef.id
}

export async function getComments(postId: string): Promise<Comment[]> {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)

  const comments: Comment[] = []
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data()
    const comment: Comment = { id: docSnap.id, authorId: data.authorId, ...data } as Comment
    const author = await getUser(comment.authorId)
    comments.push({ ...comment, author: author || undefined })
  }

  return comments
}

// ------------------
// Users
// ------------------

export async function getUser(userId: string): Promise<UserProfile | null> {
  const docRef = doc(db, "users", userId)
  const userDoc = await getDoc(docRef)

  if (!userDoc.exists()) return null

  return { id: userDoc.id, ...userDoc.data() } as UserProfile
}

export async function updateUserProfile(userId: string, data: UpdateUserProfileData): Promise<void> {
  const userRef = doc(db, "users", userId)
  const updateData: { [key: string]: any } = {}
  if (data.name !== undefined) updateData.name = data.name
  if (data.bio !== undefined) updateData.bio = data.bio
  if (data.avatarUrl !== undefined) updateData.avatarUrl = data.avatarUrl
  await updateDoc(userRef, updateData)
}

// ------------------
// Likes
// ------------------

export async function toggleLike(postId: string, userId: string): Promise<boolean> {
  const likeRef = doc(db, "likes", `${postId}_${userId}`)
  const likeDoc = await getDoc(likeRef)

  if (likeDoc.exists()) {
    await deleteDoc(likeRef)
    await updateDoc(doc(db, "posts", postId), { likes: increment(-1) })
    return false
  } else {
    await setDoc(likeRef, {
      postId,
      userId,
      createdAt: serverTimestamp(),
    })
    await updateDoc(doc(db, "posts", postId), { likes: increment(1) })
    return true
  }
}

export async function checkLiked(postId: string, userId: string): Promise<boolean> {
  const likeRef = doc(db, "likes", `${postId}_${userId}`)
  const likeDoc = await getDoc(likeRef)
  return likeDoc.exists()
}

// ------------------
// Additional Post Functions
// ------------------

export async function getUserPosts(userId: string): Promise<Post[]> {
  const q = query(
    collection(db, "posts"),
    where("authorId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  const posts: Post[] = []
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data()
    const post: Post = { id: docSnap.id, authorId: data.authorId, ...data } as Post
    const author = await getUser(post.authorId)
    posts.push({ ...post, author: author || undefined })
  }
  return posts
}

export async function deletePost(postId: string): Promise<void> {
  const postRef = doc(db, "posts", postId)
  const postDoc = await getDoc(postRef)
  if (!postDoc.exists()) return
  const data = postDoc.data()
  // Decrement the user's posts count
  await updateDoc(doc(db, "users", data.authorId), { posts: increment(-1) })
  // Delete the post document
  await deleteDoc(postRef)
}

export async function updatePost(postId: string, data: UpdatePostData): Promise<void> {
  const postRef = doc(db, "posts", postId)
  const updateData: { [key: string]: any } = {}
  if (data.title !== undefined) updateData.title = data.title
  if (data.content !== undefined) updateData.content = data.content
  if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl
  await updateDoc(postRef, updateData)
}

// ------------------
// Comments Management
// ------------------

export async function deleteComment(commentId: string): Promise<void> {
  const commentRef = doc(db, "comments", commentId)
  const commentDoc = await getDoc(commentRef)
  if (!commentDoc.exists()) return
  const data = commentDoc.data()
  // Decrement the comments count in the post and user's profile:
  await updateDoc(doc(db, "posts", data.postId), { comments: increment(-1) })
  await updateDoc(doc(db, "users", data.authorId), { comments: increment(-1) })
  await deleteDoc(commentRef)
}

// ------------------
// Community Stats
// ------------------

export async function getCommunityStats(): Promise<{
  totalMembers: number;
  totalPosts: number;
  onlineUsers: number;
  totalLikes: number;
}> {
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

export async function updateUserLastActive(userId: string): Promise<void> {
  const userRef = doc(db, "users", userId)
  await updateDoc(userRef, { lastActive: new Date() })
}

// ------------------
// Followers
// ------------------

export async function followUser(currentUserId: string, targetUserId: string): Promise<void> {
  const followDocId = `${currentUserId}_${targetUserId}`
  const followRef = doc(db, "follows", followDocId)
  const followDoc = await getDoc(followRef)
  if (!followDoc.exists()) {
    await setDoc(followRef, {
      followerId: currentUserId,
      followingId: targetUserId,
      createdAt: serverTimestamp(),
    })
    await updateDoc(doc(db, "users", targetUserId), { followers: increment(1) })
    await updateDoc(doc(db, "users", currentUserId), { following: increment(1) })
  }
}

export async function unfollowUser(currentUserId: string, targetUserId: string): Promise<void> {
  const followDocId = `${currentUserId}_${targetUserId}`
  const followRef = doc(db, "follows", followDocId)
  const followDoc = await getDoc(followRef)
  if (followDoc.exists()) {
    await deleteDoc(followRef)
    await updateDoc(doc(db, "users", targetUserId), { followers: increment(-1) })
    await updateDoc(doc(db, "users", currentUserId), { following: increment(-1) })
  }
}

export async function isFollowing(currentUserId: string, targetUserId: string): Promise<boolean> {
  const followDocId = `${currentUserId}_${targetUserId}`
  const followRef = doc(db, "follows", followDocId)
  const followDoc = await getDoc(followRef)
  return followDoc.exists()
}


*/
import { db } from "@/lib/firebase"
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  increment,
  serverTimestamp,
  where,
  setDoc,
} from "firebase/firestore"

// ------------------
// Posts
// ------------------

export async function createPost(userId: string, data: any) {
  const postData = {
    ...data,
    authorId: userId,
    createdAt: serverTimestamp(),
    likes: 0,
    comments: 0,
  }

  const docRef = await addDoc(collection(db, "posts"), postData)
  await updateDoc(doc(db, "users", userId), {
    posts: increment(1),
  })

  return docRef.id
}

export async function getPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
  const snapshot = await getDocs(q)

  const posts = []
  for (const docSnap of snapshot.docs) {
    const post = { id: docSnap.id, authorId: docSnap.data().authorId, ...docSnap.data() }
    // Fetch the author data for each post
    const author = await getUser(post.authorId)
    posts.push({ ...post, author })
  }

  return posts
}

export async function getPost(postId: string) {
  const docRef = doc(db, "posts", postId)
  const postDoc = await getDoc(docRef)

  if (!postDoc.exists()) return null

  const post = { id: postDoc.id, authorId: postDoc.data().authorId, ...postDoc.data() }
  const author = await getUser(post.authorId)

  return { ...post, author }
}

// ------------------
// Comments
// ------------------

export async function createComment(postId: string, userId: string, content: string) {
  const commentData = {
    postId,
    authorId: userId,
    content,
    createdAt: serverTimestamp(),
    likes: 0,
  }

  const docRef = await addDoc(collection(db, "comments"), commentData)
  await updateDoc(doc(db, "posts", postId), {
    comments: increment(1),
  })
  await updateDoc(doc(db, "users", userId), {
    comments: increment(1),
  })

  return docRef.id
}

export async function getComments(postId: string) {
  const q = query(
    collection(db, "comments"),
    where("postId", "==", postId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)

  const comments = []
  for (const docSnap of snapshot.docs) {
    const comment = { id: docSnap.id, authorId: docSnap.data().authorId, ...docSnap.data() }
    const author = await getUser(comment.authorId)
    comments.push({ ...comment, author })
  }

  return comments
}

// ------------------
// Users
// ------------------

export async function getUser(userId: string) {
  const docRef = doc(db, "users", userId)
  const userDoc = await getDoc(docRef)

  if (!userDoc.exists()) return null

  return { id: userDoc.id, ...userDoc.data() }
}

export async function updateUserProfile(userId: string, data: any) {
  const userRef = doc(db, "users", userId)
  await updateDoc(userRef, data)
}

// ------------------
// Likes
// ------------------

export async function toggleLike(postId: string, userId: string) {
  const likeRef = doc(db, "likes", `${postId}_${userId}`)
  const likeDoc = await getDoc(likeRef)

  if (likeDoc.exists()) {
    await deleteDoc(likeRef)
    await updateDoc(doc(db, "posts", postId), {
      likes: increment(-1),
    })
    return false
  } else {
    await setDoc(likeRef, {
      postId,
      userId,
      createdAt: serverTimestamp(),
    })
    await updateDoc(doc(db, "posts", postId), {
      likes: increment(1),
    })
    return true
  }
}

export async function checkLiked(postId: string, userId: string) {
  const likeRef = doc(db, "likes", `${postId}_${userId}`)
  const likeDoc = await getDoc(likeRef)
  return likeDoc.exists()
}

// ------------------
// Additional Post Functions
// ------------------

export async function getUserPosts(userId: string) {
  const q = query(
    collection(db, "posts"),
    where("authorId", "==", userId),
    orderBy("createdAt", "desc")
  )
  const snapshot = await getDocs(q)
  const posts = []
  for (const docSnap of snapshot.docs) {
    const post = { id: docSnap.id, authorId: docSnap.data().authorId, ...docSnap.data() }
    const author = await getUser(post.authorId)
    posts.push({ ...post, author })
  }
  return posts
}

export async function deletePost(postId: string) {
  const postRef = doc(db, "posts", postId)
  const postDoc = await getDoc(postRef)
  if (!postDoc.exists()) return
  const postData = postDoc.data()
  // Decrement the user's posts count
  await updateDoc(doc(db, "users", postData.authorId), {
    posts: increment(-1),
  })
  // Delete the post document
  await deleteDoc(postRef)
}

export async function updatePost(postId: string, data: any) {
  const postRef = doc(db, "posts", postId)
  await updateDoc(postRef, data)
}

//DELETE CoMments 

export async function deleteComment(commentId: string) {
    const commentRef = doc(db, "comments", commentId)
    const commentDoc = await getDoc(commentRef)
    if (!commentDoc.exists()) return
    const commentData = commentDoc.data()
    // Optionally, decrement the comments count in the post and user's profile:
    await updateDoc(doc(db, "posts", commentData.postId), {
      comments: increment(-1),
    })
    await updateDoc(doc(db, "users", commentData.authorId), {
      comments: increment(-1),
    })
    await deleteDoc(commentRef)
  }
  
//COMMUNITY STATS
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

//FOLLOWERS

// FOLLOW FUNCTIONS

export async function followUser(currentUserId: string, targetUserId: string) {
  const followDocId = `${currentUserId}_${targetUserId}`
  const followRef = doc(db, "follows", followDocId)
  const followDoc = await getDoc(followRef)
  if (!followDoc.exists()) {
    await setDoc(followRef, {
      followerId: currentUserId,
      followingId: targetUserId,
      createdAt: serverTimestamp(),
    })
    await updateDoc(doc(db, "users", targetUserId), {
      followers: increment(1),
    })
    await updateDoc(doc(db, "users", currentUserId), {
      following: increment(1),
    })
  }
}

export async function unfollowUser(currentUserId: string, targetUserId: string) {
  const followDocId = `${currentUserId}_${targetUserId}`
  const followRef = doc(db, "follows", followDocId)
  const followDoc = await getDoc(followRef)
  if (followDoc.exists()) {
    await deleteDoc(followRef)
    await updateDoc(doc(db, "users", targetUserId), {
      followers: increment(-1),
    })
    await updateDoc(doc(db, "users", currentUserId), {
      following: increment(-1),
    })
  }
}

export async function isFollowing(currentUserId: string, targetUserId: string) {
  const followDocId = `${currentUserId}_${targetUserId}`
  const followRef = doc(db, "follows", followDocId)
  const followDoc = await getDoc(followRef)
  return followDoc.exists()
}

import axios from "axios";
import { queryClient } from "../AppProviders";

const client = axios.create();

export async function authenticate() {
  return await client.get("/auth/login").then((res) => res.data.user);
}

export async function login(payload) {
  await client.post("/auth/login", payload);
  window.location.pathname = "/";
}

export async function signup(payload) {
  await client.post("/auth/signup", payload);
  window.location.assign("/settings/profile?redirected=true");
}

export async function logout() {
  await client.get("/auth/logout");
  window.location.pathname = "/";
}

export async function getNotifications() {
  return await client
    .get(`/api/notifications`)
    .then((res) => res.data.notifications);
}

export async function readNotification(notification) {
  await client.get(`/api/notification_read/${notification._id}`);
}

export async function getReplies(postId) {
  return await client
    .get(`/api/post/${postId}/replies`)
    .then((res) => res.data.posts);
}

export async function getUserTimeline(username) {
  return await client
    .get(`/api/user_timeline/${username}`)
    .then((res) => res.data);
}

export async function getPosts({ pageParam = 1 }) {
  return await client
    .get(`/api/home_timeline?p=${pageParam}`)
    .then((res) => res.data.posts);
}

export async function getPostLikes(postId) {
  return await client
    .get(`/api/post/${postId}/likes`)
    .then((res) => res.data.users);
}

export async function followUser(username) {
  await client.get(`/api/follow/${username}`);
  await queryClient.invalidateQueries("Search");
  await queryClient.invalidateQueries("UserFriends");
  await queryClient.invalidateQueries("Posts");
  await queryClient.invalidateQueries("UserSuggestions");
  await queryClient.invalidateQueries("UserDetail");
}

export async function unfollowUser(username) {
  await client.get(`/api/unfollow/${username}`);
  await queryClient.invalidateQueries("Search");
  await queryClient.invalidateQueries("UserFriends");
  await queryClient.invalidateQueries("Posts");
  await queryClient.invalidateQueries("UserSuggestions");
  await queryClient.invalidateQueries("UserDetail");
}

export async function getPostReposts(postId) {
  return await client
    .get(`/api/post/${postId}/reposts`)
    .then((res) => res.data.users);
}

export async function getUserFollowers(username) {
  return await client
    .get(`/api/followers/${username}`)
    .then((res) => res.data.users);
}

export async function getFriends(username) {
  return await client
    .get(`/api/friends/${username}`)
    .then((res) => res.data.users);
}

export async function getUserSuggestions() {
  return await client.get("/api/users").then((res) => res.data.users);
}

export async function getTrends() {
  return await client.get("/api/trends").then((res) => res.data.trends);
}

export async function getSearchResults(query) {
  return await client
    .get(`/api/search?q=${encodeURIComponent(query)}`)
    .then((res) => res.data);
}

export async function likePost(post) {
  await client.get(`/api/like/${post.id_str}`);
  await queryClient.invalidateQueries("Posts");
  await queryClient.invalidateQueries("PostDetail");
  await queryClient.invalidateQueries("PostReplies");
  await queryClient.invalidateQueries("UserDetail");
  await queryClient.invalidateQueries("Search");
}

export async function unlikePost(post) {
  await client.get(`/api/unlike/${post.id_str}`);
  await queryClient.invalidateQueries("Posts");
  await queryClient.invalidateQueries("PostDetail");
  await queryClient.invalidateQueries("PostReplies");
  await queryClient.invalidateQueries("UserDetail");
  await queryClient.invalidateQueries("Search");
}

export async function unrepostPost(post) {
  await client.post(`/api/unrepost`, post);
  await queryClient.invalidateQueries("Posts");
  await queryClient.invalidateQueries("PostDetail");
  await queryClient.invalidateQueries("PostReplies");
  await queryClient.invalidateQueries("UserDetail");
}

export async function repostPost(post) {
  await client.post(`/api/repost`, post);
  await queryClient.invalidateQueries("Posts");
  await queryClient.invalidateQueries("PostDetail");
  await queryClient.invalidateQueries("PostReplies");
  await queryClient.invalidateQueries("UserDetail");
}

export async function updateUserDetails(user) {
  await client.post("/api/updateuser", user);
}

export async function createPost(post, url = "/api/post") {
  await client.post(url, post);
  await queryClient.invalidateQueries("Posts");
}

export async function getPostById(postId) {
  return await client.get(`/api/post/${postId}`).then((res) => res.data.post);
}

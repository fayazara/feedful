import getDribbblePosts from "@/lib/getDribbblePosts";

export default defineEventHandler(async (event) => {
  const posts = await getDribbblePosts();
  return posts;
});

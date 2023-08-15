import getProducthuntPosts from "@/lib/getProducthuntPosts";

export default defineEventHandler(async (event) => {
  const posts = await getProducthuntPosts();
  return posts;
});

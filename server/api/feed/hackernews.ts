import getHackernewsPosts from "@/lib/getHackernewsPosts";

export default defineEventHandler(async (event) => {
  const posts = await getHackernewsPosts();
  return posts;
});

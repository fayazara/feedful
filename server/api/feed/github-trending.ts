import getGithubTrendingRepos from "@/lib/getGithubTrendingRepos";

export default defineEventHandler(async (event) => {
  const { lang = "all", since = "daily" } = getQuery(event) as {
    lang: string;
    since: string;
  };
  const posts = await getGithubTrendingRepos(lang, since);
  return posts;
});

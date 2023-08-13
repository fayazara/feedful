import { Producthunt } from "@/types/feeds";
import { sleep } from "@/utils";
import fixtures from "./phPostsFixtures";

const fetchPosts = async (): Promise<Producthunt[]> => {
  try {
    const URL: string = "https://api.producthunt.com/v2/api/graphql";
    const afterDate = new Date(
      new Date(Date.now()).getTime() - 1000 * 60 * 60 * 1 * 24
    ).toUTCString();
    const beforeDate = new Date(Date.now()).toUTCString();

    const query: string = `query PostRanking {
      posts(
        postedAfter: "${afterDate}" 
        order: RANKING
        first: 25
        postedBefore: "${beforeDate}"
      ) {
        edges {
          node {
            id
            name
            tagline
            description
            url
            votesCount
            thumbnail {
              type
              url
            }
            website
            reviewsRating
          }
        }
      }
    }`;

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PRODUCTHUNT_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    };

    if (process.env.NODE_ENV === "development") {
      await sleep(1000);
      return fixtures;
    } else {
      const response: Response = await fetch(URL, options);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const { data }: { data: { posts: { edges: { node: Producthunt }[] } } } =
        await response.json();
      if (!data?.posts?.edges?.length) {
        throw new Error("No data returned from API");
      }

      const posts: Producthunt[] = data.posts.edges.map(
        (edge: { node: Producthunt }) => edge.node
      );
      return posts;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export default fetchPosts;

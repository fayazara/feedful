import { load } from "cheerio";
import { sleep } from "@/utils";
import fixtures from "./dribbbleFixtures";

const DRIBBBLE_URL = "https://dribbble.com/shots";

export default async (): Promise<Dribbble[]> => {
  try {
    if (process.env.NODE_ENV === "development") {
      await sleep(1000);
      return fixtures;
    } else {
      const response = await fetch(DRIBBBLE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const htmlString = await response.text();
      const $ = load(htmlString);
      const posts: Dribbble[] = [];
      $(".shot-thumbnail-container").each((index, element) => {
        const post: Dribbble = {
          image: "",
          title: "",
          likes: "",
          views: "",
          author: "",
          authorAvatar: "",
          url: "",
        };
        post.image =
          $(element)
            .find(".js-thumbnail-base .js-thumbnail-placeholder img[data-src]")
            .attr("data-src") || "";
        post.title = $(element).find(".shot-title").text().trim();
        post.likes = $(element)
          .find(".shot-statistic.js-shot-likes-container .js-shot-likes-count")
          .text()
          .trim();
        post.views = $(element)
          .find(".shot-statistic.js-shot-views-container .js-shot-views-count")
          .text()
          .trim();
        post.author = $(element)
          .find(".user-information .display-name")
          .text()
          .trim();
        post.authorAvatar =
          $(element)
            .find(".user-information  a img[data-src]")
            .attr("data-src") || "";
        const url = $(element).find(".js-shot-link").attr("href");
        post.url = `https://dribbble.com${url}`;
        posts.push(post);
      });
      return posts;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

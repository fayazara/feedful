import { sleep } from "@/utils";
import * as cheerio from "cheerio";
import { Github } from "@/types/feeds";
import { kFormatter } from "@/utils";

import fixtures from "./githubReposFixtures";

const GITHUB_TRENDING_BASE_URL = "https://github.com/trending";

export default async (
  lang: string = "all",
  since: string = "daily"
): Promise<Github[]> => {
  try {
    if (lang === "all") {
      lang = "";
    }

    const url = `${GITHUB_TRENDING_BASE_URL}/${lang}?since=${since}`;

    if (process.env.NODE_ENV === "development") {
      await sleep(1000);
      return fixtures;
    } else {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      const htmlString = await response.text();
      const $ = cheerio.load(htmlString);
      const repos: Github[] = [];
      $("article.Box-row").each((index, element) => {
        const repo: Github = {
          title: $(element).find("h2.h3.lh-condensed").text().trim(),
          description: $(element).find("p.col-9").text().trim(),
          url: `https://github.com${$(element)
            .find("h2.h3.lh-condensed a")
            .attr("href")}`,
          stars: kFormatter(
            parseInt(
              $(element)
                .find(`a[href*="/stargazers"]`)
                .text()
                .trim()
                .replace(/,/g, "")
            )
          ),
        };
        repos.push(repo);
      });
      return repos;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

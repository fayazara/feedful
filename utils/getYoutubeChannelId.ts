import { load } from "cheerio";

const fetchOptions = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
  },
};

/**
 * Check YouTube Url
 *
 * @param {string} url
 * @returns {boolean}
 */
const checkUrl = (url: string): boolean =>
  url.indexOf("youtube.com") !== -1 || url.indexOf("youtu.be") !== -1;

/**
 * Get YouTube Channel ID By Url
 *
 * @param {string} url Channel Url
 * @returns {Promise<string>} Channel ID
 */
export const channelId = async (url: string): Promise<string> => {
  if (checkUrl(url)) {
    const ytChannelPageResponse = await fetch(url, fetchOptions);
    const ytChannelPageData = await ytChannelPageResponse.text();
    const $ = load(ytChannelPageData);
    const id = $('meta[itemprop="channelId"]').attr("content");
    if (id) {
      return id;
    }
  } else {
    throw new Error(`"${url}" is not a YouTube url.`);
  }

  throw new Error(`Unable to get "${url}" channel id.`);
};

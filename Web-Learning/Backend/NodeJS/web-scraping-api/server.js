const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const PORT = 3000;

// Web scraping route
app.get("/scrape", async (req, res) => {
    const url = req.query.url; // Get the URL from the query parameter

    if (!url) {
        return res.status(400).send({ error: "URL parameter is required." });
    }

    try {
        // Fetch the HTML content of the URL
        const { data } = await axios.get(url);

        // Load the HTML content into cheerio
        const $ = cheerio.load(data);

        let responseData = {};

        // Play Store Scraping Logic
        if (url.includes("play.google.com")) {
            const gameName = $("h1 span").text(); // Game name (Play Store)
            const gameIcon = $("img.T75of").attr("src"); // Game icon (Play Store)
            const screenshots = [];
            $("img.L7H2F").each((index, element) => {
                screenshots.push($(element).attr("src")); // Screenshots (Play Store)
            });
            const description = $("meta[name='description']").attr("content"); // Description (Play Store)

            responseData = {
                gameName,
                gameIcon,
                screenshots,
                description
            };
        }
        // App Store Scraping Logic
        else if (url.includes("apps.apple.com")) {
            const gameName = $("h1 span").text(); // Game name (App Store)
            const gameIcon = $("img[alt='App Icon']").attr("src"); // Game icon (App Store)
            const screenshots = [];
            $("div.we-screenshot img").each((index, element) => {
                screenshots.push($(element).attr("src")); // Screenshots (App Store)
            });
            const description = $("meta[name='description']").attr("content"); // Description (App Store)

            responseData = {
                gameName,
                gameIcon,
                screenshots,
                description
            };
        }
        // Amazon App Store Scraping Logic
        else if (url.includes("amazon.com")) {
            const gameName = $("span#productTitle").text().trim(); // Game name (Amazon)
            const gameIcon = $("img#landingImage").attr("src"); // Game icon (Amazon)
            const screenshots = [];
            $("div.imageThumb img").each((index, element) => {
                screenshots.push($(element).attr("src")); // Screenshots (Amazon)
            });
            const description = $("div#productDescription p").text().trim(); // Description (Amazon)

            responseData = {
                gameName,
                gameIcon,
                screenshots,
                description
            };
        }
        // Default case (other websites, only titles)
        else {
            let titles = [];
            $("h2").each((index, element) => {
                titles.push($(element).text());
            });

            responseData = { titles };
        }

        // Respond with the scraped data
        res.status(200).send(responseData);

    } catch (error) {
        res.status(500).send({ error: "Failed to scrape the website." });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
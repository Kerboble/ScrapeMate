import axios from 'axios';
import { JSDOM } from 'jsdom';
import cors from 'cors';
import express from 'express';

const app = express();

// CORS setup
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"] 
}));

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
];

const getRandomUserAgent = () => userAgents[Math.floor(Math.random() * userAgents.length)];

async function extractASINFromAmazonURL(url) {
    const asinRegex = /\/dp\/(B[0-9A-Z]{9})/;
    const match = url.match(asinRegex);
    return match ? match[1] : null;
}

const getProductUrl = (productID) => {
    return `https://www.amazon.com/gp/product/ajax/?asin=${productID}&m=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=8-3&pc=dp&experienceId=aodAjaxMain`;
};

app.get('/scrape', async (req, res) => {
    const { url } = req.query;

    try {
        const productID = await extractASINFromAmazonURL(url);
        const productUrl = getProductUrl(productID);

        const { data: html } = await axios.get(productUrl, {
            headers: {
                'User-Agent': getRandomUserAgent(),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.amazon.com/',
                Host: 'www.amazon.com'
            },
        });

        const dom = new JSDOM(html);
        const scrape = (selector) => dom.window.document.querySelector(selector);
        const pinnedElement = scrape('#pinned-de-id');
        const titleElement = scrape('#aod-asin-title-text');
        const product_photo = scrape("#aod-asin-image-id");

        const getOffer = (element) => {
            const price = element.querySelector('.a-price .a-offscreen')?.textContent.trim();
            const ships_from = element.querySelector('#aod-offer-shipsFrom .a-col-right .a-size-small')?.textContent.trim();
            const sold_by = element.querySelector('#aod-offer-soldBy .a-col-right .a-size-small')?.textContent.trim();
            const delivery_details = element.querySelector('#mir-layout-DELIVERY_BLOCK-slot-PRIMARY_DELIVERY_MESSAGE_LARGE')?.textContent.replace('Details', '').trim();
            const url = productUrl.trim();


            return {
                price,
                ships_from,
                sold_by,
                delivery_details,
                url
            };
        };

        const offerListElement = scrape('#aod-offer-list');
        const offerElements = offerListElement.querySelectorAll('.aod-information-block');
        const offers = [];

        offerElements.forEach((offerElement) => {
            offers.push(getOffer(offerElement));
        });

        const result = {
            title: titleElement?.textContent.trim(),
            photo: product_photo?.src.trim(),
            pinned: getOffer(pinnedElement),
            offers,
        };

        console.log(result)
        return res.json(result);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

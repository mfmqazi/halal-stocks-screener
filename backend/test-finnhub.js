import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const API_KEY = process.env.FINNHUB_API_KEY;
const SYMBOL = 'MSFT';

console.log('Testing Finnhub API...');
console.log(`API Key present: ${!!API_KEY}`);
if (API_KEY) {
    console.log(`API Key length: ${API_KEY.length}`);
    console.log(`API Key start: ${API_KEY.substring(0, 5)}...`);
}

async function testFinnhub() {
    try {
        console.log(`\nFetching quote for ${SYMBOL}...`);
        const quoteUrl = `https://finnhub.io/api/v1/quote?symbol=${SYMBOL}&token=${API_KEY}`;
        const quote = await axios.get(quoteUrl);
        console.log('Quote response:', quote.status);
        console.log('Quote data:', quote.data);

        console.log(`\nFetching profile for ${SYMBOL}...`);
        const profileUrl = `https://finnhub.io/api/v1/stock/profile2?symbol=${SYMBOL}&token=${API_KEY}`;
        const profile = await axios.get(profileUrl);
        console.log('Profile response:', profile.status);
        console.log('Profile data:', profile.data);

        if (!quote.data.c) {
            console.error('\n❌ ERROR: Quote data is missing current price (c)');
        }

        if (Object.keys(profile.data).length === 0) {
            console.error('\n❌ ERROR: Profile data is empty');
        }

        if (quote.data.c && Object.keys(profile.data).length > 0) {
            console.log('\n✅ SUCCESS: Finnhub API is working correctly!');
        }

    } catch (error) {
        console.error('\n❌ API Request Failed:');
        if (error.response) {
            console.error(`Status: ${error.response.status}`);
            console.error('Data:', error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

testFinnhub();

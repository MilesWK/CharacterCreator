// Note about the comments here: 
//
// A big sign of AI use is the comments it leaves. However,
// I am not AI. Any comments you see are my attempt at helping
// developers who see this code understand it, or to see inside
// my mind while I develop. Any AI use is simply debugging.
// -- Miles Krueger (hi@mileswk.com)

import { OpenRouter } from "@openrouter/sdk";
import clipboard from 'clipboardy';
import express from 'express';

const app = express();
const port = 3000;

// I guess if you see anything it is up. 
app.get('/', (req, res) => {
    res.send('<h1>Backend is up! ✅</h1>');
});

app.listen(port, () => {
    console.log(`Backend opperational. Port: ${port}`);
});

// This prompt is from my sister, who is writing a book. She gets very descriptive.
const prompt = "Lauren has long, light blond hair with layers, highlights and blue eyes. She: Loves shopping, has a boyfriend named Carson, usually talks to her friends and Carson only, has and ADORABLE sense of style, has rich parents, does lots of makeup but makes her makeup look pretty, is quiet but when she speaks she speaks with purpose, tan; blonde; blue-eyed; sweet; smart. She also wears cute, circle, pink glasses. She can be sassy and is 18. She is 5 '5."


// I usually don't use env... which is something I shouldn't mention...
process.loadEnvFile()

// I use OpenRouter as well as fetching the endpoint differently.
const client = new OpenRouter({
    apiKey: process.env.API_KEY,
    serverURL: "https://ai.hackclub.com/proxy/v1",
});

// Thanks to the gorkie (dev) slack bot for fixing this, even though I was asking for human helps.
async function gettraits(pi) {
    const response = await client.chat.send({
        chatRequest: {
            model: "~openai/gpt-mini-latest",
            messages: [
                { role: "user", content: `Find any important visual traits in the following character description, seperating them by nothing aside from a comma and a space. ${pi}` },
            ],
            stream: false,
        },
    });
    const traits_response = response.choices[0].message.content;
    return traits_response
}

// This is the QuickStart code example but modified. This was a pain to get working
async function generateimage(pi) {
    console.log("Generating image");

    const response3 = await fetch(
        'https://ai.hackclub.com/proxy/v1/chat/completions',
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'google/gemini-3.1-flash-lite-image',
                messages: [
                    {
                        role: 'user',
                        content: pi
                    }
                ],
                modalities: ['image', 'text'],
                image_config: {
                    aspect_ratio: '16:9'
                }
            }),
        }
    );


    const data = await response3.json();

    console.log(JSON.stringify(data, null, 2));

    const imageUrl = data.choices[0].message.images[0].image_url.url;

    return imageUrl;
}

// //const traits = await gettraits(prompt)
// console.log(traits)

// //const imagething = await generateimage(prompt)
// console.log(imagething)

// Ignore this:
// await clipboard.write(imagething);
app.get('/imagegen', async (req, res) => {
    const prompt = req.query.prompt
    console.log(prompt)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    const thingu = await generateimage(prompt)
    res.status(200).json({ result: thingu});

});
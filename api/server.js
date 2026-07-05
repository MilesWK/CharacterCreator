// Note about the comments here: 
//
// A big sign of AI use is the comments it leaves. However,
// I am not AI. Any comments you see are my attempt at helping
// developers who see this code understand it, or to see inside
// my mind while I develop. Any AI use is simply debugging.
// -- Miles Krueger (hi@mileswk.com)

import { OpenRouter } from "@openrouter/sdk";
import express from 'express';

const app = express();
const port = 3000;

// I guess if you see anything it is up. 
app.get('/', (req, res) => {
    res.send('<h1>Backend is up! ✅</h1>');
});

export default app;

// This prompt is from my sister, who is writing a book. She gets very descriptive.
const prompt = "Lauren has long, light blond hair with layers, highlights and blue eyes. She: Loves shopping, has a boyfriend named Carson, usually talks to her friends and Carson only, has and ADORABLE sense of style, has rich parents, does lots of makeup but makes her makeup look pretty, is quiet but when she speaks she speaks with purpose, tan; blonde; blue-eyed; sweet; smart. She also wears cute, circle, pink glasses. She can be sassy and is 18. She is 5 '5."


// I usually don't use env... which is something I shouldn't mention...

// I use OpenRouter as well as fetching the endpoint differently.
const client = new OpenRouter({
    apiKey: process.env.API_KEY,
    serverURL: "https://ai.hackclub.com/proxy/v1",
});


// This actually works suprisingly well! I was expecting it to say something like "based on the input you provided, I say true" but I haven't come across too many issues.
// Ocassionally though this will falsely accuse prompts. I have only had that happen once though.
async function check_if_character(pi) {
    const response = await client.chat.send({
    chatRequest: {
            model: "~openai/gpt-mini-latest",
            messages: [
                { role: "user", content: `Check the following description to make sure it is describing a character of some sort. If it is, return true, if not, return false. Description: ${pi}` },
            ],
            stream: false,
        },
    });
    const check_response = response.choices[0].message.content;
    return check_response
}


// Get the traits of the character they are making. 
// While the AI doesn't use the traits, I am hoping to have a little display that shows them.
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

// This worked first try, no errors. it was fantasitc.

async function getfilename(pi) {
    const response = await client.chat.send({
        chatRequest: {
            model: "~openai/gpt-mini-latest",
            messages: [
                { role: "user", content: `Create a no space short file name without the file type for an image of the following character description: ${pi}` },
            ],
            stream: false,
        },
    });
    const name_response = response.choices[0].message.content;
    return name_response
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
                model: 'google/gemini-3.1-flash-lite-image', // I don't like this model very much.
                messages: [
                    {
                        role: 'user',
                        content: pi
                    }
                ],
                modalities: ['image', 'text'],
                image_config: {
                    aspect_ratio: '16:9' // Probably going to be changeable
                }
            }),
        }
    );

    // The next four lines were SO ANNOYING.
    const data = await response3.json();
    //console.log(JSON.stringify(data, null, 2));
    const imageUrl = data.choices[0].message.images[0].image_url.url;
    return imageUrl;
    console.log("Image finished with no issues")
}

app.get('/imagegen', async (req, res) => {
    const prompt = req.query.prompt
    const is_character = await check_if_character(prompt)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (is_character === 'true') {
        console.log("Seems legit, let's make it.")  // I like to give programs a personality. 
        console.log(prompt)
        const traits = await gettraits(prompt)
        const character_image = await generateimage(prompt)
        const filename = await getfilename(prompt)

        res.status(200).json({ result: character_image, name: filename, traits: traits}); 
    } else {
        console.log("Hey, That's not a character!") // Isn't that what everyone says?
        res.status(200).json({ result: 'char' }); // "char" was chosen here to stand for character. I bet somewhere a developer things that was a stupid thing for me to do. :)

    }
});
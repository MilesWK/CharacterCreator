import { OpenRouter } from "@openrouter/sdk";


// This prompt is from my sister, who is writing a book. She gets very descriptive.
const prompt = "Lauren has long, light blond hair with layers, highlights and blue eyes. She: Loves shopping, has a boyfriend named Carson, usually talks to her friends and Carson only, has and ADORABLE sense of style, has rich parents, does lots of makeup but makes her makeup look pretty, is quiet but when she speaks she speaks with purpose, tan; blonde; blue-eyed; sweet; smart. She also wears cute, circle, pink glasses. She can be sassy and is 18. She is 5 '5."

process.loadEnvFile()

const client = new OpenRouter({
  apiKey: process.env.API_KEY,
  serverURL: "https://ai.hackclub.com/proxy/v1",
});

async function gettraits(pi) {
    const response = await client.chat.send({
        chatRequest: {
            model: "~openai/gpt-mini-latest",
            messages: [
                { role: "user", content: `Find any important traits in the following character description, seperating them by nothing aside from a comma and a space. ${pi}` },
            ],
            stream: false,
        },
    });
    const traits_response = response.choices[0].message.content;
    return traits_response
}

async function generateimage(pi) {
    const response = await fetch('https://ai.hackclub.com/proxy/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.API_KEY}`,
            'Content-Type': 'application/json',
        },
    body: JSON.stringify({
        model: 'google/gemini-3.1-flash-image',
        messages: [
        { role: 'user', content: 'A sunset over mountains' }
        ],
        modalities: ['image', 'text'],
        image_config: {
        aspect_ratio: '16:9'
        }
    }),
    });

    const data = await response.json();
    const imageUrl = data.choices[0].message.images[0].image_url.url;
}

const traits = await gettraits(prompt)


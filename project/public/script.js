async function getRequest() {
    const info = "This is a test.";

    const response = await fetch(
        `http://localhost:3000/imagegen?prompt=${encodeURIComponent(info)}`
    );

    const result = await response.json();

    console.log(result);
}

getRequest();
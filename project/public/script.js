// A small little program. Let's hope this doesn't need any more work.
// (p.s. It will.)

const img_element = document.getElementById("displayimg")
const cd = document.getElementById("chardescription")
const errbox = document.getElementById("error")

async function getRequest() {
    error.classList.add("hidden")

    const info = cd.value;

    const response = await fetch(
        `http://localhost:3000/imagegen?prompt=${encodeURIComponent(info)}`
    );
    const result = await response.json()
    if (await result.result === "char") {
        error.classList.remove("hidden")
        console.log("WHOAAAA... ")
    } else {
    document.documentElement.style.setProperty('--image-url', `url(${result.result})`);
    img_element.classList.remove("hidden")
 }
}

//getRequest();   <-- Pain, Sorrow, and burned tokens 
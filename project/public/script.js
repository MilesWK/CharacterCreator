// A small little program. Let's hope this doesn't need any more work.
// (p.s. It will.)

const imgthing = document.getElementById("displayimg")
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

    imgthing.src = result.result }
}

//getRequest();   <-- Pain, Sorrow, and burned tokens 
const imgthing = document.getElementById("displayimg")
const cd = document.getElementById("chardescription")
const errbox = document.getElementById("error")
async function getRequest() {
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

//getRequest();
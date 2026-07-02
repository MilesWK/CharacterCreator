const imgthing = document.getElementById("displayimg")
const cd = document.getElementById("chardescription")

async function getRequest() {
    const info = cd.value;

    const response = await fetch(
        `http://localhost:3000/imagegen?prompt=${encodeURIComponent(info)}`
    );

    const result = await response.json();

    imgthing.src = result.result
}

//getRequest();
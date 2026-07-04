// A small little program. Let's hope this doesn't need any more work.
// (p.s. It will.)

const img_element = document.getElementById("displayimg")
const cd = document.getElementById("chardescription")
const errbox = document.getElementById("error")
const sharebtn = document.getElementById("sharebtn")
const downloadbtn = document.getElementById("downloadbtn")


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
        globalThis.traits = result.traits;
        globalThis.name = result.name;
        globalThis.imgurl = result.result
    document.documentElement.style.setProperty('--image-url', `url(${result.result})`);
    img_element.classList.remove("hidden")
 }
}

function download_img() {
    var a = document.createElement("a"); //Create <a>
    a.href = imgurl //Image Base64 Goes here
    console.log(`${name}.jpg`)
    a.download = `${name}.jpg`; //File name Here
    a.click(); //Downloaded file
}

 img_element.addEventListener("mouseenter", () => {
    sharebtn.classList.remove("hidden");
    downloadbtn.classList.remove("hidden");
   })

img_element.addEventListener("mouseleave", () => {
   sharebtn.classList.add("hidden");
    downloadbtn.classList.add("hidden");
})

//getRequest();   <-- Pain, Sorrow, and burned tokens 
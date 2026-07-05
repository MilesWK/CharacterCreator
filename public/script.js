// A small little program. Let's hope this doesn't need any more work.
// (p.s. It will.)

const img_element = document.getElementById("displayimg")
const img_container = document.getElementById("imgcontainer")
const cd = document.getElementById("chardescription")
const errbox = document.getElementById("error")
const sharebtn = document.getElementById("sharebtn")
const downloadbtn = document.getElementById("downloadbtn")
const rqstbox = document.getElementById("maxrqst")
const rqst = localStorage.getItem("requestsRemaining");
const last_date = localStorage.getItem("date")
console.log(rqst)
const current_date = new Date();

// Technically there are many loopholes with this method but its fine.
const date_official = current_date.toLocaleDateString()

if (last_date !== date_official) {  // If the date isn't today
    localStorage.setItem("requestsRemaining", 10)
    localStorage.setItem("date", date_official)
} 





console.log(date_official)
async function getRequest() {
    error.classList.add("hidden")

    const info = cd.value;
    if (localStorage.getItem("requestsRemaining" < 1)) {
        rqstbox.classList.remove("hidden")
    } else {
    const response = await fetch(
        `https://character-creator-two.vercel.app/api/imagegen?prompt=${encodeURIComponent(info)}`
    );
    const result = await response.json()
    if (await result.result === "char") {
        error.classList.remove("hidden")
        console.log("WHOAAAA... ")
    } else {
        globalThis.traits = result.traits;
        globalThis.name = result.name;
        globalThis.imgurl = result.result
        var rqst = localStorage.getItem("requestsRemaining")
        var new_value = rqst - 1
        localStorage.setItem("requestsRemaining", new_value)

        img_element.src = imgurl  // I gave up on the 
    //document.documentElement.style.setProperty('--image-url', `url(${result.result})`);
    img_element.classList.remove("hidden")
 }
 }
}

function download_img() {
    var a = document.createElement("a"); //Create <a>
    a.href = imgurl //Image Base64 Goes here
    console.log(`${name}.jpg`)
    a.download = `${name}.jpg`; //File name Here
    a.click(); //Downloaded file
}

 img_container.addEventListener('mouseover', () => {
    sharebtn.classList.remove("hidden");
    downloadbtn.classList.remove("hidden");
   })

img_container.addEventListener("mouseleave", () => {
   sharebtn.classList.add("hidden");
    downloadbtn.classList.add("hidden");
})

//getRequest();   <-- Pain, Sorrow, and burned tokens 
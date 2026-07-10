// There is probably a better way to do this, but you know,.


// HTML ELEMENTS:
const img_element = document.getElementById("displayimg")
const img_container = document.getElementById("imgcontainer")
const cd = document.getElementById("chardescription")
const error = document.getElementById("error")
const errmsg = document.getElementById("errormsg")
const sharebtn = document.getElementById("sharebtn")
const downloadbtn = document.getElementById("downloadbtn")
const rqstbox = document.getElementById("maxrqst")
const file_upload = document.getElementById("imgupload")
const loader = document.getElementById("loader")
// LOCAL STORAGE ELEMENTS:
const rqst = localStorage.getItem("requestsRemaining")
const last_date = localStorage.getItem("date")

console.log(rqst)
const current_date = new Date();

// Technically there are many loopholes with this method but its fine.
const date_official = current_date.toLocaleDateString()

if (last_date !== date_official) {  // If the date isn't today
    localStorage.setItem("requestsRemaining", 10)
    localStorage.setItem("date", date_official)
}

function openFile() {
    file_upload.click()
}


console.log(date_official)


// At this point, its hard to find anything in this function:
async function getRequest() {
    loader.classList.remove("hidden")
    error.classList.add("hidden")
    files = file_upload.files[0];
    const info = cd.value;
    let response;
    let result;
    if (localStorage.getItem("requestsRemaining" < 1)) {
        rqstbox.classList.remove("hidden")
    } else {
        try {
            const response = await fetch(
                `api/imagegen?prompt=${encodeURIComponent(info)}`
            );
            const result = await response.json()
            if (response.ok) {
                if (await result.result === "char") {
                    errmsg.innerHTML = "Your prompt must be a character."
                    error.classList.remove("hidden")
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
                    loader.classList.add("hidden")
                }
            } else {
                errmsg.innerHTML = "Oh Dear, there seems to be an error! Come back later!"
                error.classList.remove("hidden")
                loader.classList.add("hidden")
            }
        } catch {
            errmsg.innerHTML = "Oh Dear, there seems to be an error! Come back later!"
            error.classList.remove("hidden")
            loader.classList.add("hidden")
        }
        
    }
}

function download_img() {
    var a = document.createElement("a");
    a.href = imgurl
    console.log(`${name}.jpg`)
    a.download = `${name}.jpg`;
    a.click()
}

img_container.addEventListener('mouseover', () => {
    downloadbtn.classList.remove("hidden");
})

img_container.addEventListener("mouseleave", () => {
    downloadbtn.classList.add("hidden");
})

//getRequest();   <-- Pain, Sorrow, and burned tokens 
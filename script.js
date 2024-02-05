
let submitBtn = document.getElementById("submit-btn");

let generateGif = () => {
    let loader = document.querySelector(".loader");
    loader.style.display = "block";
    document.querySelector(".wrapper").style.display = "none";
    let q = document.getElementById("search-box").value;
    let gifCount = 10;
    let finalURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${q}&limit=${gifCount}&offset=0&rating=g&lang=en`;
    document.querySelector(".wrapper").innerHTML = "";

    // make a call to api
    fetch(finalURL)
        .then((Response) => Response.json())
        .then((info) => {
            console.log(info.data);
            let gifData = info.data;
            gifData.forEach((gif) => {
                let container_G = document.createElement("div");
                container_G.classList.add("container_G");
                let iframe = document.createElement('img');
                console.log(gif);
                iframe.setAttribute("src", gif.images.downsized_medium.url);
                iframe.onload = () => {
                    gifCount--;
                    if (gifCount == 0) {
                        loader.style.display = "none";
                        document.querySelector(".wrapper").style.display = "grid";
                    }
                };
                container_G.append(iframe);
                let copyBtn = document.createElement("button");
                 copyBtn.innerHTML = "Copy Link";
                 copyBtn.onclick = () => {
                     let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;
                     navigator.clipboard.writeText(copyLink).then(() => {
                         alert("GIF Copied to Clipboard");
                     }).catch(() => {
                         alert("GIF copied yo Clipboard");
                         let hiddenInput = document.createElement("input");
                         hiddenInput.setAttribute("type", "text");
                         document.body.appendChild(hiddenInput);
                         hiddenInput.value = copyLink;
                         hiddenInput.select();
                         document.execCommand("copy");
                         document.body.removeChild(hiddenInput);
                     });

                // "https://media3.giphy.com/media/xUA7aM09ByyR1w5YWc/giphy.gif?cid=0100b2e0wn5oeo02ouifn5q2z6ubazu4lwf08so9tj5et9be&ep=v1_gifs_search&rid=giphy.gif&ct=g";

                };
                container_G.append(copyBtn);
                document.querySelector(".wrapper").appendChild(container_G);
            });
        });
};
// Function to handle form submission
submitBtn.addEventListener('click', generateGif);
window.addEventListener("load", generateGif);
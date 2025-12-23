// window.location.port = 5000;
function getdata() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://mimic-server-api.vercel.app/posts");
  xhr.onreadystatechange = function () {
    // console.log(xhr);
    if (xhr.readyState == 4 && xhr.status == 200) {
      let post = JSON.parse(xhr.response);
      console.log(post);

      let container = document.querySelector(".post");
      container.innerHTML = post
        .map((i) => {
          if (i.body) {
            let c = "";
            if (i.comments && i.comments.length > 0) {
              c = i.comments
                .map((data) => {
                  return `
                    <div class="comment">
                         <p>${data.text}</p>
                     </div>`;
                })
                .join("");
            }

            return `<div class="post-container">
                    <div class="container">
                        <div class="logo">
                            <img src="images.jpeg">
                            <div class="name">
                                <p style="font-weight: bold;">Micasa</p>
                            </div>
                        </div>
                        <div>
                            <p>Dec 10,2025</p>
                        </div>

                    </div>
                    <div class="heading">
                        <h2>${i.title}</h2>
                    </div>
                    
                    <div class="content">
                        <p class="para">${i.body}</p>
                    </div>
                    <hr>
                    ${c}
                </div>`;
          }
        })
        .join("");
    }
  };

  xhr.send();
}

function openPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

let btnn = document.querySelector(".ok");

btnn.addEventListener("click", posdata);
function posdata() {
  let title = document.getElementById("title").value;
  let body = document.getElementById("para").value;

 const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://mimic-server-api.vercel.app/posts");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 201) {
      getdata();
    }
  };
  let data = { title, body };
  xhr.send(JSON.stringify(data));
  closePopup()
}
getdata();


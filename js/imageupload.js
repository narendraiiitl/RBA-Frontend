const imageurl = document.getElementById("imageURL");
const upload = document.getElementById("upload");
const postimages = document.getElementById("postimages");
const deletebtn = document.getElementsByClassName("delete");

const newpost = (url, by, _id, username) => {
    return `<div class="col" style="margin-bottom: 4%" data-id=${_id}>
    <div class="card " style="width: 18rem">
      <img
        src=${url}
        class="card-img-top"
        width="300"
        height="300"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">Posted By</h5>
        <p class="card-text">${username}</p>
        <p
        onclick="handleDelete(event)"
        class="btn btn-danger delete"
        >Delete</p
      >
      </div>
    </div>
  </div>`
}

function handleDelete(e) {
    console.log(e.target);
    let cur = e.target.parentNode.parentNode.parentNode;
    console.log(cur);
    const imageid = cur.getAttribute('data-id');
    deleteimage(imageid, cur);
}


const deleteimage = (imageid, cur) => {
    axios.delete('http://localhost:3000/api/deleteimage', {
        headers: {
            authorization: 'Bearer ' + accessToken
        },
        data: { _id: imageid }

    }).then(response => {
        console.log(response.data);
        alertify.success('Successfully deleted');
        cur.remove();
    })
        .catch(err => {
            console.log(err);
            alertify.error("You cann't remove this post");
        })
}


const uploadimage = (data) => {
    axios.post('http://localhost:3000/api/uploadimage', { imageurl: data }, {
        headers: {
            authorization: 'Bearer ' + accessToken
        }
    }).then(response => {
        console.log(response.data);
        let { imageurl, uploader, _id, username } = response.data;
        let doc = document.createRange().createContextualFragment(newpost(imageurl, uploader, _id, username));
        postimages.appendChild(doc);
        upload.style.backgroundColor = "green";
        upload.innerHTML = "Successfully Uploaded";

    })
        .catch(err => {
            console.log(err);
            upload.style.backgroundColor = "red";
            upload.innerHTML = "Uploading Failed";
        })
}


upload.addEventListener("click", async () => {
    upload.innerHTML = "Loading..."
    await uploadimage(imageurl.value);
    setTimeout(() => {
        upload.style.backgroundColor = "";
        upload.innerHTML = "Upload &nbsp;&nbsp;<i class='bi bi-upload'></i>"
        imageurl.value = "";
    }, 2000);
})


const getimage = () => {
    axios.get('http://localhost:3000/api/showimage', {
        headers: {
            authorization: 'Bearer ' + accessToken
        }
    }).then(response => {
        console.log(response.data);
        for (let i = 0; i < response.data.length; i++) {
            let { imageurl, uploader, _id } = response.data[i];
            let { email, name } = uploader;
            let doc = document.createRange().createContextualFragment(newpost(imageurl, email, _id, name));
            postimages.appendChild(doc);
        }
    })
        .catch(err => {
            console.log(err);
        })
}

getimage();


const accessToken = Cookies.get('accessToken');
const userimage = document.getElementById('userimage');
const username = document.getElementById('username');
const userrole = document.getElementById('userrole');
const alert = document.getElementById('alert');

const successAlert = `<div class="alert alert-success"> 
<a href = "#" class="close" data-dismiss="alert" aria-label="close" >&times;</a>
 <strong>Success!</strong> Profile successfully saved </div > `;

const failureAlert = `<div class="alert alert-warning">
<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
<strong>Oops!</strong> Profile not saved. Try later.
</div> `;


const getProfile = () => {

    axios.get('http://localhost:3000/api/profile', {
        headers: {
            authorization: 'Bearer ' + accessToken
        }
    }).then(function (response) {

        userimage.src = `https://avatars.abstractapi.com/v1/?api_key=c312bbe42aac4d9f8fc3eee5dcb62f24&name=${response.data.name}`;
        username.innerText = response.data.name
        userrole.innerText = response.data.role
    })
}


const getdetails = () => {
    axios.get('http://localhost:3000/api/ping', {
        headers: {
            authorization: 'Bearer ' + accessToken
        }
    }).then(response => {
        console.log(response.data);
        alert.innerHTML = successAlert;

    })
        .catch(err => {
            console.log(err);
            alert.innerHTML = failureAlert;
        })
}


const invokeRefreshToken = () => {
    setInterval(() => {
        let refreshToken = Cookies.get('refreshToken');
        axios.post('http://localhost:3000/auth/refresh-token', {
            refreshToken
        }).then((response) => {
            const { accessToken, refreshToken } = response.data;
            Cookies.set('accessToken', accessToken);
            Cookies.set('refreshToken', refreshToken);
        })
            .catch((err) => console.log(err));

    }, 59000);
}

getProfile();
invokeRefreshToken();


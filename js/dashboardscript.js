const accessToken = Cookies.get('accessToken');
const userimage= document.getElementById('userimage');
const username = document.getElementById('username');

axios.get('http://localhost:3000/api/profile', {
    headers: {
        authorization: 'Bearer ' + accessToken
    }
}).then(function (response) {
    console.log(response.data);
    userimage.src = `https://avatars.abstractapi.com/v1/?api_key=c312bbe42aac4d9f8fc3eee5dcb62f24&name=${response.data.name}`;
    console.log(username);
    username.innerText =  response.data.name
})



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
const submit = document.getElementById('submit');
const role= document.getElementById('role');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');

submit.addEventListener('click', () => {
    axios.post('http://localhost:3000/auth/login', {
        Email: inputEmail.value,
        Password: inputPassword.value,
        role
    }).then(function (response) {
        const {accessToken,refreshToken} = response.data;
        Cookies.set('accessToken',accessToken );
        Cookies.set('refreshToken',refreshToken );
        window.location.replace('./dashboard.html');
    })
        .catch(function (error) {
            console.log(error);
            inputEmail.value = "";
            inputPassword.value = "";
        });
})
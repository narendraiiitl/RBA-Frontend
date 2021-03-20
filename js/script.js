const submit = document.getElementById('submit');
const role = document.getElementById('role');
const inputEmail = document.getElementById('inputEmail');
const inputName = document.getElementById('inputName');
const inputPassword = document.getElementById('inputPassword');

submit.addEventListener('click', () => {
    console.log(role.value);
    axios.post('https://dry-cliffs-95328.herokuapp.com/auth/register', {
        Email: inputEmail.value,
        Password: inputPassword.value,
        Name: inputName.value,
        role: role.value
    }).then(function (response) {
        const { accessToken, refreshToken } = response.data;
        Cookies.set('accessToken', accessToken);
        Cookies.set('refreshToken', refreshToken);
        window.location.replace('./dashboard.html');
    })
        .catch(function (error) {
            console.log(error);
            inputEmail.value = "";
            inputPassword.value = "";
            alertify.error("Internal Server Error");
        });
})
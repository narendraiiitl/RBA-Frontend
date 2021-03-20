const logout = document.getElementById('logout');
const refreshToken = Cookies.get('refreshToken');
logout.addEventListener("click", () => {
    console.log("clicked");
    axios.delete('https://dry-cliffs-95328.herokuapp.com/auth/logout', {
        data: {
            refreshToken
        }
    }).then(function (response) {
        console.log("Logged Out successfully")
        window.location.replace('/signin.html');
    })
        .catch(err => {
            console.log(err);
        })
})
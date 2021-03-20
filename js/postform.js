const add = document.getElementById("add");
const myform = document.getElementById("myform");

let k = 0;
add.addEventListener('click', () => {
    if (k == 1) {
        myform.style.visibility = "hidden"
        k = 0;
    }
    else {
        myform.style.visibility = "visible"
        k = 1;
    }
})
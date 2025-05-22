function showRoleSelector() {
    Swal.fire({
        title: 'Sign-Up As?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Admin',
        denyButtonText: 'User',
        confirmButtonColor: '#ff0278',
        denyButtonColor: '#ff0278',
        cancelButtonColor: '#6c757d'
    }).then((result) => {
        if (result.isConfirmed) {
            new bootstrap.Modal(document.getElementById('adminModal')).show();
        } else if (result.isDenied) {
            new bootstrap.Modal(document.getElementById('userModal')).show();
        } else {
            Swal.fire('Cancelled', 'No role selected.', 'info');
        }
    });
}

function loginSelector() {
    Swal.fire({
        title: 'Log-In As?',
        icon: 'question',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Admin',
        denyButtonText: 'User',
        confirmButtonColor: '#ff0278',
        denyButtonColor: '#ff0278',
        cancelButtonColor: '#6c757d'
    }).then((result) => {
        if (result.isConfirmed) {
            new bootstrap.Modal(document.getElementById('adminLogin')).show();
        } else if (result.isDenied) {
            new bootstrap.Modal(document.getElementById('userLogin')).show();
        } else {
            Swal.fire('Cancelled', 'No role selected.', 'info');
        }
    });
}
let adminArr = JSON.parse(localStorage.getItem('admin')) || [];
document.getElementById("adminSignupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("resName").value;
    let email = document.getElementById("resEmail").value;
    let pass = document.getElementById("resPassword").value;
    adminArr.push({ name, email, password: pass });
    localStorage.setItem("admin", JSON.stringify(adminArr));
    Swal.fire("Success", "Admin account created!", "success");
    e.target.reset();
});
document.getElementById("adminLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("resloginEmail").value;
    let pass = document.getElementById("resloginPassword").value;
    let match = adminArr.find(u => u.email === email && u.password === pass);
    if (match) {
        localStorage.setItem("currentAdmin", JSON.stringify(match));
        Swal.fire("Login Successful", "Redirecting to admin page...", "success").then(() => {
            window.location.href = "../admin/admin.html";
        });
    } else {
        Swal.fire("Error", "Email or Password is incorrect", "error");
    }
});
let userArr = JSON.parse(localStorage.getItem('user')) || [];
document.getElementById("userSignupForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let pass = document.getElementById("signupPassword").value;
    userArr.push({ name, email, password: pass });
    localStorage.setItem("user", JSON.stringify(userArr));
    Swal.fire("Success", "User account created!", "success");
    e.target.reset();
});
document.getElementById("userLoginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.getElementById("uloginEmail").value;
    let pass = document.getElementById("uloginPassword").value;
    let match = userArr.find(u => u.email === email && u.password === pass);
    if (match) {
        Swal.fire("Login Successful", "Redirecting to user page...", "success").then(() => {
            window.location.href = "../user/user.html";
        });
    } else {
        Swal.fire("Error", "Email or Password is incorrect", "error");
    }
});

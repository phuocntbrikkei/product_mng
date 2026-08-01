// Khởi tạo icons Lucide
lucide.createIcons();

// Toggle ẩn/hiện mật khẩu
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
    }
    lucide.createIcons();
}

// Hiển thị thông báo
function showAlert(message, type = 'error') {
    const alertBox = document.getElementById('alertBox');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');

    alertBox.classList.remove('hidden', 'bg-rose-500/10', 'text-rose-400', 'border-rose-500/20', 'bg-emerald-500/10', 'text-emerald-400', 'border-emerald-500/20');

    if (type === 'error') {
        alertBox.classList.add('bg-rose-500/10', 'text-rose-400', 'border', 'border-rose-500/20');
        alertIcon.setAttribute('data-lucide', 'alert-circle');
    } else {
        alertBox.classList.add('bg-emerald-500/10', 'text-emerald-400', 'border', 'border-emerald-500/20');
        alertIcon.setAttribute('data-lucide', 'check-circle-2');
    }

    alertMessage.textContent = message;
    alertBox.classList.remove('hidden');
    lucide.createIcons();
}

// Xử lý sự kiện đăng nhập
function handleLogin(event) {
    event.preventDefault();

    const userVal = document.getElementById('username').value.trim();
    const passVal = document.getElementById('password').value.trim();

    let userExsited = null;

    for (let i = 0; i < modList.length; i++) {
        if (modList[i].username == userVal) {
            userExsited = modList[i];
            break
        }
    }

    /* check tồn tại */
    if (!userExsited) {
        showAlert('Tài khoản không tồn tại!');
        return
    }

    /* check password */
    if (userExsited.password != passVal) {
        showAlert('Mật khẩu không chính xác');
        return
    }

    /* check status */
    if (!userExsited.status) {
        showAlert('Tài khoản đã bị khóa')
        return
    }

    showAlert('Đăng nhập thành công!', 'success');

    localStorage.setItem("userLogin", JSON.stringify(userExsited))

    /* Sau 1s chuyển trang */
    setTimeout(() => {
        /* chuyển trang */
        location.href = "/dashboard"
    }, 2000); // 1000ms = 1s
    
}

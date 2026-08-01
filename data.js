/* thiết kế dữ liệu */

// moderator (người quản trị)
let mod = {
    id: 1,
    username: "admin",
    password: "123",
    status: true, // false = khóa
    isMaster: true
}

let modList = [
    mod,
    {
        id: 2,
        username: "admin2",
        password: "123",
        status: false, // false = khóa
        isMaster: true
    },
    {
        id: 3,
        username: "admin3",
        password: "123",
        status: false, // false = khóa
        isMaster: true
    }
]

/* Nếu có rồi thì lấy về, chưa có thì lưu lên (local storage) */
if (!localStorage.getItem("modList")) {
    localStorage.setItem("modList", JSON.stringify(modList))
} else {
    modList = JSON.parse(localStorage.getItem("modList"))
}


// category (danh mục)

let category = {
    id: 1,  // định danh - danh mục
    title: "Máy Tính",
    status: false
}


let categoryList = [
    category
]

if (!localStorage.getItem("categoryList")) {
    localStorage.setItem("categoryList", JSON.stringify(categoryList))
} else {
    categoryList = JSON.parse(localStorage.getItem("categoryList"))
}

function saveCategoryListToLocal() {
    localStorage.setItem("categoryList", JSON.stringify(categoryList))
}

// product (sản phẩm)

let product = {
    id: 1,
    name: "Lenovo HANBD",
    price: 500000,
    status: true,
    categoryId: 1, // chiếu qua dữ liệu categoryList -> để biết nó là danh mục nào
    images: [
        "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/lenovo_thinkbook_14_g9_gray_01_633cd72f46.png"
    ]
}

let productList = [
    product
]

if (!localStorage.getItem("productList")) {
    localStorage.setItem("productList", JSON.stringify(productList))
} else {
    productList = JSON.parse(localStorage.getItem("productList"))
}


/* dữ liệu người dùng login */
function getUserLogin() {
    return JSON.parse(localStorage.getItem("userLogin"))
}


if (!getUserLogin()) {
    location.href = "/auth"
}


/* ---------------- DANH MỤC LOGIC ---------------- */
function renderCategories() {
    const tbody = document.getElementById("categoryTableBody");

    let categoryHtmlData = ``;

    for (let i = 0; i < categoryList.length; i++) {
        let cat = categoryList[i]
        categoryHtmlData += `
            <tr class="hover:bg-slate-700/20 transition">
                <td class="px-6 py-4 font-mono text-xs text-slate-400">#${cat.id}</td>
                <td class="px-6 py-4 font-semibold text-white">${cat.title}</td>
                <td class="px-6 py-4">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${cat.status ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}">
                    <span class="w-1.5 h-1.5 rounded-full ${cat.status ? 'bg-emerald-400' : 'bg-rose-400'}"></span> ${cat.status ? 'Hoạt động' : 'Tắt'}
                    </span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button onclick="openCategoryModal(${cat.id})" class="p-1.5 bg-slate-700/60 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-400 rounded-lg transition border border-slate-600/40 mr-1">
                    <i data-lucide="pencil" class="w-4 h-4"></i>
                    </button>
                    <button onclick="deleteCategory(${cat.id})" class="p-1.5 bg-slate-700/60 hover:bg-rose-600/30 text-slate-300 hover:text-rose-400 rounded-lg transition border border-slate-600/40">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                </td>
            </tr>
        `
    }

    tbody.innerHTML = categoryHtmlData;
    lucide.createIcons();
}

function openCategoryModal(id = null) {
    const modal = document.getElementById("categoryModal");
    const title = document.getElementById("categoryModalTitle");

    if (id) {
        /* sửa */
        let cat = null;
        for (let i = 0; i < categoryList.length; i++) {
            if (categoryList[i].id == id) {
                cat = categoryList[i];
                break
            }
        }

        title.innerText = "Sửa Danh Mục";
        document.getElementById("catId").value = cat.id;
        document.getElementById("catTitle").value = cat.title;
        document.getElementById("catStatus").checked = cat.status;
    } else {
        /* thêm */
        title.innerText = "Thêm Danh Mục";
        document.getElementById("categoryForm").reset();
        document.getElementById("catId").value = "";
    }
    modal.classList.remove("hidden");
}

function closeCategoryModal() {
    document.getElementById("categoryModal").classList.add("hidden");
}

function saveCategory(event) {
    event.preventDefault(); // không cho call action gây ra load lại trang
    let formEL = event.target;

    let catId = formEL.input_id.value;

    if (catId) {
        // sửa
        let editCategory = {
            id: catId,
            title: formEL.input_title.value,
            status: formEL.input_status.checked,
        }

        for(let i = 0; i < categoryList.length; i++) {
            if(categoryList[i].id == catId) {
                categoryList[i] = editCategory
                break;
            }
        }

    } else {
        let newCategory = {
            id: Date.now(),
            title: formEL.input_title.value,
            status: formEL.input_status.checked,
        }

        categoryList.push(newCategory)
    }


    saveCategoryListToLocal()
    renderCategories()
    closeCategoryModal()
}

function deleteCategory(categoryId) {

    if (!confirm("Chắc chưa")) {
        return
    }

    for (let i = 0; i < categoryList.length; i++) {
        if (categoryList[i].id == categoryId) {
            categoryList.splice(i, 1)
            break
        }
    }

    saveCategoryListToLocal()
    renderCategories()
}

renderCategories();
lucide.createIcons();

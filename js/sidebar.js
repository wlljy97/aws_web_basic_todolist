const sidebarToggleButtonOnClickHandle = () => { // 의 기능
    const sidebar = document.querySelector(".sidebar");
    const sidebarToggleButton = document.querySelector(".sidebar-toggle-button");

    if(sidebar.classList.contains("isSidebarOpen")) {
        sidebar.classList.remove("isSidebarOpen"); // 들어가있을 때
        sidebarToggleButton.innerHTML = '▶'
    }else{
        sidebar.classList.add("isSidebarOpen"); // 나왔을 때
        sidebarToggleButton.innerHTML = '◀'
    }
}

const sidebarMenuOnClickHandle = (target) => {
    switch(target.innerHTML) {
        case "시작하기":
            Routes.getInstance().routeState = "welcome";
            break;

        case "TODOLIST":
            Routes.getInstance().routeState = "todolist";
            break;
    }

    Routes.getInstance().show();
    sidebarToggleButtonOnClickHandle();
}
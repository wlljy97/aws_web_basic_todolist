window.onload = () => {
    TodoListService.getInstance().updateTodoList(); // 맨처음에 한번 호출
}
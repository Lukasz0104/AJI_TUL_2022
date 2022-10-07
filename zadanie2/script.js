"use strict"
let todoList = []; //declares a new array for Your todo list

const todoListTable = $("tbody#tableBody");
const filterInput = $("#inputSearch");
const dueDateBeforeInput = $('input#dueDateBeforeInput');
const dueDateAfterInput = $('input#dueDateAfterInput');

const updateTodoList = () =>
{
	//remove all elements
	todoListTable.empty();

	//add all elements
	for (const [id, todo] of todoList.entries())
	{
		let filterInputValue = filterInput.val();
		if (filterInputValue && !(todo.title.includes(filterInputValue) || (todo.description.includes(filterInputValue))))
			continue;

		let dueDateAfterValue = dueDateAfterInput.val();
		if (dueDateAfterValue && !isDateAfter(todo.dueDate, dueDateAfterValue)) continue;

		let dueDateBeforeValue = dueDateBeforeInput.val();
		if (dueDateBeforeValue && !isDateBefore(todo.dueDate, dueDateBeforeValue)) continue;

		let newTableRow = $("<tr>");

		let idCell = $(`<td class="text-center">${id + 1}</td>`);

		let titleCell = $(`<td>${todo.title}</td>`);

		let descriptionCell = $(`<td>${todo.description}</td>`);

		let placeCell = (`<td>${todo.place}</td>`);

		let dueDateCell = $(`<td>${(new Date(todo.dueDate)).toDateString()}</td>`);

		let buttonCell = $("<td>");

		let newDeleteButton = $(`<button class="btn btn-outline-danger">Delete</button>`);
		newDeleteButton.click(() => deleteTodo(id));

		buttonCell.append(newDeleteButton);

		newTableRow.append(idCell, titleCell, descriptionCell, placeCell, dueDateCell, buttonCell);
		todoListTable.append(newTableRow);
	}
}

const isDateAfter = (date1, date2) =>
{
	return (new Date(date1)) > (new Date(date2));
}

const isDateBefore = (date1, date2) =>
{
	return (new Date(date1)) < (new Date(date2));
}


const deleteTodo = (index) =>
{
	todoList.splice(index, 1);
	updateJSONbin();
}

const addTodo = () =>
{
	//get the values from the form
	let newTitle = $("#inputTitle").val();
	let newDescription = $("#inputDescription").val();
	let newPlace = $("#inputPlace").val();
	let newDate = new Date($("#inputDate").val());
	//create new item
	let newTodo = {
		title: newTitle,
		description: newDescription,
		place: newPlace,
		dueDate: newDate
	};
	//add item to the list
	todoList.push(newTodo);

	window.localStorage.setItem("todos", JSON.stringify(todoList));
	updateJSONbin();
}

const updateJSONbin = () =>
{
	$.ajax({
		url: 'https://api.jsonbin.io/v3/b/633ef4890e6a79321e1f2c77',
		type: 'PUT',
		headers: { //Required only if you are trying to access a private bin
			'X-Master-Key': '$2b$10$uam1uJ.L9ybLKThmESC7Se/vggGr7lCT2pnwJoXIfiQPlVTE1.XUC',
		},
		contentType: 'application/json',
		data: JSON.stringify(todoList),
		success: (data) =>
		{
			// console.log(data);
		},
		error: (err) =>
		{
			console.error(err.responseJSON);
		}
	});
}

// document.ready
$(() => 
{
	$.ajax({
		// copy Your bin identifier here. It can be obtained in the dashboard
		url: 'https://api.jsonbin.io/v3/b/633ef4890e6a79321e1f2c77',
		type: 'GET',
		headers: { //Required only if you are trying to access a private bin
			'X-Master-Key': '$2b$10$uam1uJ.L9ybLKThmESC7Se/vggGr7lCT2pnwJoXIfiQPlVTE1.XUC',
			'X-Bin-Meta': false // disable BIN metadata
		},
		success: (data) =>
		{
			todoList = data;
			updateTodoList();
		},
		error: (err) =>
		{
			console.log(err.responseJSON);
		}
	});

	$('form').submit(event =>
	{
		event.preventDefault(); // prevent page reload
		addTodo();
	})


	$('form input[type=date]').val(new Date().toISOString().substring(0, 10));

	let interval = setInterval(updateTodoList, 1000);
});
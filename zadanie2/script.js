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

		let newTableRow = $("<tr>").appendTo(todoListTable);

		// create td with id
		$("<td>", {
			"class": "text-center",
			text: id + 1
		}).appendTo(newTableRow);

		// create td with title
		$("<td>", {
			text: todo.title
		}).appendTo(newTableRow);

		// create td with description
		$("<td>", {
			text: todo.description
		}).appendTo(newTableRow);

		// create td with place
		$("<td>", {
			text: todo.place
		}).appendTo(newTableRow);

		// create td with due date
		$("<td>", {
			text: (new Date(todo.dueDate)).toDateString()
		}).appendTo(newTableRow);

		// create td with delete button
		$("<td>")
			.append($("<button>", {
				"class": "btn btn-outline-danger",
				text: "Delete",
				click: () => deleteTodo(id)
			}))
			.appendTo(newTableRow);
	}
}

const isDateAfter = (date1, date2) =>
{
	return date1 > date2;
}

const isDateBefore = (date1, date2) =>
{
	return date1 < date2;
}


const deleteTodo = (index) =>
{
	todoList.splice(index, 1);
	updateJSONbin();
	updateTodoList();
}

const addTodo = () =>
{
	//get the values from the form
	let newTitle = $("#inputTitle").val();
	let newDescription = $("#inputDescription").val();
	let newPlace = $("#inputPlace").val();
	let newDueDate = new Date($("#inputDate").val());

	//create new item
	let newTodo = {
		title: newTitle,
		description: newDescription,
		place: newPlace,
		dueDate: newDueDate
	};
	//add item to the list
	todoList.push(newTodo);

	updateJSONbin();
	updateTodoList();
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
		updateTodoList();
	})


	$('form input[type=date]').val(new Date().toISOString().substring(0, 10));

	// add event listeners
	filterInput.on('input', () => updateTodoList());
	$('input[type=date]').slice(1).change(() => updateTodoList());
});
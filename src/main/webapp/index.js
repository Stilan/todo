$(document).ready(getList());

function List() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/todo_war_exploded/index',
        dataType: 'json'
    }).done(function (data) {
        for (var item of data) {
            if (!item.done) {
                $('#tableId tr:last').after('<tr><td>' + '<input type="checkbox" id ="' + item.id + '" onchange="update(id)">'
                    + item.description + '</td></tr>')
            }
        }
    }).fail(function (err) {
        console.log(err);
    })
}

 function getList() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/todo_war_exploded/index',
        dataType: 'json'
    }).done(function (data) {
        for (var item of data) {
            if (item.done) {
                $('#tableId tr:last').after('<tr><td>' + '<input type="checkbox" id ="' + item.id + '" onchange="update(id)">'
                    + '</td><td>' + item.description + '</td></tr>')
            }
        }
    }).fail(function (err) {
        console.log(err);
    })
}
function add() {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/todo_war_exploded/index',
        data: {
            description: $('#description').val()
        },
        dataType: 'json'
    }).done(function (data) {
        $('#tableId tr:last').after('<tr><td>' + '<input type="checkbox" id ="' + data.id + '" onchange="update(id)">'
          + '</td><td>' + data.description + '</td></tr>')

    }).fail(function (err) {
        console.log(err);
    })
}
function update(id){
    alert(id)
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/todo_war_exploded/update',
        data: {
            id: id
        },
        dataType: 'text'
    });
}


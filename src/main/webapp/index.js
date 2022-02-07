$(document).ready(getList()
);

function List() {
    $('#tableId thead').empty();
    let check = $("#filter").prop("checked");
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/todo_war_exploded/index',
        dataType: 'json'
    }).done(function (data) {
        for (var item of data) {
            $('#' + item.id).empty()
        }
        if (check) {
            for (var item of data) {
                $('#tableId thead').after('<tr id="' + item.id + '"><td>' + '<input type="checkbox" id ="'
                    + item.id + '" onchange="update(id)">'
                    + '</td><td>' + item.description + '</td>'
                    + '<td>' + item.user.name  + '</td></tr>')
            }
        } else {
                for (var item of data) {
                    if (item.done) {
                        $('#tableId thead').after('<tr id="' + item.id + '"><td>' + '<input type="checkbox" id ="'
                            + item.id + '" onchange="update(id)">'
                            + '</td><td>' + item.description + '</td>'
                            + '<td>' + item.user.name  + '</td></tr>')
                }
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
                $('#tableId thead').after('<tr id="' + item.id + '"><td>' + '<input type="checkbox" id ="'
                    + item.id + '" onchange="update(id)">'
                    + '</td><td>' + item.description + '</td>'
                    + '<td>' + item.user.name + '</td></tr>')
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
        if (data.user  != null) {
            if (data.done) {
                data.user.name
                $('#tableId thead').after('<tr id="' + data.id + '"><td>' + '<input type="checkbox" id ="'
                    + data.id + '" onchange="update(id)">'
                    + '</td><td>' + data.description + '</td>'
                    + '<td>' + data.user.name + '</td></tr>')
            }
        } else {
            alert("Зарегистрируйтесь")
        }
    }).fail(function (err) {
        console.log(err);
    })
}
function update(id){
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/todo_war_exploded/update',
        data: {
            id: id
        },
        dataType: 'json'
    }).done(function (data) {
        $('#' + data.id).empty();
    }).fail(function (err) {
        console.log(err);
})
}

function addRow() {
    const name = $('#description').val();
    if (name === "") {
        alert($('#description').attr('placeholder'));
    }
}




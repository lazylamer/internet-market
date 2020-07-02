'use strict';
const init = function() {
    $.post(
        "php/core.php",
        {
            "action" : "init"
        },
        showGoods
    );
}

const selectGoods = function() {
    const id = $('select option:selected').attr('data-id');
    console.log(id);
    $.post(
        "php/core.php",
        {
            "action": "selectOneGood",
            "aid" : id
        },
        function (data) {
            console.log(data);  
            data = JSON.parse(data);
            $('#aname').val(data.name);
            $('#acost').val(data.cost);
            $('#adescription').val(data.description);
            $('#aimg').val(data.img);
        }
    );
}

const showGoods = function(data) {
    console.log(data);
    data = JSON.parse(data);
    console.log(data);
    let layout = `<select><option data-id="0">New good</option>`;
    for (const key in data) {
        layout += `<option data-id="${data[key]['id']}">${data[key].name}</option>`;
    }
    layout += `</option>`;
    $('.goods__body').html(layout);
    $('select').on('change', selectGoods);
}


const saveToDb = function() {
    const id = $('select option:selected').attr("data-id");
    if (id != 0) {
        $.post(
            "php/core.php",
            {
                "action" : "updateGoods",
                "aid" : id,
                "aname" : $('#aname').val(),
                "acost" : $('#acost').val(),
                "adescription" : $('#adescription').val(),
                "aimg" : $('#aimg').val()
            },
            function(data) {
                console.log(data);
                if (data == 1) {
                    init();
                } else {
                    console.error("error");
                }
            }
        );
    } else {
        $.post(
            "php/core.php",
            {
                "action" : "newGood",
                "aid" : 0,
                "aname" : $('#aname').val(),
                "acost" : $('#acost').val(),
                "adescription" : $('#adescription').val(),
                "aimg" : $('#aimg').val()
            },
            function(data) {
                console.log(data);
                if (data == 1) {
                    init();
                    alert("New good has been added");
                } else {
                    console.error("error");
                }
            }
        );
    }
}



$(document).ready( () => {
    init();
    $('#goods__btn').on('click', saveToDb);
});
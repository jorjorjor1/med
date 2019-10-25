// живой поиск, по search_text находится фильтруются начало названия услуги
$(function(){
    $('#search').keyup(function(){

        $.ajax({
            type:"POST",
            url:'/search/',
            data:{
                'search_text' : $('#search').val(),
                'csrfmiddlewaretoken':$("input[name=csrfmiddlewaretoken]").val()
            },
            success: searchSuccess,
            dataType: 'html'
        });
    });
});
// отсылает search_services
function searchSuccess (data, textStatus, jqXHR)
{
    $("#search-results").html(data);
}

$(document).on('submit', '#main-form', function(e){
    // e.preventDefault();

    $.ajax({
        type:'POST',
        url:'/page/',
        data:{
            'polis_id':$("#polis_id").val(),
            'chosenQuestions':$('#js_data_input').val(),
            'csrfmiddlewaretoken':$("input[name=csrfmiddlewaretoken]").val()
        },
        success: searchSuccess2,
        dataType: 'html',
        statusCode: {
            500: function() {
                raiseError();}
            },

        
    })
    return false;
});

//меняет кнопку, отсылает ajax_view
function searchSuccess2 (data, textStatus, jqXHR){
    console.log(data)
    $('body').html(data);
        $(".services-area").empty();
        $("#post-form").css('background-color', 'rgb(34, 240, 223)')
        $("#post-form").css('border', '0px')
        $("#post-form").attr('value', 'Еще раз');
        $("#polis_id").attr('disabled', true);
        $("#search").attr('disabled', true);
        $("#search-result1").attr('disabled', true);
        $("#post-form").click(function(){
            window.location.href='/'
        });
}
//открывает модальное окно при ошибке ввода полиса
function raiseError (){
    $("#myModal").show();
}

function closeModal(){
    $("#myModal").hide()
}
     
        


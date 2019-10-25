$(document).on('submit', '#main-form', function(e){
    e.preventDefault();

    $.ajax({
        type:'POST',
        url:'/exper',
        data:{
            'polis_id':$('#polis_id').val(),
            'sk_id':$('#sk_id').val(),
            'csrfmiddlewaretoken':$("input[name=csrfmiddlewaretoken]").val()
        },
        success:function(){
            alert("ok")

        }
    })
});

// $(function(){
//     $('#search').keyup(function(){

//         $.ajax({
//             type:"POST",
//             url:'/search',
//             data:{
//                 'search_text' : $('#search').val(),
//                 'csrfmiddlewaretoken':$("input[name=csrfmiddlewaretoken]").val()
//             },
//             success: searchSuccess,
//             dataType: 'html'
//         });
//     });
// });

// function searchSuccess (data, textStatus, jqXHR)
// {
//     $("#search-results").html(data);
//     var result = document.getElementsByClassName('search-result1')
//     console.log(result)
// }

var count = 1 //количество кнопочек

var chosenQuestions = [] //выбранные сервисы

function createBtn(){
  //кнопочку нельзя создать после отправки формы
  if (document.getElementById("polis_id").disabled){

  }
  else{
    if (chosenQuestions.indexOf(event.target.textContent) == -1) { //кликаем на вариант в "живом поиске"
    console.log('действие 1')
    var btn = document.createElement("li");
    btn.style.display='flex'
    btn.innerHTML = event.target.textContent; // создаем кнопку с именем вариант из "живого поиска"
    btn.id = 'services_btn'+ ' '+count;
    btn.className = 'selected_services'
    if (chosenQuestions.length == 0){
        chosenQuestions.push(btn.innerHTML)
    }
    else{
        for (let key in chosenQuestions) { 
            console.log(chosenQuestions[key], btn.innerHTML)
            if (chosenQuestions.indexOf(btn.innerHTML) != -1) {
                console.log('уже добавлено')
            }
            else {
                console.log("добавляю") //добавляем в список сервисов
                chosenQuestions.push(btn.innerHTML)
            }
        }
    }
    var backElement = document.getElementsByClassName('services-area')[0];
    backElement.appendChild(btn);
    console.log(chosenQuestions)
    // создаем крестик
    var cross = document.createElement("button");
    cross.className = 'selected_services-cross';
    cross.id = btn.innerHTML
    cross.type = 'submit';
    // функция удаляет табличку
    cross.onclick = function () {
    document.getElementById(btn.id).remove();
    this.remove();
    chosenQuestions.splice(chosenQuestions.indexOf(this.id), 1);
    $('#js_data_input').val(chosenQuestions)
    };
    cross.innerHTML = "x";
    document.getElementById(btn.id).appendChild(cross);
    count++;
    $('#js_data_input').val(chosenQuestions)
  }
  
  }


};

//варианты живого поиска можно увидеть, но нельзя выбрать после отправки формы
if (document.getElementById("polis_id").disabled){

}
else{
  //если ждем НЕ на варианты из живого поиска, они пропадают
document.addEventListener('click', function(event) {
  var e=document.getElementById("search-results");
  if (!e.contains(event.target)) e.style.display='none';
});
// //если жмем на зону поиска, варианты появляются
document.addEventListener('click', function(event) {
  var e=document.getElementById("search");
  var j=document.getElementById("search-results");
  if (e.contains(event.target)) j.style.display='inline';
});

}

 //переключение цветов на ДМС и ОМС
  $('.first').click(function() {
    function storeColor(aBtn) {
      var originalColor = $(aBtn).data("originalcolor");
      if (!originalColor) {
        originalColor = window.getComputedStyle(aBtn).backgroundColor;
        $(aBtn).data("originalcolor", originalColor);
      }
      return originalColor;
    }
    function resetColor(aBtn) {
      var originalColor = storeColor(aBtn);
      $(aBtn).css('background-color', originalColor)
      $(aBtn).css('color', 'black' );
    }
    function setColor(aBtn) {
      storeColor(aBtn);
      var newColor = $(aBtn).data("backcolor");
      $(aBtn).css('background-color', newColor);
      $(aBtn).css('color', 'white' );
    }
  
    $(".first button").each(function(){
      resetColor(this);
    });
    setColor($(this).find("button")[0]);
  });

//чтоб Энтер не отправлял форму
  $(document).on("keydown", ":input:not(textarea)", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
    }
});
//валидность формы - кнопки меняют цвет, если длина полиса и ск >0, фиксируется keydown
$(document).on("keydown",  function(){
  console.log($("#polis_id").val().length);
  console.log(chosenQuestions.length);
  var inputLength = $('#polis_id').val().length
  if (document.getElementById("polis_id").disabled){
    console.log('dis')
  }//
  else{
    if (chosenQuestions.length > 0 && inputLength > 0){
    $("#post-form").css('background-color', 'red')
    $("#post-form").css('color', 'white')
    $("#post-form").attr('disabled', false);
  }
  else{
    $("#post-form").css('background-color', 'white')
    $("#post-form").css('color', 'red')
    $("#post-form").attr('disabled', false);
  }
  }
    

  }
 
);
//кнопки меняют цвет, если длина полиса и ск >0, фиксируется click

$(document).on("click",  function(){ 
  console.log($("#polis_id").val().length);
  console.log(chosenQuestions.length);
  var inputLength = $('#polis_id').val().length
  if (document.getElementById("polis_id").disabled){
    console.log('dis')
  }//
  else{
    if (chosenQuestions.length > 0 && inputLength > 0){
    $("#post-form").css('background-color', 'red')
    $("#post-form").css('color', 'white')
    $("#post-form").attr('disabled', false);
  }
  else{
    $("#post-form").css('background-color', 'white')
    $("#post-form").css('color', 'red')
    $("#post-form").attr('disabled', true);
  }
  }
    

  }
 
);
//по нажатию энтер создается кнопка с введенной услугой, расширенная createBtn()
function getVal() {
  var x = document.getElementById("search");
  console.log(x.value.toUpperCase()) 
  var customValue = x.value
    if (event.key === "Enter") {
      if (chosenQuestions.indexOf(customValue) == -1) {
        console.log('действие 1')
        var btn = document.createElement("li");
        btn.style.display='flex'
        btn.innerHTML = customValue;
        btn.id = 'services_btn'+ ' '+count;
        btn.className = 'selected_services'
        if (chosenQuestions.length == 0){
            chosenQuestions.push(btn.innerHTML)
        }
        else{
            for (let key in chosenQuestions) {
                console.log(chosenQuestions[key], btn.innerHTML)
                if (chosenQuestions.indexOf(btn.innerHTML) != -1) {
                    console.log('уже добавлено')
                }
                else {
                    console.log("добавляю")
                    chosenQuestions.push(btn.innerHTML)
                }
            }
        }
        var backElement = document.getElementsByClassName('services-area')[0];
        backElement.appendChild(btn);
        console.log(chosenQuestions)
        // создаем крестик
        var cross = document.createElement("button");
        cross.className = 'selected_services-cross';
        cross.id = btn.innerHTML
        cross.type = 'submit';
        // функция удаляет табличку
        cross.onclick = function () {
        document.getElementById(btn.id).remove();
        this.remove();
        chosenQuestions.splice(chosenQuestions.indexOf(this.id), 1);
        $('#js_data_input').val(chosenQuestions)
        };
        cross.innerHTML = "x";
        document.getElementById(btn.id).appendChild(cross);
        count++;
        $('#js_data_input').val(chosenQuestions)
    }

    }

  }

  function redir(){
    window.location.href='/';
 }
 
var row=0;    
var div = "#questions";
$(document).ready(function (){

    $("#btnSubmit").click(function(){
        Submit();
    });

    $("#btnNext").click(function(){
        Next();
    });
     
     $("#btnBack").click(function(){
         Back();
    });

    function Submit(){
        var error=false;
        var answers = [];
        $(div).find('td:first-child')
        .each(function() {
            var check=false;
            $(this).find('input:radio:first-child')
            .each(function() {
                if($(this).is(':checked')) {
                    answers.push($(this).attr("name") + ':' + $(this).val());
                    check=true;
                }
            });        
            if(check==false && $(this).find('span').attr("optional")=='false'){
                var question= $(this).find('.question').text();
                var text = "سوال زیر بدون جواب است: <br>" + question;
                swal.fire({
                    title: "خطا",
                    html: text,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "بستن",
                    customClass: {
                        confirmButton: "btn font-weight-bold btn-light-primary"
                    }
                }).then(function() {
                    KTUtil.scrollTop();
                });
                error=true;
                return false;
            }
        });
        if(error==false){
            doSubmit(answers);
        }
    }

      
    $('input:radio:checked').parent().parent().parent().addClass("check");
    $('input:radio').click(function () {
    $('input:not(:checked)').parent().parent().parent().removeClass("check");
    $('input:checked').parent().parent().parent().addClass("check");
    });

    function Next(){
        var error=false;
        var answers = [];
        var current=false;
        var totaltr = $(div).find('tr').length;
        var totaltd = $(div).find('td:first-child').length;
        $(div).find('td:first-child')
        .each(function(index) {
            if (index === totaltd - 1) {
                row++;
                }
            if(current==true){
                current=false;
                $(this).show();
                $(this).removeClass('d-none');
            }else{
                if($(this).is(":visible")){
                    var check=false;
                    $(this).find('input')
                    .each(function() {
                        if($(this).is(':checked')) {
                            check=true;
                        }
                    }); 
                    if(check==false && $(this).find('span').attr("optional")=='false'){
                        swal.fire({
                            title: "خطا",
                            text: "لطفا یکی از گزینه ها را انتخاب کنید.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "بستن",
                            customClass: {
                                confirmButton: "btn font-weight-bold btn-light-primary"
                            }
                        }).then(function() {
                            KTUtil.scrollTop();
                        });
                        error=true;
                        return false;
                    }
                    current=true;
                    $(this).hide()
                }
            }
            if(row==totaltr){
                row=0;
                if(error==false){

                    $(div).find('input:radio:first-child')
                    .each(function() {
                        if($(this).is(':checked')) {
                            answers.push($(this).attr("name") + ':' + $(this).val());
                        }
                    });  
                    doSubmit(answers);
                }
            }
        });
    }

    function Back(){
        var current=false;
        var totaltd = $(div).find('td:first-child').length;
        $($(div).find('td:first-child').get().reverse()).each(function(index) {
            if(row>0){
                if($(this).is(":visible")){
                    current=true;
                    $(this).hide();
                }
                else{
                    if(current==true){
                        current=false;
                        $(this).show();
                        $(this).removeClass('d-none');
                        }
                }
                if (index === totaltd - 1) {
                    row--;
                }
            }
        });
    }
   
});

function doFinish(){
    var answers = [];
$(div).find('input:radio:first-child')
.each(function() {
  if($(this).is(':checked')) {
      answers.push($(this).attr("name") + ':' + $(this).val());
  }
});  
doSubmit(answers);
}

function doSubmit(answers){
    $( "#answers").val(answers);
    $( "#insertForm" ).submit();
    
    // $.ajax({
    //     url: 'insert',
    //     method: 'POST',
    //     data: {
    //         answers: answers
    //     },
    //     success: function() {
    //         Refresh();
    //         $('#infoModal').modal('toggle');
    //         swal("Good job!", "Added User successfully", "success");
    //     },
    //     complete: function() {
    //         $("#send-request").prop("disabled", false);
    //         $("#send-request").html('Send request');
    //         $('#loading').hide();
    //     }
    // })


}

$('#btnReload').click(function() {
    window.location.href = 'index';
});
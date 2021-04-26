function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function() {

    document.getElementById('create_task_form').onsubmit=function(e){
        e.preventDefault();
    };

    // Send form to the server
    $('#submit_btn').click(function() {
    
        var task_name = $('#task_name').val();
        var task_description = $('#task_description').val();
        var src_url = $('#src_url').val();
        var time_estimate = $('#time_estimate').val();
        // var evidence_list = JSON.stringify(Object.keys(evidence));
        
        var num_responses = $("#num_responses").val();

        if(task_name.length == 0 || 
            task_description.length == 0 ||
            src_url.length == 0 ||
            time_estimate == 0 ||
            num_responses == 0) {
                console.log("Fields not set.");
                return;
        }

        data = {
            "task_name": task_name,
            "task_description": task_description,
            "src_url": src_url,
            "time_estimate": time_estimate,
            "num_responses": num_responses
        };
        console.log(data)

        url = "/task/add/";
        var csrftoken = getCookie('csrftoken');
        
        $.ajax({
            url: url,
            method: "POST",
            headers: {'X-CSRFToken': csrftoken},
            data: data,
            dataType: "json"
          }).done(function(response) {
            $("#submit_btn").prop("disabled",true);
            window.location.replace("/task/"+String(response)+"/");
          }).fail(function (error) {
            $('#submit_btn').prop("disabled",false);
              console.log(error);
          });

    });



});
var unm,flagn=0;
var ldflag=0;

$.ajax({
    url:'http://127.0.0.1:8080/viewlogin',
    method:'GET',
    data:{},
    success:function(response)
    {
	if(response.success!=true)
	{
	    window.location = "http://127.0.0.1:8080/";
	}
	unm=response['user'].username;
    },
    error: function(response)
    {
	window.location = "http://127.0.0.1:8080/";
    },
});
function dashboard_redirect()
{
    $.ajax({
	url:'http://127.0.0.1:8080/reloadDone',
	method:'POST',
	data:{},
	success:function(response)
	{
	    location.reload();

	},
	error: function(response)
	{
	    alert('Please reload the page');
	},
    });



}

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    document.getElementById("bd").style.marginLeft = "300px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    $('#menu').hide();
};

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("bd").style.marginLeft= "0";
    document.body.style.backgroundColor = "white";
    $('#menu').show();
}

function logout()
{
    $.ajax({
	url:'http://127.0.0.1:8080/logout',
	method:'POST',
	data:{},
	success:function(response)
	{
	    if(response.success==true)
	    {
		window.location = "http://127.0.0.1:8080/";
	    }
	    
	},
	error: function(response)
	{
	    alert('Try again');
	},
    });

}

function clearipfield(array)
{
    for(var i=0; i<(array.length); i++)
    {
	var elem = document.getElementById(array[i]);
	elem.value = '';
    }
    return;
}

function validatePassword(pwd)
{
    errors = [];
    if (pwd.length < 8) {
        errors.push("Your password must be at least 8 characters"); 
    }
    if (pwd.search(/[a-z]/i) < 0) {
        errors.push("Your password must contain at least one letter.");
    }
    if (pwd.search(/[0-9]/) < 0) {
        errors.push("Your password must contain at least one numeric digit."); 
    }
    if(pwd.search(/[$_@#]/) <0)
    {
    	errors.push("Your password must contain at least one special character among $,#,@,_");
    }

    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false;
    }
    return true;
}

function usernamefill()
{
    $.ajax({
	url:'http://127.0.0.1:8080/viewlogin',
	method:'GET',
	success:function (response){
	    var x=response['user'].username;
	    x=String(x);
	    var y=x.length;
	    if(y<12)
	    {
		for(i=0;i<=12-y;i++)
		{
		    x+='&nbsp;';
		}
	    }
	    document.getElementById('username_head').innerHTML=x;
	},
	error:function (){
	},
    });

}
usernamefill();
$body = $("body");

$(document).on({
    ajaxStart: function() { if(ldflag==0)$body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});

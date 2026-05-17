function dailyduty()
{
    //const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุทธ", "พฤหัดสบดี", "ศุกข์", "เสาร์"];
    var date = new Date();
    var day = date.getDay();
    var elements = document.getElementById('duty');
    elements.value = day;
    console.log(date);
    console.log(day);
}

function checkduty(){
    var duty = ["เวรวันอาทิตย์", "เวรวันจันทร์", "เวรวันอังคาร", "เวรวันพุทธ", "เวรวันพฤหัดสบดี", "เวรวันศุกข์", "เวรวันเสาร์"];
    var date = new Date();
    var day = date.getDay();
    var elements = document.getElementById('duty');
    var elementtechercheck = document.getElementById('fname');

    /*for(var i = 0;i!=8;i++)
    {
        if()
    }*/

}
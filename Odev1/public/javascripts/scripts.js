
function ajaxDrop() {
    $.ajax({
        url:"/",
        type:"POST",
        data:{
            tip:"choose"
        },
        dataType:"json",
        success: function (data) {
           $("#kodu").val(data.kod);
           $("#isim").val(data.isim);
           $("#icerik").val(data.icerik);
           $("#drop").slideDown(500);
        },
        error: function () {
            alert("Post sırasında hata oluştu.");
        }
    })
}
function keyUPcode() {
    var code=$("#kodu").val();
    var name=$("#isim").val();
    var content=$("#icerik").val();
    $.ajax({
        url:"/",
        type:"POST",
        data:{
            tip:"kodu",
            kod:code,
            isim:name,
            icerik:content,
        },
        dataType:"json",
        success: function (response) {
            $("#derskod").html(response.kod);
        },
        error: function () {
            alert("Post sırasında hata oluştu.");
        }
    })
}
function keyUPname() {
    var code=$("#kodu").val();
    var name=$("#isim").val();
    var content=$("#icerik").val();
    $.ajax({
        url:"/",
        type:"POST",
        data:{
            tip:"isim",
            kod:code,
            isim:name,
            icerik:content,
        },
        dataType:"json",
        success: function (response) {
            $("#ad").html(response.isim);
        },
        error: function () {
            alert("Post sırasında hata oluştu.");
        }
    })
}
function keyUPcontent() {
    var code=$("#kodu").val();
    var name=$("#isim").val();
    var content=$("#icerik").val();
    $.ajax({
        url:"/",
        type:"POST",
        data:{
            tip:"icerik",
            kod:code,
            isim:name,
            icerik:content,
        },
        dataType:"json",
        success: function () {

        },
        error: function () {
            alert("Post sırasında hata oluştu.");
        }
    })
}

function showJSON() {
    $.ajax({
        url:"/",
        type:"POST",
        data:{
            tip:"JSON"
        },
        dataType:"json",
        success: function (response) {
            $("#kodlanmisVeri").html(JSON.stringify(response, null, 2));
        },
        error: function () {
            alert("Post sırasında hata oluştu.");
        }
    })
}
function showXML() {
    $.ajax({
        url:"/",
        type:"POST",
        data:{
            tip:"XML"
        },
        dataType:"xml",
        success: function (response) {
            var xmlText = new XMLSerializer().serializeToString(response);
            $("#kodlanmisVeri").html(xmlText);
        },
        error: function () {
            alert("Post sırasında hata oluştu.");
        }
    })
}

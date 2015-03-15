var ws = new WebSocket('ws://localhost:3000');

ws.addEventListener('open', function(evt){

  var button = document.querySelector('button');
  var inputbox = document.querySelector('input');

  button.addEventListener('click', function(){
    var object = {
      name : name,
      text : inputbox.value
    }
    var userMessage = JSON.stringify(object);
    ws.send(userMessage);
    inputbox.value = " ";
  });

  input.addEventListener("keypress", function(evt){
    if (evt.keyCode === 13){
      var object = {
        name : name,
        text : inputbox.value
      }
      var userMessage = JSON.stringify(object);
      ws.send(userMessage);
      inputbox.value = " ";
    }
  });

  ws.addEventListener('message', function(msg){
    var parsed = JSON.parse(msg.data);
    var chatlist = document.createElement('li');
    chatlist.innerHTML = parsed.name + ": " + "<br>" + parsed.text;
    var linkmsg = parsed.text;

    var httpParse = parsed.text.substring(0, 5).trim();
    if (httpParse === "http" || httpParse === "http:"){
      var length = parsed.text.length;
      var picurl = parsed.text.substring(length-3, length);
      if (picurl === "png" || picurl === "jpg" || picurl === "bmp" || picurl === "gif"){
        linkmsg = "<img src='" + parsed.text +"'>";
      }
      else {
        linkmsg = "<a target=_blank href='" + parsed.text + "'>" + parsed.text + "</a>";
      }
    };

    chatlist.innerHTML = parsed.name + ": " + "<br>" + linkmsg;
    console.log(httpParse);

    var messages = document.getElementById('messages');
    messages.appendChild(chatlist);
  });

});

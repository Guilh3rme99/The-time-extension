chrome.tabs.onUpdated.addListener(tabAtualizada)

function tabAtualizada(){
    //alert("Tab atualizada")
    
    chrome.tabs.getSelected(null, function(tab){
        var title = tab.title
        let link = tab.url

        let page = link.split(".")[1]
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
        
        let tabItem = {
            page,
            time: time
        };
        
        if(!localStorage.getItem(page)){
            localStorage.setItem(page, tabItem.time)
        }
    });
}

function comparacao(){
    chrome.tabs.getSelected(null, function(tab){
        let link = tab.url
        let page = link.split(".")[1]
        
        var today = new Date();
        var hora = today.getHours()
        var minuto = today.getMinutes()
        var segundo = today.getSeconds()
        if(localStorage.getItem(page) && localStorage.getItem("+"+page)){
            var t = localStorage.getItem("+"+page);
            console.log("t",t);
            var separado = localStorage.getItem(page).split(":")
            var h = parseInt(separado[0])
            var m = parseInt(separado[1])
            var s = parseInt(separado[2])
            
            if(minuto - m >= t || (minuto - m)*-1 >= t){
                alert("Tempo Expirado \n Você já passou " + (minuto - m) + " minutos no site: " + page)
            }
        }
    });    
}


function start() {
    setInterval(() => { comparacao(); }, 10);
}

window.onload = function () {
    start()
}

//botão html chama function salvar
"use strict";
document.form_main.salvar.onclick = () => salvar();

//salva informações front
var site;
var tempo

function salvar() {
    
    //pega valor site front e seta
     site = document.getElementById("site").value;
     site = "+"+site;
     console.log("site",site);
     tempo = document.getElementById("tempo").value;
     var t = parseInt(tempo);
     console.log("t",t)
 
    if(t  <=0  &&  localStorage.getItem(site)){
        console.log("entrou no negativo");
        localStorage.removeItem(site);
    }

    if(t >=0){
        console.log("tempo positivo")
        localStorage.setItem(site, t);
    }

    //le se armazenou valores corretamente
    console.log("site",localStorage.getItem(site));
    console.log("tempo",localStorage.getItem(t));

   
    
}


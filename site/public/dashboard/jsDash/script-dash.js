document.querySelector("#menu").insertAdjacentHTML("afterBegin", "<div id='fechar-menu-mobile' style='display: flex; align-items: center; justify-content: center; margin-top: 15px;' onclick='fecharMenu()'><img style='width: 20px; margin-right: 10px;' src='../assets/imgs/x.png'/> Fechar menu</div>");

document.querySelector("#menu-mobile").addEventListener('click', () => {
    document.querySelector("#menu").style.display = "block";
    document.querySelector("#menu").style.transform = "translateX(0)";
    document.querySelector("#menu-mobile").style.display = "none";
});

if(!(sessionStorage['CARGO'] == 'Gestor') || sessionStorage['ID_USUARIO'] == undefined){
    window.location = "../login.html";
}

function fecharMenu(){
    document.querySelector("#menu").style.display = "none";
    document.querySelector("#menu-mobile").style.display = "flex";
}

function menuResponsivo(){
    if(window.innerWidth > 1400){
        document.querySelector("#menu").style.display = "block";
        document.querySelector("#menu-mobile").style.display = "none";
        document.querySelector("#fechar-menu-mobile").style.display = "none";
    }
    else{
        document.querySelector("#menu").style.display = "none";
        document.querySelector("#fechar-menu-mobile").style.display = "flex";
        document.querySelector("#menu-mobile").style.display = "flex";
    }
}

menuResponsivo();

window.addEventListener('resize', (event) => {
    menuResponsivo();
});

$("#sair").on('click', function(event) {
    event.preventDefault();
    sessionStorage.clear();
    window.location = "../index.html";
});
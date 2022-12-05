function abrirMenu() {
    navbar.style.visibility = "visible";
    navbar.style.opacity = 1;
}

function fecharMenu() {
    navbar.style.visibility = "hidden";
    navbar.style.opacity = 0;
}

function voltarIndex(){
    window.location = "index.html";
}

window.addEventListener('resize', (event) => {
    if(window.innerWidth > 997){
        abrirMenu();
    }
    else{
        fecharMenu();
    }
});

/*Dropdown Menu*/

// NOTE: Aqui tive que colocar esse time porque a funcao do select só funciona depois 
// todos os elementos estào estabelecidos. 
setTimeout(() =>{
    $('.dropdown').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function () {
        $(this).parents('.dropdown').find('span').text($(this).text());
        $(this).parents('.dropdown').find('input').attr('value', $(this).attr('id'));
    });

},3000)

// pesquisa

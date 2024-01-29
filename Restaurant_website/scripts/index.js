
const header = document.querySelector('.header');
const nav = header.querySelector('nav');


(function(){

    //dynamic adding the gap property
    Array.from( document.querySelectorAll('*') ).forEach( (element)=>{
        if(element.classList.contains('d-f')){
            if(element.className.indexOf('g-') > -1){
                let gap;
                element.className.indexOf(" ", element.className.indexOf('g-')) > -1 ? gap = element.className.substring(element.className.indexOf("g-"), element.className.indexOf(" ", element.className.indexOf("g-"))) : gap = element.className.substring(element.className.indexOf("g-"));
                gap = gap.substring(gap.indexOf('-') + 1)

                element.style.setProperty('gap', `${gap}rem`);

            }
            
        }
    } )


    // navigation on scroll
    window.addEventListener('scroll', ()=>{
        let CurrScrollY = document.documentElement.scrollTop;
        CurrScrollY >  header.clientHeight ? nav.classList.add('min') : nav.classList.remove('min');
    })  


    // mobile navigation
    document.getElementById('openNav').onclick = function(){
        document.getElementById('closeNav').style.display = 'flex';
        nav.querySelector('ul').style.marginTop = '0';
        this.style.display = 'none';
        // nav.querySelector('ul').style.maxHeight = 'fit-content';
    }

    document.getElementById('closeNav').onclick = function(){
        document.getElementById('openNav').style.display = 'flex';
        nav.querySelector('ul').style.marginTop = '-100%';
        this.style.display = 'none';
        // nav.querySelector('ul').style.maxHeigh = '0';

    }

})();
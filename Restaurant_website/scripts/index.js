
const header = document.querySelector('.header');
const nav = header.querySelector('nav');


(function(){

    //dynamic adding the gap property
    Array.from( document.querySelectorAll('*') ).forEach( (element)=>{
        if(element.classList.contains('d-f') || element.classList.contains('grid4')){
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
    }

    document.getElementById('closeNav').onclick = function(){
        document.getElementById('openNav').style.display = 'flex';
        nav.querySelector('ul').style.marginTop = '-100%';
        this.style.display = 'none';
    }


    // scroll animation
    let animations = ['fade', 'faderight', 'fadeleft', 'fadetop', 'faderight', 'bounce'];
    let hasanim = document.querySelectorAll('.has-anim');
    
    hasanim.forEach((elem)=>{ observee(elem) })

    function observee(element){

        let tershold;
        tershold = element.hasAttribute('data-tershold') ? element.getAttribute('data-tershold') : 0.1;

        if( document.body.clientWidth <= 768 ){
            tershold = 0.1; // since the observer api has problems displaying animations on small screenss
        }

        const observer = new IntersectionObserver(element => {
            element.forEach(entry => { 

                if( entry.isIntersecting ){
                    addanim(entry.target);
                    observer.unobserve(entry.target)
                }
            })
          }, { threshold: tershold, root:null, rootMargin: "0px" })
        observer.observe(element)
    }

    // addanim( document.querySelector('#works') )
    function addanim(element){
        let animelements = [];

        // selecting those with animation class added in the 'has-anim' class element
        element.querySelectorAll('*').forEach( (item)=>{
            animations.forEach( (anim)=>{
                if(item.classList.contains(anim)){
                    animelements.push(item)
                }
            } )
        } )

        //filtering those with multiple child animations and single animations
        animelements.forEach( (elem)=>{

            if( elem.classList.contains('anim-child') ){

                let parentAnim = elem.closest('.has-anim-child');
                parentAnim.querySelectorAll('.anim-child').forEach((item, index)=>{

                    let animation;
                    animations.forEach( (anim)=>{
                        if(elem.classList.contains(anim)){
                            animation = anim;
                        }
                    } )

                    item.style.setProperty('animation-name', `${animation}`)
                    item.style.setProperty('animation-duration', '1s')
                    item.style.setProperty('animation-delay', `${index * 0.5}s`)
                    item.style.setProperty('animation-timing-function', 'linear')
                })

            }else{
                let animation;

                animations.forEach( (anim)=>{
                    if(elem.classList.contains(anim)){
                        animation = anim;
                    }
                } )

                elem.style.setProperty('animation-name', `${animation}`)
                elem.style.setProperty('animation-duration', '1s')
                elem.style.setProperty('animation-timing-function', 'linear')
            }
        } )
    }

})();


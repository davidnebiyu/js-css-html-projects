

const themeInput = document.getElementsByName('theme')[0];
const settings = document.querySelector('.setting')
const setticon = settings.querySelector('.icon') 

class Ui{

    static initialFuns(){

        // load those initial setttings on load
        (function loadInitial(){

            if( localStorage.getItem('dgprof1') ){

                let obj = JSON.parse(localStorage.getItem('dgprof1'));

                obj.prefTheme !== null ? document.body.setAttribute('data-theme', obj.prefTheme) : document.body.setAttribute('data-theme', 'light')
                obj.prefColor !== null ? document.body.style.setProperty('--clr1', obj.prefColor) : document.body.style.setProperty('--clr1', '#ec1839');

            }else{
                let obj = {"prefTheme":null,"prefColor":null};
                localStorage.setItem('dgprof1', JSON.stringify(obj));
            }

        })();

        // change the theme
        themeInput.addEventListener('change', ()=>{
        
            document.body.getAttribute('data-theme') == 'light' ? document.body.setAttribute('data-theme', 'dark') : document.body.setAttribute('data-theme', 'light'); 
            
            let obj = JSON.parse(localStorage.getItem('dgprof1'));
            obj.prefTheme = document.body.getAttribute('data-theme');
            localStorage.setItem('dgprof1', JSON.stringify(obj));

        })


        // change color theme
        settings.querySelectorAll('.textclr button').forEach( (clr)=>{
            clr.addEventListener('click', ()=>{
                document.body.style.setProperty('--clr1', clr.style.backgroundColor);
            
            let obj = JSON.parse(localStorage.getItem('dgprof1'));
            obj.prefColor = clr.style.backgroundColor;
            localStorage.setItem('dgprof1', JSON.stringify(obj));

            });
        } )


        // display sections
        dispSection('about');

        document.querySelectorAll('nav a').forEach(element => {
            element.addEventListener('click', ()=>{
                dispSection(element.getAttribute('data-link'))
            })          
            
        });

        function dispSection(section){
            
            let pageexist = Array.from(document.querySelectorAll('section')).some(element => {
                return element.classList.contains(section);          
            });
            
            if(pageexist){

                document.querySelectorAll('nav a').forEach(element => {
                    element.classList.remove('active');
                });

                if( window.innerWidth <= 768 ){
                    document.getElementById('closeNav').click()
                }

                Array.from(document.querySelectorAll('nav a')).find(element => {
                    return element.getAttribute('data-link') == section
                }).classList.add('active');

                document.querySelectorAll('section').forEach(element => {
                    element.style.display = 'none';               
                });
                if( document.querySelector(`section.${section}`).classList.contains('d-f') ){
                    document.querySelector(`section.${section}`).style.setProperty('display', 'flex');
                }else{
                    document.querySelector(`section.${section}`).style.setProperty('display', 'block');
                }
            }
        }

        
        // toggle settings display
        let settRight = window.getComputedStyle(settings).getPropertyValue('right');

        settRight == '0px' ? settings.style.setProperty('right', `-${settings.offsetWidth}px`) : settings.style.setProperty('right', `0px`)

        setticon.addEventListener('click', ()=>{
        
            let settRight = window.getComputedStyle(settings).getPropertyValue('right');
            settRight == '0px' ? settings.style.setProperty('right', `-${settings.offsetWidth}px`) : settings.style.setProperty('right', `0px`)
            
        })


        // navigation toggle
        document.getElementById('openNav').addEventListener('click', ()=>{
            document.querySelector('header').style.setProperty('left', 0)
        })

        document.getElementById('closeNav').addEventListener('click', ()=>{
            document.querySelector('header').style.setProperty('left', '-100%')
        })

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

    }


}

Ui.initialFuns()
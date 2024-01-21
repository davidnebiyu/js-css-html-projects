

const themeInput = document.getElementsByName('theme')[0];
const settings = document.querySelector('.setting')
const setticon = settings.querySelector('.icon') 
const eachCatgory = document.querySelector('.eachCatagory');
const modal = document.querySelector('#modal');
const modalCont = modal.querySelector('#modalCont');
let imgCont;


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
        dispSection('portfolio');

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


        // myWorks modal and navigation
        let myworkarr = {
            webdesign:['item1', 'item2', 'item4'],
            websites:['item5', 'item6'],
            photo:['item3', 'item7']
        }
            // display the images on each catagory
        let catagoryLinks = document.querySelectorAll('.myworks .catagory > ul > li');
        catagoryLinks.forEach((link)=>{
            link.addEventListener('click', function(){
                catagoryLinks.forEach((link)=>{link.classList.remove('active')})
                link.classList.add('active')

                let catagory = this.getAttribute('data-catg');
                workDisp(catagory)
            })
        })

        // get catagory of work images
        function getCatagory(value){
            let index = undefined;

            for (let catag in myworkarr) {
    
                for(let i=0; i < myworkarr[catag].length; i++){
                    if(value === myworkarr[catag][i]){
                        index = catag;
                        break;
                    }
                }
            }

            switch(index){
                case 'websites': index =  'Web Sites';break;
                case 'webdesign': index =  'Web Design';break;
                case 'photo': index =  'Photography';break;
            }

            return index;
        }

        workDisp('all')
        function workDisp(catagory){

            eachCatgory.innerHTML = '';   

            if( catagory == 'all' ){

                for( let catag in myworkarr ){
                    myworkarr[catag].forEach((item)=>{

                        eachCatgory.innerHTML += `                        <div class="imgCont">
                        <div class="imgoverlay"> </div>
                        <img src="images/${item}.png" alt="">
                        <div class="imgdesc d-f j-c a-c head3"> <p> ${getCatagory(item)} </p> </div>
                        </div>`
    
                    })
                }

            }else{
                myworkarr[catagory].forEach((item)=>{

                    eachCatgory.innerHTML += `                        <div class="imgCont">
                    <div class="imgoverlay"> </div>
                    <img src="images/${item}.png" alt="">
                    <div class="imgdesc d-f j-c a-c head3"> <p> ${getCatagory(item)} </p> </div>
                    </div>`

                })
            }

            imgCont = document.querySelectorAll('.myworks .imgCont');            
           
            let workImageIndex;
            // work images click
            imgCont.forEach( (cont, index)=>{
                cont.addEventListener('click', function(){
                    modal.style.setProperty('display', 'block');
                    modal.style.setProperty('transform', 'scale(1)');
            
                    modalCont.innerHTML += `<div id="prevModal"><i class='fas fa-angle-left'></i></div>`
                    modalCont.innerHTML += `<div id="nextModal"><i class='fas fa-angle-right'></i></div>`
    
                    let img = document.createElement('img')
                    img.src = this.querySelector('img').src
                    modalCont.appendChild(img)
                    
                    workImageIndex = index;

                })
            } )

            // navigate work images
            modal.addEventListener('click', (e)=>{

                if( e.target ==  modal.querySelector('#prevModal i') || e.target ==  modal.querySelector('#prevModal') ){
                    workImageIndex-=1;
                    navImg(workImageIndex)
                } else if( e.target ==  modal.querySelector('#nextModal i') || e.target ==  modal.querySelector('#nextModal') ){
                    workImageIndex+=1;
                    navImg(workImageIndex)
                }

            })

            function navImg(index){
                if( index < 0 ){
                    workImageIndex = 0
                }else if( index > imgCont.length - 1 ){
                    workImageIndex = imgCont.length - 1;
                }

                modalCont.querySelector('img').src = imgCont[index].querySelector('img').src;
            }

        }
        
        

        // close the modmal
        document.getElementById('closeModal').addEventListener('click', ()=>{
            modal.style.setProperty('transform', 'scale(0)');
            modal.style.setProperty('display', 'none');
            modalCont.innerHTML = '';
        })

    }


}

Ui.initialFuns()


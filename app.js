//home-page features
const chevron_right = document.querySelector(".right_icon");
const chevron_left = document.querySelector(".left_icon");
const start_exam_btn = document.querySelector("#start_exam");
const initial_pic = document.querySelector(".main img");
//home-page event listners
     //chevron buttons
let i = 1;
if(initial_pic)
  initial_pic.setAttribute('src', './pics/pic1.jpg');
  //update pic function 
  function updatePic(){
    initial_pic.setAttribute('src', `./pics/pic${i}.jpg`);
    chevron_left.disabled = (i === 1);
    updateDots();
  }
  //update Dots function 
  function updateDots(){
    document.querySelector('.dots').querySelectorAll("span circle").forEach(element => {
      element.classList.remove('active_dot');
    });
    document.querySelector(`#dot-${i} circle`).classList.add('active_dot');
  }

    chevron_right.addEventListener("click", ()=>{
         if(i >= 1 && i < 3){
            i++;
         }
         else{
            i = 1;
         }
         updatePic();
    });
    chevron_left.addEventListener("click", ()=>{
      if(i > 1){
        i--;
      }
      updatePic();
    });

    //startExam Btn 

    start_exam_btn.addEventListener("click", ()=>{
      window.location.href = './exam_page.html';
    });

   





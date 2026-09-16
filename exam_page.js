//exam_page parts
   const side_bar = document.querySelector("div.side-bar");
   const menu_btn = document.querySelector("li.menu");
   const next_btn = document.querySelector(".next");
   const submit_btn = document.querySelector(".submit");
   const choices = document.querySelector('#choices');  
//exam-section parts
   const question_text = document.querySelector('.exam_box #question');
   const choice_a = document.querySelector('#choice_a .answer');
   const choice_b = document.querySelector('#choice_b .answer');
   const choice_c = document.querySelector('#choice_c .answer');
   const choice_d = document.querySelector('#choice_d .answer');
//answer array
   let answer_array =[];
   
//side-bar togle
   menu_btn.addEventListener('click',()=>{
    side_bar.classList.toggle('active');
   });
//choosing list from side bar
   document.querySelector('.questions').addEventListener('click',(e)=>{
    const choose = e.target.closest("li");
    if(!choose) return;
    document.querySelectorAll('.questions li').forEach((element)=>{
        element.classList.remove("active");
    })
    choose.classList.add('active');
    const list_number = choose.querySelector('span').textContent
      question_number_new = Number(list_number);
      updateExamSection();
      checkIf();
   })
//choosing answer from exam-section
  choices.addEventListener('click',(e)=>{
   const answer = e.target.closest('li');
   if(!answer) return;
   document.querySelectorAll('#choices li').forEach((e)=>{
      e.classList.remove('active');
   })
   answer.classList.add('active');
  });
//data processsing and getting questions
  async function getData(){
   const response = await fetch('./data/data.json');
   const data = response.json();
   return data;
  }
//use that data to make the examp_box
let question_number_new = 1;
window.addEventListener("DOMContentLoaded",updateExamSection);
async function updateExamSection(){
   const data_object = await getData();
   //updating the card
   let question_number_input = question_number_new-1;
  if(question_number_new <= 11){
    question_text.textContent = data_object[question_number_input].question;
    choice_a.textContent = data_object[question_number_input].A;
    choice_b.textContent = data_object[question_number_input].B;
    choice_c.textContent = data_object[question_number_input].C;
    choice_d.textContent = data_object[question_number_input].D;
  }
  else{
   window.location.href = 'google.com';
  }
  //console.log(data_object[question_number_input].question_number);
  
  return data_object[question_number_input].question_number;
}
//changing and updating questions
let btn_disabled = false;
  async function  checkIf(){
    let stage =  await updateExamSection();
    if(stage == 10){
      next_btn.setAttribute('style', 'display:none');
      btn_disabled = true;
    }
    if(btn_disabled && stage != 10){
      next_btn.removeAttribute('style');
    }
   }

   async function record_answer(){
     const data_object = await getData();
     let stage = await updateExamSection();
     stage--;
     const current_exam = data_object[stage-1];
     const answer = document.querySelector("#choices li.active").querySelector('.hidden').textContent;
     current_exam.selected = answer;
     const exisiting = answer_array.find(element => element.question_number == stage) ;
     if(exisiting){
        answer_array = answer_array.filter(items => items.question_number !== stage);
        answer_array.push(current_exam);
     }
     else{
       answer_array.push(current_exam);
     }
     document.querySelectorAll('#choices li').forEach((e)=>{
      e.classList.remove('active');
      })
    //  console.log(current_exam);
    //  console.log(answer_array);
    //  console.log(answer_array.length);
    //  console.log(stage);
   }
 next_btn.addEventListener('click', ()=>{
      record_answer();
      question_number_new++;
       updateExamSection();
       checkIf();
 })
 let result = 0;
 submit_btn.addEventListener('click', async ()=>{
    const data_object = await getData();
    const stage = 10;
    const current_exam = data_object[stage-1];
    const answer = document.querySelector("#choices li.active").querySelector('.hidden').textContent;
    if (!answer) {
      alert('Please select an answer before submitting.');
      return;
    }
    current_exam.selected = answer;
     const exisiting = answer_array.find(element => element.question_number == stage) ;
     if(exisiting){
       answer_array = answer_array.filter(items => items.question_number !== stage);
        answer_array.push(current_exam);
     }
     else{
       answer_array.push(current_exam);
     }
     document.querySelectorAll('#choices li').forEach((e)=>{
      e.classList.remove('active');
      })
 });
 submit_btn.addEventListener('click',calculate_result);
 // calculate result
 function calculate_result(){
  console.log(answer_array);
  answer_array.forEach((item)=>{
     if(item.answer === item.selected){
       result++;
     }
   })
   localStorage.setItem('total_q',`${answer_array.length}`);
   localStorage.setItem('result', result);
   window.location.href= './result.html';
 }



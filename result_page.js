document.addEventListener("DOMContentLoaded",()=>{
  const result = localStorage.getItem('result');
  const total = localStorage.getItem('total_q');
  document.querySelector('.result_showing').textContent = `${result}/${total}`;
})
document.querySelector('.done_erase').addEventListener('click', ()=>{
    localStorage.clear();
    window.location.href = './index.html'
})
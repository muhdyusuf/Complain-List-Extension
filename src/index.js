import html2pdf from "html2pdf.js";


  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const {noLog}=params

  try {
    Object.keys(params).map(param=>{
      if(params[param]){
          document.getElementById(param).innerText=params[param]
        }      
      
      else{
        return
      }
    })
  } catch (error) {
    console.log(error.message)
  }

  const element=document.querySelector("#element")
  var opt = {
    margin:       0.3,
    filename:  noLog? `${noLog}.pdf` : 'jobsheet.pdf',
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  { scale: 4 },
    jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
  };
   
  
  html2pdf().from(element).set(opt).save()
  console.log(params)
  








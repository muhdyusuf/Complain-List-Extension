import html2pdf from "html2pdf.js";


  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const {noLog}=params

  document.title=noLog

  const DATA_ID=["nama","noLog","lokasi","noTel","masaLapor","tahapKerosakan","status","masalah","catatan","nama2","tagId","model","nosiri","noKewpa","perincianMasalah","tindakanpembaikan","catatan2","irt","ort","prt"]

  reset()
  
  const generatePdf_btn=document.getElementById("generatePdf")

  function generatePdf(){
    const element=document.querySelector("#page1")
    var opt = {
      margin:       0.4,
      filename:  noLog? `${noLog}.pdf` : 'jobsheet.pdf',
      image:        { type: 'jpeg', quality: 5 },
      html2canvas:  { scale: 5 },
      jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' }
    };
    
    
    html2pdf().from(element).set(opt).save()

  }

  generatePdf_btn.addEventListener("click",generatePdf)

  function editData(){
    generatePdf_btn.disabled=true
    reset_btn.disabled=true
    const edit_btn=document.getElementById("edit")
    const save_btn=document.createElement("button")
    save_btn.innerText="save"
    save_btn.setAttribute("id","save")
    save_btn.onclick=saveData
    save_btn.classList.add("btn","btn-info")

    edit_btn.parentNode.replaceChild(save_btn,edit_btn)

    try {
      // Object.keys(params).map(param=>{
      //   if(params[param]){
      //       document.getElementById(param).innerText=""
      //     }      
        
      //   else{
      //     return
      //   }
      // })

      DATA_ID.map(e=>{
        const input=document.createElement("input")
        input.classList.add("input-group","w-100")
        input.setAttribute("type","text")
        const text=document.getElementById(e).innerText
        input.value=text?text:""
        document.getElementById(e).innerText=""
        document.getElementById(e).appendChild(input)
      })
    } catch (error) {
      console.log(error.message)
    }
    
  }

  const edit_btn=document.getElementById("edit")

  edit_btn.addEventListener("click",editData)


  function saveData(){
    try {
      DATA_ID.map(e=>{
        let input=document.querySelector(`#${e} input`)
        const inputVal=input.value
        document.getElementById(e).innerText=inputVal
        input.remove()
        
      })
      
    } catch (error) {
      console.log(error.message)
    }
    reset_btn.disabled=false
    generatePdf_btn.disabled=false
    const save_btn=document.getElementById("save")
    const edit_btn=document.createElement("button")
    edit_btn.innerText="edit"
    edit_btn.setAttribute("id","edit")
    edit_btn.classList.add("btn","btn-primary")
    edit_btn.onclick=editData

    save_btn.parentNode.replaceChild(edit_btn,save_btn)

  }

  function reset(){
    
    try {
      DATA_ID.map(key=>{
        if(params[key]){
            document.getElementById(key).innerText=params[key]
          }      
        else{
          document.getElementById(key).innerText=""
        }
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const reset_btn=document.getElementById("reset")
  reset_btn.addEventListener("click",reset)

  








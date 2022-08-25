(()=>{
    
    const target=document.querySelector(`body`)
   
    
    const observer = new MutationObserver(()=>{

        const row=document.querySelectorAll('tbody tr')
        if(row.length>=10){
            for(let i=1;i<=row.length;i++){
                const pdfbutton=document.createElement("button")
                pdfbutton.classList.add("pdf-btn")
                pdfbutton.innerText="generate pdf"
                const secondCol=document.querySelector(`tbody>tr:nth-child(${i})>td:nth-child(2)`)
                pdfbutton.onclick=()=>generatePdf(i)
                secondCol.appendChild(pdfbutton)
            }
            observer.disconnect()

        }

       
    })

    const config = { attributes: true, childList: true, subtree: true };

   console.log("hi")
    observer.observe(target,config)


  function generatePdf(row){

    const col2=(()=>{
        const data=document.querySelector(`tbody tr:nth-child(${row})>td:nth-child(2)`).innerText.split("\n")
        return {noLog:data[0],lokasi:data[3],}
    })()

    
    const col3=(()=>{
        const data=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(3)`).innerText.split("\n")
        let pejabat=data[2].replace("P : ","")
        let bimbit=data[3].replace("B : ","")
        const noTel=bimbit!==pejabat?`${pejabat} / ${bimbit}` : bimbit
    
        return {nama:data[0],noTel}
    })()
    
    
    const col4= (()=>{
        const data=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(4)`).innerText.split("\n")
        const tagId=(()=>{
            if(!data[0].match(/sdk\/0[0-6]\/[0-9]{3}/ig))return " "
            return data[0].match(/sdk\/0[0-6]\/[0-9]{3}/ig)
        })()
        return {tagId,catatan:data[1],masalah:data[2],perincianMasalah:data[2]}
    
    })()
    
    const col6=(()=>{
        const data=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6)>li`).innerText
        const irt=data.replace("IRT : ","").split("-")[0]
        let masaLapor=irt.split(",").splice(0,2).join("")
        
        return {irt,masaLapor}
    })()

    
    const data= Object.assign(col2,col3,col4,col6)

    const searchParams=new URLSearchParams(data).toString()

    chrome.runtime.sendMessage({redirect:`http://192.168.82.103:54782/index.html?${searchParams}`});

    
  }
        
      
   

   

    
   

   
    
    
    

    // const data={nolog,nama,lokasi,notel,masalah,tagid,catatan,perincianMasalah}



    
   
 })()



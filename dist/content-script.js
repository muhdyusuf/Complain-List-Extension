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
        return {noLog:data[0],lokasi:data[3],status:"Dalam proses",tahapKerosakan:3}
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
        function getTime(text){
            let [date,time]=text.split("-")
            date=date.split(",").splice(0,2).join("").replace(/(P|O|I)rt\s:\s/ig,"")
            time=time.match(/\d\d:\d\d(a|p)m/ig)[0]
            return [date,time]
        }

        const irtText=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6)>li`).innerText
        const ortText=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6)>li:nth-of-type(2)`).innerText
        const prtText=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6)>li:nth-of-type(3)`).innerText


        const irt=getTime(irtText).join(" @ ")
        const masaLapor=getTime(irtText).slice(0,1).join("")+" @ "

        

        // const irt=date+" @ "+time
        // const masaLapor=date + " @"

        let [ort,prt,tindakanpembaikan]=["","",""]

        if(window.location.href==="http://www.syarikatjnl.com/jknshelpdesk/complaint_list.php?archived=1"){
            ort=getTime(ortText).join(" @ ")
            prt=getTime(prtText).join(" @ ")
            tindakanpembaikan=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6)>li:nth-last-child(1)`).innerText.split("\n")
            tindakanpembaikan=tindakanpembaikan.slice(3,tindakanpembaikan.length-1).join(" ")

        }

        
        return {irt,masaLapor,ort,prt,tindakanpembaikan}
    })()

    
    const data= Object.assign(col2,col3,col4,col6)

    const searchParams=new URLSearchParams(data).toString()

    chrome.runtime.sendMessage({redirect:`./index.html?${searchParams}`});

    
  }
        
 })()



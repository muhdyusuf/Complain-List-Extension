(()=>{
    
    const target=document.querySelector(`body`)
   
    
    const observer = new MutationObserver(()=>{

        const row=document.querySelectorAll('tbody tr')
        if(row.length>=10){
            for(let i=1;i<=row.length;i++){
                const pdfbutton=document.createElement("button")
                pdfbutton.classList.add("pdf-btn","mt-4")
                pdfbutton.innerText="generate pdf"
                const secondCol=document.querySelector(`tbody>tr:nth-child(${i})>td:nth-child(2)`)
                pdfbutton.onclick=()=>generatePdf(i<10?i:i<20?i-10:i-20)
                secondCol.appendChild(pdfbutton)
            }
            observer.disconnect()

        }

       
    })

    const config = { attributes: true, childList: true, subtree: true };

    observer.observe(target,config)


  function generatePdf(row){

    const col2=(()=>{
        let data
        try {
            data=document.querySelector(`tbody tr:nth-child(${row})>td:nth-child(2)`).innerText.split("\n")    
        } catch (error) {
            data=["","",""]
            
        }
        return {noLog:data[0],lokasi:data[3],status:"Dalam proses",tahapKerosakan:3}
        
    })()

    
    const col3=(()=>{
        let data
        try {
            data=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(3)`).innerText.split("\n")
            let pejabat=data[2].replace("P : ","")
            pejabat=pejabat=="P : "|| ""
            let bimbit=data[3].replace("B : ","")
            const noTel=bimbit!==pejabat && pejabat?`${pejabat} / ${bimbit}` : bimbit
         
            data.push(noTel)
        } catch (error) {
            data=['','']
        }
    
        return {nama:data[0],noTel:data[data.length-1]}
    })()
    
    
    const col4= (()=>{
        let data=['','','']
        let tagId
        try {
            data=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(4)`).innerText.split("\n")
            tagId=(()=>{
            if(!data)return("")
            if(!data[0].match(/(sdk|kk|kdt|kng)\/0[0-6]\/[0-9]{3,4}/ig))return ("")
            return data[0].match(/(sdk|kk|kdt|kng)\/0[0-6]\/[0-9]{3,4}/ig)
           })()
        } catch (error) {
            data=['','','']
            tagId=''
            
        }

        return {tagId,catatan:data[1],masalah:data[2],perincianMasalah:data[2]}
    
    })()
    
    const col6=(()=>{
        function getTime(text){
            console.log((text,row))
            let [date,time]=text.split("-")
            let responseTime=date.split(",")[2]
            date=date.split(",").splice(0,2).join("").replace(/(P|O|I)rt\s:\s/ig,"")? (date.split(",").splice(0,2).join("").replace(/(P|O|I)rt\s:\s/ig,"")):""
            
            time=time.match(/\d\d:\d\d(a|p)m/ig)[0]?time.match(/\d\d:\d\d(a|p)m/ig)[0]:""
            return {date,time,responseTime}
        }

  
       

     
        // const irt=date+" @ "+time
        // const masaLapor=date + " @"

        let [irt,masaLapor,ort,prt,tindakanpembaikan]=["","","","",""]

        try {

            const irtText=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6) li`) && document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6) li`).innerText

       
            const {date,time,responseTime}=getTime(irtText)

            irt=`${date} @ ${time}`
            masaLapor=`${date} @ ${responseTime}`

          

            if(window.location.href==="http://www.syarikatjnl.com/jknshelpdesk/complaint_list.php?archived=1"){
            const ortText=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6)>li:nth-of-type(2)`).innerText
            const prtText=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6)>li:nth-of-type(3)`).innerText
            ort=getTime(ortText).join(" @ ")
            prt=getTime(prtText).join(" @ ")
            tindakanpembaikan=document.querySelector(`tbody>tr:nth-child(${row})>td:nth-child(6)>li:nth-last-child(1)`).innerText.split("\n")
            tindakanpembaikan=tindakanpembaikan.slice(3,tindakanpembaikan.length-1).join(" ")

            }

        } catch (error) {
            console.log(error)
            
        }
        
        return {irt:irt?irt:"",masaLapor,ort,prt,tindakanpembaikan}
    })()

    
    const data= Object.assign(col2,col3,col4,col6)
    console.log(new URLSearchParams(data))
    const searchParams=new URLSearchParams(data)
    chrome.runtime.sendMessage({redirect:`./index.html?${searchParams}`});

    
  }
        
 })()



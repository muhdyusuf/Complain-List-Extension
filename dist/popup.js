let changeColor = document.getElementById("changeColor")
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});



// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
  const data={
    nama:"hioio",
    nolog:"adsda",
    masalah:"banyak",
    lokasi:"sini ranau"
  }

  const searchParams=new URLSearchParams(data).toString()

  window.location.replace(`https://glistening-bavarois-488c1b.netlify.app?${searchParams}`)

  // const link=document.createElement('a')
  // link.setAttribute("href",`https://glistening-bavarois-488c1b.netlify.app?${searchParams}`)

}
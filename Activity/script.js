let addbtnContainer=document.querySelector(".add-sheet_container");

let sheetList=document.querySelector(".sheets-list");

let first_sheets=document.querySelector(".sheet");

first_sheets.addEventListener("click",handleActivesheet);

addbtnContainer.addEventListener("click",function(){

    let sheetsArr=document.querySelectorAll(".sheet");
    let lastSheetEle=sheetsArr[sheetsArr.length-1];
    let idx=lastSheetEle.getAttribute("sheetIdx");
    idx=Number(idx);
    let NewSheet=document.createElement("div");
    NewSheet.setAttribute("class","sheet");
    NewSheet.setAttribute("sheetIdx",idx+1);
    NewSheet.innerText=`Sheet ${idx+1}`;

    sheetList.appendChild(NewSheet);
    NewSheet.addEventListener("click",handleActivesheet);
})


function handleActivesheet(e){
    let MySheet=e.currentTarget;
    let sheetArr=document.querySelectorAll(".sheet");
    sheetArr.forEach(function(sheet){
        sheet.classList.remove("active-sheet");

    })

    if(!MySheet.classList[1]){
        MySheet.classList.add("active-sheet");
    }
}
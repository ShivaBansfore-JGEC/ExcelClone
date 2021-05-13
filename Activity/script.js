let addbtnContainer=document.querySelector(".add-sheet_container");

let sheetList=document.querySelector(".sheets-list");

let first_sheets=document.querySelector(".sheet");


let AllCells=document.querySelectorAll(".grid .col");

let addressBox=document.querySelector(".address-box");

first_sheets.addEventListener("click",handleActivesheet);


let formula_input=document.querySelector(".formula-box");

//font btn

let fontBtn=document.querySelector(".font-size");

//finding alignment btn

let leftBtn=document.querySelector(".left");
let centerBtn=document.querySelector(".center");
let rightBtn=document.querySelector(".right");

let fontFamily=document.querySelector(".font-family");

let boldElem=document.querySelector(".bold");
let italicElem=document.querySelector(".italic");
let underlineElem=document.querySelector(".underline");


//creating sheets and  add functionality 
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

// *********************************

//setting cell addrss to adressbar on click of a shell 
for(let i=0;i<AllCells.length;i++){
    AllCells[i].addEventListener("click",function handleCells(){
       let rid=Number(AllCells[i].getAttribute("rid"));
       let cid=Number(AllCells[i].getAttribute("cid"));

       let rowAdd=rid+1;
       let colAdd=String.fromCharCode(65+cid);
       let address=colAdd+rowAdd;;
       addressBox.value=address;
      // AllCells[i].style.border="2px solid lightgreen";


      // setting formatting of each shell

      let cellObject=sheetDB[rid][cid];

      //setting bold property
      if(cellObject.bold==true){
            boldElem.classList.add("active-btn");
      }else{
            boldElem.classList.remove("active-btn");
      }

      //now setting italic property 
      if(cellObject.italic==true){
          italicElem.classList.add("active-btn");
      }else{
        italicElem.classList.remove("active-btn");
      }

      


    })
}

//initial shell click emulate 
AllCells[0].click();

//*************************** Formatting Code **************************

leftBtn.addEventListener("click",function(){
    let address=addressBox.value;
    let { rid, cid }=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="left";
})

centerBtn.addEventListener("click",function(){
    let address=addressBox.value;
    let { rid, cid }=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="center";
})

rightBtn.addEventListener("click",function(){
    let address=addressBox.value;
    let { rid, cid }=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign="right";
})

//working for font btn

fontBtn.addEventListener("change",function(){
    let fontSize=fontBtn.value;
    let address=addressBox.value;
    let { rid, cid }=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    console.log(fontSize);
    cell.style.fontSize=fontSize+"px";

})

fontFamily.addEventListener("change",function(){
    let font_family=fontFamily.value;
    let address=addressBox.value;
    let { rid, cid }=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.fontFamily=font_family;
})



boldElem.addEventListener("click",function(){

    let isActive=boldElem.classList.contains("active-btn");
    let address=addressBox.value;
    let { rid, cid }=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cellObject=sheetDB[rid][cid];
    if(isActive==false){
        cell.style.fontWeight="bold";
        boldElem.classList.add("active-btn");
        cellObject.bold=true;

    }else{
        cell.style.fontWeight="normal";
        boldElem.classList.remove("active-btn");
        cellObject.bold=false;
    }
    console.log(sheetDB);
    
})

italicElem.addEventListener("click",function(){

    let isActive=italicElem.classList.contains("active-btn");
    let address=addressBox.value;
    let { rid, cid }=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

    cellObject=sheetDB[rid][cid];

    if(isActive==false){
        cell.style.fontStyle="italic";
        italicElem.classList.add("active-btn");
        cellObject.italic=true;
    }else{
        cell.style.fontStyle="normal";
        italicElem.classList.remove("active-btn");
        cellObject.italic=false;
    }
    
})


underlineElem.addEventListener("click",function(){

    let isActive=underlineElem.classList.contains("active-btn");
    let address=addressBox.value;
    let { rid, cid }=getRidCidFromAddress(address);
    let cell=document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

    if(isActive==false){
        cell.style.textDecoration="underline";
        underlineElem.classList.add("active-btn");
    }else{
        cell.style.textDecoration="none";
        underlineElem.classList.remove("active-btn");
    }
    
})

//**********************************************************************


//***************** Helper fun *****************/

function getRidCidFromAddress(address){
    let cellColAdr=address.charCodeAt(0);
    let cellRowAdr=address.slice(1);

    let cid=cellColAdr-65;
    let rid=Number(cellRowAdr)-1;
    return {rid,cid};
}





//************ FORMULA CODE **************/


formula_input.addEventListener("keydown",function(e){
    if(e.key=="Enter" && formula_input.value!=""){
        let formula=formula_input.value;

        //get current cell
        let value=evaluate(formula);

        //set the UI
        setUI(value);

        //set value and formula in database
        setContentInDb(value,formula);
    }
})


function evaluate(formula){

    // "( A1 + A2 )"
    let formulaToken=formula.split(" ");
}



//***************** Helper fun *****************/

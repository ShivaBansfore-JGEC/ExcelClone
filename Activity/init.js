
    //creating left coloumn 
    let leftCol=document.querySelector(".left-col");
    let str="";
    for(let i=0;i<100;i++){
        str+=`<div class='left-col-box'> ${i+1}</div>`;
    }

    leftCol.innerHTML=str;

    //*********************************

    //now creating top row
    let topRow=document.querySelector(".top-row");
    str="";
    for(let i=0;i<26;i++){
        str+=`<div class='col'> ${String.fromCharCode(65+i)}</div>`;
    }

    topRow.innerHTML=str;

    // ******************************


    //now constructin grid area of sheet

    let Grid=document.querySelector(".grid");
    //2d matrix 
    str="";
    for(let i=0;i<100;i++){
        str+=`<div class="row" >`;
        for(let j=0;j<26;j++){
            str+=`<div class='col' rid=${i} cid=${j} contenteditable="true" ></div>`;
        }
        str+=`</div>`;
    }

    Grid.innerHTML=str;

    //***********************************


    //creating 2d array


    //console.log(sheetDB);
    let workSheetDB=[];
    function initCurrentSheetDb(){
        let sheetDB=[];
    
        for(let i=0;i<100;i++){
            let row=[]
            for(let j=0;j<26;j++){
                let cell={
                    bold:false,
                    italic:false,
                    underline:false,
                    fontFamily:"Arial",
                    fontSize:"10",
                    halign:"default",
                    value:""
                }
    
                row.push(cell);
            }
            sheetDB.push(row);
        }
    
        workSheetDB.push(sheetDB);
        console.log(workSheetDB);
    }

initCurrentSheetDb();
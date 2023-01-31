function createHtml(){ // this function creates the table where the questions will be organized

    var myNode = document.querySelector("#here");
    var createTable = document.createElement("TABLE");    
    
    var j = 0;
    for(var k=0; k< 4; k++){   // k rows           k x i = number of questions. The ideal is to have a number of questions multiple of 5
        var createTR1 = document.createElement("TR");       

        for(var i=0; i< 5; i++){ //i questions per one row               
            var createTD = document.createElement("TD");
            createTD.setAttribute("id","Q");
            
            var createDiv = document.createElement("DIV");
            createDiv.setAttribute("id","Q"+(j+i));
            createTD.appendChild(createDiv);

            createTR1.appendChild(createTD);
        }
        j = j +5;        

        createTable.appendChild(createTR1);
    } //k

    myNode.appendChild(createTable);
}





function generatePage(questionsNum, rows, digits, regrouping){ // this function is triggered on the html page
   
    
    for (var i=0; i< questionsNum; i++){
        generateQuiz("#Q"+i, rows, digits, regrouping, true);
        
    }

    document.getElementById("myFooter").style.pageBreakAfter = "always";

    myTable = document.getElementsByTagName("table")[0];
    myClone = myTable.cloneNode(true);
    myClone.setAttribute("id","tableClone");
    document.body.appendChild(myClone);

    deleteAnswer(rows);
}


function deleteAnswer(rows){

        var j = 0; // this is the row of the answer page   0 is the first row
    for (var i=1; i< 26; i++){ // i is the order of the questions

        var cloneTable = document.getElementById("tableClone");
        //var tbody = cloneTable.getElementsByTagName("tbody")[0]; 
        var tr    = cloneTable.getElementsByTagName("tr")[i*(rows+2)+j];//  row of questions
        var td    = tr.getElementsByTagName("td")[0].innerHTML = "     "; 

        if(i == 5){  // every 5 questions we change the row
            j = 1;
        } else if (i == 10){
            j = 2;
        }else if (i == 15){
            j = 3;
        } else if (i == 20){
            j = 4;
        }

        
        
    }


    // var cloneTable = document.getElementById("tableClone");
    // //var tbody = cloneTable.getElementsByTagName("tbody")[0]; 
    // var tr    = cloneTable.getElementsByTagName("tr")[4];

    // console.log(tr);


}




function generateQuiz(tagID, rows, digits, regrouping, answer){

    var rows = rows;
    var digits = digits;
    var regrouping = regrouping;
    var answer = answer;
    var tagID = tagID;
   
    var selectedNum = selectNumbers(rows,digits,regrouping,tagID);  
    createTable(rows,digits, tagID); // creating a table
    populateTable(selectedNum, rows, digits, answer,tagID); //populating the table
    addSign("+",rows,tagID);  // adding the + sign

  
    //DEBUG
    //console.log(selectedNum);
    //console.log("------------------------------");
    //var resultList = resultSum(selectedNum,tagID);
    //console.log(resultList);
   
} // end generateQuiz()


function addSign(sign, rows,tagID){

    var addsign = sign;
    var rowsNum = rows;
    var tagID = tagID;

    for(var i=0; i< rowsNum;i++){

        document.getElementById(tagID+"myElement"+i+"0").style.textAlign = "right";
        document.getElementById(tagID+"myElement"+i+"0").style.paddingRight = "5px";

        if(i != rowsNum-1){ 

            document.getElementById(tagID+"myElement"+i+"0").style.width = "30px";
            

        } else { // last row, not counting with the answer row
            
            var numText = document.getElementById(tagID+"myElement"+i+"0").innerHTML;
            document.getElementById(tagID+"myElement"+i+"0").innerHTML = sign+" "+numText;
            

        }
    }
    
    


}

function populateTable(numberSelected, rows,digits, answerUser,tagID){ // answerUser --> boolean - show answer or not?

    var selectedNum = numberSelected;
    var rowsNum = rows;
    var digitNum = digits;
    var answer = answerUser;
    var tagID = tagID;

    
    for(var i=0; i< selectedNum.length+1; i++){

        if(i == rowsNum){ // the last row
            
            document.getElementById(tagID+"last").setAttribute("colspan",digitNum);
            document.getElementById(tagID+"last").style.borderBottom = "1px solid #0000FF";
            
        } else {
            for (var j=0; j < digitNum; j++ ){
                var textElement = document.createTextNode(selectedNum[i][j]);
                document.getElementById(tagID+"myElement"+i+""+j).appendChild(textElement);
                document.getElementById(tagID+"myElement"+i+""+j).style.width = "15px";
                document.getElementById(tagID+"myElement"+i+""+j).style.fontFamily = "Verdana";
            }
        }

    }

    if(answer == true){
        var textElement = document.createTextNode(resultSum(selectedNum).join(""));
        document.getElementById(tagID+"answerTD").setAttribute("colspan",digitNum);
        document.getElementById(tagID+"answerTD").appendChild(textElement);
        document.getElementById(tagID+"answerTD").style.textAlign = "right";
        document.getElementById(tagID+"answerTD").style.letterSpacing = "10px";
        document.getElementById(tagID+"answerTD").style.fontFamily = "Verdana";
    }
}



function createTable(rows,digits,tagID){ // create a table for one question 
    var digitsNum = digits;
    var rowsNum = rows;  // rows +1 (row for the result)
    var answer = true;
    var tagID = tagID;
    var myNode = document.querySelector(tagID);

    var createTable = document.createElement("TABLE");
    createTable.setAttribute("id",tagID+"myTable");

    for(var i=0; i< rowsNum+1; i++){
        var createTR = document.createElement("TR");
        createTR.setAttribute("id",tagID+"myRow"+i);
        
        if(i != rowsNum) {
            
            for(var j=0; j< digitsNum; j++){
                var createTD = document.createElement("TD");
                createTD.setAttribute("id",tagID+"myElement"+i+""+j);
                
                createTR.appendChild(createTD);
            }
        } else {
                var createTD = document.createElement("TD");
                createTD.setAttribute("id",tagID+"last");
                createTR.appendChild(createTD);
        }
        

        createTable.appendChild(createTR);
    }

    
    if(answer == true){
        var answerTR = document.createElement("TR");
        answerTR.setAttribute("id",tagID+"answer");

        var createTD = document.createElement("TD");
        createTD.setAttribute("id",tagID+"answerTD");
        answerTR.appendChild(createTD);

            
        createTable.appendChild(answerTR);
    }



    
    myNode.appendChild(createTable);

}




function resultSum(listOfNumbers,tagID){ // this function sums the selected numbers. It returns one list.
 var list = listOfNumbers; 
 var rowsNum = list.length;
 var digitsNum = list[0].length;
 var listResult = new Array(digitsNum);
 var tagID = tagID;


for(var i = 0; i<digitsNum; i++){
    var sum = 0;
    for(var j=0; j<rowsNum; j++){
        sum += list[j][i];        
    }
    
    listResult[i]= sum;
} 
var carrier = 0;
var rest;
var newResult = [];
const reverseList = listResult.reverse();
for(var i=0; i<reverseList.length;i++){
    rest = reverseList[i];
    if(reverseList[i]>=10  && i!= reverseList.length-1 ){ 
        
        if(reverseList[i]==10){
            rest = 0;
        } else {
            rest = reverseList[i] - Math.trunc(reverseList[i]/10)*10;
        }
        
        
    }

   if(rest+carrier >= 10 && i!= reverseList.length-1){
    
    if(rest+carrier==10){
        newResult[i]= 0
        rest = 0;
    } else {
        newResult[i]= rest+carrier;
        rest = reverseList[i] - Math.trunc(reverseList[i]/10)*10;
    }
     
    


} else {
    newResult[i]= rest+carrier;
    carrier = 0;
   }

    if(reverseList[i]>=10){        
        carrier = Math.trunc(reverseList[i]/10);
    }

}


 return newResult.reverse();

} // end of resultSum



function selectNumbers(rows, digits, regrouping,tagID){ // true -> WITH regrouping, false -> NO regrouping, 
    var digitsNum = digits;
    var regroupingBool = regrouping;
    var rowsNum = rows;
    let resultRows = new Array(rowsNum);
    var tagID = tagID;

    
    
    if(regroupingBool == true){  //if the user wants more than 2 rows + with regrouping (true)
        for (var i=0; i<rowsNum; i++){ // for every row
            var oneRow = new Array(digitsNum);
            
            for(var j=0; j<oneRow.length; j++){ // for every digit
                let n = Math.floor((Math.random() * 10) + 1)-1; // whole number between 10 and 1 (minus 1)
                oneRow[j]=n;
            }
            
            resultRows[i]= oneRow;
            
                       
        }
       return resultRows ; // resultRows.lenght is the number of rows. Every row lenght is the number of digits
    }

    if(regroupingBool == false && rowsNum == 2){ // NO regrouping and only 2 rows
        var row0 = new Array(digitsNum);
        var row1 = new Array(digitsNum);

        for(var k=0;k<row0.length;k++){
            let n = Math.floor((Math.random() * 10) + 1)-1;
            row0[k] = n;
   
            if(regroupingBool  == false){
                if(n == 9){
                    row1[k]=0;
                } else {
                    var maxNum = 9-n;
                    let m = Math.floor((Math.random() * maxNum) + 1);
                    row1[k]=m;
                }            
            
            } else {
                let m = Math.floor((Math.random() * 10) + 1)-1;
                row1[k]=m;
            }

        }

        return [row0,row1];
    }
        

} // end selectNumbers

function generatePuzzle(){
   

    for(var i=0; i<4;i++){ //rows
        for(var j=0; j<4;j++){//coulmns
            document.getElementById("element"+i+""+j).innerHTML = "_";
        }
    }

  document.getElementById("puzzle1").setAttribute("border","1px solid");

    var rowsGenerated = generateRows();
    
    populateGrid(rowsGenerated)
    

    

    
    myTable = document.getElementsByTagName("table")[0];
    myClone = myTable.cloneNode(true);
    myClone.setAttribute("id","tableClone");
    document.body.appendChild(myClone);

    hideItems(7); // 7 hard
    //hideItems(6); // 6 medium - 6 is the number of hidden items. This gives the dificult of the puzzle
    // hideItems(5); //5 easy 
    //



} //end of generatePuzzle function

function hideItems(qty){
  var line;
  var column;


  var selectedPositions = [];
  
  var dataUnique = [0];


  while(dataUnique.length < qty){
    selectedPositions = [];

  for(var i=0; i<qty;i++){
    line = Math.floor((Math.random() * 4) + 0);
    column = Math.floor((Math.random() * 4) + 0);
    selectedPositions.push([line,column]);

    console.log(line+","+column);
          
  }

  dataUnique = selectedPositions.reduce(function (out, item) {
    return out.concat(out.filter(function (comp) {
      return item.toString() == comp.toString();
    }).length ? [] : [item])
  }, []);

  console.log(dataUnique);
  //console.log(dataUnique[0][0][1]);
  
  if(dataUnique.length == qty){

    for(var i=0; i<qty;i++){
      
        document.getElementById("element"+dataUnique[i][0]+""+dataUnique[i][1]).innerHTML = " ";
      
    }

   
  }
  
  


 } ;
} // end of hideItems

function populateGrid(rowsGenerated){
  for (var i = 0; i< 4; i++) {
    for(var j = 0; j< 4; j++){
      document.getElementById("element"+i+""+j).innerHTML = rowsGenerated[i][j];
      document.getElementById("element"+i+""+j).style.width = "40px";
      document.getElementById("element"+i+""+j).style.fontFamily = "Verdana";
      document.getElementById("element"+i+""+j).style.fontSize = "30px";
      document.getElementById("element"+i+""+j).style.textAlign = "center";
    }
    
  }
}


function generateRows(){

  var row0 = Array.from(myRandomInts(4, 4));
  var row1 = [1,4,2,3];
  var row2 = [0,0,0,0];
  var row3 = [0,0,0,0];
  var wrongPositioned = false;
  var j = 0;
  function checkArrays( arrA, arrB ){
  
      if(arrA.length !== arrB.length) return [false];
  
      for (var i = 0; i< arrA.length; i++) {
          if (arrA[i] === arrB[i]) {
             row1 = shuffleArray(arrB); 
             ;
             j = 1;
             break; 
  
          } 
      }
  
      if(j == 1){
        
        j = 0;
        if (checkArrays(row0,row1) != undefined){        
          checkArrays(row0,row1);
        }
      } else {
        return row1;
      }
      
  
  }
  
  if (checkArrays(row0,row1) != undefined){  
    checkArrays(row0,row1);
  } ;
  
  console.log("row0 ->"+ row0);
  console.log("row1 ->"+row1);
  
  var arrayNum;
  var k=0;
  do {
    for (var i = 0; i< 4; i++){
      arrayNum = [1,2,3,4];
  
      delete arrayNum[arrayNum.indexOf(row0[i])];
      delete arrayNum[arrayNum.indexOf(row1[i])];
      for(var j = 0; j< k; j++){
        delete arrayNum[arrayNum.indexOf(row2[i-1])];
      }
    k++;
    row2[i] = random_item(arrayNum.filter(Number));
    }
  } while(checkIfDuplicateExists(row2));
  
  //----------------------------------------------
  
  
  for (var i = 0; i< 4; i++){
    arrayNum = [1,2,3,4];
    delete arrayNum[arrayNum.indexOf(row0[i])];
    delete arrayNum[arrayNum.indexOf(row1[i])];
    delete arrayNum[arrayNum.indexOf(row2[i])];
    row3[i] = random_item(arrayNum.filter(Number));
  
  }
  
  
  console.log("row2 ->"+row2 );
  console.log("row3 ->"+row3);
  
  console.log("------------------");

  return [row0, row1, row2, row3];


} // end generateRows




function checkIfDuplicateExists(arr) {  // source:https://stackoverflow.com/questions/49215358/checking-for-duplicate-strings-in-javascript-array
  return new Set(arr).size !== arr.length
}

function random_item(items)
{
  
return items[Math.floor(Math.random()*items.length)];
     
}



function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
  
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));
                  
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
      
  return array;
}

function myRandomInts(quantity, max){ //source:https://mavtipi.medium.com/how-to-generate-unique-random-numbers-in-a-specified-range-in-javascript-80bf1a545ae7
    const set = new Set()
    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * max) + 1)
    }
    return set
  }

  
  

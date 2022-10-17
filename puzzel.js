var rows = 3;
var columns = 3;

var currTile;
var otherTile;

var turns = 0;

//var imgOrder = ["1","2","3","4","5","6","7","8","9"];
var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

window.onload = function() {
    for(let r=0; r < rows; r++){
        for(let c=0; c<columns; c++){
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";
            
            //DRAG FUNCTIONALITY
            //drag - loi keo. drop - tha
            tile.addEventListener("dragstart", dragStart);//click an image to drag---nhấp vào hình ảnh
            tile.addEventListener("dragover", dragOver);//moving image around whiled clicked---nhấp vào hình ảnh và di chuyển qua 1 ô khác
            tile.addEventListener("dragenter", dragEnter);//dragging image onto another one---kéo 1 hình ảnh lên một hình ảnh khác bạn đang nhập
            tile.addEventListener("dragleave", dragLeave);//dragged image leaving another image---ngược lại dời 1 hình ảnh khác
            tile.addEventListener("drop", dragDrop);//drag an image over another image, drop the image---kéo 1 hình ảnh qua 1 hình ảnh khác và thả chuột, thả hình ảnh
            tile.addEventListener("dragend", dragEnd);///another drap drop, swap the two tiles---hoán đổi 2 ô

            document.getElementById("board").append(tile);
        }
    }
}

function dragStart(){
    currTile = this; //this refers to the img tile being dragged
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){

}

function dragDrop(){
    otherTile = this; // this refers to the img tile bi=eing dropped on
}

function dragEnd(){
    if(!otherTile.src.includes("3.jpg")){
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;

    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if(isAdjacent){
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;
    }

    turns += 1;
    document.getElementById("turns").innerText = turns;
}
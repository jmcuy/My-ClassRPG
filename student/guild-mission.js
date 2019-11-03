

//DOING THIS BECAUSE I CANT ADD CSS TOO MUCH EFFORT

//INITIALIZE HIDDEN DIVS
let index_children = document.getElementById("index-parent").children;
for(let c = 0; c < index_children.length; c++){
    document.getElementById("index-parent").children[c].style = "display:none";
}

let tabs_parent = document.getElementById("tabs-parent");
tabs_parent.style = "border-bottom: 1px solid grey;width: 100%; overflow: hidden;height: 36px;";

let tabs_children = tabs_parent.children;
tabs_children[0].className = tabs_children[0].className + " active";
index_children[0].className += " active";
let tabs_style =" float: left; background: white; color: #777777; height: 31px; margin: 2px 8px 0; padding: 0 8px; cursor: pointer;";
for(let i = 0; i < tabs_children.length; i++){
    console.log(tabs_children[i]);
    tabs_children[i].style = tabs_style;
    tabs_children[i].addEventListener("click", function(){
        toggle_function(i);
    });
    if(tabs_children[i].className.includes("active") 
                && index_children[i].className.includes("active")){
        
        tabs_children[i].style = tabs_style + "color: #dd4b39;border-bottom: 3px solid #dd4b39;"
        index_children[i].style = "display:block";
    }
}


//THE MAGIC
setInterval(function(){
    document.getElementById("tabs-parent").getElementsByClassName("active")[0].style = tabs_style
    +  "color: #dd4b39;border-bottom: 3px solid #dd4b39;";
    document.getElementById("index-parent").getElementsByClassName("active")[0].style = "display:block;";
},0);




function toggle_function(index){
    document.getElementById("tabs-parent").getElementsByClassName("active")[0].style = tabs_style;
    document.getElementById("tabs-parent").getElementsByClassName("active")[0].className = "tab";
    document.getElementById("index-parent").getElementsByClassName("active")[0].style = "display:none;";
    document.getElementById("index-parent").getElementsByClassName("active")[0].className = "index";
    tabs_children[index].className += " active";
    index_children[index].className += " active";
    console.log(index)
    
}
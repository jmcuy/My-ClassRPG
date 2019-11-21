
// document.getElementById("access-key").style.display = "none";
let start = location.href.lastIndexOf("/");
let guild_course = location.href.substr(start + 1).replace(/[%]/g, " ");
let guild_key = guild_course.replace(/\s+/g, "").toLowerCase() + "id";

document.getElementById("course-code").innerHTML = "Guild Mission " + guild_course;
//-----------------------------DISPLAY SECTION------------------------------------
/////////LISTEN to DISPLAY////////////////////////////
///////////////////QUIZZES///////////////////////////



quiz_ref.once("value", function(snapshot){
    count = 1;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == guild_key){
            let container = document.getElementById("quiz");
            container.innerHTML = "<h4>Quizzes</h4>";
            childsnapshot.forEach(function(childe){
                // console.log(childe.key)
                let b = document.createElement("button");
                b.innerHTML = "quiz" + count;
                b.addEventListener("click", function(){
                    showAct(childe.key, "view-mission",  childe.child("date").val(),childe.child("name").val());
                });
                container.appendChild(b);
                count+=1;
            }); 
        }
    });
});

lab_ref.once("value", function(snapshot){
    count = 1;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == guild_key){
            let container = document.getElementById("labs");
            container.innerHTML = "<h4>Lab Activities</h4>";
            childsnapshot.forEach(function(childe){
                // console.log(childe.key)
                let b = document.createElement("button");
                b.innerHTML = "lab" + count;
                b.addEventListener("click", function(){
                    showAct(childe.key, "lab-view",childe.child("date").val(),childe.child("name").val());
                });
                container.appendChild(b);
                count+=1;
            }); 
        }
    });
});

exam_ref.once("value", function(snapshot){
    count = 1;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == guild_key){
            let container = document.getElementById("exams");
            container.innerHTML = "<h4>Exams</h4>";
            childsnapshot.forEach(function(childe){
                let b = document.createElement("button");
                b.innerHTML = "exam" + count;
                b.addEventListener("click", function(){
                  
                    showAct(childe.key, "exam-view",childe.child("date").val(),childe.child("name").val());                 
                    
                });
                container.appendChild(b);
                count+=1;
            }); 
        }
    });
});
//--------------------------------------------------------------------//
function showAct(act_id, container_id, date, act_name){
    var x = document.getElementById(container_id);
    x.innerHTML = "<br>Name: " +  act_name + "<br>Date: " + date;
    // console.log(act_name)
    var subs = document.createElement("div");
    subs.innerHTML = "<h4>SubTopics:</h4>";
    // subtopics.forEach(function(topic){
    //     subs.innerHTML +=  "<br>" + topic.key.toUpperCase() + "<br>XP: " + topic.child("xp").val() + "<br>";
    //     x.appendChild(subs) 
    // });

    scores_ref.once("value", function(snapshot){
        snapshot.forEach(function(childsnapshot){
            if(childsnapshot.key == user_token){
                if(container_id == "view-mission"){
                    let check = childsnapshot.child("Quizzes").child(act_id);
                    if(check.hasChildren()){
                        check.child("Subtopics").forEach(function(topic){ 
                            subs.innerHTML +=  "<br>" + topic.key.toUpperCase() + "<br>XP: " + topic.child("xp").val() + "<br>";
                            x.appendChild(subs)     
                        });
                    } else {
                        quiz_ref.once("value", function(snapshot){
                            snapshot.child(guild_key).child(act_id).child("SubTopics")
                            .forEach(function(topic){
                                subs.innerHTML +=  "<br>" + topic.key.toUpperCase() + "<br>XP: 0/" + topic.child("xp").val() + "<br>";
                                x.appendChild(subs); 
                            });
                        });
                       
                    }
                    
                } else if (container_id == "lab-view"){
                    let check = childsnapshot.child("Labs").child(act_id);
                    if(check.hasChildren()){
                        check.child("Subtopics").forEach(function(topic){ 
                            subs.innerHTML +=  "<br>" + topic.key.toUpperCase() + "<br>XP: " + topic.child("xp").val() + "<br>";
                            x.appendChild(subs)     
                        });
                    } else {
                        lab_ref.once("value", function(snapshot){
                            snapshot.child(guild_key).child(act_id).child("SubTopics")
                            .forEach(function(topic){
                                subs.innerHTML +=  "<br>" + topic.key.toUpperCase() + "<br>XP: 0/" + topic.child("xp").val() + "<br>";
                                x.appendChild(subs); 
                            });
                        });
                       
                    }
                } else {
                    let check = childsnapshot.child("Exams").child(act_id);
                    if(check.hasChildren()){
                        check.child("Subtopics").forEach(function(topic){ 
                            subs.innerHTML +=  "<br>" + topic.key.toUpperCase() + "<br>XP: " + topic.child("xp").val() + "<br>";
                            x.appendChild(subs)     
                        });
                    } else {
                        exam_ref.once("value", function(snapshot){
                            snapshot.child(guild_key).child(act_id).child("SubTopics")
                            .forEach(function(topic){
                                subs.innerHTML +=  "<br>" + topic.key.toUpperCase() + "<br>XP: 0/" + topic.child("xp").val() + "<br>";
                                x.appendChild(subs); 
                            });
                        });
                       
                    }
                }
                
            }
        });
    });
    
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}
//////////////////////////////////////////////////////////////
document.getElementById("view-mission").style.display = "none";

function viewMission() {
    var x = document.getElementById("view-mission");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

/////DISPLAY CURRENT XP/////////////////////////////
scores_ref.once("value", function(snapshot){
    let xp_cont = document.getElementById("CXP");
    let xp_count = 0;
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == user_token){
            childsnapshot.forEach(function(childe){
                childe.forEach(function(childes){
                    childes.child("Subtopics").forEach(function(childs){
                        xp_count += parseInt(childs.child("xp").val());   
                    });
                });
            });
            
        }
    });
    xp_cont.innerHTML = "Current XP: " + xp_count;
});

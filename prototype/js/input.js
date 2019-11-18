let start = location.href.lastIndexOf("/");
let subject_key = location.href.substr(start+1);
document.getElementById("subject-code").innerHTML = "Guild Mission " + subject_key;

let t_index = location.href.indexOf("=");
let i_type = location.href.substr(t_index + 1);
let mission_type = i_type.substr(0, i_type.indexOf("?"));
let p_cont = document.getElementById("selector");

let id_index = location.href.indexOf("id=");
let id_type = location.href.substr(id_index + 3);
let act_id = id_type.substr(0, id_type.indexOf("?"))
console.log(act_id)


enrolled_ref.once("value", function(snapshot){
    snapshot.forEach(function(childsnapshot){
        childsnapshot.forEach(function(childe){
            if(childe.key + "id" == subject_key){
                add_user_to_list(childsnapshot.key);
            }
        });
    });
    console.log(participant_list)
    
    user_ref.once("value", function(snapshot){
        let selector = document.createElement("select");
        selector.id = "participant-list";        
        snapshot.forEach( function(childsnapshot){
            for(let i = 0; i < participant_list.length;i++){
                let opt = document.createElement("option");
                if(childsnapshot.key == participant_list[i]){
                    opt.value = participant_list[i];
                    opt.text = participant_list[i];
                    selector.appendChild(opt);
                }
               
            }
        });
        selector.addEventListener("change", function(){
            console.log(this.options[this.selectedIndex].text)
        })
        p_cont.appendChild(selector);
    });
    
   
});

quiz_ref.once("value", function(snapshot){
    let sub_parent = document.getElementById("input-subs")
    snapshot.forEach(function(childsnapshot){
        if(childsnapshot.key == subject_key){
            childsnapshot.forEach(function(childe){
                if(childe.key == act_id){
                    let topics = document.createElement("input");
                    childe.child("SubTopics").forEach(function(childes){
                        sub_parent.innerHTML +=  childes.key + "  ";
                        topics.id = childes.key;
                        sub_parent.appendChild(topics);
                        sub_parent.innerHTML += "<br>"
                    });
                }
            });
        }
    });
});
let participant_list = new Array();

function add_user_to_list(id){
    participant_list.push(id);
}

function submit(){
    let sub_parent = document.getElementById("input-subs");
    for(let i = 0; i < sub_parent.getElementsByTagName("input").length;i++){
        let sub_id = sub_parent.getElementsByTagName("input")[i].getAttribute("id");
        let sub_input = document.getElementById(sub_id).value;
        // quiz_ref.child(subject_key).child(act_id).child("SubTopics").child(sub_id).set({
        //     xp : sub_input
        // });
        let options = document.getElementById("participant-list").options;
        console.log(options[selectedIndex].value)
        // scores_ref.child()

    }
    // console.log(sub_input);
    // window.alert("XP added successfully!");
}

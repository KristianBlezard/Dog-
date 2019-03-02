/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
let name_array = ["Dog", "Bunny", "Cat", "Deer", "Groundhog", "Opossum", "Raccoon", "Skunk"];
let points_array = [10, 20, 50, 50, 100, 100, 100, 100];
let spotter = 0;
let pnts = 0;
let num_spotted = 1;
let prev_sum = 0;
let bonus = false;

var Dog = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        Dog.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        bigify();
        console.log('Received Event: ' + id);
    }
};

var animals = {
  init: function() {
    var game_div = document.getElementById("animal_list");

    for(var i = 0; i < name_array.length; i++) {
      var animal = document.createElement('div');
      animal.classList.add('animal_page')
/*    var pic = document.createElement('div');
      pic.classList.add('pic');
      animal.appendChild(pic);
*/
      var name = document.createTextNode(name_array[i]);
      animal.appendChild(name);

/*      var num_rows = Math.ceil(name_array.length / 3);
      var caption = document.createElement('div');
      var points = document.createTextNode(points_array[i]);
      caption.setAttribute('display', "block");
      caption.appendChild(points);
*/    const index = i;
      animal.addEventListener("click", function() { launchAnimal(index); } );
/*      animal.appendChild(caption);*/
      game_div.appendChild(animal);
    }
  }
};

function p1spotted() {
  spotter = 1;
  document.getElementById("pop_up").style.display = "none";
}

function p2spotted() {
  spotter = 2;
  document.getElementById("pop_up").style.display = "none";
}

function Animal(name, points) {
  this.name = name;
  this.points = points;
}

function Player () {
  this.score = 0;
  this.name = "";
}

function spotDog() {
  prev_sum = pnts * num_spotted;
  console.log("pre_double"+prev_sum);
  if(bonus) { prev_sum *= 2; console.log("post-double: "+prev_sum); double(); }
  console.log("pnts: "+pnts+" * num_spotted: "+num_spotted+" = prev_sum: "+prev_sum );

  document.getElementById("animal_spotted").style.display = "none";

  document.getElementById("pop_up").style.display = "block";

  if(spotter===1) {
    p1.score+=prev_sum;
    document.getElementById("score1").innerHTML = p1.score;
    document.getElementById("player_name").innerHTML = p1.name;
  }
  else if(spotter===2)
  {
    p2.score+= prev_sum;
    document.getElementById("score2").innerHTML = p2.score;
    document.getElementById("player_name").innerHTML = p2.name;
  }
  console.log("P1: "+p1.score+ "\tP2: "+p2.score);
  pnts = 0;
  num_spotted = 1;
  document.getElementById('ani_count').innerHTML = 1;
}

function launchAnimal(i) {
  pnts = points_array[i];

  console.log("launched "+name_array[i]);
  var ani_spt = document.getElementById("animal_spotted");

  if(spotter === 1) {
    ani_spt.classList.add('player1');
    document.getElementById("player_name").innerHTML = p1.name;
  }
  else if (spotter === 2) {
    ani_spt.classList.add('player2');
    document.getElementById("player_name").innerHTML = p2.name;
  }
  ani_spt.style.display = "block";
}

function closeAnimal() {
  document.getElementById("animal_spotted").style.display = none;
}

function decNumSpot() {
  if(num_spotted > 0) {
    num_spotted--;
    console.log("decreased number spotted"+num_spotted);
    updateAniCount();
  }
}

function incNumSpot() {
  num_spotted++;
  console.log("increased number spotted to"+num_spotted);
  updateAniCount();
}

function updateAniCount() {
  document.getElementById('ani_count').innerHTML = num_spotted;
}

function bigify() {
  console.log("Bigify");
  var div = document.getElementById("deviceready");
  div.classList.add('biggie');
}

function double() {
  console.log("bonus touched");
  bonus = !bonus;
  document.getElementById('bonus').classList.toggle("active", bonus);
  document.getElementById('ani_count').classList.toggle("active", bonus);
}

function setName() {
  var name = window.prompt("Enter new player "+spotter+" name: ");
  if(spotter === 1) {
    p1.name = name;
    document.getElementById("player_name").innerHTML = p1.name;
    document.getElementById("p1_display_name").innerHTML = p1.name;
    alert("Player 1 name is now \'"+p1.name+"\'");
  }
  else if (spotter === 2) {
    p2.name = name;
    document.getElementById("player_name").innerHTML = p2.name;
    document.getElementById("p2_display_name").innerHTML = p2.name;
    alert("Player 2 name is now \'"+p2.name+"\'");
  }

}

let p1 = new Player();
let p2 = new Player();
p1.name = "Player 1";
p2.name = "Player 2";

//organize the different lists
 $("#band").on("click",function(){
  if($('#choice').val() == "Radiohead" && $('#howmany').val() == "64"){
    $('.round0').children().children().attr('id','round0');
    $('.right0').children().children().attr('id','round0');

     //chnage round1 ids to the same so that they initialize list
    var list = document.querySelectorAll("#round0");
    var items = ['You','Creep','How Do You','Stop Whispering','Thinking About You','Anyone Can Play Guitar','Ripcord','Vegetable','Prove Yourself','I Can’t','Lurgee','Blow Out'];
    var items2 = ["Airbag","Paranoid Android","Subterranean Homesick Alien","Exit Music (For A Film)","Let Down","Karma Police","Fitter Happier","Electioneering","Climbing Up The Walls","No Surprises","Lucky","The Tourist"];
    var items3 = ["Everything In Its Right Place","Kid A","The National Anthem","How To Disappear Completely","Treefingers","Optimistic","In Limbo","Idiotque","The Morning Bell","Motion Picture Soundtrack"];
    var items4 = ["Planet Telex","The Bends","High and Dry","Fake Plastic Trees","Bones","(Nice Dream)","Just","My Iron Lung","Bullet Proof… I Wish I Was","Black Star","Sulk","Street Spirit(Fade Out)"];
    var items5 = ["Packt Like Sardines In a Crushed Tin Box","Pyramid Song, Pulk / Pull Revolving Doors","You And Whose Army?","I Might Be Wrong","Knives Out","Morning Bell / Amnesiac","Dollars & Cents","Hunting Bears","Like Spinning Plates","Life In A Glass House"];
    var items6 = ["2+2=5","Sit Down. Stand UP","Sail to the Moon","Backdrifts","Go To Sleep","Where I End YOu begin","we suck young blood","the gloaming","there there","i will","a punch up at a wedding","myxomatosis","scatterbrain","a wolf at the door"];
    var items7 = ["15 Step","Bodysnatchers","Nude","Weird Fishes / Arpeggi","All I Need","Faust Arp","Reckoner","House of Cards","Jigsaw Falling Into Place","Videotape"];
    var items8 = ["Burn The Witch","Daydreaming","Decks Dark","Desert Island Disk","Ful Stop","Glass Eyes","Identikit","The Numbers","The Present Tense","Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief","True Love Waits"];

    //create a matrix array



    for(var i=0; i<list.length; i++){// it will fuck up if it reaches max length on middle of loop
      //create a random order of things
      var rand = Math.floor(Math.random() * 8) + 1;
      if (rand == 1 && items.length > 0){
        var item = items[Math.floor(Math.random() * items.length)];
        var index = items.indexOf(item);
        items.splice(index,1);
        list[i].value = item;
        list[i].className = "limbs";
      }

      else if(rand == 2 && items2.length > 0){
        item = items2[Math.floor(Math.random() * items2.length)];
        index = items2.indexOf(item);
        items2.splice(index,1);
        list[i].value = item;
        list[i].className = "ok";
      }
      else if(rand == 3 && items3.length > 0){
         item = items3[Math.floor(Math.random() * items3.length)];
         index = items3.indexOf(item);
          items3.splice(index,1);
          list[i].value = item;
          list[i].className = "kida";

      }
      else if(rand == 4 && items4.length > 0){
        item = items4[Math.floor(Math.random() * items4.length)];
        index = items4.indexOf(item);
         items4.splice(index,1);
        list[i].value = item;
        list[i].className = "bends";
      }
      else if(rand == 5 && items5.length > 0){
        item = items5[Math.floor(Math.random() * items5.length)];
        index = items5.indexOf(item);
         items5.splice(index,1);
        list[i].value = item;
        list[i].className = "amnesiac";
      }

      else if(rand == 6 && items6.length > 0){
        item = items6[Math.floor(Math.random() * items6.length)];
        index = items6.indexOf(item);
         items6.splice(index,1);
        list[i].value = item;
        list[i].className = "hail";
      }
      else if(rand == 7 && items7.length > 0){
        item = items7[Math.floor(Math.random() * items7.length)];
        index = items7.indexOf(item);
         items7.splice(index,1);
        list[i].value = item;
        list[i].className = "rainbows";
      }
      else if(rand == 8 && items8.length > 0){
        item = items8[Math.floor(Math.random() * items8.length)];
        index = items8.indexOf(item);
         items8.splice(index,1);
        list[i].value = item;
        list[i].className = "moon";
      }
      else {
        i--;
      }
    }
    spacer_buttons = $('input').parent();
    for (var i =0; i< spacer_buttons.length; i= i+2){
     element = document.createElement("p");
     spacer_buttons[i].appendChild(element);
    }

    var nodes = Array.prototype.slice.call($(".round0").children()); //get indices of all the buttons
    $(".round0").children().on('click',function(){
    var advance = ".round1"  + (parseInt((nodes.indexOf(this)+2)/2)).toString(); //find the indices and match to the class in the next round
    var appear = document.querySelector(advance);  //select the the class name
    //console.log(advance);
    appear.children[0].value = $(this).children().val()  //change value in next round to clicked button
    appear.children[0].className = this.children[0].className;
    });


    nodes2 = Array.prototype.slice.call($(".round1").children());
    $(".round1").children().on('click',function(){
    advance2 = ".round2"  + (parseInt((nodes2.indexOf(this)+2)/2)).toString();
    appear2 = document.querySelector(advance2);
    appear2.children[0].value = $(this).children().val();
    appear2.children[0].className = this.children[0].className;
    });

    nodes3 = Array.prototype.slice.call($(".round2").children());
    $(".round2").children().on('click',function(){
    advance3 = ".round3"  + (parseInt((nodes3.indexOf(this)+2)/2)).toString();
    appear3 = document.querySelector(advance3);
    appear3.children[0].value = $(this).children().val();
    appear3.children[0].className = this.children[0].className;
    });

    nodes4 = Array.prototype.slice.call($(".round3").children());
    $(".round3").children().on('click',function(){
    advance4 = ".round4"  + (parseInt((nodes4.indexOf(this)+2)/2)).toString();
    appear4= document.querySelector(advance4);
    appear4.children[0].value = $(this).children().val();
    appear4.children[0].className = this.children[0].className;
    });

    nodes5 = Array.prototype.slice.call($(".round4").children());
    $(".round4").children().on('click',function(){
    advance5 = ".round5"  + (parseInt((nodes5.indexOf(this)+2)/2)).toString();
    appear5= document.querySelector(advance5);
    appear5.children[0].value = $(this).children().val();
    appear5.children[0].className = this.children[0].className;
    });

    nodes6 = Array.prototype.slice.call($(".right0").children());
    $(".right0").children().on('click',function(){
    advance6 = ".round1"  + (parseInt((nodes6.indexOf(this)+2)/2)).toString();
    appear6= document.querySelectorAll(advance6);
    appear6[1].children[0].value = $(this).children().val();
    appear6[1].children[0].className = this.children[0].className;
    });

    nodes7 = Array.prototype.slice.call($(".right1").children());
    $(".right1").children().on('click',function(){
    advance7 = ".round2"  + (parseInt((nodes7.indexOf(this)+2)/2)).toString();
    appear7= document.querySelectorAll(advance7);
    appear7[1].children[0].value = $(this).children().val();
    appear7[1].children[0].className = this.children[0].className;
    });

    nodes8 = Array.prototype.slice.call($(".right2").children());
    $(".right2").children().on('click',function(){
    advance8 = ".round3"  + (parseInt((nodes8.indexOf(this)+2)/2)).toString();
    appear8= document.querySelectorAll(advance8);
    appear8[1].children[0].value = $(this).children().val();
    appear8[1].children[0].className = this.children[0].className;
    });

    nodes9 = Array.prototype.slice.call($(".right3").children());
    $(".right3").children().on('click',function(){
    advance9 = ".round4"  + (parseInt((nodes9.indexOf(this)+2)/2)).toString();
    appear9= document.querySelectorAll(advance9);
    appear9[1].children[0].value = $(this).children().val();
    appear9[1].children[0].className = this.children[0].className;
    });

    nodes10 = Array.prototype.slice.call($(".right4").children());
    $(".right4").children().on('click',function(){
    advance10 = ".round5"  + (parseInt((nodes10.indexOf(this)+2)/2)).toString();
    appear10 = document.querySelectorAll(advance10);
    appear10[1].children[0].value = $(this).children().val();
    appear10[1].children[0].className = this.children[0].className;
    });
    $('.round51').on("click",function(){
      $('.winner').html($('.round51').children().val());
    });

    $('.right5').children().on("click",function(){
      $('.winner').html($(".right5").children('.round51').children().val());
    });
  }
  else if($('#choice').val() == "Radiohead" && $('#howmany').val() == "32"){
    $('.round1').children().children().attr('id','round1');
    $('.right1').children().children().attr('id','round1');

     //chnage round1 ids to the same so that they initialize list
    var list = document.querySelectorAll("#round1");
    var items = ['You','Creep','How Do You','Stop Whispering','Thinking About You','Anyone Can Play Guitar','Ripcord','Vegetable','Prove Yourself','I Can’t','Lurgee','Blow Out'];
    var items2 = ["Airbag","Paranoid Android","Subterranean Homesick Alien","Exit Music (For A Film)","Let Down","Karma Police","Fitter Happier","Electioneering","Climbing Up The Walls","No Surprises","Lucky","The Tourist"];
    var items3 = ["Everything In Its Right Place","Kid A","The National Anthem","How To Disappear Completely","Treefingers","Optimistic","In Limbo","Idiotque","The Morning Bell","Motion Picture Soundtrack"];
    var items4 = ["Planet Telex","The Bends","High and Dry","Fake Plastic Trees","Bones","(Nice Dream)","Just","My Iron Lung","Bullet Proof… I Wish I Was","Black Star","Sulk","Street Spirit(Fade Out)"];
    var items5 = ["Packt Like Sardines In a Crushed Tin Box","Pyramid Song, Pulk / Pull Revolving Doors","You And Whose Army?","I Might Be Wrong","Knives Out","Morning Bell / Amnesiac","Dollars & Cents","Hunting Bears","Like Spinning Plates","Life In A Glass House"];
    var items6 = ["2+2=5","Sit Down. Stand UP","Sail to the Moon","Backdrifts","Go To Sleep","Where I End YOu begin","we suck young blood","the gloaming","there there","i will","a punch up at a wedding","myxomatosis","scatterbrain","a wolf at the door"];
    var items7 = ["15 Step","Bodysnatchers","Nude","Weird Fishes / Arpeggi","All I Need","Faust Arp","Reckoner","House of Cards","Jigsaw Falling Into Place","Videotape"];
    var items8 = ["Burn The Witch","Daydreaming","Decks Dark","Desert Island Disk","Ful Stop","Glass Eyes","Identikit","The Numbers","The Present Tense","Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief","True Love Waits"];

    //create a matrix array



    for(var i=0; i<list.length; i++){// it will fuck up if it reaches max length on middle of loop
      //create a random order of things
      var rand = Math.floor(Math.random() * 8) + 1;
      if (rand == 1 && items.length > 0){
        var item = items[Math.floor(Math.random() * items.length)];
        var index = items.indexOf(item);
        items.splice(index,1);
        list[i].value = item;
        list[i].className = "limbs";
      }

      else if(rand == 2 && items2.length > 0){
        item = items2[Math.floor(Math.random() * items2.length)];
        index = items2.indexOf(item);
        items2.splice(index,1);
        list[i].value = item;
        list[i].className = "ok";
      }
      else if(rand == 3 && items3.length > 0){
         item = items3[Math.floor(Math.random() * items3.length)];
         index = items3.indexOf(item);
          items3.splice(index,1);
          list[i].value = item;
          list[i].className = "kida";

      }
      else if(rand == 4 && items4.length > 0){
        item = items4[Math.floor(Math.random() * items4.length)];
        index = items4.indexOf(item);
         items4.splice(index,1);
        list[i].value = item;
        list[i].className = "bends";
      }
      else if(rand == 5 && items5.length > 0){
        item = items5[Math.floor(Math.random() * items5.length)];
        index = items5.indexOf(item);
         items5.splice(index,1);
        list[i].value = item;
        list[i].className = "amnesiac";
      }

      else if(rand == 6 && items6.length > 0){
        item = items6[Math.floor(Math.random() * items6.length)];
        index = items6.indexOf(item);
         items6.splice(index,1);
        list[i].value = item;
        list[i].className = "hail";
      }
      else if(rand == 7 && items7.length > 0){
        item = items7[Math.floor(Math.random() * items7.length)];
        index = items7.indexOf(item);
         items7.splice(index,1);
        list[i].value = item;
        list[i].className = "rainbows";
      }
      else if(rand == 8 && items8.length > 0){
        item = items8[Math.floor(Math.random() * items8.length)];
        index = items8.indexOf(item);
         items8.splice(index,1);
        list[i].value = item;
        list[i].className = "moon";
      }
      else {
        i--;
      }
    }
    spacer_buttons = $('input').parent();
    for (var i =0; i< spacer_buttons.length; i= i+2){
     element = document.createElement("p");
     spacer_buttons[i].appendChild(element);
    }



    nodes2 = Array.prototype.slice.call($(".round1").children());
    $(".round1").children().on('click',function(){
    advance2 = ".round2"  + (parseInt((nodes2.indexOf(this)+2)/2)).toString();
    appear2 = document.querySelector(advance2);
    appear2.children[0].value = $(this).children().val();
    appear2.children[0].className = this.children[0].className;
    });

    nodes3 = Array.prototype.slice.call($(".round2").children());
    $(".round2").children().on('click',function(){
    advance3 = ".round3"  + (parseInt((nodes3.indexOf(this)+2)/2)).toString();
    appear3 = document.querySelector(advance3);
    appear3.children[0].value = $(this).children().val();
    appear3.children[0].className = this.children[0].className;
    });

    nodes4 = Array.prototype.slice.call($(".round3").children());
    $(".round3").children().on('click',function(){
    advance4 = ".round4"  + (parseInt((nodes4.indexOf(this)+2)/2)).toString();
    appear4= document.querySelector(advance4);
    appear4.children[0].value = $(this).children().val();
    appear4.children[0].className = this.children[0].className;
    });

    nodes5 = Array.prototype.slice.call($(".round4").children());
    $(".round4").children().on('click',function(){
    advance5 = ".round5"  + (parseInt((nodes5.indexOf(this)+2)/2)).toString();
    appear5= document.querySelector(advance5);
    appear5.children[0].value = $(this).children().val();
    appear5.children[0].className = this.children[0].className;
    });



    nodes7 = Array.prototype.slice.call($(".right1").children());
    $(".right1").children().on('click',function(){
    advance7 = ".round2"  + (parseInt((nodes7.indexOf(this)+2)/2)).toString();
    appear7= document.querySelectorAll(advance7);
    appear7[1].children[0].value = $(this).children().val();
    appear7[1].children[0].className = this.children[0].className;
    });

    nodes8 = Array.prototype.slice.call($(".right2").children());
    $(".right2").children().on('click',function(){
    advance8 = ".round3"  + (parseInt((nodes8.indexOf(this)+2)/2)).toString();
    appear8= document.querySelectorAll(advance8);
    appear8[1].children[0].value = $(this).children().val();
    appear8[1].children[0].className = this.children[0].className;
    });

    nodes9 = Array.prototype.slice.call($(".right3").children());
    $(".right3").children().on('click',function(){
    advance9 = ".round4"  + (parseInt((nodes9.indexOf(this)+2)/2)).toString();
    appear9= document.querySelectorAll(advance9);
    appear9[1].children[0].value = $(this).children().val();
    appear9[1].children[0].className = this.children[0].className;
    });

    nodes10 = Array.prototype.slice.call($(".right4").children());
    $(".right4").children().on('click',function(){
    advance10 = ".round5"  + (parseInt((nodes10.indexOf(this)+2)/2)).toString();
    appear10 = document.querySelectorAll(advance10);
    appear10[1].children[0].value = $(this).children().val();
    appear10[1].children[0].className = this.children[0].className;
    });
    $('.round51').on("click",function(){
      $('.winner').html($('.round51').children().val());
    });

    $('.right5').children().on("click",function(){
      $('.winner').html($(".right5").children('.round51').children().val());
    });
  }
  else if($('#choice').val() == "Radiohead" && $('#howmany').val() == "16"){
    $('.round2').children().children().attr('id','round2');
    $('.right2').children().children().attr('id','round2');

     //chnage round1 ids to the same so that they initialize list
    var list = document.querySelectorAll("#round2");
    var items = ['You','Creep','How Do You','Stop Whispering','Thinking About You','Anyone Can Play Guitar','Ripcord','Vegetable','Prove Yourself','I Can’t','Lurgee','Blow Out'];
    var items2 = ["Airbag","Paranoid Android","Subterranean Homesick Alien","Exit Music (For A Film)","Let Down","Karma Police","Fitter Happier","Electioneering","Climbing Up The Walls","No Surprises","Lucky","The Tourist"];
    var items3 = ["Everything In Its Right Place","Kid A","The National Anthem","How To Disappear Completely","Treefingers","Optimistic","In Limbo","Idiotque","The Morning Bell","Motion Picture Soundtrack"];
    var items4 = ["Planet Telex","The Bends","High and Dry","Fake Plastic Trees","Bones","(Nice Dream)","Just","My Iron Lung","Bullet Proof… I Wish I Was","Black Star","Sulk","Street Spirit(Fade Out)"];
    var items5 = ["Packt Like Sardines In a Crushed Tin Box","Pyramid Song, Pulk / Pull Revolving Doors","You And Whose Army?","I Might Be Wrong","Knives Out","Morning Bell / Amnesiac","Dollars & Cents","Hunting Bears","Like Spinning Plates","Life In A Glass House"];
    var items6 = ["2+2=5","Sit Down. Stand UP","Sail to the Moon","Backdrifts","Go To Sleep","Where I End YOu begin","we suck young blood","the gloaming","there there","i will","a punch up at a wedding","myxomatosis","scatterbrain","a wolf at the door"];
    var items7 = ["15 Step","Bodysnatchers","Nude","Weird Fishes / Arpeggi","All I Need","Faust Arp","Reckoner","House of Cards","Jigsaw Falling Into Place","Videotape"];
    var items8 = ["Burn The Witch","Daydreaming","Decks Dark","Desert Island Disk","Ful Stop","Glass Eyes","Identikit","The Numbers","The Present Tense","Tinker Tailor Soldier Sailor Rich Man Poor Man Beggar Man Thief","True Love Waits"];

    //create a matrix array



    for(var i=0; i<list.length; i++){// it will fuck up if it reaches max length on middle of loop
      //create a random order of things
      var rand = Math.floor(Math.random() * 8) + 1;
      if (rand == 1 && items.length > 0){
        var item = items[Math.floor(Math.random() * items.length)];
        var index = items.indexOf(item);
        items.splice(index,1);
        list[i].value = item;
        list[i].className = "limbs";
      }

      else if(rand == 2 && items2.length > 0){
        item = items2[Math.floor(Math.random() * items2.length)];
        index = items2.indexOf(item);
        items2.splice(index,1);
        list[i].value = item;
        list[i].className = "ok";
      }
      else if(rand == 3 && items3.length > 0){
         item = items3[Math.floor(Math.random() * items3.length)];
         index = items3.indexOf(item);
          items3.splice(index,1);
          list[i].value = item;
          list[i].className = "kida";

      }
      else if(rand == 4 && items4.length > 0){
        item = items4[Math.floor(Math.random() * items4.length)];
        index = items4.indexOf(item);
         items4.splice(index,1);
        list[i].value = item;
        list[i].className = "bends";
      }
      else if(rand == 5 && items5.length > 0){
        item = items5[Math.floor(Math.random() * items5.length)];
        index = items5.indexOf(item);
         items5.splice(index,1);
        list[i].value = item;
        list[i].className = "amnesiac";
      }

      else if(rand == 6 && items6.length > 0){
        item = items6[Math.floor(Math.random() * items6.length)];
        index = items6.indexOf(item);
         items6.splice(index,1);
        list[i].value = item;
        list[i].className = "hail";
      }
      else if(rand == 7 && items7.length > 0){
        item = items7[Math.floor(Math.random() * items7.length)];
        index = items7.indexOf(item);
         items7.splice(index,1);
        list[i].value = item;
        list[i].className = "rainbows";
      }
      else if(rand == 8 && items8.length > 0){
        item = items8[Math.floor(Math.random() * items8.length)];
        index = items8.indexOf(item);
         items8.splice(index,1);
        list[i].value = item;
        list[i].className = "moon";
      }
      else {
        i--;
      }
    }
    spacer_buttons = $('input').parent();
    for (var i =0; i< spacer_buttons.length; i= i+2){
     element = document.createElement("p");
     spacer_buttons[i].appendChild(element);
    }




    nodes3 = Array.prototype.slice.call($(".round2").children());
    $(".round2").children().on('click',function(){
    advance3 = ".round3"  + (parseInt((nodes3.indexOf(this)+2)/2)).toString();
    appear3 = document.querySelector(advance3);
    appear3.children[0].value = $(this).children().val();
    appear3.children[0].className = this.children[0].className;
    });

    nodes4 = Array.prototype.slice.call($(".round3").children());
    $(".round3").children().on('click',function(){
    advance4 = ".round4"  + (parseInt((nodes4.indexOf(this)+2)/2)).toString();
    appear4= document.querySelector(advance4);
    appear4.children[0].value = $(this).children().val();
    appear4.children[0].className = this.children[0].className;
    });

    nodes5 = Array.prototype.slice.call($(".round4").children());
    $(".round4").children().on('click',function(){
    advance5 = ".round5"  + (parseInt((nodes5.indexOf(this)+2)/2)).toString();
    appear5= document.querySelector(advance5);
    appear5.children[0].value = $(this).children().val();
    appear5.children[0].className = this.children[0].className;
    });



    nodes8 = Array.prototype.slice.call($(".right2").children());
    $(".right2").children().on('click',function(){
    advance8 = ".round3"  + (parseInt((nodes8.indexOf(this)+2)/2)).toString();
    appear8= document.querySelectorAll(advance8);
    appear8[1].children[0].value = $(this).children().val();
    appear8[1].children[0].className = this.children[0].className;
    });

    nodes9 = Array.prototype.slice.call($(".right3").children());
    $(".right3").children().on('click',function(){
    advance9 = ".round4"  + (parseInt((nodes9.indexOf(this)+2)/2)).toString();
    appear9= document.querySelectorAll(advance9);
    appear9[1].children[0].value = $(this).children().val();
    appear9[1].children[0].className = this.children[0].className;
    });

    nodes10 = Array.prototype.slice.call($(".right4").children());
    $(".right4").children().on('click',function(){
    advance10 = ".round5"  + (parseInt((nodes10.indexOf(this)+2)/2)).toString();
    appear10 = document.querySelectorAll(advance10);
    appear10[1].children[0].value = $(this).children().val();
    appear10[1].children[0].className = this.children[0].className;
    });
    $('.round51').on("click",function(){
      $('.winner').html($('.round51').children().val());
    });

    $('.right5').children().on("click",function(){
      $('.winner').html($(".right5").children('.round51').children().val());
    });
  }
  else if($('#choice').val() == "The Strokes" && $('#howmany').val() == "16"){
    $('.round2').children().children().attr('id','round2');
    $('.right2').children().children().attr('id','round2');

     //chnage round1 ids to the same so that they initialize list
    var list = document.querySelectorAll("#round2");
    var items = ['is this it','modern age','soma','barely legal','someday','alone together','last night','hard to explain','nyc cops','trying your luck','take it or leave it'];
    var items2 = ["what ever happened","reptillia","automatic stop","12:51","you talk way to much","the way it is","meet me in the bathroom","under control","between love and hate","the end has no end","i cant win"];
    var items3 = ["yolo","juicebox","heart in a cage","razorblade","vision of division","ask me anything","vision of division","killing lies","electricityscape","15 minutes","fear of sleep","vision of division","red light"];
    var items4 = ["machu pichu","under cover of darkness","two kinds of happiness","your so right","taken for a fool","games","call me back","gratisfaction","metabolism","life is simple in the moonlight"];
    var items5 = ["tap out","all the time","one way trigger","welcome to japan","chances","slow animals","partners in crime","comedown machine","50/50","happy ending","call it fate call it carma"];
    var items6 = ["adult are talking","selfless","brooklyn bridge","bad decisions","eternal summer","at the door","why sundays are so depressing","not the same anymore","ode to the mets"];
    var items7 = ["instant crush","modern girls","oblivius","drag queen","threat of joy","leave it in my dreams","human sadness"];


    //create a matrix array



    for(var i=0; i<list.length; i++){// it will fuck up if it reaches max length on middle of loop
      //create a random order of things
      var rand = Math.floor(Math.random() * 8) + 1;
      if (rand == 1 && items.length > 0){
        var item = items[Math.floor(Math.random() * items.length)];
        var index = items.indexOf(item);
        items.splice(index,1);
        list[i].value = item;
        list[i].className = "limbs";
      }

      else if(rand == 2 && items2.length > 0){
        item = items2[Math.floor(Math.random() * items2.length)];
        index = items2.indexOf(item);
        items2.splice(index,1);
        list[i].value = item;
        list[i].className = "ok";
      }
      else if(rand == 3 && items3.length > 0){
         item = items3[Math.floor(Math.random() * items3.length)];
         index = items3.indexOf(item);
          items3.splice(index,1);
          list[i].value = item;
          list[i].className = "kida";

      }
      else if(rand == 4 && items4.length > 0){
        item = items4[Math.floor(Math.random() * items4.length)];
        index = items4.indexOf(item);
         items4.splice(index,1);
        list[i].value = item;
        list[i].className = "bends";
      }
      else if(rand == 5 && items5.length > 0){
        item = items5[Math.floor(Math.random() * items5.length)];
        index = items5.indexOf(item);
         items5.splice(index,1);
        list[i].value = item;
        list[i].className = "amnesiac";
      }

      else if(rand == 6 && items6.length > 0){
        item = items6[Math.floor(Math.random() * items6.length)];
        index = items6.indexOf(item);
         items6.splice(index,1);
        list[i].value = item;
        list[i].className = "hail";
      }
      else if(rand == 7 && items7.length > 0){
        item = items7[Math.floor(Math.random() * items7.length)];
        index = items7.indexOf(item);
         items7.splice(index,1);
        list[i].value = item;
        list[i].className = "rainbows";
      }
      else {
        i--;
      }
    }
    spacer_buttons = $('input').parent();
    for (var i =0; i< spacer_buttons.length; i= i+2){
     element = document.createElement("p");
     spacer_buttons[i].appendChild(element);
    }




    nodes3 = Array.prototype.slice.call($(".round2").children());
    $(".round2").children().on('click',function(){
    advance3 = ".round3"  + (parseInt((nodes3.indexOf(this)+2)/2)).toString();
    appear3 = document.querySelector(advance3);
    appear3.children[0].value = $(this).children().val();
    appear3.children[0].className = this.children[0].className;
    });

    nodes4 = Array.prototype.slice.call($(".round3").children());
    $(".round3").children().on('click',function(){
    advance4 = ".round4"  + (parseInt((nodes4.indexOf(this)+2)/2)).toString();
    appear4= document.querySelector(advance4);
    appear4.children[0].value = $(this).children().val();
    appear4.children[0].className = this.children[0].className;
    });

    nodes5 = Array.prototype.slice.call($(".round4").children());
    $(".round4").children().on('click',function(){
    advance5 = ".round5"  + (parseInt((nodes5.indexOf(this)+2)/2)).toString();
    appear5= document.querySelector(advance5);
    appear5.children[0].value = $(this).children().val();
    appear5.children[0].className = this.children[0].className;
    });



    nodes8 = Array.prototype.slice.call($(".right2").children());
    $(".right2").children().on('click',function(){
    advance8 = ".round3"  + (parseInt((nodes8.indexOf(this)+2)/2)).toString();
    appear8= document.querySelectorAll(advance8);
    appear8[1].children[0].value = $(this).children().val();
    appear8[1].children[0].className = this.children[0].className;
    });

    nodes9 = Array.prototype.slice.call($(".right3").children());
    $(".right3").children().on('click',function(){
    advance9 = ".round4"  + (parseInt((nodes9.indexOf(this)+2)/2)).toString();
    appear9= document.querySelectorAll(advance9);
    appear9[1].children[0].value = $(this).children().val();
    appear9[1].children[0].className = this.children[0].className;
    });

    nodes10 = Array.prototype.slice.call($(".right4").children());
    $(".right4").children().on('click',function(){
    advance10 = ".round5"  + (parseInt((nodes10.indexOf(this)+2)/2)).toString();
    appear10 = document.querySelectorAll(advance10);
    appear10[1].children[0].value = $(this).children().val();
    appear10[1].children[0].className = this.children[0].className;
    });
    $('.round51').on("click",function(){
      $('.winner').html($('.round51').children().val());
    });

    $('.right5').children().on("click",function(){
      $('.winner').html($(".right5").children('.round51').children().val());
    });
  }
  /* else if($('#choice').val() == "The Strokes" && $('#howmany').val() == "64"){
    $('.round0').children().children().attr('id','round0');
    $('.right0').children().children().attr('id','round0');

     //chnage round1 ids to the same so that they initialize list
    var list = document.querySelectorAll("#round0");
  } */
});

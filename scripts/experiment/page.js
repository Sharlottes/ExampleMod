Events.on(ClientLoadEvent, () => { //thx Qmel
    try {
      const rtfm = require("rtfm/library");

      rtfm.addSection("$block.mod.title", {
            "$block.mod.ironWall": null,
            "$block.mod.multicultivator": null
        });

      rtfm.addSection("$block.title", {});
      rtfm.addSection("$unit.title", {});
      rtfm.addSection("$item.title", {});
      rtfm.addSection("$liquid.title", {});
      rtfm.addSection("$sector.title", {});
      rtfm.addSection("$planet.title", {});

    
    
      rtfm.addPage(Blocks.router.localizedName, [
          "random go brr",
          () => new Label(() => Mathf.random(0, 10) + "")              
      ], rtfm.pages["$block.mod.title"]);//thx ilya



      const blockArr = Vars.content.blocks().toArray();
      const unitArr = Vars.content.units().toArray();
      const itemArr = Vars.content.items().toArray();
      const liquidArr = Vars.content.liquids().toArray();
      const sectorArr = Vars.content.sectors().toArray();
      const planetArr = Vars.content.planets().toArray();
      
      const scanPage = function(objArr, bundleName){
          for(var selectedContent of objArr){ //thx sk
          
              var front = selectedContent;
              if(front == null) break;
              var str = "~";
              const arr = Object.keys(front);
              arr.sort();
              
              for(var i=0; i<arr.length; i++){
                  if(arr[i] === "") continue;
                  try{
                  if((typeof front[arr[i]]) === "function") continue;

                      str += arr[i];
                      str += (front[arr[i]] == null)?(": [lightgray]null[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");

                      if(i < arr.length - 1) str += "\n";
                  }catch(ignore){}
              }
              var centeralStr = "~"+str;
              rtfm.addPage(selectedContent.localizedName, ["~{"+selectedContent.name+"}", "# "+selectedContent.localizedName, "", centeralStr], rtfm.pages["$"+bundleName+".title"]);
          }
      }
      
      scanPage(blockArr, "block");
      scanPage(unitArr, "unit");
      scanPage(itemArr, "item");
      scanPage(liquidArr, "liquid");
      scanPage(planetArr, "planet");
      scanPage(sectorArr, "sector");
      

      /*
      for(var block of blockArr){ //thx sk
        var front = block;
        if(front == null) break;
        var str = "";
        const arr = Object.keys(front);
        arr.sort();

        for(var i=0; i<arr.length; i++){
          if(arr[i] === "") continue;
          try{
            if((typeof front[arr[i]]) === "function") continue;

            str += arr[i];
            str += (front[arr[i]] == null)?(": [lightgray]null[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");

            if(i < arr.length - 1) str += "\n";
          }catch(ignore){}
        }
        var centeralStr = "~"+str;

        rtfm.addPage(block.localizedName, ["~{"+block.name+"}", "# "+block.localizedName, "", centeralStr], rtfm.pages["$block.title"]);
      }

      
      for(var unit of unitArr){
        var front = unit;
        if(front == null) break;
        var str = "";
        const arr = Object.keys(front);
        arr.sort();

        for(var i=0; i<arr.length; i++){
          if(arr[i] === "") continue;
          try{
            if((typeof front[arr[i]]) === "function") continue;

            str += arr[i];
            str += (front[arr[i]] == null)?(": [lightgray]null[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");

            if(i < arr.length - 1) str += "\n";
          }catch(ignore){}
        }
        var centeralStr = "~"+str;

        rtfm.addPage(unit.localizedName, ["~{"+unit.name+"}", "# "+unit.localizedName, "", centeralStr], rtfm.pages["$unit.title"]);
      }

      
      for(var item of itemArr){
        var front = item;
        if(front == null) break;
        var str = "";
        const arr = Object.keys(front);
        arr.sort();

        for(var i=0; i<arr.length; i++){
          if(arr[i] === "") continue;
          try{
            if((typeof front[arr[i]]) === "function") continue;

            str += arr[i];
            str += (front[arr[i]] == null)?(": [lightgray]null[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");

            if(i < arr.length - 1) str += "\n";
          }catch(ignore){}
        }
        var centeralStr = "~"+str;

        rtfm.addPage(item.localizedName, ["~{item-"+item.name+"}", "# "+item.localizedName, "", centeralStr], rtfm.pages["$item.title"]);
      }

      
      for(var liquid of liquidArr){
        var front = liquid;
        if(front == null) break;
        var str = "";
        const arr = Object.keys(front);
        arr.sort();

        for(var i=0; i<arr.length; i++){
          if(arr[i] === "") continue;
          try{
            if((typeof front[arr[i]]) === "function") continue;

            str += arr[i];
            str += (front[arr[i]] == null)?(": [lightgray]null[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");

            if(i < arr.length - 1) str += "\n";
          }catch(ignore){}
        }
        var centeralStr = "~"+str;

        rtfm.addPage(liquid.localizedName, ["~{liquid-"+liquid.name+"}", "# "+liquid.localizedName, "", centeralStr], rtfm.pages["$liquid.title"]);
      }

      
      for(var sector of sectorArr){
        var front = sector;
        if(front == null) break;
        var str = "";
        const arr = Object.keys(front);
        arr.sort();

        for(var i=0; i<arr.length; i++){
          if(arr[i] === "") continue;
          try{
            if((typeof front[arr[i]]) === "function") continue;

            str += arr[i];
            str += (front[arr[i]] == null)?(": [lightgray]null[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");

            if(i < arr.length - 1) str += "\n";
          }catch(ignore){}
        }
        var centeralStr = "~"+str;

        rtfm.addPage(sector.localizedName, ["~{zone-"+sector.name+"}", "# "+sector.localizedName, "", centeralStr], rtfm.pages["$sector.title"]);
      }

      
      for(var planet of planetArr){
        var front = planet;
        if(front == null) break;
        var str = "";
        const arr = Object.keys(front);
        arr.sort();

        for(var i=0; i<arr.length; i++){
          if(arr[i] === "") continue;
          try{
            if((typeof front[arr[i]]) === "function") continue;

            str += arr[i];
            str += (front[arr[i]] == null)?(": [lightgray]null[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");

            if(i < arr.length - 1) str += "\n";
          }catch(ignore){}
        }
        var centeralStr = "~"+str;

        rtfm.addPage(planet.localizedName, ["~{planet-"+planet.name+"}", "# "+planet.localizedName, "", centeralStr], rtfm.pages["$planet.title"]);
      }
      */
    } catch (e) {
      Log.warn("Please install [#00aaff]DeltaNedas/rtfm[] to view key: value pages.");
      print(e);
      print(e.trace);
    }

});

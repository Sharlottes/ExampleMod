Events.on(ClientLoadEvent, () => { //thx Qmel
    try {
      const rtfm = require("rtfm/library");

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

                      if(i < arr.length - 1) str += "\n~";
                  }catch(ignore){}
              }
              rtfm.addPage(selectedContent.localizedName, ["~{"+selectedContent.name+"}", "# "+selectedContent.localizedName, "", str], rtfm.pages["$"+bundleName+".title"]);
          }
      }
      
      scanPage(blockArr, "block");
      scanPage(unitArr, "unit");
      scanPage(itemArr, "item");
      scanPage(liquidArr, "liquid");
      scanPage(planetArr, "planet");
      scanPage(sectorArr, "sector");
      
    } catch (e) {
      Log.warn("Please install [#00aaff]DeltaNedas/rtfm[], [#00aaff]Deltanedas/ui-lib[] to view scan pages.");
      print(e);
      print(e.trace);
    }

});

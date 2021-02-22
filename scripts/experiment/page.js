Events.on(ClientLoadEvent, () => { //thx Qmel
    try {
      const rtfm = require("rtfm/library");
      var centered = true;

      rtfm.addSection("$block.title", {});
      rtfm.addSection("$unit.title", {});
      rtfm.addSection("$item.title", {});
      rtfm.addSection("$liquid.title", {});
      rtfm.addSection("$sector.title", {});
      rtfm.addSection("$planet.title", {});
      rtfm.addSection("$weather.title", {});
      rtfm.addSection("$block.mod.title", {});

      rtfm.addPage("random zone", [
          "random go brr",
          () => new Label(prov(() => Mathf.random(0, 10) + ""))
      ], rtfm.pages["$block.mod.title"]);//thx ilya

      rtfm.addPage("centering", {
          build(page) {
              page.table.table(cons(t => {
                  if(centered){
                      t.button(":the status | [yellow]info center", Icon.pause, run(() => {
                        centered = false;
                      })).center().size(500, 40);
                  }else{
                    t.button(":the status | [yellow]info center", Icon.play, run(() => {
                        centered = true;
                    })).center().size(500, 40);
                  }
              })).size(4000);
          }
      });


      const blockArr = Vars.content.blocks().toArray();
      const unitArr = Vars.content.units().toArray();
      const itemArr = Vars.content.items().toArray();
      const liquidArr = Vars.content.liquids().toArray();
      const sectorArr = Vars.content.sectors().toArray();
      const planetArr = Vars.content.planets().toArray();
      const weatherArr = Vars.content.getBy(ContentType.weather).toArray();

      const scanPage = function(objArr, bundleName){
          const vanilaSection = rtfm.addSection("$vanila.title", {}, rtfm.pages["$"+bundleName+".title"]);
          var once = false;
          var isMod = false;
          var modtag = "";

          for(var selectedContent of objArr){ //thx sk
              try{
                  var front = selectedContent;
                  if(front == null) break;
                  var str = "";
                  if(centered) str = "~";
                  var arr = Object.keys(front);
                  arr.sort();
                  isMod = false;

                  if(selectedContent.minfo.mod != null){
                      isMod = true;
                      if(contentOwner != selectedContent.minfo.mod.meta.displayName) once = false;
                      if(!once){
                          var contentOwner = selectedContent.minfo.mod.meta.displayName;
                          var modSection = rtfm.addSection(selectedContent.minfo.mod.meta.displayName, {}, rtfm.pages["$"+bundleName+".title"]);
                          once = true;
                      }
                  }

                  for(var i=0; i<arr.length; i++){
                      if(arr[i] === "") continue;
                      try{
                          if((typeof front[arr[i]]) === "function") continue;
                          str += arr[i];
                              str += (front[arr[i]] == null)?(": [lightgray]null[]"):(front[arr[i]] instanceof Color)?(": [#" + front[arr[i]] + "]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "object")?(": [coral]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "number")?(": [sky]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "boolean")?(": [stat]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "undefined")?(": [darkgray]" + front[arr[i]] + "[]"):((typeof front[arr[i]]) === "string")?(": [green]" + front[arr[i]] + "[]"):(": [accent]" + front[arr[i]] + "[]");
                          if(i < arr.length - 1) str += "\n";
                      }catch(ignored){}
                  }

                  var pageSection = vanilaSection;

                  if(isMod && selectedContent.minfo.mod != null){
                      modtag = selectedContent.minfo.mod.meta.name + "-";
                      pageSection = modSection;
                  }

                  rtfm.addPage(selectedContent.localizedName, [
                      (objArr == weatherArr) ? "" : "~{" + ((objArr == itemArr) ? modtag + "item-" : ((objArr == liquidArr) ? modtag + "liquid-" : ((objArr == sectorArr) ? "testmod-zone-" : ((objArr == planetArr) ? "testmod-planet-" : "")))) + selectedContent.name + "}",
                      "#"+selectedContent.localizedName,
                      "",
                      str
                  ], pageSection);

              }catch(errorrrr){
                  print(errorrrr);
                  continue;
              }
          }
      }

      scanPage(blockArr, "block");
      scanPage(unitArr, "unit");
      scanPage(itemArr, "item");
      scanPage(liquidArr, "liquid");
      scanPage(planetArr, "planet");
      scanPage(sectorArr, "sector");
      scanPage(weatherArr, "weather");


    } catch (e) {
      Log.warn("Please install [#00aaff]DeltaNedas/rtfm[], [#00aaff]Deltanedas/ui-lib[] to view scan pages.");
      print(e);
      print(e.trace);
    }

});

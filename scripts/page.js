try {
	const rtfm = require("rtfm/library");
	/*
  rtfm.addSection("$block.mod.title", {
        "$block.mod.ironWall": null,
        "$block.mod.multicultivator": null
    });
	rtfm.addSection("$block.title", {
        "$block.floor": null,
        "$block.cliff": null
    });

	for (var block of [Blocks.router, Blocks.sorter, Blocks.duo]) {
    rtfm.addPage(block.localizedName, [
	    "then, this is page. Right?",
    	() => new Label(prov(() => Mathf.random(0, 10) + "")),
	    "so.. can i add page under new Label?",
			"bruh.. this is array. don't be dump anymore"
    ], rtfm.pages["$block.mod.title"]);
	};
	*/
	const blockArr = Vars.content.blocks().toArray();
	for (var h=0; h<blockArr.length; h++){
		var front = blockArr[h];
		//if(front == null) return; 아무것도 없는데 뭘 하겠다는거요?
		var str = ""; //형변환 유도를 위한 빈 문자열 선언/정의
		const arr = Object.keys(front); //대상 키-값쌍의 키들을 수집해서 배열로 반환
		arr.sort(); //배열 인수들을 생성순서대로 정렬

		for(var i=0; i<arr.length; i++){ //arr 배열 길이만큼 반복
			if(arr[i] === ""){ //arr 인수가 문자열 "" 일 경우
				continue; //반복문 반영구 정지
			}
			try{
				if((typeof front[arr[i]]) === "function"){ //arr 인수를 매개변수로 가진? front[]가 문자열 function일 경우
					continue; //반복문 반영구 정지
				};
				str += arr[i]; //빈 문자열에 arr 인수 추가. 형변환 유도
				str += (front[arr[i]] == null)?(": [lightgray]null[]"):(": [accent]" + front[arr[i]] + "[]");//arr 인수가 추가된 문자열에서 arr 인수를 매개변수로 가진? front[]가 null일 경우, : null을 추가. null이 아닐 경우, front[]를 추가
				if(i < arr.length - 1) str += "\n"; //arr 배열의 길이-1가 i보다 클 경우, \n 까지 덧붙임. 줄 바꿔쓰기
			}
			catch(ignore){ //예외 발생시 실행문

			}
		}
		var centeralStr = "~"+str;
		rtfm.addPage(blockArr[h], [centeralStr]);
		rtfm.addSection("$block.title", {blockArr[h]: null});
	}
} catch (e) {
	// Message here
	Log.warn("Please install [#00aaff]DeltaNedas/rtfm[] to view OP Walls's manual pages.");
	print(e);
	print(e.trace);
}

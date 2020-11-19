//json version doesnt work at the time of the development of this
//thanks for sk

const createIconsC = (packer, block) => { //람다함수 정의, createIconsC 라는 변수는 packer, block 라는 매개변수를 가지고 {...} 실행문을 실행할 함수로써 정의됨.
    for(var i = 0; i < block.variants; i++){ //block.variants 만큼 반복, 기본값이 3이므로 여기선 3번 반복
        var image = new Pixmap(32, 32);//image 객체 선언. Pixmap(32, 32)
        // NativePixmap(32, 32, Format.rgba8888.toPixmapFormap()). 하양색으로 전환, 채우기
        //32를 nativeData 의 2번째([1]) 와 3번째([2]), Format.rgba8888.toPixmapFormap() 는 4번째 ([3])
        //생각을 포기하고 대충 느낌상 픽셀단위 32는 1타일이니깐.. 1*1 이미지일려나
            //+수정, 키엘좌 왈 8이 1블록(타일)이라 했다. 그러므로 1칸인 것
        var shadow = Core.atlas.getPixmap(block.name + (i + 1));// Core 객체의 atlas 객체의 getPixmap 반환값을 shadow 객체 선언. 코어에서 이름+(i+1)을 가진 Pixmap 찾기..


        var offset = image.getWidth() / Vars.tilesize - 1;//image 객체의 getWidth()의 반환값/ Vars 객체의 tilesize 값 - 1를 offset 변수로 선언
        //image.getWidth() 는 Pixmap(32, 32)의 너비.  Vars.tilesize 는 일반적으로 8이므로,
        //결과적으로, image 의 너비/8 -1 를 가짐.
        //추정값: 3
        var color = new Color();//color 객체 선언. 모든 구성요소가 0으로 설정된 새 색상을 생성.


        for(var x = 0; x < image.getWidth(); x++){//Pixmap(32, 32)의 너비만큼 반복함. 추정값: 32
            //29번 반복하는걸 32번 반복함. 29*32
            for(var y = offset; y < image.getHeight(); y++){//29번 반복함
                shadow.getPixel(x, y - offset, color);//shadow 객체의 getPixel 메소드 실행. x와 y-(이미지의 오프셋) 좌표 위치의 색을 shadow 에 set 함.

                if(color.a > 0.001){//만약 color 객체의 a(투명도)가 0.001보다 클 경우. 즉, 투명도가 있을 경우.
                    color.set(0, 0, 0, 0.3);//color 객체의 set 메소드 실행. 색의 투명도를 0.3(=헥스코드 4d) 로 바꾼다.
                    image.draw(x, y, color);//image 객체의 draw 메소드 실행.


                    //요약, (0,3) 부터 (32, 32) 까지 정해진 색을 찍음, 투명도가 있으면 30% 투명하게 찍음.
                };
            };
        };
        //1번째 스프라이트가 그려질 때, 그 앞의 2번째 스프라이트를 그리는 그림자 용도로 추정
        image.draw(shadow);

        packer.add(MultiPacker.PageType.environment, block.name + (i + 1), image);
        packer.add(MultiPacker.PageType.editor, "editor-" + block.name + (i + 1), image);

        if(i == 0){
            packer.add(MultiPacker.PageType.editor, "editor-block-" + block.name + "-full", image);
            packer.add(MultiPacker.PageType.main, "block-" + block.name + "-full", image);
        };
    }
};



//콘텐츠 확장
const ironOre = extendContent(OreBlock, "iron", {
    init(){
        this.itemDrop = Vars.content.getByName(ContentType.item, "testmod-iron");
        this.super$init();
    },
    createIcons(packer){
        createIconsC(packer, this);//위의 함수 실행.
    }
});

//광물 생성 매개변수
ironOre.oreScale = 25.105874;
ironOre.oreThreshold = 0.873;
ironOre.oreDefault = true;

ironOre.cost = 2;
ironOre.hardness = 5;
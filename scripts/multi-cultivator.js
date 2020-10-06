const multiCultivator = extendContent(GenericCrafter,"multi-cultivator",{
//draw 함수. 말그대로 텍스쳐 담당. 시간에 따라 이미지 교체하는 코드임.
  draw(tile){
  /*totalProgress 는 누적 가동 시간. warmup은 0~1 예열개념 없어도 됨
  %120은 이미지 교체 한 주기 의 길이. 프레임 단위.*/
    this.super$draw(tile);//원본 블록의 draw() 실행
    Draw.rect(Core.atlas.find(this.name+"-"+Math.floor((tile.entity.totalProgress%90)/30)),tile.drawx(),tile.drawy());//0~무한->0~89->0~2.999->0,1,2
  }
});
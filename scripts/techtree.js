const techNode = new Packages.mindustry.content.TechTree.TechNode(null, Packages.mindustry.content.Items.coal, Packages.mindustry.type.ItemStack.with(Packages.mindustry.content.Items.coal, 1000));


/*
매개변수 stripType가 참일 경우
    JsonValue 클래스의 매개변수 jsonMap 객체의 매개변수 "type"를 가진 remove 메소드 실행(추정: type키의 값을 삭제)

Object 클래스의 매개변수 object가 UnlockableContent클래스의 unlock로 형변환이 가능할 경우
    JsonValue 클래스의 research 변수를 JsonValue 클래스의 매개변수 jsonMap 객체의 매개변수 "research"를 가진 getChild 메소드를 실행해서 얻은 반환값으로 선언/정의(추정: research를 통해 자식??? 를 얻음)
    JsonValue 클래스의 research 변수가 null이 아닌 경우(jsonMap.getChild("research")가 null이 아닌 경우)
        researchName 문자열 추상필드 선언
        customRequirements ItemStack[1차배열] 추상필드 선언
        JsonValue 클래스의 research 객체의 isString 메소드를 실행해서 얻은 반환값이 참일 경우
            researchName 문자열 추상필드를 JsonValue 클래스의 research 객체의 asString 메소드를 실행한 반환값으로 정의
            customRequirements ItemStack[1차배열] 추상필드를 null으로 정의
        JsonValue 클래스의 research 객체의 isString 메소드를 실행해서 얻은 반환값이 거짓일 경우(참이 아닐 경우)
            researchName 문자열 추상필드를 JsonValue 클래스의 research 객체의 매개변수 "parent"를 가진 getString 메소드를 실행한 반환값으로 정의
            JsonValue 클래스의 research 객체의 매개변수 "requirements"를 가진 hasChild 메소드를 실행한 반환값이 참일 경우
                customRequirements ItemStack[1차배열] 추상필드를 parser 메소드 객체의 ItemStack[1차배열]클래스의 class 필드의 값과 JsonValue 클래스의 research 객체의 매개변수 "requirements"를 가진 getChild 메소드를 실행한 반환값을 매개변수로 가진 readValue 메소드를 실행한 반환값으로 정의
            JsonValue 클래스의 research 객체의 매개변수 "requirements"를 가진 hasChild 메소드를 실행한 반환값이 거짓일 경우
                customRequirements ItemStack[1차배열] 추상필드를 null으로 정의
*/

# Keypoint
문제를 과목별로, 난이도별로 정리하고, 풀이의 키포인트를 정리해 필요한 부분, 부족한 부분을 반복하자.


## API
### 1. 아이템 등록

> POST /api/items

```
// Request.body
{
    "category": {
        "main": [String],
        "middle": [String],
        "sub": [String],
        "difficulty": String // 상, 중, 하
    },
    "describtion": {
        "previous": String, // ex)18-2, 16-3
        "question": String, // question image file name
        "answer": String, // question image file name
        "keypoint": String // question image file name
    }
}
```

### 2. 모든 아이템 조회

> GET /api/items

### 3. 아이템 삭제

> DELETE /api/items/:id

### 4. 아이템 업데이트

> PATCH /api/items/:id

```
// Request.body
{
    "category": {
        "main": [String],
        "middle": [String],
        "sub": [String],
        "difficulty": String // 상, 중, 하
    },
    "describtion": {
        "previous": String, // ex)18-2, 16-3
        "question": String, // question image file name
        "answer": String, // question image file name
        "keypoint": String // question image file name
    }
}
```

## WEB
### home page
	http://localhost:4000/

### main page (이미지 사이즈 조절)
	http://localhost:4000/main
페이지 로드 : 모든 아이템DB 다운

-,+ 버튼 : 이전, 다음 아이템 조회

삭제 버튼 : 해당 아이템 삭제

### register page
	http://localhost:4000/register

분류 : **';'** 으로 구분하여 여러 분류 등록 가능

등록버튼 : 문제, 풀이, 키포인트 이미지 업로드 후 서버에 저장된 파일이름 받아서 DB에 저장

### edit page (미완)
	http://localhost:4000/edit/:id



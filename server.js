const express = require('express');
const app = express();
const PORT = 3000;

// index.html 같은 파일들을 보여줄 수 있게 설정
app.use(express.static(__dirname));

// 게시글 목록을 돌려주는 API
app.get('/api/posts', (req, res) => {
  res.json([
    { id: 1, title: '첫 번째 게시글입니다', author: '전예진', date: '2026-09-17' },
    { id: 2, title: '깃허브 연습 중', author: '전예진', date: '2026-09-17' }
  ]);
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
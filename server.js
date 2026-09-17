const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json()); // 요청으로 들어오는 JSON 데이터를 읽을 수 있게 해줌

// 임시 저장소 (서버 재시작하면 초기화돼요 - 나중에 진짜 DB로 교체할 거예요)
let posts = [
  { id: 1, title: '첫 번째 게시글입니다', author: '전예진', date: '2026-09-17', content: '반갑습니다!' },
  { id: 2, title: '깃허브 연습 중', author: '전예진', date: '2026-09-17', content: '커밋 연습 재밌어요.' }
];
let nextId = 3;

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

app.get('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: '글을 찾을 수 없습니다' });
  res.json(post);
});

app.post('/api/posts', (req, res) => {
  const { title, author, content } = req.body;
  const newPost = {
    id: nextId++,
    title, author, content,
    date: new Date().toISOString().slice(0, 10)
  };
  posts.push(newPost);
  res.json(newPost);
});

app.put('/api/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: '글을 찾을 수 없습니다' });
  post.title = req.body.title;
  post.content = req.body.content;
  res.json(post);
});

app.delete('/api/posts/:id', (req, res) => {
  posts = posts.filter(p => p.id !== Number(req.params.id));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
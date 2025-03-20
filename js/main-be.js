module.exports = (app) => {
  app.get('/', (req, res) => {
    // 모든 경로에서 index.html 불러오기
    // res.sendFile(path.resolve('html', 'main.html'));
    const springProducts = [
      { id: 2, imageUrl: '/img/2025_spring_top_drink02.png' },
      { id: 1, imageUrl: '/img/2025_spring_top_drink01.png' },
      { id: 3, imageUrl: '/img/2025_spring_top_drink03.png' },
    ];
    res.json(springProducts);
  });
};

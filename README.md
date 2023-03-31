# 我的餐廳清單

運用 Node.js + Express 製作的簡易網站。


![image](https://github.com/pleasesailas/Restaurant-List-v3/blob/main/public/readmeImage/index.png)
https://github.com/pleasesailas/-Restaurant-List-v3/blob/main/public/readmeImage/index.png

## 特色功能

1. 可點擊任一餐廳圖片或文字，瀏覽更多餐廳詳細資訊，如：地址、電話與簡述等。
2. 可以搜尋餐廳名稱
3. 可以連結餐廳的地址到 Google 地圖
4. 可以透過搜尋餐廳類別來找到特定的餐廳
5. 可以新增餐廳
6. 可以編輯餐廳資訊
7. 可以刪除餐廳

## 開發工具

* Node.js @v18.15.0
* Express @4.16.4
* express-handlebars @3.0.0
* Bootstrap @5.0.2
* mongoose @5.9.7
* body-parser@1.20.2
* dotenv@16.0.3
* method override@3.0.0


## 安裝與使用

1. 請先確認有安裝 Node.js 、 npm

2. 將專案 clone 至本機:

3. 透過終端機進入資料夾，輸入：
```
npm install
```

4. 設定 MongoDB 連線：
```
MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
```

5. 完成連線後輸入：
```
npm run dev
```

6. 若看見此行訊息則代表伺服器已啟動
```
Express is listening on http://localost:3000
```

7. 打開瀏覽器進入到以下網址
```
http://localhost:3000
```


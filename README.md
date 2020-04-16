![mercari](https://i.gyazo.com/a4179ee3f8d0f04ecf68fe22a4e22c11.png)


<h1 align="center">Chat app</h1>
<br>
<p align="center">
<a>　</a>
<img src="https://user-images.githubusercontent.com/39142850/71774533-1ddf1780-2fb4-11ea-8560-753bed352838.png" width="70px;" />
<a>　</a>
<img src="https://user-images.githubusercontent.com/39142850/71774548-731b2900-2fb4-11ea-99ba-565546c5acb4.png" height="60px;" /><br><br>
<a>　</a><a>　</a>
<a><img src="https://user-images.githubusercontent.com/39142850/71774618-b32edb80-2fb5-11ea-9050-d5929a49e9a5.png" height="60px;" />
<a>　</a>
<a><img src="https://user-images.githubusercontent.com/39142850/71774644-115bbe80-2fb6-11ea-822c-568eabde5228.png" height="60px" />
<a>　</a>
<img src="https://user-images.githubusercontent.com/39142850/71774768-d064a980-2fb7-11ea-88ad-4562c59470ae.png" height="65px;" />
<a>　</a>
<a><img src="https://user-images.githubusercontent.com/39142850/71774786-37825e00-2fb8-11ea-8b90-bd652a58f1ad.png" height="60px;" />
</p><br>

# 概要
テキストと画像の投稿機能をもつチャットアプリです。
</br>
基本機能：
ユーザー新規登録・ログイン・ログアウト
画像・コメント投稿機能（非同期通信）
チャットグループ作成・ユーザーの追加
チャットグループへのユーザー追加時のユーザー検索（インクリメンタルサーチ）




<br><br><br><br>

# DB design

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: fslse, unique: true|
|password|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through:  :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|user_id|integer|null:false, foreign_key: true|
|group_id|integer|null:false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :groups_users
- has_many :users, through:  :groups_users
- has_many :messages

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
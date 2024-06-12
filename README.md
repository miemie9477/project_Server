
先把商品詳細頁面寫完
* 先找購物車是否存在<br/>
 => 無，建立購物車
* 找商品是否存在 <br/>
 => 有，比對數量
* 加入商品至購物車明細

cartbody 寫到一半
* 要先找mId => 找購物車+明細
* 匯出數量&總價
* 用商品編號找品牌(匯入圖片)
* 購物車數量變動要call api

## Todo

- [ ] session

* Ordinary User
- [x] login (select)
- [x] register ( select(mAccount)
                + select(email)
                + select(phone) => null)(insert)
- [ ] merchandise detail
- [ ] Cart(insert)(select)(delete)
- [ ] Order(insert)
- [ ] modify user data(update)
- [ ] board for product review(insert)(select)

* Admin User
- [ ] check order(select)
- [ ] add/delect order(insert)(delete)
- [ ] modify order(update)
- [ ] delete member(delete)
- [ ] modify member(update)

## library
* express
* nodemon
* cors
* mysql
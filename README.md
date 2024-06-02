## Update Journal
修改 *funcRegister.js* 的 註冊前查詢
>依照帳號、身分證字號、email、電話 SELECT<br/>若有重複，個別回應並在 *RegisterPage.js* 中寫入不同的錯誤訊息

## Todo

- [ ] session

* Ordinary User
- [x] login (select)
- [ ] register ( select(mAccount)
                + select(email)
                + select(phone) => null)(insert)
- [ ] merchandise detail
- [ ] Order(insert)
- [ ] Cart(insert)(select)(delete)
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
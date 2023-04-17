const express = require("express");
const router = express.Router();

const Cart = require("../schemas/cart.js")
const Goods = require("../schemas/goods.js")

router.get("/carts", async (req,res) => {
    const carts = await Cart.find({}); // 장바구니 안에있는 모든 데이터를 찾음
    // [
    // [{goodsId,quantity}]
    // ];
    const goodsIds = carts.map((cart) => { // 장바구니 안에있는 모든 상품의 아이디를 찾음
        return cart.goodsId;
    })
    // [ 1, 2, 3]

    const goods = await Goods.find({goodsId: goodsIds}) // 상품의 아이디를 통해 상품의 상세 정보를 가져옴

    const results = carts.map((cart)=> {
        return {
            quantity: cart.quantity,
            goods: goods.find((item => item.goodsId === cart.goodsId))
        }
    })
    res.json({
        "carts" : results,
    })
})

module.exports = router;
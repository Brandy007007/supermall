import {
    ADD_COUNTER,
    ADD_TO_CART
} from './mutation-types'
export default {
    addCart(context, payload) {
        return new Promise((resolve,reject) => {
            let oldProduct = context.state.cartlist.find(item =>
                item.iid === payload.iid
            ) 
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit(ADD_COUNTER, oldProduct)
                resolve("当前商品数量加一")
            } else {
                payload.count = 1
                // state.cartlist.push(payload)
                context.commit(ADD_TO_CART, payload)
                resolve("添加了新的商品")
            }
        })
    }
}
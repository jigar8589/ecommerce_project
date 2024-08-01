const  Product  = require('../model/product.model');




async function createProduct(body) {
    try {
        const product1 = new Product({
            name: body.name,
            price: body.price,
            description: body.description,
            quantity: body.quantity
        })


        const productadd = await product1.save()
        return productadd

    }
    catch (err) {
        return err
    }
}


// Update product

async function productUpdate(id,name, price, description, quantity) {
    try {

        const Update = Product.findOneAndUpdate({ _id: id },
            {
                $set: {
                    name: name,
                    price: price,
                    description: description,
                    quantity: quantity
                }
            })

        return Update;

    } catch (error) {
        console.log(error)
        return error

    }
}


async function productDelete(id){
    const Delete = await Product.findByIdAndDelete({_id:id})
    return Delete;
}

module.exports = {
    createProduct,productUpdate,productDelete
}
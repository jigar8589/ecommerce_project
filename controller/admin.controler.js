const  adminService = require("../service/adminService")



//Create product

 async function productCreate(req,res){
    try{
        const body = req.body
        const ProductSave = await adminService.createProduct(body)
        res.status(201).json(ProductSave)
        }catch(err){
            res.status(500).json({message:err.message})
        }
 }



// Update product 
async function updateproduct(req,res){
    const id = req.params.id
    const Name= req.body.name;
    const Price= req.body.price;
    const description = req.body.description
    const quantity= req.body.quantity;
    const productUpdated = await adminService.productUpdate(id,Name,Price,description,quantity)
    res.json({massage:"Product update sucessfully"})

}


// Delete product
async function deleteProductControl(req,res){
    const id = req.params.id
    const productDeleted = await adminService.productDelete(id)
    res.json({massage:"Product delete sucessfully"})
    }



module.exports ={
    productCreate,updateproduct,deleteProductControl
}
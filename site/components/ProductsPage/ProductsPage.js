import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { CommonContext } from '../../providers/commonContexts'
import classes from '../../styles/Products.module.css'
import { IoIosRemoveCircleOutline, IoIosAddCircle } from 'react-icons/io';

function ProductsPage({products, categories}) {
  const router = useRouter()
  const {cart, setCart} = useContext(CommonContext)

  const onUpdateCart = async(product, isIncrement) => {
    let cartList = cart ? [].concat(cart) : []
    let index = cartList.findIndex((item) => item.id == product.id)
    if(index >= 0){
        if(isIncrement){
            cartList[index].quantity = cartList[index].quantity + 1
        }else{
            if(cartList[index].quantity == 1){
                cartList.splice(index, 1)
            }else{
                cartList[index].quantity = cartList[index].quantity - 1
            }
        }  
    }else{
        let newItem = product
        newItem.quantity = 1
        cartList.push(newItem)
    }
    setCart(cartList)
}

const removeFromCart = async(i) => {
    let updateCartList = cart ? [].concat(cart) : []
    updateCartList.splice(i, 1);

    setCart(updateCartList)
}

  return (
    <div>
      <div className={classes.banner} >
        <div className={classes.bannerText}>
          <h1><b>Our Shop</b></h1>
          {/* <h5><b>Home  {'/'}  {router.query && router.query.cid ? `Category   ${'/'}   ${router.query.cid}` : 'Products'}</b></h5> */}
          <h5><b>Home  {'/'}  Products</b></h5>
        </div>
        { products && products.length > 0 ?
            <img className={classes.bannerImage} src={products[0].imageUrl} alt="" />
          :
            <img className={classes.bannerImage} src='/oracle-icon.svg' alt="" />
        }
      </div>
      <div style={{padding: 16, backgroundColor: '#fafafa'}}>
        <Row>
          <Col xs={12} md={3} style={{padding: 16}}>
            <h2>Product categories</h2>
              {categories && categories.length > 0 && 
                categories.map((category, i) => (
                  <p className={router.query && router.query.cid == category.id ? 'primaryColor' : ''} style={{cursor: 'pointer'}} key={i} onClick={() => router.push(`/categories/${encodeURIComponent(category.id)}`)}> {' > '} {category.name}</p>
                ))  
              }
          </Col>
          <Col xs={12} md={9} style={{padding: 16}}>
              <Row>
                {products && products.length > 0 &&
                  products.map((product, i) => {
                    let quantity = 0
                    let index = cart ? cart.findIndex((item) => item.id == product.id) : -1
                    if(index >= 0){
                        quantity = cart[index].quantity
                    }
                    return <Col key={i} xs={12} md={3} >
                        <div className='centerAlign' style={{padding: 8, backgroundColor: '#ffffff'}}>
                          <img className={classes.bannerImage} src={product.imageUrl} alt="" 
                            onClick={() => router.push(`/products/${encodeURIComponent(product.id)}`)}
                            style={{height: 200, width: '100%', objectFit: 'contain', cursor: 'pointer'}} 
                          />
                          <p></p>
                          <h6><b>{product.name}</b></h6>
                          <p></p>
                          {/* {quantity > 0 ? 
                              <Row style={{alignItems: 'center'}}>
                                <Col>
                                  <IoIosRemoveCircleOutline size={32} style={{cursor: 'pointer'}}  onClick={() => onUpdateCart(product,false)} />
                                </Col>
                                <Col>
                                  {quantity}
                                </Col>
                                <Col>
                                  <IoIosAddCircle className='primaryColor' size={32} style={{cursor: 'pointer'}} onClick={() => onUpdateCart(product,true)} />
                                </Col>
                              </Row>
                            :
                              <Button onClick={() => onUpdateCart(product,true)} variant="secondary" className='primaryBackground primaryBackgroundHover'>Add to Quote</Button>
                          } */}
                          <Button disabled={quantity > 0} onClick={() => onUpdateCart(product,true)} variant="secondary" className='primaryBackground primaryBackgroundHover'>
                            {quantity > 0 ? 'Added' : 'Add to Quote'}
                          </Button>
                        </div>
                      </Col>
                  })
                }
              </Row>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default ProductsPage

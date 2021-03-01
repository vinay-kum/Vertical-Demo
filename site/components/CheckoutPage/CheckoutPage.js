import { useRouter } from 'next/router'
import { useContext, useState, useEffect } from 'react'
import { Button, Col, Form, FormControl, ListGroup, Row } from 'react-bootstrap'
import { IoIosTrash, IoIosRemoveCircleOutline, IoIosAddCircle } from 'react-icons/io'
import { CommonContext } from '../../providers/commonContexts'
import classes from '../../styles/Checkout.module.css'

function CheckoutPage() {
  const router = useRouter()
  const {cart, setCart} = useContext(CommonContext)
  const [subTotal, setSubTotal] = useState(0)

  // useEffect(() => {
  //   let total = 0
  //   if(cart && cart.length > 0){
  //       for(let i=0; i<cart.length > 0; i++) {
  //           total = total + (cart[i].quantity * Number(cart[i].price))
  //       }
  //   }
  //   setSubTotal(total)
  // }, [cart])

  const onUpdateCart = async(index, isIncrement) => {
    let cartList = cart ? [].concat(cart) : []
    if(isIncrement){
        cartList[index].quantity = cartList[index].quantity + 1
    }else{
        if(cartList[index].quantity == 1){
            cartList.splice(index, 1)
        }else{
            cartList[index].quantity = cartList[index].quantity - 1
        }
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
          <h1><b>Enquiry</b></h1>
          {/* <h5><b>Home  {'/'}  {router.query && router.query.cid ? `Category   ${'/'}   ${router.query.cid}` : 'Products'}</b></h5> */}
          <h5><b>Home  {'/'}  Request For Quote </b></h5>
        </div>
        <img className={classes.bannerImage} src="/images/CheckoutBanner1.jpg" alt="" />
      </div>
      <div style={{padding: 16, backgroundColor: '#fafafa'}}>
        <Row>
          <Col xs={12} md={8} style={{padding: 28}}>
          {cart && cart.length > 0 &&
            cart.map((product, i) => (
              <Row key={i} style={{backgroundColor: '#ffffff', padding: 8, marginBottom: 16}}>
                <Col xs={2}>
                  <img className='img-thumbnail' src={product.imageUrl} alt="" 
                    onClick={() => router.push(`/products/${encodeURIComponent(product.id)}`)}
                    style={{height: 150, width: '100%', objectFit: 'contain', cursor: 'pointer'}} 
                  />
                </Col>
                <Col xs={8} className={classes.centerItems}>
                  <h6><b>{product.name}</b></h6>
                  <p className={classes.descText}>{product.fields.product_overview}</p>
                  {/* <Row style={{alignItems: 'center'}}>
                    <Col>
                      <IoIosRemoveCircleOutline size={32} style={{cursor: 'pointer'}}  onClick={() => onUpdateCart(i,false)} />
                    </Col>
                    <Col>
                      {product.quantity}
                    </Col>
                    <Col>
                      <IoIosAddCircle className='primaryColor' size={32} style={{cursor: 'pointer'}} onClick={() => onUpdateCart(i,true)} />
                    </Col>
                  </Row> */}
                </Col>
                <Col xs={2} className={classes.centerItems}>
                  <IoIosTrash color='grey' size={32} style={{cursor: 'pointer'}} onClick={() => removeFromCart(i)} />
                </Col>
              </Row>
            ))
          }
          </Col>
          <Col xs={12} md={4} style={{padding: 28}}>
            <div variant="flush" style={{backgroundColor: '#ffffff', padding: 16}}>
              {/* <ListGroup.Item>Total : {subTotal}</ListGroup.Item> */}
              <Form>
                <FormControl type="text" placeholder="Name" className="mr-sm-2" />
                <br />
                <FormControl type="email" placeholder="Email" className="mr-sm-2" />
                <br />
                <FormControl type="tel" placeholder="Phone Number" className="mr-sm-2" />
                <br />
                <FormControl type="text" as="textarea" rows={3} placeholder="Message" className="mr-sm-2" />
                <br />
                <Button block variant="secondary" className='primaryBackground primaryBackgroundHover'>Submit Request</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default CheckoutPage

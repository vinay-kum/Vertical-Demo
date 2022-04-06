import { useState, useContext, useEffect } from 'react'
import { Nav, Navbar, NavDropdown, Button, Form, FormControl, Badge } from 'react-bootstrap';
import { useRouter } from 'next/router'
import { CommonContext } from '../../providers/commonContexts';
import { FaShoppingCart } from 'react-icons/fa';

function HeaderMenu({logoUrl, categories}) {

  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { cart } = useContext(CommonContext)
  const [quantity, setQuantity] = useState(0)

  useEffect(() => {
    if(cart && cart.length > 0){
        let total = 0
        for(let i=0; i<cart.length > 0; i++) {
            total = total + cart[i].quantity
        }
        setQuantity(total)
    }
  }, [cart])

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={() => router.push(`/`)}  style={{padding: '8px 16px', cursor: 'pointer'}}>
        <img
          src={logoUrl}
          width='auto'
          height="60"
          // className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => router.push(`/`)}>Home</Nav.Link>
          <NavDropdown title={<span onClick={() => router.push(`/products`)}>Products</span>} id="basic-nav-dropdown" 
            show = {isOpen}
            onMouseEnter = {() => setIsOpen(true)}
            onMouseLeave = {() => setIsOpen(false)}
            // onClick={() => router.push(`/products`)}
          >
            {categories && categories.length > 0 && categories.map((category, i) => (
              <NavDropdown.Item key={i} onClick={() => router.push(`/categories/${encodeURIComponent(category.id)}`)}>-{category.name}</NavDropdown.Item>
            ))}
          </NavDropdown>
          <Nav.Link href="#">About</Nav.Link>
          <Nav.Link href="#">Contact Us</Nav.Link>
        </Nav>
        <Button variant='outline-dark' 
          className='primaryBackgroundHover borderColor primaryColor' 
          onClick={() => router.push(`/checkout`)} 
        >
          Request For Quote {' '}
          <Badge pill variant="danger">{quantity}</Badge>
        </Button>
        &nbsp;&nbsp;
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-secondary">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default HeaderMenu

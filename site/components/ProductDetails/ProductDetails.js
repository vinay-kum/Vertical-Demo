import {useEffect, useState, useContext} from 'react'
import { Row, Col, Button, Tabs, Tab, Table } from 'react-bootstrap'
import classes from '../../styles/Products.module.css'
import parse from 'html-react-parser';
import FrameModal from '../FrameModal/FrameModal';
import { FaRegEdit } from "react-icons/fa";
import { CommonContext } from '../../providers/commonContexts';

function ProductDetails({product}) {
  const {cart, setCart} = useContext(CommonContext)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [quantity, setQuantity] = useState(0)
  // const [frameUrl, setFrameUrl] = useState('')
  const [oracleFrameElement, setOracleFrameElement] = useState(null)
  // const [oracleDownloadFrameElement, setOracleDownloadFrameElement] = useState(null)
  // const oracleUrl = 'https://sandbox-oce0002.cec.ocp.oraclecloud.com/documents/embed'

  useEffect(() => {
    /*global OracleCEUI*/
    if(product && product.fields && product.fields.downloads) {
      const downloadFrameoptions = {
        "component": "documentsView",
        "id": "EMBED_UI",
        "name": "Embed UI",
        "scheme": "default",
        "takeFocus": false,
        "documentsView": {
          "select": "multiple",
          "selectable": "any",
          "header": {
            "hide": true,
            "create": {
              "folder": false,
              "o365": false
            },
            "upload": false,
            "trash": false,
            "favorites": false
          },
          "toolbar": {
            "hide": true
          },
          "breadcrumb": {
            "hide": true,
            "back": false
          },
          "actions": {
            "open": {
              "folder": true,
              "file": true,
              "o365": true
            },
            "edit": {
              "web": false,
              "o365": false
            },
            "favorite": false,
            "uploadToFolder": false,
            "uploadNewVersion": false,
            "download": false,
            "rename": false,
            "reserve": false,
            "move": false,
            "copy": false,
            "delete": false,
            "shareLink": false,
            "members": false,
            "properties": false,
            "tags": false,
            "addToAssets": false,
            "versionHistory": false
          },
          "sidebar": {
            "expand": false,
            "conversation": false,
            "customProperties": false
          },
          "id": product.fields.downloads
        },
      }

      OracleCEUI.oceUrl = "https://sandbox-oce0002.cec.ocp.oraclecloud.com"
      let divElement = document.createElement("DIV"); 
      divElement.appendChild(OracleCEUI.documentsView.createFrame(downloadFrameoptions, () => {}));
      document.getElementById("oracleFrammeDownloadDiv").appendChild(divElement);
    }
  }, [product])

  const onOpenOracleFrame = (isProductEdit) => {
    let frameoptions = {}
    if(isProductEdit) {
      frameoptions = {
        "component": "contentItemEditor",
        "id": "EMBED_UI",
        "name": "Embed UI",
        "scheme": "default",
        "takeFocus": false,
        "contentItemEditor": {
          "header": {
            "hide": false,
            "create": false,
            "annotate": false,
            "fullScreen": false,
            "save": true,
            "close": false
          },
          "actions": {
            "open": false,
            "edit": false,
            "preview": false
          },
          "sidebar": {
            "expand": false,
            "analytics": false,
            "categories": false,
            "channels": false,
            "conversation": false,
            "inventory": false,
            "properties": false,
            "tagsAndCollections": false,
            "translations": false,
            "workflow": false,
            "options": {}
          },
          "id": product.id
        },
      }
      /*global OracleCEUI*/
      OracleCEUI.oceUrl = "https://sandbox-oce0002.cec.ocp.oraclecloud.com"
      setOracleFrameElement(OracleCEUI.contentItemEditor.createFrame(frameoptions, () => {}))
      setIsModalVisible(true)
    } else {
      frameoptions = {
        "component": "documentsView",
        "id": "EMBED_UI",
        "name": "Embed UI",
        "scheme": "default",
        "takeFocus": false,
        "documentsView": {
          "select": "multiple",
          "selectable": "any",
          "header": {
            "hide": false,
            "create": {
              "folder": true,
              "o365": true
            },
            "upload": true,
            "trash": true,
            "favorites": true
          },
          "toolbar": {
            "hide": false
          },
          "breadcrumb": {
            "hide": false,
            "back": false
          },
          "actions": {
            "open": {
              "folder": true,
              "file": true,
              "o365": true
            },
            "edit": {
              "web": true,
              "o365": true
            },
            "favorite": true,
            "uploadToFolder": true,
            "uploadNewVersion": true,
            "download": true,
            "rename": true,
            "reserve": true,
            "move": true,
            "copy": true,
            "delete": true,
            "shareLink": true,
            "members": true,
            "properties": true,
            "tags": true,
            "addToAssets": true,
            "versionHistory": true
          },
          "sidebar": {
            "expand": true,
            "active": "",
            "conversation": true,
            "customProperties": true
          },
          "id": product.fields.downloads
        },
      }
      /*global OracleCEUI*/
      OracleCEUI.oceUrl = "https://sandbox-oce0002.cec.ocp.oraclecloud.com"
      setOracleFrameElement(OracleCEUI.documentsView.createFrame(frameoptions, () => {}))
      setIsModalVisible(true)
    }
  }

  useEffect(() => {
    let itemQuantity = 0
    let index = cart ? cart.findIndex((item) => item.id == product.id) : -1
    if(index >= 0){
      itemQuantity = cart[index].quantity
    }
    setQuantity(itemQuantity)
  }, [cart, product])

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

  return (
    <div>
      <FrameModal
        visible={isModalVisible} 
        // frameUrl={frameUrl}
        frameElement={oracleFrameElement}
        handleClose={() => {setIsModalVisible(false);}} 
      />
      <div className={classes.banner} >
        <div className={classes.bannerText}>
          <h1><b>Our Shop</b></h1>
          <h5><b>Home  {'/'}  Menu   {'/'}   {product.name}</b></h5>
        </div>
        { product && product.id ?
            <img className={classes.bannerImage} src={product.imageUrl} alt="" />
          :
            <img className={classes.bannerImage} src='/oracle-icon.svg' alt="" />
        }
      </div>
      <div style={{padding: 16, backgroundColor: '#fafafa'}}>
        {product && product.id && <FaRegEdit onClick={() => onOpenOracleFrame(true)} size={24} className='primaryColor' style={{float: 'right', cursor: 'pointer'}} />}
        <Row>
          <Col>
            <img src={product.imageUrl} alt="" 
                style={{height: 500, width: '100%', objectFit: 'contain'}} 
              />
          </Col>
          <Col className='centerAlign' style={{justifyContent: 'center'}}>
            <h3><b>{product.name}</b></h3>
            <p></p>
            <p>{product.fields && product.fields.product_overview}</p>
            <p></p>
            <Button disabled={quantity > 0} onClick={() => onUpdateCart(product,true)} variant="secondary" className='primaryBackground primaryBackgroundHover' style={{alignSelf: 'flex-end'}}>
              {quantity > 0 ? 'Added' : 'Add to Quote'}
            </Button>
            <p></p>
            {/* <p><b>Catgoey: {}</b></p> */}
          </Col>
        </Row>
        <p></p>
        <div style={{padding: 32, minHeight: 200}}>
          {/* <FaRegEdit onClick={() => onOpenOracleFrame(false)} style={{float: 'right', cursor: 'pointer'}} /> */}
          <Tabs defaultActiveKey="description" id="uncontrolled-tab-example">
            <Tab eventKey="description" title="Description">
              {product && product.id && <FaRegEdit onClick={() => onOpenOracleFrame(true)} size={24} className='primaryColor' style={{float: 'right', cursor: 'pointer'}} />}
              {product.fields && parse(product.fields.product_description)}
            </Tab>
            <Tab eventKey="additionalInformation" title="Additional Information">
              {product && product.id && <FaRegEdit onClick={() => onOpenOracleFrame(true)} size={24} className='primaryColor' style={{float: 'right', cursor: 'pointer'}} />}
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {product.fields && product.fields.additional_information && product.fields.additional_information['additional-prop'] && product.fields.additional_information['additional-prop'].length > 0 &&
                    product.fields.additional_information['additional-prop'].map((info, i) => (
                      <tr key={i}>
                        <td><b>{info.key}</b></td>
                        <td>{info.value}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="downloads" title="Downloads">
              {/* {product.fields && product.fields.downloads} */}
              { product.fields && product.fields.downloads && 
                <>
                  <FaRegEdit onClick={() => onOpenOracleFrame(false)} size={24} className='primaryColor' style={{float: 'right', cursor: 'pointer'}} />
                  <div id="oracleFrammeDownloadDiv" className='iFrameDiv' style={{width:'100%', height: '75vh'}}></div>
                </>
              }
            </Tab>
            <Tab eventKey="resource" title="Resources">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {product.downloadFiles && product.downloadFiles.length > 0 &&
                    product.downloadFiles.map((file, i) => (
                      <tr key={i}>
                        <td>{file.name}</td>
                        <td>{file.type}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

import { useContext } from "react"
import { CommonContext } from "../providers/commonContexts"

export async function getSiteConfiguration() {
  let config = {}
  await fetch(`https://sandbox-oce0002.cec.ocp.oraclecloud.com/content/published/api/v1.1/items?q=(type eq "SiteConfiguration" )&channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.items && result.items.length > 0){
          // setAllItems(result.items)
          for(let i=0; i<result.items.length; i++){
            config = result.items[i]
          }
        }
      },
      (error) => {
        console.error(error)
      }
    )
  return config
}

export async function getCategories(catId) {
  let catList = []
  await fetch(`https://sandbox-oce0002.cec.ocp.oraclecloud.com/content/published/api/v1.1/taxonomies/${catId}/categories?channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.items && result.items.length > 0){
          // setAllItems(result.items)
          for(let i=0; i<result.items.length; i++){
            catList.push(result.items[i])
          }
        }
      },
      (error) => {
        console.error(error)
      }
    )
  return catList
}

export async function getProducts(catId = '') {
  let products = []
  await fetch(`https://sandbox-oce0002.cec.ocp.oraclecloud.com/content/published/api/v1.1/items?q=(type eq "Products" ${catId ? ` AND (taxonomies.categories.id eq "${catId}") ` : ''})&channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`)
    .then(res => res.json())
    .then(
      (result) => {
        if(result.items && result.items.length > 0){
          // setAllItems(result.items)
          for(let i=0; i<result.items.length; i++){
            let productObj = {}
            productObj = result.items[i]
            productObj.imageUrl = `https://sandbox-oce0002.ocecdn.oraclecloud.com/content/published/api/v1.1/assets/${result.items[i].fields.product_image[0].id}/Large/${result.items[i].fields.product_nam.replace(/ /g, '+')}.jpg?format=jpg&type=responsiveimage&channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`
            products.push(productObj)
          }
        }
      },
      (error) => {
        console.error(error)
      }
    )
  return products
}

export async function getProductById(id) {
  let product = {}
  await fetch(`https://sandbox-oce0002.cec.ocp.oraclecloud.com/content/published/api/v1.1/items/${id}?channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`)
    .then(res => res.json())
    .then(
      (result) => {
        if(result && result.id){
          product = result
          product.imageUrl = `https://sandbox-oce0002.ocecdn.oraclecloud.com/content/published/api/v1.1/assets/${result.fields.product_image[0].id}/Large/${result.fields.product_nam.replace(/ /g, '+')}.jpg?format=jpg&type=responsiveimage&channelToken=${process.env.NEXT_PUBLIC_OCE_CHANNELTOKEN}`
          product.downloadFiles = []
          fetch(`https://sandbox-oce0002.cec.ocp.oraclecloud.com/pxysvc/proxy/docs/folders/${product.fields.downloads}/items`)
            .then(res => res.json())
            .then(
                (result) => {
                    if(result.items && result.items.length > 0){
                      product.downloadFiles = result.items
                    }
                },
                (error) => {
                    console.error(error)
                }
            )
        }
      },
      (error) => {
        console.error(error)
      }
    )
  return product
}
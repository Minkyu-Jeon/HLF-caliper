const fs = require('fs')
const assetSize = 100
const categories = ["가전/냉장고", "가전/세탁기", "차량용품/방향제", "가전/믹서기", "사무용품/노트북"]
const titles = ["사용하던 냉장고 판매합니다", "세탁기 싸게 내놓습니다", "방향제 가져가실분", "믹서기 팝니다", "노트북 처분합니다"]
const regions = ["서울", "경기", "인천", "세종", "강원", "충북", "대전", "충남", "경북", "대구", "부산", "경남", "광주", "전북", "전남"]
const productNames = ['LG 디오스', "삼성 버블드럼세탁기", "양키캔들 방향제", "테팔 믹서기", "M1 실리콘 맥북"]
const jsonObject = []
const imageUrls = [
  'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQyqzo02_HSHO9PHTsCil9HGnfdUTJ898IZ8ZwHRKzjwsq077mAd2yQcc3DR74UcA&usqp=CAc',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz_rposRRapY2OR6ej_NVGmIK34XCcHA2jgXrKbUmxq6MLd3o8s9U-qaq92WbCuaaY_VYV4ipv&usqp=CAc',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLUk4KSnyMeQwztMIW7wl6H2RcbgqVA1E_VnG_Vdy9JCQjjZFZ90WnJ0Sp9pNMPU_NuHSJf7E&usqp=CAc',
  'http://image.auction.co.kr/itemimage/14/f2/3a/14f23a29c6.jpg',
  'https://www.autodaily.co.kr/news/photo/202001/415396_48776_959.jpg',
  'https://lh3.googleusercontent.com/proxy/OVL92X0_s6oduetG0kFH8UH3nxsfeRXpUjfuoM0HCIk6kN7QWbThkOnBl6x-KQ3LJcvENjawSI1QB-zOEBKr_8Wd-g7ahMEzBLjsZ2c5Ck5q_s-0Rg',
  'http://s3.ap-northeast-2.amazonaws.com/whitecotton/images/godo/goods/19/09/39/1000004477/1000004477_detail_066.jpg'
]
const sellers = ['user1@example.com', 'user2@example.com', 'user3@example.com', 'user4@example.com', 'user5@example.com']


for ( let i = 0; i < assetSize; i++ ) {
  let description = 'description'
  let price = parseInt(Math.random() * 1000000)
  let categoryIndex = parseInt(Math.random() * categories.length)
  let category = categories[categoryIndex]
  let region = parseInt(Math.random() * regions.length)
  let title = `[${regions[region]}] ${titles[categoryIndex]}_${i}`
  let product_name = `${productNames[categoryIndex]}_${i}`
  let image_url = imageUrls[categoryIndex]
  let serialNumber = `${i}`

  let seller = sellers[categoryIndex]

  let object = {
    SerialNumber: serialNumber,
    Category: category,
    Title: title,
    ProductName: product_name,
    ImageUrl: image_url,
    Description: description,
    Price: price,
    Seller: seller,
    MSPID: 'Org1MSP'
  }
  jsonObject.push(object)
}

fs.writeFileSync('./seed.json', JSON.stringify(jsonObject, null, 2))

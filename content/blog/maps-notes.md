# 高德、百度等地图笔记

## 坐标系

- WGS84：为一种大地坐标系，也是目前广泛使用的GPS全球卫星定位系统使用的坐标系。

- GCJ02：又称火星坐标系，是由中国国家测绘局制订的地理信息系统的坐标系统。由 WGS84坐标系经加密后的坐标系。（G表示 Guojia 国家，C表示 Cehui 测绘，J表示Ju局），高德地图使用该坐标系

- BD09：为百度坐标系，在GCJ02坐标系基础上再次加密。百度地图API 使用该坐标系

```js
const convertor = new BMap.Convertor()
// const convertor = new BMapGL.Convertor()
const points = []
points.push(ggPoint)
convertor.translate(
  pointArr,
  COORDINATES_WGS84,
  COORDINATES_BD09,
  translateCallback
)
```

```js
// 坐标系转换
convertorTranslate(arr) {
  const points = []
  arr.map(item => {
    points.push(new this.BMap.Point(item.lng, item.lat))
  })

  return new Promise((resolve, reject) => {
    const convertor = new this.BMap.Convertor()
    convertor.translate(points, 3, 5, result => {
      console.log( result)
      resolve(result)
    })
  })
}

/**
  * 坐标常量说明：
  * COORDINATES_WGS84 = 1, WGS84坐标
  * COORDINATES_WGS84_MC = 2, WGS84的平面墨卡托坐标
  * COORDINATES_GCJ02 = 3，GCJ02坐标
  * COORDINATES_GCJ02_MC = 4, GCJ02的平面墨卡托坐标
  * COORDINATES_BD09 = 5, 百度bd09经纬度坐标
  * COORDINATES_BD09_MC = 6，百度bd09墨卡托坐标
  * COORDINATES_MAPBAR = 7，mapbar地图坐标
  * COORDINATES_51 = 8，51地图坐标
  */
```

高德地图坐标拾取 [https://lbs.amap.com/tools/picker](https://lbs.amap.com/tools/picker)

百度地图坐标拾取 [https://api.map.baidu.com/lbsapi/getpoint/](https://api.map.baidu.com/lbsapi/getpoint/)

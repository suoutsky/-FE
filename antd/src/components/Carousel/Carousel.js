/**
 * Created by admin on 16/7/12.
 */
import React, { component,PropTypes } from 'react'
import { Carousel } from 'antd'

const ImgShow = ({imgdata}) => {
  //const { img1, img2, img3, img4 } = imgdata;
  return (
    <Carousel autoplay>
      <div><h3>1</h3></div>
      <div><h3>2</h3></div>
      <div><h3>3</h3></div>
      <div><h3>4</h3></div>
    </Carousel>
  )
}

ImgShow.propTypes = {
  // imgdata: PropTypes.object.isRequired
}
export default ImgShow

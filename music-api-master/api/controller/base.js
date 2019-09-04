/*
 * @Author: 马新杰 
 * @Date: 2019-09-04 15:49:40 
 * @Last Modified by: 马新杰
 * @Last Modified time: 2019-09-04 16:10:47
 */

// const host = 'http://localhost:3000'

const upload = (req, res) => {
    res.json({
      code: 1,
      url: `/uploads/${req.file.filename}`
    })
  }
  
  module.exports = {
    upload
  }
  
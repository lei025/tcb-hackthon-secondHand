// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  // console.log('****',event)
  const openid = cloud.getWXContext().OPENID;
event['openid'] = openid
  var items = {};
  try {
    await db.collection('sh_items').add({
      data: event
    }).then(res => {
      items = res;
      console.log(items);
    });
  } catch (err) {
    console.log(err);
  }

  return items;
}
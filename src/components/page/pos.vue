<template>
  <div>
    <el-row>
      <el-col :span="7" class="red" id="pos-order">
        <!-- 我是订单栏 -->
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table border width="100%" :data="tableDate">
              <el-table-column prop="goodsName" label="商品名称" width="100"></el-table-column>
              <el-table-column prop="count" label="数量" width="50"></el-table-column>
              <el-table-column prop="price" label="金额" width="50"></el-table-column>
              <el-table-column label="操作" width="100" fixed="right">
                <template class="caozuo" scope="scope">
                  <el-button type="text" size="small" @click="deleteSingle(scope.row)">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane label="挂单">挂单</el-tab-pane>
          <el-tab-pane label="外卖">外卖</el-tab-pane>
        </el-tabs>
        <div class="total">
          <span>
            <small>数量：</small>
            {{totalCount}}
          </span>
          <span>
            <small>金额：</small>
            {{totalMoney}}元
          </span>
        </div>
        <div class="divBtn">
          <el-button type="warning">挂单</el-button>
          <el-button type="danger" @click="deleteAll">删除</el-button>
          <el-button type="success" @click="account">结账</el-button>
        </div>
      </el-col>
      <el-col :span="17">
        <div class="ofen-goods">
          <div class="title">常用商品</div>
          <div>
            <ul>
              <li
                class="goods-list"
                v-for="(item,index) in oftenGoods"
                :key="index"
                @click="addOrderList(item)"
              >
                <span>{{item.goodsName}}</span>
                <span>￥{{item.price}}元</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="table-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class="cookList">
                <li
                  v-for="(typGood,index) in type0Goods"
                  :key="index"
                  @click="addOrderList(typGood)"
                >
                  <span class="foodImg">
                    <img :src="typGood.goodsImg" />
                  </span>
                  <span class="foodName">{{typGood.goodsName}}</span>
                  <span class="foodPrice">￥{{typGood.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">小食</el-tab-pane>
            <el-tab-pane label="饮料">饮料</el-tab-pane>
            <el-tab-pane label="主食">主食</el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableDate: [],
      oftenGoods: [
        {
          goodsId: 1,
          goodsName: "香辣鸡腿堡",
          price: 18
        },
        {
          goodsId: 2,
          goodsName: "田园鸡腿堡",
          price: 15
        },
        {
          goodsId: 3,
          goodsName: "和风汉堡",
          price: 15
        },
        {
          goodsId: 4,
          goodsName: "快乐全家桶",
          price: 80
        },
        {
          goodsId: 5,
          goodsName: "脆皮炸鸡腿",
          price: 10
        },
        {
          goodsId: 6,
          goodsName: "魔法鸡块",
          price: 20
        },
        {
          goodsId: 7,
          goodsName: "可乐大杯",
          price: 10
        },
        {
          goodsId: 8,
          goodsName: "雪顶咖啡",
          price: 18
        },
        {
          goodsId: 9,
          goodsName: "大块鸡米花",
          price: 15
        },
        {
          goodsId: 20,
          goodsName: "香脆鸡柳",
          price: 17
        }
      ],
      type0Goods: [
        {
          goodsId: 1,
          goodsImg: require("../../assets/hanbao2.jpg"),
          goodsName: "香辣鸡腿堡",
          price: 18
        },
        {
          goodsId: 2,
          goodsImg: require("../../assets/hanbao1.jpg"),
          goodsName: "田园鸡腿堡",
          price: 15
        },
        {
          goodsId: 3,
          goodsImg: require("../../assets/hanbao2.jpg"),
          goodsName: "和风汉堡",
          price: 15
        },
        {
          goodsId: 4,
          goodsImg: require("../../assets/taocan1.jpg"),
          goodsName: "快乐全家桶",
          price: 80
        },
        {
          goodsId: 5,
          goodsImg: require("../../assets/single1.jpg"),
          goodsName: "脆皮炸鸡腿",
          price: 10
        },
        {
          goodsId: 6,
          goodsImg: require("../../assets/single2.jpg"),
          goodsName: "魔法鸡块",
          price: 20
        },
        {
          goodsId: 7,
          goodsImg: require("../../assets/single3.jpg"),
          goodsName: "可乐大杯",
          price: 10
        },
        {
          goodsId: 8,
          goodsImg: require("../../assets/single1.jpg"),
          goodsName: "雪顶咖啡",
          price: 18
        },
        {
          goodsId: 9,
          goodsImg: require("../../assets/hanbao1.jpg"),
          goodsName: "大块鸡米花",
          price: 15
        },
        {
          goodsId: 20,
          goodsImg: require("../../assets/hanbao2.jpg"),
          goodsName: "香脆鸡柳",
          price: 17
        }
      ],
      totalMoney: 0,
      totalCount: 0
    };
  },

  mounted() {
    //用js控制elment元素的高度
    let posOrder = document.getElementById("pos-order");
    let toHeight =
      document.body.clientHeight || document.documentElement.clientHeight;
    console.log(toHeight);
    posOrder.style.height = toHeight + "px";
  },
  methods: {
    //点击自动增加到tableDate中。
    addOrderList(goods) {
      // console.log(this.tableDate[0].goodsName+"---------------------------------")
      //判断tableDate是否存在goods这个数据，
      let isHave = false;
      for (var i = 0; i < this.tableDate.length; i++) {
        if (this.tableDate[i].goodsId == goods.goodsId) {
          isHave = true;
        }
      }
      //根据判断的结果，如果存在则count加一，如果不存在则在tableDate中添加这一条数据
      if (isHave) {
        let arr = this.tableDate.filter(o => o.goodsId == goods.goodsId);
        arr[0].count++;
      } else {
        let nowGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        };
        this.tableDate.push(nowGoods);
      }
      //遍历数组计算总价格和总数量。
      this.totalAll();
    },
    //删除单个商品
    deleteSingle(goods) {
      this.tableDate = this.tableDate.filter(o => o.goodsId != goods.goodsId);
      this.totalAll();
    },
    //结账
    account() {
      if (this.totalCount != 0) {
        this.tableDate = [];
        this.totalMoney = 0;
        this.totalCount = 0;
        this.$message({
          message:"结账成功",
          type:"success"

        })
      }
    },
    //将汇总数量和价格提取出来复用
    totalAll() {
      this.totalMoney = 0;
      this.totalCount = 0;
      for (let goods of this.tableDate) {
        this.totalCount += goods.count;
        this.totalMoney += goods.count * goods.price;
      }
    },
    //清空tableDate
    deleteAll() {
      this.tableDate = [];
      this.totalMoney = 0;
      this.totalCount = 0;
    }
  }
};
</script>
<style lang="" scoped>
.red {
  /* background-color: red; */
  border-right: 1px solid grey;
}
.divBtn {
  margin-top: 20px;
}
.title {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #b0cccc;
  text-align: left;
  background-color: #afb68b;
}
.goods-list {
  float: left;
  border: 2px solid #eaaee6;
  border-radius: 5%;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  padding: 0 5px;
  margin: 5px;
  margin-top: 20px;
  cursor: pointer;
}
.table-type {
  clear: both;
}
.cookList li {
  width: 25%;
  border: 1px solid rgb(222, 226, 235);
  height: auto;
  overflow: hidden;
  background-color: rgb(221, 218, 218);
  padding: 2px;
  float: left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodImg img{
  width: 100%;
  height: 55px;
}
.foodName {
  margin-top: 10px;
  font-size: 16px;
  padding-left: 10px;
  color: brown;
}
.foodPrice {
  font-size: 16px;
  margin-left: 10px;
  padding-left: 10px;
  padding-top: 10px;
}
.total {
  background-color: #fff;
  padding: 5px;
  border-bottom: 1px solid gainsboro;
}
.total span {
  margin: 10px;
  font-size: 19px;
}
</style>
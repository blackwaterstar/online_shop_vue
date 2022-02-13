<template>
  <div class="content-panel">
    <el-button
            type="primary"
            @click="openOrderPanel1"
    >查看未支付订单</el-button
    >

    <div class="content-box chearfix">
      <!-- 没有订单或加载中 -->
      <div
              class="empty-box"
              v-if="orders.length === undefined || orders.length === 0"
      >
        <el-empty description="您还没有已订单呢"></el-empty>
      </div>
      <ol class="infinite-list" v-else>
        <li class="order-List" v-for="(order, index) in orders" :key="index">
          <div>
            <div class="order-box">
              <el-descriptions
                      direction="vertical"
                      title="订单信息"
                      :column="2"
                      size="mini"
                      border
              >
                <template slot="extra">
                  <el-button
                          type="primary"
                          size="mini"
                          @click="openOrderPanel(index)"
                  >订单信息</el-button
                  >
                </template>
                <el-descriptions-item>
                  <template slot="label"> 订单编号 </template>
                  {{ order.orderId }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 购买日期 </template>
                  {{ order.tOrder.createdTime }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 订单价格 </template>
                  {{ order.orderPrice }}
                </el-descriptions-item>
                <!-- <el-descriptions-item>
                  <template slot="label"> 发货地址 </template>
                  {{ order.tOrder.orderAddr }}
                </el-descriptions-item> -->
                <el-descriptions-item>
                  <template slot="label"> 订单状态 </template>
                  <p
                          style="color: red"
                          v-if="order.tOrder.paystatue === '未付款'"
                  >
                    {{ order.tOrder.paystatue }}
                  </p>
                  <p style="color: yellowgreen" v-else>
                    {{ order.tOrder.paystatue }}
                  </p>
                </el-descriptions-item>
              </el-descriptions>

              <el-descriptions
                      direction="vertical"
                      :column="4"
                      size="mini"
                      border
                      v-for="(product, index) in order.products"
                      :key="index"
              >
                <el-descriptions-item>
                  <template slot="label"> 物品名称 </template>
                  <el-tag size="small">{{ product.pname }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 物品数量 </template>
                  {{ product.pcount }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 物品单价 </template>
                  {{ product.price }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 操作 </template>
                  <el-button
                          type="primary"
                          size="mini"
                          @click="handleComment(order,product.ppid)"
                          :disabled="order.tOrder.paystatue === '未付款'"
                  >评论</el-button
                  >
                </el-descriptions-item>

              </el-descriptions>
              <el-descriptions
                      direction="vertical"
                      :column="4"
                      size="mini"
                      border
              >
                <el-descriptions-item>
                  <template slot="label"> 收件人 </template>
                  <!--                <el-tag size="small">{{ order.orderUser }}</el-tag>-->
                  {{ order.tOrder.orderUser }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 地址 </template>
                  {{ order.tOrder.orderAddr }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 电话 </template>
                  {{ order.tOrder.orderTel }}
                </el-descriptions-item>
                <el-descriptions-item>
                  <template slot="label"> 操作 </template>
                  <el-button type="primary" @click="dialogFormVisible = true" size="mini"
                             :disabled="order.tOrder.paystatue === '已付款'">修改</el-button>
                  <el-dialog title="输入新的收货信息" :visible.sync="dialogFormVisible">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="收件人" prop="orderUser">
                        <el-input v-model="ruleForm.orderUser"></el-input>
                      </el-form-item>
                      <el-form-item label="地址" prop="orderAddr">
                        <el-input v-model="ruleForm.orderAddr"></el-input>
                      </el-form-item>
                      <el-form-item label="电话" prop="orderTel">
                        <el-input v-model="ruleForm.orderTel"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="handleSummit(order.tOrder.orderId)">修改</el-button>
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-dialog>
                </el-descriptions-item>
              </el-descriptions>

            </div>
            <h4>我的评论</h4>
            <P v-show="order.comments.length === 0" style="text-align: center"
            >暂无评论</P

            >
            <div v-for="comment in order.comments" :key="comment.comment.commentId">
              <div class="comment-item">
                <div class="comment-content">
                  <el-tag type="success">已买{{ comment.pname }}</el-tag><br/>
                  {{comment.comment.content }}
                </div>
                <div class="comment-createtime">{{ comment.comment.createtime }}</div>
              </div>
            </div>
          </div>
        </li>
      </ol>

      <!-- 订单付款界面 -->
      <div class="code-box" v-show="isShowOrder">
        <div class="recharge-box">
          <el-button
                  class="danger-btn"
                  type="danger"
                  @click="closeOrderPanel"
                  circle
          >×</el-button
          >
          <el-descriptions
                  direction="vertical"
                  title="订单信息"
                  :column="2"
                  size="mini"
                  border
          >
            <el-descriptions-item>
              <template slot="label"> 订单编号 </template>
              {{ orders[showOrder].orderId }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 购买日期 </template>
              {{ orders[showOrder].tOrder.createdTime }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label"> 订单价格 </template>
              {{ orders[showOrder].orderPrice }}
            </el-descriptions-item>
            <!-- <el-descriptions-item>
              <template slot="label"> 发货地址 </template>
              {{ orders[showOrder].tOrder.orderAddr }}
            </el-descriptions-item> -->
            <el-descriptions-item>
              <template slot="label"> 订单状态 </template>
              <p
                      style="color: red"
                      v-if="orders[showOrder].tOrder.paystatue === '未付款'"
              >
                {{ orders[showOrder].tOrder.paystatue }}
              </p>
              <p style="color: yellowgreen" v-else>
                {{ orders[showOrder].tOrder.paystatue }}
              </p>
            </el-descriptions-item>
          </el-descriptions>
          <p>我的余额：￥{{ this.user.userAmount }}</p>
          <el-button
                  type="success"
                  @click="cost"
                  :disabled="orders[showOrder].tOrder.paystatue !== '未付款'"
          >确认付款</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {/* apiSelectListComment, */selectListCommentByOrderId,apiAddComment } from "@/api/comment.js";
  import { apiGetList1, apiGetOrder, apiUpdatestatme, apiUpdateOrder} from "@/api/order.js";
  import { apiCost } from "@/api/wallet";
  import { apiSelectProductInfo } from "@/api/productInfo.js";
  import { mapState } from "vuex";
  export default {
    name: "InfoPanel",
    data() {
      return {
        isShowOrder: false,
        showOrder: 0,
        orders: [{ tOrder: { paystatue: "未付款" }, comments: [{comment:{}, pname:'666',}] }],
        ruleForm:{
          orderId:'',
          orderUser:'',
          orderAddr:'',
          orderTel:''
        },
        formLabelWidth:'120px',
        dialogFormVisible: false,
        // rules: {
        //   orderTel: [
        //     {required: true, message: '请输入手机号码', trigger: 'blur'},
        //     {min: 11, max: 11, message: '长度必须是11个数字', trigger: 'blur'}
        //   ],
        //
        // }
        rules: {
          orderTel: [
            { required: true, message: '请输入电话号码', trigger: 'blur' },
            { min: 1, max: 11, message: '长度在 1 到 11 个字符', trigger: 'blur' }
          ],
          orderAddr: [
            { required: true, message: '请输入地址', trigger: 'change' }
          ],
          orderUser: [
            { required: true, message: '请收件人', trigger: 'change' }
          ],

        }
      };

    },
    mounted() {
      this.initData();
    },
    computed:{
      ...mapState(["user"]),
    },
    methods: {

      openOrderPanel1(){
        this.$router.push("/user/orderPanel")
      },
      // 提交购物车内订单
      handleSummit(orderId) {
        // 修改订单地址
        apiUpdateOrder({
          orderId: orderId,
          orderUser:this.ruleForm.orderUser,
          orderAddr:this.ruleForm.orderAddr,
          orderTel:this.ruleForm.orderTel,
        }).then((res)=>{
          if(res){
            this.dialogFormVisible=false
            this.$message({
              type: "success",
              message: "修改成功",
            });
          }
          else {
            this.$message({
              type: "error",
              message: "修改失败",
            });
          }
        });
      },
      initData() {
        apiGetList1({ userId: this.$store.state.user.user.userId }).then((res) => {
          this.orders = res.data;
          this.orders.forEach((order) => {
            apiGetOrder({ orderId: order.orderId }).then((res) => {
              this.$set(order, "tOrder", res.data);
            });
            selectListCommentByOrderId({ orderId: order.orderId }).then((res) => {
              this.$set(order, "comments", res.data);
            });
          });
        });
      },
      getName(ppid){
        apiSelectProductInfo({ ppid: ppid }).then((res) => {
          this.pname=res.data.pname;
        });
      },
      handleComment(order,pid) {
        this.$prompt("请输入评论", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        }).then(({ value }) => {
          let comment = {
            userId: this.$store.state.user.user.userId,
            ppid: pid,
            orderId: order.orderId,
            content: value,
          };
          apiAddComment(comment).then((res) => {
            if (res.status) {
              this.$message({
                type: "success",
                message: "评论成功，欢迎下次再见",
              });
              setTimeout(this.initData(), 3000);
            }
          });
        });
      },
      openOrderPanel(value) {
        this.showOrder = value;
        this.isShowOrder = true;
      },
      closeOrderPanel() {
        this.isShowOrder = false;
      },
      cost() {
        if (this.user.userAmount >= this.orders[this.showOrder].orderPrice) {
          apiCost({
            userId: this.user.user.userId,
            money: this.orders[this.showOrder].orderPrice,
          }).then((res) => {
            if (res.status === 200) {
              apiUpdatestatme({
                orderId: this.orders[this.showOrder].orderId,
              }).then((res) => {
                if (res.status === 200) {
                  this.$message({
                    type: "success",
                    message: "付款成功",
                  });
                 this.initData()
                  this.$store.dispatch(
                          "walletDown",
                          this.orders[this.showOrder].orderPrice
                  );
                  this.closeOrderPanel();
                }
              });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "评论成功，欢迎下次再见",
          });
        }
      },
    },

  };
</script>

<style scoped lang = "less">
  .chearfix::after,
  .chearfix::before {
    content: "";
    display: table;
    clear: both;
  }
  .content-panel {
    width: 100%;
    height: 100%;
    .content-box {
      margin: 30px;
      .order-List {
        margin-bottom: 40px;
        border-bottom: 1px solid greenyellow;
        .comment-item {
          border-bottom: 1px solid greenyellow;
          .comment-content {
            min-height: 50px;
          }.comment-pname {
             min-height: 50px;
           }
          .comment-createtime {
            text-align: end;
            color: rgb(165, 165, 165);
          }
        }
      }
    }
  }

  .code-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    .recharge-box {
      padding: 20px;
      position: fixed;
      top: 50%;
      left: 50%;
      background-color: white;
      border-radius: 10px;
      transform: translate(-50%, -50%);
      * {
        display: block;
        margin-top: 5px;
      }
      .danger-btn {
        position: absolute;
        top: 0;
        right: 10px;
        width: 40px;
        height: 40px;
      }
    }
  }
</style>

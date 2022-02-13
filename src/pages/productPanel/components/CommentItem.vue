<template>
  <div class="comment-item chearfix">
    <div class="content-box chearfix">
      <div class="user-box">
        <el-avatar class="img-box" icon="el-icon-user-solid"></el-avatar>
        <p style="text-align: center">{{ comment.comment.userId }}</p>
      </div>

      <div class="comment-box">
        <div class="comment-info">
          <el-tag type="success">已买{{ comment.pname }}</el-tag><br/>
          {{ comment.comment.content }}</div>
        <div class="comment-editTime">{{ comment.comment.createtime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { apiSelectCommentReply } from "@/api/commentReply.js";
export default {
  name: "CommentItem",
  props: ["comment"],
  data() {
    return { replys: {} };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      // this.comment.id
      // apiSelectCommentReply(1).then((res) => {
      //   this.replys = res.data;
      // });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-item {
  width: 100%;
}
.chearfix::before,
.chearfix::after {
  content: "";
  display: table;
  clear: both;
}
.content-box {
  margin-bottom: 20px;
}
.user-box {
  float: left;
  width: 100px;
  height: 130px;
}
.img-box {
  width: 100px;
  height: 100px;
}
.comment-box {
  float: left;
  width: 650px;
  margin: 0 20px;
  border: 1px solid black;
}
.comment-info {
  margin: 20px;
  margin-bottom: 0;
  height: 120px;
}
.comment-editTime {
  margin: 20px;
  margin-top: 0;
  color: dimgrey;
}
.reply-box {
  margin: 20px;
  padding: 10px;
  border: 1px solid black;
}
.reply-user-box {
  display: flex;
  align-items: center;
  /* width: ; */
}
.reply-img-box {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  flex-grow: 0;
}
.reply-info {
  height: 70px;
  border: 1px solid black;
}
.reply-editTime {
  color: dimgrey;
}
.comment-add-box {
  margin: 20px;
  padding: 20px;
  border: 1px solid salmon;
}
.comment-testarea {
  margin-bottom: 20px;
  padding: 10px;
  width: 500px;
  height: 80px;
  resize: none;
}
</style>
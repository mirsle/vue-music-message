/*
 * @Author: 马新杰 
 * @Date: 2019-09-05 16:28:38 
 * @Last Modified by: 马新杰
 * @Last Modified time: 2019-09-05 20:18:36
 */
<template>
  <div class="box">
    <!-- 音乐歌曲详情列表 -->
    <el-container class="ertd">
      <el-header>
        <div class="retreat">
          <span>欢迎 {{username}}</span>
          <el-button @click="open">退出</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">音乐列表</el-aside>
        <el-main>
          <el-button class="addbtn" @click="dialogFormVisible = true">添加</el-button>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column label="序号" type="index" prop="index"></el-table-column>
            <el-table-column label="歌名" prop="music_name"></el-table-column>
            <el-table-column label="图片">
              <template slot-scope="img">
                <div>
                  <img :src="img.row.pic" alt class="m-imgs" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="歌手" prop="singer_name"></el-table-column>
            <el-table-column label="是否上架">
              <template slot-scope="is">
                <div>
                  <span>{{is.row.isup==1 ? '是' :'否'}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="right" label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="this.total"
            :page-size="this.limit"
            @current-change="pageChange"
          ></el-pagination>
          <!-- 分页 -->
        </el-main>
      </el-container>

    
    </el-container>
      <!-- 音乐歌曲详情列表 -->

    <!-- 添加歌曲弹窗 -->
    <el-dialog title="添加" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="歌名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手" :label-width="formLabelWidth">
          <el-input v-model="form.song" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <input type="file" @change="onloadimg" />
        </el-form-item>
        <el-form-item label="是否上架" :label-width="formLabelWidth">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
     
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="uploadToprops">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 添加歌曲弹窗 -->



    <!-- 修改歌曲弹窗 -->
    <el-dialog title="修改" :visible.sync="dialogdisplay">
      <el-form :model="form">
        <el-form-item label="歌名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌手" :label-width="formLabelWidth">
          <el-input v-model="form.song" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <input type="file" @change="onloadimg" />
        </el-form-item>
          <el-form-item label="Id" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否上架" :label-width="formLabelWidth">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
  
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogdisplay=false">取 消</el-button>
        <el-button type="primary" @click="ModifyToprops">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改歌曲弹窗 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  created() {
    this.$api.user.getinfo().then(res => {
      //获取用户登录信息
      if (res.data.code == 1) {
        this.setUserName(res.data.data.username);
      }
    });
    this.GetMusicList();
  },
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      dialogdisplay:false,
      pagenum: 1,
      limit: 5,
      total: 0,
      form: {
        name: "",
        song: "",
        radio: 0,
        url: "",
        id:""
      },
      formLabelWidth: "120px"
    };
  },

  methods: {
    ...mapMutations(["setUserName"]), //vuex 设置 用户名
    //添加歌曲上传图片
    onloadimg(e) {
      let file = e.target.files[0];
      let formdata = new FormData();
      formdata.append("file", file);
      this.$api.music.upload(formdata).then(res => {
        this.form.url += "http://localhost:3000" + res.data.url;
      });
    },
    pageChange(
      val //分页点击切换页数
    ) {
      this.pagenum = val;
      this.GetMusicList();
    },

    GetMusicList() {
      this.$api.music
        .querymusic({ pagenum: this.pagenum, limit: this.limit }) //获取音乐列表
        .then(res => {
          if (res.data.code == 1) {
            this.tableData = res.data.data;
            this.total = res.data.total;
          }
        });
    },
    //修改音乐列表
    handleEdit(item) {
      let { name, song, radio, url ,id} = this.form;
       name = item.music_name;
       url = item.pic;
       song =  item.singer_name;
       id = item.id;
       radio = item.isup;
       console.log(id,item.id)
       this.dialogdisplay = true;
       this.GetMusicList()
    },
    //删除音乐
    handleDelete(id) {
      console.log(id);
      this.$api.music.deletemusic({ id: id }).then(res => {
        if (res.data.code == 1) {
          this.$message({
            type: "success",
            message: "删除成功",
            offset: 20,
            center: true,
            duration: 1000
          });
          this.GetMusicList();
        }
      });
    },
    //添加音乐
    uploadToprops() {
      let { name, song, radio, url } = this.form;
       this.$api.music
        .addmusic({
          music_name: name,
          singer_name: song,
          pic: url,
          isup: radio
        }).then(res => {
          if (res.data.code == 1) {
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "添加成功",
              offset: 20,
              center: true,
              duration: 1000
            });
          }
        });
        this.GetMusicList()
     
    },
    //修改 歌曲 提交
     ModifyToprops() {
      let { name, song, radio, url,id} = this.form;
      console.log(name,song,radio,url,id)
       this.$api.music
        .Modify({
          music_name: name,
          singer_name: song,
          id:id,
          isup: radio,
          pic: url,
        
        }).then(res => {
          if (res.data.code == 1) {
            this.dialogdisplay = false;
            this.$message({
              type: "success",
              message: "修改成功",
              offset: 20,
              center: true,
              duration: 1000
            });
          }
        });
        this.GetMusicList()
     
    },
    // 退出提示框
    open() {
      const h = this.$createElement;
      this.$msgbox({
        title: "提示",
        message: h("p", null, [
          h("span", { style: "color: red" }, "您确定要退出吗 ?")
        ]),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "退出中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 3000);
          } else {
            done();
          }
        }
      }).then(() => {
        this.$message({
          type: "success",
          message: "退出成功",
          offset: 20,
          center: true,
          duration: 1000
        });
        localStorage.removeItem("token"); // 删除 本地存储 token
        this.$router.replace("/login");
      });
    }
  },
  computed: {
    ...mapState({
      username: state => state.user.username //获取vuex 中的用户名
    })
  }
};
</script>

<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: skyblue;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: skyblue;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  text-align: center;
  line-height: 160px;
  position: relative;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.m-imgs {
  width: 80px;
  height: 60px;
}
.addbtn {
  position: absolute;
  z-index: 100;
  top: 148px;
  right: 148px;
}
.retreat {
  text-align: right;
  span {
    margin-right: 15px;
    color: black;
    font-weight: 800;
    font-size: 18px;
  }
}
.ertd {
  height: 100%;
}
</style>
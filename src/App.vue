<template>

  <el-container style="height: 98%;margin: auto;">

    <el-header style="height: auto;">

      <!--logo-->
      <el-row style="height: 15vh">
        <el-col style="height: 10vh">
          <el-image style="width: 100%;height: 4vh" src="src/assets/a8h98-rx0vb.png" fit="scale-down">
          </el-image>
        </el-col>
        <el-col style="height: 5vh">
          <el-menu
              :default-active="activeIndex"
              mode="horizontal"
              :ellipsis="false"
              style="width: 100%;height: 100%"
          >
            <el-menu-item index="1">
              首页
            </el-menu-item>
            <el-menu-item index="2">
              <template #default>
                <span>
                  历史记录
                </span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>

    </el-header>

    <el-main v-loading="loading"
             style="height: auto;display: flex;flex-direction: column;padding: 0;margin: 20px;background: white">

      <el-tabs v-model="activeName" class="demo-tabs" style="margin: 2vh 2vw">
        <el-tab-pane label="图片处理" name="first">
          <!--输入-->
          <el-row justify="space-evenly">

            <el-col :span="20" style="text-align: center">
              <h1>
                图片输入
              </h1>
            </el-col>

            <el-col :span="20" style="text-align: center">
              <el-upload
                  action="#"
                  list-type="picture-card"
                  :auto-upload="false"
                  :on-remove="handleRemove"
                  :on-preview="handlePictureCardPreview"
                  :limit="1"
                  :on-exceed="handleExceed"
                  v-model:file-list="fileList"
              >
                <el-icon>
                  <Plus/>
                </el-icon>
              </el-upload>

              <el-dialog v-model="dialogVisible">
                <img :src="dialogImageUrl" alt="Preview Image" style="width: 100%;height: 100%"/>
              </el-dialog>
            </el-col>

            <el-col :span="20" style="text-align: center;margin-top: 2vh">
              <div>
                <el-button round type="primary" @click="handleUpload('pic')">
                  上传
                </el-button>
              </div>
            </el-col>
            <el-col :span="20">
              <el-divider/>
            </el-col>
          </el-row>

          <!--图片输出-->
          <el-row style="background: white;" justify="space-evenly">
            <el-col :span="20" style="text-align: center">
              <h1>
                图片输出
              </h1>
            </el-col>
            <el-col :span="20" style="text-align: center">
              <el-image
                  style="width: 148px; height: 148px"
                  :src="picUrl"
                  :zoom-rate="1.2"
                  :preview-src-list="srcList"
                  :initial-index="1"
                  fit="cover"
                  v-if="outcomeShow1"
              />
              <el-empty description="无内容" v-if="!outcomeShow1" style="padding: 0;height: auto"/>
            </el-col>
          </el-row>

          <el-row style="flex: 1;background: white"/>
        </el-tab-pane>

        <el-tab-pane label="视频处理" name="second">
          <el-row style="flex-direction: column">
            <el-col style="text-align: center">
              <h1>
                视频输入
              </h1>
            </el-col>
            <el-col>
              <el-upload
                  class="upload-demo"
                  drag
                  action="#"
                  :on-exceed="handleExceed"
                  :http-request="handleUpload"
                  :multiple="false"
                  :auto-upload="false"
                  :limit="1"
                  v-model:file-list="fileList"
                  style="height: 22vh"
              >
                <el-icon class="el-icon--upload">
                  <upload-filled/>
                </el-icon>
                <div class="el-upload__text">
                  拖拽或者 <em>点击此处上传</em>
                </div>
              </el-upload>
            </el-col>
            <el-col style="text-align: center;margin-top: 40px">
              <el-button type="primary" @click="handleUpload('video')">
                确认上传
              </el-button>
            </el-col>
            <el-divider/>
            <el-col style="text-align: center">
              <h1>
                视频输出
              </h1>
            </el-col>
            <el-col>
              <el-empty description="无内容" v-show="!outcomeShow2" style="padding: 0;height: auto"/>
            </el-col>
            <!--    视频播放器        -->
<!--            <el-col style="display:flex;justify-content: center;" v-show="outcomeShow2">-->
            <!--              <div style="width: 960px;height: 540px;">-->
            <!--                <video ref="videoPlayer" class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"></video>-->
            <!--              </div>-->
            <!--            </el-col>-->
            <!--            <el-col style="display:flex;justify-content: center;" v-show="outcomeShow2">-->
            <!--              <el-button type="primary" @click="handleOutput" style="margin-top: 3vh">-->
            <!--                导出视频-->
            <!--              </el-button>-->
            <!--            </el-col>-->
          </el-row>

        </el-tab-pane>

        <el-tab-pane label="摄像头" name="third">
          <!--实时监控-->
          <el-row justify="space-evenly" align="middle">

            <el-col :span="20" style="text-align: center">
              <h1>
                实时监控
              </h1>
            </el-col>
            <el-col>
              <div
                  v-loading="monitorOpen"
                  :element-loading-svg='loadingSvg'
                  element-loading-text="监控进行中..."
                  class="custom-loading-svg"
                  element-loading-svg-view-box="-10, -10, 50, 50"
                  style="height: 100px;"
              >
              </div>
            </el-col>
            <el-col :span="20" style="text-align: center;margin-top: 10px;margin-bottom: 30px">
              <el-button type="primary" size="large" v-if="!monitorOpen" @click="handleOpenMonitor">
                开启实时监控
              </el-button>
              <el-button type="primary" size="large" v-else @click="handleOpenMonitor">
                关闭实时监控
              </el-button>
            </el-col>


          </el-row>

        </el-tab-pane>
      </el-tabs>


    </el-main>

    <el-footer style="height: auto">

      <!--页脚杂项-->
      <el-row style="height: 5vh">
        <el-col>
          <el-image style="width: 100%;height: 4vh" src="src/assets/wallhaven-1p398w_1920x1080.png" fit="scale-down">
          </el-image>
        </el-col>
      </el-row>

    </el-footer>

  </el-container>


</template>

<script lang="ts">
import {getCurrentInstance, onMounted, reactive, ref, toRefs} from "vue";
import type {UploadFile, UploadInstance, UploadRawFile, UploadProps} from "element-plus";
import {ElMessage, genFileId} from "element-plus";
import videojs from 'video.js'
import api from './axios/api.js'

export default {
  name: 'App',
  mounted() {
    navigator.mediaDevices.getUserMedia({video: true})
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((err) => {
          console.log("Error accessing media devices: ", err);
        });
  },
  setup() {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)
    const outcomeShow1 = ref(false)
    const outcomeShow2 = ref()
    const picUrl = ref()
    const videoUrl = ref()
    const srcList = ref([])
    const activeName = ref("first")
    const activeIndex = ref("1")
    const fileList = ref([])
    const loading = ref(false)

    const videoPlayer = ref(null)
    const myPlayer = ref(null)
    const monitorOpen = ref(false)
    const loadingSvg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
    }


    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
    }

    const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
      ElMessage({
        message: "上限1项",
        type: "warning"
      })
    }

    const handleUpload = async (type) => {
      loading.value = true
      let formData = new FormData()
      // let fileName = file.replace(/(.*\/)*([^.]+).*/ig,"$2")
      // console.log(fileName)

      formData.append('file', fileList.value[0].raw)
      await api.upload(formData).then(res => {
        console.log(res.data)
        getVideo(type, res.data)

        loading.value = false
      });
    }
    //获取视频流
    const getVideo = (type, videoPath) => {
      if (type === 'pic') {
        picUrl.value = "http://localhost:5000/video?path=" + videoPath
        srcList.value.push("http://localhost:5000/video?path=" + videoPath)
        outcomeShow1.value = true
      } else if (type === 'video') {
        videoUrl.value = "http://localhost:5000/video?path=" + videoPath
        console.log(videoUrl.value)
        myPlayer.value = videojs(videoPlayer.value, {
          poster: "",
          controls: true,
          autoplay: false,
          sources: [
            {
              // src: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
              src: videoUrl.value,
              type: 'video/mp4',

            }
          ],
        }, () => {
          myPlayer.value.log("play.....")
        })
        console.log(myPlayer)
        outcomeShow2.value = true
      }
    }
    const handleOutput = () => {
      ElMessage("开发中....")
    }
    //开启/关闭摄像头
    const handleOpenMonitor = () => {
      if (monitorOpen.value) {
        //关闭
        api.closeMonitor().then(
            res => {
              getVideo('video', res.data)
            }
        )
        monitorOpen.value = !monitorOpen.value
      } else {
        //开启
        monitorOpen.value = !monitorOpen.value
        api.openMonitor().then(res => {

        })


      }
    }

    onMounted(() => {

    })
    return {
      dialogImageUrl, dialogVisible, handleRemove, handlePictureCardPreview, disabled, monitorOpen, loadingSvg,
      handleExceed, activeName, activeIndex, handleUpload, outcomeShow1, outcomeShow2, handleOpenMonitor,
      videoPlayer, myPlayer, handleOutput, fileList, picUrl, srcList, loading
    }
  }
}
</script>


<style>
video {
  width: 100%;
  height: 100%;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  background: url("./assets/wallhaven-1p398w_1920x1080.png");
  display: flex;
}
</style>

// <!--
//  * @Author: wuwenjia
//  * @Date: 2022-07-18 20:12:37
//  * @LastModifiedBy: wuwenjia
//  * @LastEditTime: 2022-07-18 20:12:37
//  * @Description: 文件上传hooks
// -->

import axios, { CancelTokenSource, CancelToken } from 'axios';
import sparkMD5 from 'spark-md5';
import { uploadFile } from '@/apis/upload/index';
// import { UploadProps } from 'ant-design-vue';
interface SourceData {
  token: any;
  cancel?: () => void;
}

// interface FileDataRes {
//   download_link: string;
//   file_md5: string | number;
//   application: string;
//   package: string;
//   version_name: string;
//   file_size: string | number;
//   icon_path: string;
// }

export function uploadSectionFile(uploadCallback: (res: any) => void) {
  const uploadLoading = ref<boolean>(false);
  let source = reactive<SourceData>({
    token: '',
  });

  function uploadSuccess(callback: () => object) {
    callback();
  }
  // 取消上传
  function cancel(callback: any) {
    callback();
  }
  // const progress: UploadProps['progress'] = {
  //   strokeColor: {
  //     '0%': '#108ee9',
  //     '100%': '#87d068'
  //   },
  //   strokeWidth: 3,
  //   format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
  //   class: 'test'
  // };
  const progress = reactive({
    percentage: 0,
    customColor: '#409eff',
    percent: 0,
    isShow: false,
  });
  // 文件分片
  function fileSlice(file: File) {
    return new Promise((resolve, reject) => {
      console.log('11111111111');

      const blobSlice = File.prototype.slice
        || (File.prototype as any).mozSlice
        || (File.prototype as any).webkitSlice;
      const chunkSize = 2 * 1024 * 1024; // 每片20M
      console.log('chunkSize', chunkSize);
      console.log('file.size', file);

      console.log('file.size / chunkSize', file.size / chunkSize);
      const chunks = Math.ceil(file.size / chunkSize);
      progress.percent = 100 / chunks;
      let currentChunk = 0;
      const spark = new sparkMD5.ArrayBuffer();
      const fileReader = new FileReader();
      const fileChunk: any = [];
      while (currentChunk < chunks) {
        const start = currentChunk * chunkSize;
        const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileChunk.push(file.slice(start, end));
        console.log('fileChunk', fileChunk);
        currentChunk++;
      }

      function loadNext() {
        const start = 0;
        const end = file.size;
        fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
      }

      fileReader.onload = (e: any) => {
        spark.append(e.target.result);
        const md5 = spark.end();
        console.log('resolve');
        resolve({ data: fileChunk, md5 });
      };
      fileReader.onerror = () => {
        reject(new Error());
      };
      loadNext();
    });
  }

  function startUpload({ file, onProgress, onSuccess, onError }: any) {
    console.log('file', file);

    fileSlice(file)
    .then((res: any) => {
      console.log('file.file.size', res);
      let i = 0;
      let flag = 0;
      const cancelToken = axios.CancelToken;
      source = cancelToken.source();
      progress.isShow = true;
      async function upload(uuid: any) {
        console.log(file.size);
        console.log(res.md5);
        const headers = {
          Md5: res.md5,
          Size: file.size,
          Type: 2,
          'Version-Start-Transport': flag === 0 ? 'true' : 'false',
          uuid,
        };
        flag = 1;
        // console.log('res.data', file.file.size);
        // console.log('res', res.data);
        const formData = new FormData();
        formData.append('file', res.data[i]);
        // console.log(i, res.data[i]);
        // console.log('formData', formData);
        try {
          const { data: resdata, status } = await uploadFile({
            name: file.name,
            formData,
            headers,
            cancelToken: source.token,
          });
          i++;
          console.log('resdata', resdata);
          if (status === 202) {
            progress.percentage = Math.floor(i * progress.percent);
            if (i < res.data.length) {
              upload(resdata);
            }
          } else {
            // that.fileList = [];
            progress.isShow = false;
            progress.percentage = 100;
            if (!resdata.apk_info) {
              // that.$message({
              //   message: i18n.t('application.message.getAppInfoErr').toString(),
              //   type: 'warning'
              // });
              return null;
            }
            uploadCallback(resdata);
            // that.createApplicationData = {
            //   download_url: data.download_link,
            //   file_md5sum: data.file_md5,
            //   app_name: data.apk_info.application,
            //   package_name: data.apk_info.package,
            //   version: data.apk_info.version_name,
            //   file_size: file.file.size,
            //   icon: data.apk_info.icon_path
            // };
            uploadLoading.value = false;
            onSuccess(res);
            // that.$message({
            //   message: i18n.t('application.message.uploadSuccess').toString(),
            //   type: 'success'
            // });
          }
          onProgress({ percent: progress.percentage });
        } catch (error) {
          progress.isShow = false;
          progress.percentage = 99;
          onProgress({ percent: progress.percentage });
          uploadLoading.value = false;
          if (axios.isCancel(error)) {
            onError(error);
          } else {
            // that.$message({
            //   message: i18n.t('application.appFormDialop.uploadFail') as string,
            //   type: 'error'
            // });
            console.log('error', error);

            uploadCallback(error);
          }
          return 0;
        }
      }
      upload(0);
    })
    .catch(() => {
      uploadLoading.value = false;
    });
  }

  return { progress, uploadSuccess, startUpload, cancel };
}

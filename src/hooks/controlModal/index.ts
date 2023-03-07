// <!--
//  * @Author: wuwenjia
//  * @Date: 2022-07-012 20:12:37
//  * @LastModifiedBy: wuwenjia
//  * @LastEditTime: 2022-07-012 20:12:37
//  * @Description: 控制弹窗hooks
// -->
type ModalName =
  | 'deleteModal'
  | 'DistributionAppModal'
  | 'uploadAppPackageModal'
  | 'uploadFileModal'
  | 'UploadFileModal'
  | 'DistributionFileModal';

/** uploadFile
 * 控制关闭弹窗
 * @param modelName 相对应的弹窗组件名
 * @returns
 */
export function closeModal(modelName: ModalName) {
  // 控制弹窗 flag
  const visible = ref<boolean>(false);
  const show = inject(modelName, ref<boolean>(false));
  watchEffect(() => {
    visible.value = show.value;
  });
  /**
   * 取消弹窗
   */
  function cancel() {
    console.log('show', show);
    visible.value = false;
    show.value = false;
  }
  /**
   * 带有回调函数关闭弹窗
   * @param callback
   */
  function handleOk(callback: () => object) {
    cancel();
    callback && callback();
  }
  return { visible, cancel, handleOk };
}

/**
 * 控制打开弹窗
 * @param modelName 相对应的弹窗组件名(这里是自己定义的一个接口，一是为了编码代码时候友好提示，十是为了防止代码出错）
 * @returns openAction 打开弹窗方法
 */
export function openModal(modelName: ModalName) {
  const name = ref<boolean>(false);
  provide(modelName, name);
  /**
   * 打开弹窗
   * @param value 弹窗名
   */
  function openAction() {
    console.log('name', name);
    name.value = true;
  }
  return { openAction };
}

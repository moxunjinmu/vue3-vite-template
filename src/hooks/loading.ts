/*
 * @Author: fangkg
 * @Date: 2022-07-04 16:59:40
 * @LastModifiedBy: fangkg
 * @LastEditTime: 2022-07-07 09:42:49
 * @Description: loading钩子
 */
import { ref } from 'vue';

export default function useLoading(initValue = false) {
  const loading = ref(initValue);
  const setLoading = (value: boolean) => {
    loading.value = value;
  };
  const toggle = () => {
    loading.value = !loading.value;
  };
  return {
    loading,
    setLoading,
    toggle,
  };
}

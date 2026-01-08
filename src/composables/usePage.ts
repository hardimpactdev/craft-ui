import { ref } from 'vue';

const pageData = ref<any>({});

export function updatePageData(usePage: any) {
  pageData.value = usePage;
}

export function usePage() {
  return pageData.value;
}

<script setup lang="ts">
import { sendQuery } from '@shared/api/queryFunctions';
import { QueryActions } from '@shared/api/getQuerySchema';
import { onMounted } from 'vue';

interface TestQueryResult {
  id: string;
  name: string;
}

function testQuery() {
  const sendQueryResult = sendQuery<TestQueryResult>({
    action: QueryActions.GET,
    entity: 'test',
    body: '{ id name }',
  });

  sendQueryResult.onError((param, context) => {
    console.log('error in VExample.vue', param, context);
  });

  return sendQueryResult.query;
}

onMounted(testQuery);
</script>

<template>
  <div>Example component</div>
</template>

<style scoped lang="scss"></style>

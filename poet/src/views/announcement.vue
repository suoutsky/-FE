<template>
    <div>
      <div class="v-announcement">
        <div v-for="announcement in announcements">
          <announcement :announcement="announcement"></announcement>
        </div>
      </div>
    </div>
</template>
<script>
import  announcement from '../components/announcement'
export default {
  component: {
    announcement
  }
 }
</script>

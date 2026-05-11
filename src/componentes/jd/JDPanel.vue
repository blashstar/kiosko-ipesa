<template lang="pug">
	.jd_panel
		slot
</template>



<script setup lang="ts">
</script>

<style lang="stylus" scoped>

.jd_panel
	border-radius vh(24px)

	background linear-gradient(135deg, rgba(64, 64, 64, 0.96), rgba(0, 0, 0, 0.96)) padding-box,
				linear-gradient(135deg, #FFCC00, #FCB515) border-box
	background-clip padding-box, border-box
	border 1px solid transparent

	box-shadow 6px 7px 5.2px rgba(0, 0, 0, 0.48)
	box-sizing border-box
	position relative
	margin 8px
	padding 16px
</style>

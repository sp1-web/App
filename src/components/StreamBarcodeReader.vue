<template>
  <div class="relative">
    <div v-show="!isLoading">
      <video class="w-full h-full" poster="data:image/gif,AAAA" ref="scanner"></video>
      <div class="w-full border border-red-600 absolute top-2/4 animate-xLinear"></div>
    </div>
  </div>
</template>

<script>
import {BrowserMultiFormatReader, Exception} from "@zxing/library";

export default {
  name: "stream-barcode-reader",
  data() {
    return {
      isLoading: true,
      codeReader: new BrowserMultiFormatReader(),
      isMediaStreamAPISupported:
          navigator &&
          navigator.mediaDevices &&
          "enumerateDevices" in navigator.mediaDevices
    };
  },
  mounted() {
    if (!this.isMediaStreamAPISupported) {
      throw new Exception("Media Stream API is not supported");
    }
    this.start();
    this.$refs.scanner.oncanplay = () => {
      this.isLoading = false;
      this.$emit("loaded");
    };
  },
  methods: {
    start() {
      this.codeReader.decodeFromVideoDevice(
          undefined,
          this.$refs.scanner,
          (result) => {
            if (result) {
              this.$emit("decode", result.text);
            }
          }
      );
    }
  }
};
</script>
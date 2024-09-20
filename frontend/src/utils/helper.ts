export function dataUrlToBlob(dataUrl: string) {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1]; // Get the MIME type from the dataURL
  const bstr = atob(arr[1]); // Decode base64 to binary string
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n); // Convert binary string to a typed array
  }

  return new Blob([u8arr], { type: mime });
}

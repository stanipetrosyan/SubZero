module.exports = {
  convertBytes(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB']

    if (bytes === 0) {
      return 'n/a'
    }

    const conversion = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

    if (conversion === 0) {
      return bytes + ' ' + sizes[conversion];
    }

    return (bytes / Math.pow(1024, conversion)).toFixed(1) + ' ' + sizes[conversion];
  }
}

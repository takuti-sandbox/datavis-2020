export const message = data => {
  let message = '';
  message += Math.round(d3.csvFormat(data).length / 1024) + ' kB\n';
  message += data.length + ' rows\n';
  message += data.columns.length + ' columns';
  return message;
};
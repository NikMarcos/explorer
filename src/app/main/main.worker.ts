/// <reference lib="webworker" />
addEventListener('message', ({ data }) => {
  let response;
  // if(data == 'hello') {
  //   response = `worker response to ${data}`;
  // } else {
  //   response = `worker response to false`;
  // }
  // ipcRenderer.on('add:add', function (e, data) {
  if (Array.isArray(data)) {
    // console.log(data);

    function collectIds (data: Object[]) {
      let unique = [];
      let rawData = []
      let listAssets = {};
      rawData = data;
      let assetIdArray = [];
      for (let i = 1; i < data.length; i++) {
        let nextObj = data[i];
        let partofApi;
        let partOfApi2;
        if (nextObj['type'] == 7) {
          if (listAssets[nextObj['order1']['assetPair']['amountAsset']] == undefined) {
            partofApi = `ids=${nextObj['order1']['assetPair']['amountAsset']}&`;
            assetIdArray.push(partofApi);
          }
          if (listAssets[nextObj['order1']['assetPair']['priceAsset']] == undefined) {
            partOfApi2 = `ids=${nextObj['order1']['assetPair']['priceAsset']}&`;
            assetIdArray.push(partOfApi2);
          }
        } else if (nextObj['type'] == 4) {
          partofApi = `ids=${nextObj['assetId']}&`;
          assetIdArray.push(partofApi);
        } else if (nextObj['type'] == 11) {
          partofApi = `ids=${nextObj['assetId']}&`;
          assetIdArray.push(partofApi);
        } else if (nextObj['type'] == 3) {
          partofApi = `ids=${nextObj['assetId']}&`;
          assetIdArray.push(partofApi);
        } else if (nextObj['type'] == 6) {
          partofApi = `ids=${nextObj['assetId']}&`;
          assetIdArray.push(partofApi);
        }
       }
       unique = [...new Set(assetIdArray)];
       let arr = unique.filter(function(item) {
         return item != 'ids=null&'
       });
       // ipcRenderer.send('ids:add', arr);
       postMessage(arr);

    }
    collectIds(data);
  } else {
    console.log("Не массив")
  }

});

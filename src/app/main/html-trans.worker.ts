/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  // const response = `worker response to ${data.transactions} & ${data.assetss}`;
  let amountI;
  function decimal(digit) {
    switch (digit) {
      case 8:
        amountI = 100000000;
        break;
      case 7:
        amountI = 10000000;
        break;
      case 6:
        amountI = 1000000;
        break;
      case 5:
        amountI = 100000;
        break;
      case 4:
        amountI = 10000;
        break;
      case 3:
        amountI = 1000;
        break;
      case 2:
        amountI = 100;
        break;
      case 1:
        amountI = 10;
        break;
      case 0:
        amountI = 1;
        break;
    }
  return amountI;
  };

  let type;
  let type2;
  let status;
  let amountAsset;
  let priceAsset;
  let cancelLeasingId;
  let assetId;
  let htmlDiv = ``;

  let commonAssetsList;
  let csvAll = [];
  let csvDeposit = [];
  let csvWithdrawal = [];
  let csvAssets = [];
  let csvEx = [];
  let rawData = data.transactions;
  let listAssets = data.assets;

  for (let i = 1; i < rawData.length; i++) {

    let csvTemp = {};
    let divStyle = {borderBottom:'1px solid black', padding: '3px'};
    // let div = $('<div>');
    let textCorrectName;
    let obj = rawData[i];
    if (obj['type'] == 7) {
      let decAmount;
      let decPrice;
      let amount;
      let price;
      let spend;
      let residual;
      amountAsset = listAssets[obj['order1']['assetPair']['amountAsset']][0];
      priceAsset = listAssets[obj['order1']['assetPair']['priceAsset']][0];
      residual = listAssets[obj['order1']['assetPair']['amountAsset']][1] - listAssets[obj['order1']['assetPair']['priceAsset']][1];
      if (listAssets[obj['order1']['assetPair']['amountAsset']][2] == "spam" || listAssets[obj['order1']['assetPair']['priceAsset']][2] == "spam") {
        divStyle['backgroundColor'] = '#D3D3D3';
      }
      if (residual >= 0) {
         decAmount = decimal(listAssets[obj['order1']['assetPair']['amountAsset']][1]);
         decPrice = decimal(listAssets[obj['order1']['assetPair']['priceAsset']][1]);
         amount = obj['amount']/decAmount;
         price = obj['price']/decPrice;
         spend = amount*price;
      } else {
        let newResidual = listAssets[obj['order1']['assetPair']['priceAsset']][1] - listAssets[obj['order1']['assetPair']['amountAsset']][1];
        decAmount = decimal(listAssets[obj['order1']['assetPair']['amountAsset']][1]);
        decPrice = decimal(newResidual);
        amount = obj['amount']/decAmount;
        let tempDelim = obj['price']/100000000;
        price = tempDelim/decPrice;
        spend = amount*price;
      }
      if (obj['order1']['sender'] == rawData[0]) {
        if (obj['order1']['orderType'] == 'buy') {
          htmlDiv += `<div class="7 bal ${obj['timestamp']}"
          id="${amountAsset.toLowerCase()}${priceAsset.toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Обмен: Купил </strong>${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}
          <strong> за </strong>
          ${spend.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${priceAsset}<br>
          <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = 'Обмен: Купил';
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          csvAll.push(csvTemp);
          csvEx.push(csvTemp);
        } else {
          htmlDiv += `<div class="7 bal ${obj['timestamp']}"
          id="${amountAsset.toLowerCase()}${priceAsset.toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Обмен: Продал </strong>${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}
          <strong> за </strong>
          ${spend.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${priceAsset}<br>
          <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = 'Обмен: Продал';
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          csvAll.push(csvTemp);
          csvEx.push(csvTemp);
        }
      } else {
        if (obj['order2']['orderType'] == 'buy') {
          htmlDiv += `<div class="7 bal ${obj['timestamp']} new"
          id="${amountAsset.toLowerCase()}${priceAsset.toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Обмен: Купил </strong>${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}
          <strong> за </strong>
          ${spend.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${priceAsset}<br>
          <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = 'Обмен: Купил';
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          csvAll.push(csvTemp);
          csvEx.push(csvTemp);
        } else {
          htmlDiv += `<div class="7 bal ${obj['timestamp']} new"
          id="${amountAsset.toLowerCase()}${priceAsset.toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Обмен: Продал </strong>${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}
          <strong> за </strong>
          ${spend.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${priceAsset}<br>
          <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = 'Обмен: Продал';
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          csvAll.push(csvTemp);
          csvEx.push(csvTemp);
        }
      }
    } else if (obj['type'] == 4) {
      let amm = listAssets[obj['assetId']];
      let amOfAsset = decimal(amm[1]);
      if (obj['sender'] == rawData[0]) {
        //
        // let amm = listAssets[obj['assetId']];
        // let amOfAsset = decimal(amm[1]);
        if (listAssets[obj['assetId']][2] == "spam") {
          htmlDiv += `<div class="send bal ${obj['timestamp']} spam"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        } else {
          htmlDiv += `<div class="send bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        }
        htmlDiv += `<strong>Вывод </strong>${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}
        <strong> на адрес </strong>${obj['recipient']}<br>
        <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
        <div class="linkId"><strong> Id: </strong>
        <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
        </div>`;

        csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        csvTemp['type'] = `Вывод`;
        csvTemp['data'] = `${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
        csvAll.push(csvTemp);
        csvWithdrawal.push(csvTemp);
      } else {

        if (listAssets[obj['assetId']][2] == "spam") {
          htmlDiv += `<div class="deposit bal ${obj['timestamp']} spam"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        } else {
          htmlDiv += `<div class="deposit bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        }
        htmlDiv += `<strong>Ввод </strong>
        ${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}
        <strong> с адреса </strong>${obj['sender']}<br>
        <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
        <div class="linkId"><strong> Id: </strong>
        <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
        </div>`;

        csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        csvTemp['type'] = `Ввод`;
        csvTemp['data'] = `${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
        csvAll.push(csvTemp);
        csvDeposit.push(csvTemp);
        }
    } else if (obj['type'] == 1) {

      htmlDiv += `<div class="creation bal ${obj['timestamp']}"
      id="${obj['recipient'].toLowerCase()}waves${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Создание </strong>
      ${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves
      <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Создание Waves`;
      csvTemp['data'] = `${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
      csvAll.push(csvTemp);
      csvDeposit.push(csvTemp);

    } else if (obj['type'] == 2) {
        let amOfAsset = 100000000;
        let amount = obj['amount']/amOfAsset;
        if (obj['sender'] == rawData[0]) {

          htmlDiv += `<div class="send bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}waves${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Вывод </strong>
          ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves
          <strong> на адрес </strong>${obj['recipient']}<br>
          <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;

          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = `Вывод`;
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
          csvAll.push(csvTemp);
          csvWithdrawal.push(csvTemp);
        } else {

          htmlDiv += `<div class="deposit bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}waves${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Ввод </strong>
          ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves
          <strong> c адреса </strong>${obj['sender']}<br>
          <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;

          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = `Ввод`;
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
          csvAll.push(csvTemp);
          csvDeposit.push(csvTemp);
        }
    } else if (obj['type'] == 11) {
        let amm = listAssets[obj['assetId']];
        let amOfAsset = decimal(amm[1]);
        if (obj['sender'] == rawData[0]) {
          let amount = obj['totalAmount']/amOfAsset;
          if (listAssets[obj['assetId']][2] == "spam") {
            htmlDiv += `<div class="massSend bal ${obj['timestamp']} spam"
            id="${obj['sender'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
          } else {
            htmlDiv += `<div class="massSend bal ${obj['timestamp']}"
            id="${obj['sender'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
          }
          htmlDiv += `<strong>Массовая транзакция: Вывод </strong>
          ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}<br>
          <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = `Массовая транзакция: Вывод`;
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
          csvAll.push(csvTemp);
          csvWithdrawal.push(csvTemp);
        } else {
          let amount;
          for(let i = 0; i < obj['transfers'].length; i++) {
            if (obj['transfers'][i]['recipient'] == rawData[0]) {
              amount = obj['transfers'][i]['amount']/amOfAsset;
            }
          }
          if (listAssets[obj['assetId']][2] == "spam") {
            htmlDiv += `<div class="massReceiv bal ${obj['timestamp']} spam"
            id="${obj['sender'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
          } else {
            htmlDiv += `<div class="massReceiv bal ${obj['timestamp']}"
            id="${obj['sender'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
          }
          htmlDiv += `<strong>Массовая транзакция: Ввод </strong>
          ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}
          <strong> с адреса </strong>${obj['sender']}<br>
          <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          csvTemp['type'] = `Массовая транзакция: Ввод`;
          csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
          csvAll.push(csvTemp);
          csvDeposit.push(csvTemp);
        }
    } else if (obj['type'] == 8) {
      htmlDiv += `<div class="8 bal ${obj['timestamp']}"
      id="waves${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Лизинг </strong>
      ${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves<br>
      <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div></div>`;
      // Раскомментировать после перехода на нормальную версию API с debug версии //////////////////
      // if (obj['status'] == 'canceled') {
      //   htmlDiv += ` (отменен)</div></div>`;
      // } else {
      //   htmlDiv += ` (не отменен)</div></div>`;
      // }
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Лизинг`;
      csvTemp['data'] = `${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 9) {
      htmlDiv += `<div class="9 bal ${obj['timestamp']}"
      id="waves${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Отмена лизинга с ID:  </strong>${obj['leaseId']}<br>
      <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Отмена лизинга с ID:`;
      csvTemp['data'] = `${obj['leaseId']}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 3) {
      let amOfAsset = decimal(listAssets[obj['assetId']][1]);
      let amount = obj['quantity']/amOfAsset;
      if (listAssets[obj['assetId']][2] == "spam") {
        htmlDiv += `<div class="3 bal ${obj['timestamp']} spam"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      } else {
        htmlDiv += `<div class="3 bal ${obj['timestamp']}"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      }
      htmlDiv += `<strong>Создание ассета: </strong>
      ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      if (obj['script'] != null) {
        htmlDiv += ` (скрипт-ассет)`;
      }
      htmlDiv += `<br><strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Создание ассета:`;
      csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 6) {
      let amOfAsset = decimal(listAssets[obj['assetId']][1]);
      let amount = obj['amount']/amOfAsset;
      if (listAssets[obj['assetId']][2] == "spam") {
        htmlDiv += `<div class="6 bal ${obj['timestamp']} spam"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      } else {
        htmlDiv += `<div class="6 bal ${obj['timestamp']}"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      }
      htmlDiv += `<strong>Asset burning: </strong>
      ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}<br>
      <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Сжигание ассета:`;
      csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 5) {
      let amOfAsset = decimal(listAssets[obj['assetId']][1]);
      let amount = obj['quantity']/amOfAsset;
      if (listAssets[obj['assetId']][2] == "spam") {
        htmlDiv += `<div class="5 bal ${obj['timestamp']} spam"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      } else {
        htmlDiv += `<div class="5 bal ${obj['timestamp']}"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      }
      htmlDiv += `<strong>Довыпуск ассета: </strong>
      ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}<br>
      <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Довыпуск ассета:`;
      csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 12) {
      htmlDiv += `<div class="12 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Дата-транзакция </strong><br>
      <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Дата-транзакция`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 10) {
      htmlDiv += `<div class="10 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Создание алиаса: </strong>${obj['alias']}<br>
      <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Создание алиаса:`;
      csvTemp['data'] = `${obj['alias']}`;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 13) {
      htmlDiv += `<div class="13 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Скрипт-транзакция </strong><br>
      <strong> Дата: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Скрипт-транзакция`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 14) {
      if (obj['minSponsoredAssetFee'] == null) {
        htmlDiv += `<div class="14 bal ${obj['timestamp']}"
        id="${new Date(obj['timestamp']).toLocaleDateString()}">
        <strong>Отмена спонсорства для </strong>${listAssets[obj['assetId']][0]}<br>
        <strong>Дата: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
        <div class="linkId"><strong> Id: </strong>
        <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
        </div>`;
        csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        csvTemp['type'] = `Отмена спонсорства`;
        // csvTemp['data'] = type;
        csvAll.push(csvTemp);
      } else {
        htmlDiv += `<div class="14 bal ${obj['timestamp']}"
        id="${new Date(obj['timestamp']).toLocaleDateString()}">
        <strong>Активация спонсорства для </strong>${listAssets[obj['assetId']][0]}<br>
        <strong>Дата: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
        <div class="linkId"><strong> Id: </strong>
        <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
        </div>`;
        csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        csvTemp['type'] = `Активация спонсорства`;
        // csvTemp['data'] = type;
        csvAll.push(csvTemp);
      }
    } else if (obj['type'] == 15) {
      htmlDiv += `<div class="15 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Установка скрипта на ассет </strong><br>
      <strong>Дата: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Установка скрипта на ассет`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    } else if (obj['type'] == 16) {
      htmlDiv += `<div class="16 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Вызов скрипта </strong><br>
      <strong>Дата: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Вызов скрипта`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    } else {
      htmlDiv += `<div class="else bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Type: ${obj['type']}</strong><br>
      <strong>Дата: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      csvTemp['type'] = `Другая транзакция`;
      // csvTemp['data'] = type;
      csvAll.push(csvTemp);
    }
   };

  postMessage(htmlDiv);
});

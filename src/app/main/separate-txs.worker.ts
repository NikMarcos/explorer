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

  let type1 = ``;
  let typeDeposit = ``;
  let typeSend = ``;
  let type7 = ``;
  let type8 = ``;
  let type9 = ``;
  let typeMassSend = ``;
  let typeMassReceive = ``;
  let type3 = ``;
  let type5 = ``;
  let type6 = ``;
  let type10 = ``;
  let type12 = ``;
  let type13 = ``;
  let type14 = ``;
  let type15 = ``;
  let type16 = ``;
  let typeElse = ``;

  let countType1 = 0;
  let countTypeDeposit = 0;
  let countTypeSend = 0;
  let countType7 = 0;
  let countType8 = 0;
  let countType9 = 0;
  let countTypeMassSend = 0;
  let countTypeMassReceive = 0;
  let countType3 = 0;
  let countType5 = 0;
  let countType6 = 0;
  let countType10 = 0;
  let countType12 = 0;
  let countType13 = 0;
  let countType14 = 0;
  let countType15 = 0;
  let countType16 = 0;
  let countTypeElse = 0;

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
      countType7++;
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
          type7 += `<div class="7 bal ${obj['timestamp']}"
          id="${amountAsset.toLowerCase()}${priceAsset.toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Обмен: Купил </strong>${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}
          <strong> за </strong>
          ${spend.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${priceAsset}<br>
          <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          // csvTemp['type'] = 'Обмен: Купил';
          // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          // csvAll.push(csvTemp);
          // csvEx.push(csvTemp);
        } else {
          type7 += `<div class="7 bal ${obj['timestamp']}"
          id="${amountAsset.toLowerCase()}${priceAsset.toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Обмен: Продал </strong>${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}
          <strong> за </strong>
          ${spend.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${priceAsset}<br>
          <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          // csvTemp['type'] = 'Обмен: Продал';
          // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          // csvAll.push(csvTemp);
          // csvEx.push(csvTemp);
        }
      } else {
        if (obj['order2']['orderType'] == 'buy') {
          type7 += `<div class="7 bal ${obj['timestamp']} new"
          id="${amountAsset.toLowerCase()}${priceAsset.toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Обмен: Купил </strong>${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}
          <strong> за </strong>
          ${spend.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${priceAsset}<br>
          <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          // csvTemp['type'] = 'Обмен: Купил';
          // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          // csvAll.push(csvTemp);
          // csvEx.push(csvTemp);
        } else {
          type7 += `<div class="7 bal ${obj['timestamp']} new"
          id="${amountAsset.toLowerCase()}${priceAsset.toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Обмен: Продал </strong>${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}
          <strong> за </strong>
          ${spend.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${priceAsset}<br>
          <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          // csvTemp['type'] = 'Обмен: Продал';
          // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${amountAsset}`;
          // csvAll.push(csvTemp);
          // csvEx.push(csvTemp);
        }
      }
    } else if (obj['type'] == 4) {
      let amm = listAssets[obj['assetId']];
      let amOfAsset = decimal(amm[1]);
      if (obj['sender'] == rawData[0]) {
        countTypeSend++;
        //
        // let amm = listAssets[obj['assetId']];
        // let amOfAsset = decimal(amm[1]);
        if (listAssets[obj['assetId']][2] == "spam") {
          typeSend += `<div class="send bal ${obj['timestamp']} spam"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        } else {
          typeSend += `<div class="send bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        }
        typeSend += `<strong>Вывод </strong>${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}
        <strong> на адрес </strong>${obj['recipient']}<br>
        <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
        <div class="linkId"><strong> Id: </strong>
        <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
        </div>`;

        // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        // csvTemp['type'] = `Вывод`;
        // csvTemp['data'] = `${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
        // csvAll.push(csvTemp);
        // csvWithdrawal.push(csvTemp);
      } else {
        countTypeDeposit++;
        if (listAssets[obj['assetId']][2] == "spam") {
          typeDeposit += `<div class="deposit bal ${obj['timestamp']} spam"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        } else {
          typeDeposit += `<div class="deposit bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
        }
        typeDeposit += `<strong>Deposit </strong>
        ${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}
        <strong> to address </strong>${obj['sender']}<br>
        <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
        <div class="linkId"><strong> Id: </strong>
        <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
        </div>`;

        // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        // csvTemp['type'] = `Ввод`;
        // csvTemp['data'] = `${(obj['amount']/amOfAsset).toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
        // csvAll.push(csvTemp);
        // csvDeposit.push(csvTemp);
        }
    } else if (obj['type'] == 1) {
      countType1++;
      type1 += `<div class="creation bal ${obj['timestamp']}"
      id="${obj['recipient'].toLowerCase()}waves${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Создание </strong>
      ${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves
      <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Создание Waves`;
      // csvTemp['data'] = `${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
      // csvAll.push(csvTemp);
      // csvDeposit.push(csvTemp);

    } else if (obj['type'] == 2) {
        let amOfAsset = 100000000;
        let amount = obj['amount']/amOfAsset;
        if (obj['sender'] == rawData[0]) {
          countTypeSend++;
          typeSend += `<div class="send bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}waves${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Вывод </strong>
          ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves
          <strong> на адрес </strong>${obj['recipient']}<br>
          <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;

          // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          // csvTemp['type'] = `Вывод`;
          // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
          // csvAll.push(csvTemp);
          // csvWithdrawal.push(csvTemp);
        } else {
          countTypeDeposit++;
          typeDeposit += `<div class="deposit bal ${obj['timestamp']}"
          id="${obj['sender'].toLowerCase()}${obj['recipient'].toLowerCase()}waves${new Date(obj['timestamp']).toLocaleDateString()}">
          <strong>Ввод </strong>
          ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves
          <strong> c адреса </strong>${obj['sender']}<br>
          <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;

          // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          // csvTemp['type'] = `Ввод`;
          // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
          // csvAll.push(csvTemp);
          // csvDeposit.push(csvTemp);
        }
    } else if (obj['type'] == 11) {
        let amm = listAssets[obj['assetId']];
        let amOfAsset = decimal(amm[1]);
        if (obj['sender'] == rawData[0]) {
          countTypeMassSend++;
          let amount = obj['totalAmount']/amOfAsset;
          if (listAssets[obj['assetId']][2] == "spam") {
            typeMassSend += `<div class="massSend bal ${obj['timestamp']} spam"
            id="${obj['sender'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
          } else {
            typeMassSend += `<div class="massSend bal ${obj['timestamp']}"
            id="${obj['sender'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
          }
          typeMassSend += `<strong>Массовая транзакция: Вывод </strong>
          ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}<br>
          <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          // csvTemp['type'] = `Массовая транзакция: Вывод`;
          // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
          // csvAll.push(csvTemp);
          // csvWithdrawal.push(csvTemp);
        } else {
          countTypeMassReceive++;
          let amount;
          for(let i = 0; i < obj['transfers'].length; i++) {
            if (obj['transfers'][i]['recipient'] == rawData[0]) {
              amount = obj['transfers'][i]['amount']/amOfAsset;
            }
          }
          if (listAssets[obj['assetId']][2] == "spam") {
            typeMassReceive += `<div class="massReceiv bal ${obj['timestamp']} spam"
            id="${obj['sender'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
          } else {
            typeMassReceive += `<div class="massReceiv bal ${obj['timestamp']}"
            id="${obj['sender'].toLowerCase()}${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
          }
          typeMassReceive += `<strong>Массовая транзакция: Ввод </strong>
          ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}<br>
          <strong> с адреса </strong>${obj['sender']}<br>
          <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
          <div class="linkId"><strong> Id: </strong>
          <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
          </div>`;
          // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
          // csvTemp['type'] = `Массовая транзакция: Ввод`;
          // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
          // csvAll.push(csvTemp);
          // csvDeposit.push(csvTemp);
        }
    } else if (obj['type'] == 8) {
      countType8++;
      type8 += `<div class="8 bal ${obj['timestamp']}"
      id="waves${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Leasing </strong>
      ${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves<br>
      <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div></div>`;
      // Раскомментировать после перехода на нормальную версию API с debug версии //////////////////
      // if (obj['status'] == 'canceled') {
      //   htmlDiv += ` (отменен)</div></div>`;
      // } else {
      //   htmlDiv += ` (не отменен)</div></div>`;
      // }
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Leasing`;
      // csvTemp['data'] = `${(obj['amount']/100000000).toLocaleString('en-US', {maximumSignificantDigits: 16})} Waves`;
      // csvAll.push(csvTemp);
    } else if (obj['type'] == 9) {
      countType9++;
      type9 += `<div class="9 bal ${obj['timestamp']}"
      id="waves${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Отмена лизинга с ID:  </strong>${obj['leaseId']}<br>
      <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Отмена лизинга с ID:`;
      // csvTemp['data'] = `${obj['leaseId']}`;
      // csvAll.push(csvTemp);
    } else if (obj['type'] == 3) {
      countType3++;
      let amOfAsset = decimal(listAssets[obj['assetId']][1]);
      let amount = obj['quantity']/amOfAsset;
      if (listAssets[obj['assetId']][2] == "spam") {
        type3 += `<div class="3 bal ${obj['timestamp']} spam"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      } else {
        type3 += `<div class="3 bal ${obj['timestamp']}"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      }
      type3 += `<strong>Создание ассета: </strong>
      ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      if (obj['script'] != null) {
        type3 += ` (скрипт-ассет)`;
      }
      type3 += `<br><strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Создание ассета:`;
      // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      // csvAll.push(csvTemp);
    } else if (obj['type'] == 6) {
      countType6++;
      let amOfAsset = decimal(listAssets[obj['assetId']][1]);
      let amount = obj['amount']/amOfAsset;
      if (listAssets[obj['assetId']][2] == "spam") {
        type6 += `<div class="6 bal ${obj['timestamp']} spam"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      } else {
        type6 += `<div class="6 bal ${obj['timestamp']}"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      }
      type6 += `<strong>Asset burning: </strong>
      ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}<br>
      <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Сжигание ассета:`;
      // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      // csvAll.push(csvTemp);
    } else if (obj['type'] == 5) {
      countType5++;
      let amOfAsset = decimal(listAssets[obj['assetId']][1]);
      let amount = obj['quantity']/amOfAsset;
      if (listAssets[obj['assetId']][2] == "spam") {
        type5 += `<div class="5 bal ${obj['timestamp']} spam"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      } else {
        type5 += `<div class="5 bal ${obj['timestamp']}"
        id="${listAssets[obj['assetId']][0].toLowerCase()}${new Date(obj['timestamp']).toLocaleDateString()}">`
      }
      type5 += `<strong>Довыпуск ассета: </strong>
      ${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}<br>
      <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Довыпуск ассета:`;
      // csvTemp['data'] = `${amount.toLocaleString('en-US', {maximumSignificantDigits: 16})} ${listAssets[obj['assetId']][0]}`;
      // csvAll.push(csvTemp);
    } else if (obj['type'] == 12) {
      countType12++;
      type12 += `<div class="12 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Дата-транзакция </strong><br>
      <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Дата-транзакция`;
      // // csvTemp['data'] = type;
      // csvAll.push(csvTemp);
    } else if (obj['type'] == 10) {
      countType10++;
      type10 += `<div class="10 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Создание алиаса: </strong>${obj['alias']}<br>
      <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Создание алиаса:`;
      // csvTemp['data'] = `${obj['alias']}`;
      // csvAll.push(csvTemp);
    } else if (obj['type'] == 13) {
      countType13++;
      type13 += `<div class="13 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Скрипт-транзакция </strong><br>
      <strong> Date: </strong>${new Date(obj['timestamp']).toLocaleString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Скрипт-транзакция`;
      // // csvTemp['data'] = type;
      // csvAll.push(csvTemp);
    } else if (obj['type'] == 14) {
      if (obj['minSponsoredAssetFee'] == null) {
        type14 += `<div class="14 bal ${obj['timestamp']}"
        id="${new Date(obj['timestamp']).toLocaleDateString()}">
        <strong>Отмена спонсорства для </strong>${listAssets[obj['assetId']][0]}<br>
        <strong>Date: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
        <div class="linkId"><strong> Id: </strong>
        <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
        </div>`;
        // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        // csvTemp['type'] = `Отмена спонсорства`;
        // // csvTemp['data'] = type;
        // csvAll.push(csvTemp);
      } else {
        countType14++;
        type14 += `<div class="14 bal ${obj['timestamp']}"
        id="${new Date(obj['timestamp']).toLocaleDateString()}">
        <strong>Активация спонсорства для </strong>${listAssets[obj['assetId']][0]}<br>
        <strong>Date: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
        <div class="linkId"><strong> Id: </strong>
        <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
        </div>`;
        csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
        csvTemp['type'] = `Активация спонсорства`;
        // csvTemp['data'] = type;
        csvAll.push(csvTemp);
      }
    } else if (obj['type'] == 15) {
      countType15++;
      type15 += `<div class="15 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Установка скрипта на ассет </strong><br>
      <strong>Date: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Установка скрипта на ассет`;
      // // csvTemp['data'] = type;
      // csvAll.push(csvTemp);
    } else if (obj['type'] == 16) {
      countType16++;
      type16 += `<div class="16 bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Вызов скрипта </strong><br>
      <strong>Date: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Вызов скрипта`;
      // // csvTemp['data'] = type;
      // csvAll.push(csvTemp);
    } else {
      countTypeElse++;
      typeElse += `<div class="else bal ${obj['timestamp']}"
      id="${new Date(obj['timestamp']).toLocaleDateString()}">
      <strong>Type: ${obj['type']}</strong><br>
      <strong>Date: </strong> ${new Date(obj['timestamp']).toLocaleDateString()}<br>
      <div class="linkId"><strong> Id: </strong>
      <a href="https://wavesexplorer.com/tx/${obj['id']}" target="_blank">${obj['id']}</a></div>
      </div>`;
      // csvTemp['date'] = `${new Date(obj['timestamp']).toLocaleString()}`;
      // csvTemp['type'] = `Другая транзакция`;
      // // csvTemp['data'] = type;
      // csvAll.push(csvTemp);
    }
   };

  postMessage({
  id1:[type1, countType1], idDeposit: [typeDeposit, countTypeDeposit], idSend: [typeSend, countTypeSend],
  id7: [type7, countType7], id8: [type8, countType8], id9: [type9, countType9], idMassSend: [typeMassSend, countTypeMassSend],
  idMassDeposit: [typeMassReceive, countTypeMassReceive], id3: [type3, countType3], id5: [type5, countType5],
  id6: [type6, countType6], id10: [type10, countType10], id12: [type12, countType12],
  id13: [type13, countType13], id14: [type14, countType14],
  id15: [type15, countType15], id16: [type16, countType16], idElse: [typeElse, countTypeElse]});
});
